import { SHOPIFY_API_ENDPOINT } from '$env/static/private';
import { SHOPIFY_STOREFRONT_API_TOKEN } from '$env/static/private';

export async function api(data) {
  let body = data && JSON.stringify(data);
  //console.log(body);

  try {
    const result = await fetch(SHOPIFY_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_API_TOKEN
      },
      body: { query, variables } && JSON.stringify({ query, variables })
    });

    return {
      status: result.status,
      body: await result.json()
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      status: 500,
      error: 'Error receiving data'
    };
  }
}
