import { getCollection } from '$utils/shopify';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function load() {
  try {
    const collection = await getCollection('new-releases', 10, 'TITLE');
    //console.log('Collection data:', collection); // Add this line for debugging

    if (!collection) {
      throw error(404, 'Collection not found');
    }

    return {
      title: collection.title,
      handle: collection.handle,
      description: collection.description,
      products: collection.products
    };
  } catch (err) {
    console.error('Full error details:', err);

    if (err.status) {
      throw err;
    }

    throw error(500, err.message || 'Failed to load collection');
  }
}
