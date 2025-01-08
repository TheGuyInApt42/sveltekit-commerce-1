import { getProduct, handleShopifyResponse } from '$utils/shopify';
import { api } from '$api';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    // Validate params
    if (!params?.handle) {
      throw error(400, 'Product handle is required');
    }

    const data = await getProduct(params.handle);
    if (!data) {
      throw error(404, 'Product data not found');
    }

    const productResponse = await handleShopifyResponse(data);
    if (!productResponse?.body?.product) {
      throw error(404, 'Invalid product response structure');
    }

    // Resolve the product data
    const product = productResponse.body.product;

    // Get product title using getProductTitle function
    const title = await getProductTitle(product);
    if (!title) {
      throw error(404, 'Failed to get product title');
    }

    const trailers = await getTrailersForGame(title);

    // Return the data even if no trailers were found
    return {
      product,
      trailers: trailers || [] // Return empty array if no trailers found
    };
  } catch (err) {
    console.error('Error loading product data:', err);
    // Preserve the original error status if it exists
    throw error(err.status || 500, err.message || 'Failed to load product data');
  }
}

async function getProductTitle(product) {
  try {
    if (!product) {
      throw new Error('Product is required');
    }

    // If product is a promise, await it
    const resolvedProduct = await Promise.resolve(product);

    if (!resolvedProduct?.title) {
      throw new Error('Product title not found');
    }

    return resolvedProduct.title;
  } catch (error) {
    console.error('Failed to resolve product title:', error);
    return null;
  }
}

async function getGameId(gameName) {
  if (!gameName) {
    console.error('Game name is required');
    return null;
  }

  const data = `fields id; where name = "${gameName}";`;

  try {
    console.log('Fetching game ID with data:', data);
    const response = await api('POST', 'games', data);
    const gameData = await response.json();
    console.log('gameData:', gameData);

    if (Array.isArray(gameData) && gameData.length > 0 && gameData[0]?.id) {
      console.log('Game ID found:', gameData[0].id);
      return gameData[0].id;
    }

    console.error(`Game not found: ${gameName}`);
    return null;
  } catch (error) {
    console.error('Error fetching game ID:', error);
    return null;
  }
}

async function getGameTrailers(gameId) {
  if (!gameId) {
    console.error('Game ID is required');
    return null;
  }

  const data = `fields name,video_id; where game = ${gameId};`;

  try {
    console.log('Fetching trailers with data:', data);
    const response = await api('POST', 'game_videos', data);
    const videosData = await response.json();
    console.log('videosData:', videosData);

    if (Array.isArray(videosData) && videosData.length > 0) {
      // Add thumbnail URLs to each trailer
      const trailersWithThumbnails = videosData.map((trailer) => ({
        ...trailer,
        thumbnail: trailer.video_id
          ? {
              default: `https://img.youtube.com/vi/${trailer.video_id}/default.jpg`,
              medium: `https://img.youtube.com/vi/${trailer.video_id}/mqdefault.jpg`,
              high: `https://img.youtube.com/vi/${trailer.video_id}/hqdefault.jpg`,
              standard: `https://img.youtube.com/vi/${trailer.video_id}/sddefault.jpg`,
              maxres: `https://img.youtube.com/vi/${trailer.video_id}/maxresdefault.jpg`
            }
          : null
      }));
      return trailersWithThumbnails;
    }

    console.error(`No trailers found for game ID: ${gameId}`);
    return null;
  } catch (error) {
    console.error('Error fetching game trailers:', error);
    return null;
  }
}

async function getTrailersForGame(gameName) {
  if (!gameName) {
    console.error('Game name is required');
    return null;
  }

  try {
    console.log('Fetching trailers for game:', gameName);
    const gameId = await getGameId(gameName);

    if (!gameId) {
      console.warn(`Game ID not found for game: ${gameName}`);
      return null;
    }

    const trailers = await getGameTrailers(gameId);

    if (trailers) {
      console.log(`Trailers for ${gameName}:`);
      trailers.forEach((trailer) => {
        if (trailer?.video_id) {
          const youtubeLink = `https://www.youtube.com/watch?v=${trailer.video_id}`;
          console.log(`${trailer.name || 'Unnamed trailer'}:
            - Video: ${youtubeLink}
            - Thumbnail: ${trailer.thumbnail?.medium || 'No thumbnail available'}`);
        }
      });
      return trailers;
    }

    console.warn(`No trailers found for game: ${gameName}`);
    return null;
  } catch (error) {
    console.error('Error in getTrailersForGame:', error);
    return null;
  }
}
