import { query } from '$app/server';
import { z } from 'zod';
import { shopifyFetch } from '$lib/server/shopify.js';

export const getProducts = query(async () => {
  const data = await shopifyFetch(`
    query {
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            featuredImage { url altText }
            variants(first: 1) {
              edges { node { id price { amount currencyCode } } }
            }
          }
        }
      }
    }
  `);
  return data.products.edges.map((e) => e.node);
});

export const getProduct = query(z.string(), async (handle) => {
  const data = await shopifyFetch(
    `query($handle: String!) {
      productByHandle(handle: $handle) {
        id title descriptionHtml
        images(first: 5) { edges { node { url altText } } }
        variants(first: 10) { edges { node { id title price { amount currencyCode } availableForSale } } }
      }
    }`,
    { handle }
  );
  return data.productByHandle;
});

export const getFeaturedProducts = query(async () => {
  const data = await shopifyFetch(`
    query {
      products(first: 10, sortKey: CREATED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            featuredImage { url altText }
            variants(first: 1) {
              edges { node { id price { amount currencyCode } } }
            }
          }
        }
      }
    }
  `);
  return data.products.edges.map((e) => e.node);
});


export const getProductsByType = query(z.string().optional(), async (type) => {
  const filterQuery = type ? `product_type:${JSON.stringify(type)}` : '';

  const data = await shopifyFetch(
    `query($query: String) {
      products(first: 100, query: $query) {
        edges {
          node {
            id
            title
            handle
            featuredImage { url altText }
            variants(first: 1) {
              edges { node { id price { amount currencyCode } } }
            }
          }
        }
      }
    }`,
    { query: filterQuery }
  );

  return data.products.edges.map((e) => e.node);
});