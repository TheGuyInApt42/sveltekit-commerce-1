import { SHOPIFY_STOREFRONT_PRIVATE_TOKEN } from '$env/static/private';
import { PUBLIC_SHOPIFY_STORE_DOMAIN } from '$env/static/public';

if (!PUBLIC_SHOPIFY_STORE_DOMAIN) {
  throw new Error(
    'PUBLIC_SHOPIFY_STORE_DOMAIN is undefined — check your .env file and restart the dev server (Vite inlines $env/static/public at build time, so HMR can sometimes leave it stale).'
  );
}
if (!SHOPIFY_STOREFRONT_PRIVATE_TOKEN) {
  throw new Error('SHOPIFY_STOREFRONT_PRIVATE_TOKEN is undefined — check your .env file.');
}

const ENDPOINT = `https://${PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2025-10/graphql.json`;

async function fetchWithTimeout(url, options, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

export async function shopifyFetch(query, variables, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetchWithTimeout(ENDPOINT, {
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
    } catch (err) {
      const isLastAttempt = attempt === retries;
      console.error(
        `shopifyFetch attempt ${attempt + 1} failed:`,
        err.message,
        err.cause ? `\ncause: ${err.cause}` : ''
      );

      if (isLastAttempt) throw err;

      // brief backoff before retry (300ms, 600ms, ...)
      await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
    }
  }
}