import { getCollection } from '$utils/shopify';
import { error } from '@sveltejs/kit';
import { IGDB_CLIENT_ID, IGDB_CLIENT_SECRET } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function load({ fetch, setHeaders }) {
  try {
    // 1. Fetch Shopify Collection
    const collection = await getCollection('new-releases', 10, 'TITLE');

    if (!collection) {
      throw error(404, 'Collection not found');
    }

    // 2. Fetch IGDB Access Token
    const authRes = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${IGDB_CLIENT_ID}&client_secret=${IGDB_CLIENT_SECRET}&grant_type=client_credentials`,
      { method: 'POST' }
    );
    const { access_token } = await authRes.json();

    const threeMonthsAgo = Math.floor(Date.now() / 1000 - 90 * 24 * 60 * 60);
    const query = `
      fields name, screenshots.image_id, first_release_date, total_rating_count, rating;
      where screenshots != null 
        & first_release_date > ${threeMonthsAgo}
        & rating > 75;
      sort total_rating_count desc;
      limit 10;
    `;

    // 3. Fetch Top Games from IGDB
    const igdbRes = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': IGDB_CLIENT_ID,
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'text/plain'
      },
      body: query
    });

    const igdbGames = await igdbRes.json();

    // Debugging logs - Updated to check screenshots
    console.log('Total games fetched:', igdbGames.length);
    console.log('Games with screenshots:', igdbGames.filter((g) => g.screenshots).length);

    // 4. Format IGDB Data (Mapping to objects with src and name)
    const sliderImages = igdbGames
      .filter((game) => game.screenshots && game.screenshots.length > 0)
      .map((game) => ({
        src: `https://images.igdb.com/igdb/image/upload/t_1080p/${game.screenshots[0].image_id}.webp`,
        name: game.name
      }));

    // Fallback images formatted as objects to match IGDB data structure
    const fallbackImages = [
      {
        src: 'https://images.igdb.com/igdb/image/upload/t_720p/ar3p7p.webp',
        name: 'Featured Game'
      },
      {
        src: 'https://images.igdb.com/igdb/image/upload/t_720p/ar3lza.webp',
        name: 'Latest Release'
      },
      { src: 'https://images.igdb.com/igdb/image/upload/t_720p/ar4u71.webp', name: 'Top Pick' }
    ];

    // Combine them: Use IGDB results first, fill remaining slots with fallbacks
    const finalSliderImages = [...sliderImages, ...fallbackImages].slice(0, 5);

    // Cache the response
    setHeaders({
      'cache-control': 'public, max-age=2592000, s-maxage=2592000'
    });

    return {
      title: collection.title,
      handle: collection.handle,
      description: collection.description,
      products: collection.products,
      sliderImages: finalSliderImages
    };
  } catch (err) {
    console.error('Full error details:', err);
    if (err.status) throw err;
    throw error(500, err.message || 'Failed to load data');
  }
}
