import { query, command, getRequestEvent } from '$app/server';
import { z } from 'zod';
import { shopifyFetch } from '$lib/server/shopify.js';

const CART_COOKIE = 'cart_id';

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost { subtotalAmount { amount currencyCode } }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            product { title handle featuredImage { url altText } }
          }
        }
      }
    }
  }
`;

async function getOrCreateCartId() {
  const event = getRequestEvent();
  let cartId = event.cookies.get(CART_COOKIE);
  if (cartId) return cartId;

  const data = await shopifyFetch(`mutation { cartCreate { cart { id } } }`);
  cartId = data.cartCreate.cart.id;
  event.cookies.set(CART_COOKIE, cartId, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    sameSite: 'lax'
  });
  return cartId;
}

export const getCart = query(async () => {
  const event = getRequestEvent();
  const cartId = event.cookies.get(CART_COOKIE);
  if (!cartId) return null;

  const data = await shopifyFetch(`query($id: ID!) { cart(id: $id) { ${CART_FIELDS} } }`, {
    id: cartId
  });
  return data.cart;
});

export const addToCart = command(
  z.object({ variantId: z.string(), quantity: z.number().default(1) }),
  async ({ variantId, quantity }) => {
    const cartId = await getOrCreateCartId();
    await shopifyFetch(
      `mutation($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) { cart { id } }
      }`,
      { cartId, lines: [{ merchandiseId: variantId, quantity }] }
    );
    await getCart().refresh();
  }
);

export const removeCartLine = command(z.string(), async (lineId) => {
  const event = getRequestEvent();
  const cartId = event.cookies.get(CART_COOKIE);
  if (!cartId) return;

  await shopifyFetch(
    `mutation($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { id } }
    }`,
    { cartId, lineIds: [lineId] }
  );
  await getCart().refresh();
});
