import { accessToken } from '../../../store';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';

const shopify = shopifyApi({
  apiKey: '620f7beb1ae387d8d6ab2f9b413c28db',
  apiSecretKey: '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',
  scopes: ['read_products', 'unauthenticated_read_customers'],
  isCustomStoreApp: true,
  //domain: 'playntradetest.myshopify.com',
  privateAppStorefrontAccessToken: 'e52747a7f34bb20083e17f94b797e444',

  //apiVersion: ApiVersion.July22,
  hostName: 'localhost:5175',
  adminApiAccessToken: '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'
});

export async function GET() {
  try {
    // Example function to fetch shop details
    const shop = await shopify.rest.Shop.all();
    console.log('shop: ', shop);
    return {
      status: 200,
      body: { shop }
    };
  } catch (error) {
    return {
      status: 500,
      body: { error: 'Error fetching shop details' }
    };
  }
}
