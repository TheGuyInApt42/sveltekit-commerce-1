import { SHOPIFY_STOREFRONT_PRIVATE_TOKEN } from '$env/static/private';
import { PUBLIC_SHOPIFY_STORE_DOMAIN } from '$env/static/public';

const ENDPOINT = `https://${PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2025-10/graphql.json`;

export async function shopifyFetch(query, variables) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Shopify-Storefront-Private-Token': SHOPIFY_STOREFRONT_PRIVATE_TOKEN
    },
    body: JSON.stringify({ query, variables })
  });

  const json = await res.json();

  if (!res.ok) {
    console.error('Shopify HTTP error', res.status, json);
    throw new Error(`Shopify request failed: ${res.status}`);
  }

  if (json.errors) {
    console.error('Shopify GraphQL errors', JSON.stringify(json.errors, null, 2));
    throw new Error(json.errors.map((e) => e.message).join('; '));
  }

  return json.data;
}
