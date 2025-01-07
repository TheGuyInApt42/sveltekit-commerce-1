import { getProduct, handleShopifyResponse } from '$utils/shopify';
import { api } from '$api';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const data = await getProduct(params.handle);
    const productResponse = await handleShopifyResponse(data);

    // Resolve the product data
    const product = await productResponse.body.product;

    const title = product.title; // Assuming the title is part of the resolved product
    const trailers = await getTrailersForGame(title);

    // Ensure the returned data is serializable
    return {
      product, // The resolved product
      trailers, // The resolved trailers
    };
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
    console.log('Fetching game ID with data:', data);
    const response = await api('POST', 'games', data);
    const gameData = await response.json();
    console.log('gameData:', gameData);

    if (gameData && gameData.length > 0) {
      console.log('Game ID found:', gameData[0].id);
      return gameData[0].id; // Return the ID of the first matching game
    } else {
      console.error(`Game not found: ${gameName}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching game ID:', error);
    return null;
  }
}

async function getGameTrailers(gameId) {
  const data = `fields name,video_id; where game = ${gameId};`;

  try {
    console.log('Fetching trailers with data:', data);
    const response = await api('POST', 'game_videos', data);
    const videosData = await response.json();
    console.log('videosData:', videosData);

    if (videosData && videosData.length > 0) {
      return videosData; // Return the array of videos
    } else {
      console.error(`No trailers found for game ID: ${gameId}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching game trailers:', error);
    return null;
  }
}

async function getTrailersForGame(gameName) {
  try {
    console.log('Fetching trailers for game:', gameName);
    const gameId = await getGameId(gameName);

    if (gameId) {
      const trailers = await getGameTrailers(gameId);

      if (trailers) {
        console.log(`Trailers for ${gameName}:`);
        trailers.forEach((trailer) => {
          const youtubeLink = `https://www.youtube.com/watch?v=${trailer.video_id}`;
          console.log(`${trailer.name}: ${youtubeLink}`);
        });
      } else {
        console.warn(`No trailers found for game: ${gameName}`);
      }

      return trailers;
    } else {
      console.warn(`Game ID not found for game: ${gameName}`);
      return null;
    }
  } catch (error) {
    console.error('Error in getTrailersForGame:', error);
    return null;
  }
}

