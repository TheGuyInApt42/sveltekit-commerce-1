import { getAllCollections } from '$utils/shopify';
import { error } from '@sveltejs/kit';
import { api } from './api';
import dayjs from 'dayjs';

/** @type {import('./$types').RequestHandler} */
export async function load({ url }) {
  const res = await getAllCollections();

  if (res.status === 200) {
    const products = res.body?.data?.collections?.edges;

    if (products) {
      return {
        products,
        recent: getRecentReleases(),
        soon: getComingSoon(),
        top: getTopGames()
      };
    }

    throw error(404);
  } else {
    throw error(res.status);
  }
}

// timestamp of current date
const now = dayjs().unix();
const currentDate = dayjs();

// timestamp of first day of current month
const firstOfMonth = dayjs().startOf('month').unix();
console.log(firstOfMonth);

const sixMonthsAgo = currentDate.subtract(6, 'month').unix();
console.log(sixMonthsAgo, now);

// make new field replacing thumbnail cover with big cover
const getBiggerCover = (data, src = 'release') => {
  if (src == 'release') {
    return data.map((game) => ({
      ...game,
      bigCover:
        game.cover && game.cover?.url ? game.cover?.url.replace('t_thumb', 't_cover_big') : ''
    }));
  } else {
    return data.map((game) => ({
      ...game,
      bigCover: game.cover?.url.replace('t_thumb', 't_cover_big_2x')
    }));
  }
};

function getBig(data, src = 'release') {
  for (const obj of data) {
    if (obj.game.cover) {
      obj.bigCover = obj.game.cover?.url.replace('t_thumb', 't_cover_big');
    } else {
      obj.bigCover = 'noCover';
    }
  }

  return data;
}

const systems = [
  {
    id: 48,
    name: 'PS4'
  },
  {
    id: 49,
    name: 'Xbox One'
  },
  {
    id: 130,
    name: 'Nintendo Switch'
  },
  {
    id: 167,
    name: 'PS5'
  },
  {
    id: 169,
    name: 'Xbox Series'
  }
];

const getRecentReleases = async () => {
  const query = `fields human, game.name, game.total_rating, game.version_title, game.version_parent, game.platforms, game.rating, game.hypes, game.cover.url; where date > ${firstOfMonth} & date < ${now} & game.platforms = (48, 167, 169, 130); limit 30; sort date desc;`;

  const response = await api('POST', 'release_dates', query);
  //console.log(await response.clone().json());

  if (response.status === 404) {
    // user hasn't created a todo list.
    // start with an empty array
    return {
      games: []
    };
  }

  if (response.status === 200) {
    const games = await response.clone().json();
    //console.log(games);

    const seenIds = new Set();
    const uniqueGames = [];

    for (const game of games) {
      const gameId = game.game.id;
      if (!seenIds.has(gameId)) {
        seenIds.add(gameId);
        uniqueGames.push(game);
      }
    }

    // Replace platform IDs with names
    const gamesWithPlatformNames = uniqueGames.map((recentGame) => {
      const game = recentGame.game;
      const platformsWithNames = game.platforms.map((platformId) => {
        const system = systems.find((sys) => sys.id === platformId);
        return system ? system.name : null;
      });

      return {
        ...recentGame,
        game: {
          ...game,
          platforms: platformsWithNames
        }
      };
    });

    //console.log('gp is +++++++++++++++++++++++++++++++++++++++++++++++++++++++++',gamesWithPlatformNames);

    const fixedReleases = getBig(gamesWithPlatformNames);
    //console.log('fr is ****************************************************', fixedReleases);
    return fixedReleases;
  }

  error(response.status);
};

const getTopGames = async () => {
  const query = `fields name,platforms, total_rating, cover.url, first_release_date; where total_rating > 88  & category = 0 & first_release_date > ${sixMonthsAgo} & first_release_date < ${now} & platforms = (48, 167, 169, 130) ; limit 15; sort total_rating desc;`;

  const response = await api('POST', 'games', query);
  //console.log(await response.json());

  if (response.status === 404) {
    // user hasn't created a todo list.
    // start with an empty array
    return {
      games: []
    };
  }

  if (response.status === 200) {
    const games = await response.clone().json();
    //console.log(games);

    const fixedReleases = getBiggerCover(games, 'top');
    //console.log('fixed', fixedReleases);
    const responseObject = { games: games, fixed: fixedReleases };
    //console.log(responseObject);

    return responseObject;
  }

  error(response.status);
};

const getComingSoon = async () => {
  const query = `fields human, game.name, game.platforms, game.cover.url; where date > ${now} & game.platforms = (48, 167, 169, 130); limit 30;`;

  const response = await api('POST', 'release_dates', query);
  //console.log(await response.clone().json());

  if (response.status === 404) {
    // user hasn't created a todo list.
    // start with an empty array
    return {
      games: []
    };
  }

  if (response.status === 200) {
    const games = await response.json();

    const seenIds = new Set();
    const uniqueGames = [];

    for (const game of games) {
      const gameId = game.game.id;
      if (!seenIds.has(gameId)) {
        seenIds.add(gameId);
        uniqueGames.push(game);
      }
    }

    // Replace platform IDs with names
    const gamesWithPlatformNames = uniqueGames.map((recentGame) => {
      const game = recentGame.game;
      const platformsWithNames = game.platforms.map((platformId) => {
        const system = systems.find((sys) => sys.id === platformId);
        return system ? system.name : null;
      });

      return {
        ...recentGame,
        game: {
          ...game,
          platforms: platformsWithNames
        }
      };
    });

    const fixedReleases = getBiggerCover(gamesWithPlatformNames);
    console.log('f=============', fixedReleases);
    return fixedReleases;
  }

  error(response.status);
};
