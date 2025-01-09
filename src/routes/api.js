import { SHOPIFY_API_ENDPOINT } from '$env/static/private';
import { SHOPIFY_STOREFRONT_API_TOKEN } from '$env/static/private';
import { IGDB_API_KEY } from '$env/static/private';
import { IGDB_CLIENT_ID } from '$env/static/private';

const base = 'https://api.igdb.com/v4';

export async function api(method, resource, data) {
  try {
    console.log('API Call Details:', {
      method,
      resource,
      hasData: !!data,
      hasApiKey: !!IGDB_API_KEY,
      hasClientId: !!IGDB_CLIENT_ID
    });

    const response = await fetch(`${base}/${resource}`, {
      method,
      headers: {
        Accept: 'application/json',
        'Client-ID': `${IGDB_CLIENT_ID}`,
        Authorization: `Bearer ${IGDB_API_KEY}`
      },
      body: data
    });

    console.log('API Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API call failed: ${errorText}`);
    }

    return response;
  } catch (error) {
    console.error('API Call Error:', {
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
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
