import { SHOPIFY_API_ENDPOINT } from '$env/static/private';
import { SHOPIFY_STOREFRONT_API_TOKEN } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { query, variables } = request.body;
  const endpoint = SHOPIFY_API_ENDPOINT;
  const key = SHOPIFY_STOREFRONT_API_TOKEN;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key
      },
      body: JSON.stringify({ query, variables })
    });

    const responseBody = await result.json();

    return {
      status: result.status,
      body: responseBody
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      status: 500,
      error: 'Error receiving data'
    };
  }
}
