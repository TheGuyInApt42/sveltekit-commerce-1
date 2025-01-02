import { getProduct, handleShopifyResponse } from '$utils/shopify';
import { api } from '$api';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const data = await getProduct(params.handle);
    const product = await handleShopifyResponse(data);
    //console.log('product', product.body.product);

    const title = await getProductTitle(product.body);
    getTrailersForGame(title);

    // Ensure the returned data is serializable
    return await product.body;
  } catch (err) {
    console.error('Error loading product data:', err);
    throw error(err.status || 500, err.message);
  }
}

async function getProductTitle(productContainer) {
  try {
    const resolvedProduct = await productContainer.product;
    console.log(resolvedProduct.title);
    return resolvedProduct.title;
  } catch (error) {
    console.error('Failed to resolve product:', error);
  }
}

async function getGameId(gameName) {
  const data = `fields id; where name = "${gameName}";`;

  try {
    const response = await api('POST', 'games', data);
    const gameData = await response.json();
    //console.log('gameData: ', gameData);

    if (gameData && gameData.length > 0) {
      return gameData[0].id; // Return the ID of the first matching game
    } else {
      throw new Error(`Game not found: ${gameName}`);
    }
  } catch (error) {
    console.error('Error fetching game ID:', error);
    return null;
  }
}

async function getGameTrailers(gameId) {
  const data = `fields name,video_id; where game = ${gameId};`;

  try {
    const response = await api('POST', 'game_videos', data);
    const videosData = await response.json();

    if (videosData && videosData.length > 0) {
      return videosData; // Return the array of videos
    } else {
      throw new Error(`No trailers found for game ID: ${gameId}`);
    }
  } catch (error) {
    console.error('Error fetching game trailers:', error);
    return null;
  }
}

async function getTrailersForGame(gameName) {
  const gameId = await getGameId(gameName);

  if (gameId) {
    const trailers = await getGameTrailers(gameId);

    if (trailers) {
      console.log(`Trailers for ${gameName}:`);
      trailers.forEach((trailer) => {
        const youtubeLink = `https://www.youtube.com/watch?v=${trailer.video_id}`;
        console.log(`${trailer.name}: ${youtubeLink}`);
      });
    }
  }
}
