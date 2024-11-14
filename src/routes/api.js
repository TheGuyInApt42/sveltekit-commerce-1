import { SHOPIFY_API_ENDPOINT } from '$env/static/private';
import { SHOPIFY_STOREFRONT_API_TOKEN } from '$env/static/private';
import { IGDB_API_KEY } from '$env/static/private';
import { IGDB_CLIENT_ID } from '$env/static/private';

const base = 'https://api.igdb.com/v4';

export async function api(method, resource, data) {
  let body = data && JSON.stringify(data);
  //console.log(body);

  return fetch(`${base}/${resource}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Client-ID': `${IGDB_CLIENT_ID}`,
      Authorization: `Bearer ${IGDB_API_KEY}`
    },
    body: data
  });
}

export async function shopifyFetch({ query, variables }) {
  try {
    const result = await fetch(SHOPIFY_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_API_TOKEN
      },
      body: { query, variables } && JSON.stringify({ query, variables })
    });

    //console.log(await result.clone().json());

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
