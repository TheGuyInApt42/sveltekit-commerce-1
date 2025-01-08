<script>
  export let games = [];
  //console.log('games: ', games);

  // Sample data - in real usage this would likely be passed as props
  /* const games = [
    {
      id: 1,
      title: 'Skyrim HD',
      image: 'http://camphillplayntrade.com/wp-content/uploads/2016/10/Skyrim-Box-Art.jpg',
      description: 'An epic space exploration RPG with branching narratives and stunning visuals.',
      href: '/games/stellar-odyssey',
      price: {
        amount: 59.99,
        currencyCode: 'USD'
      }
    },
    {
      id: 2,
      title: 'Dishonored 2',
      image:
        'http://camphillplayntrade.com/wp-content/uploads/2016/10/dishonored-2-e3-steam-deal-e1465872288499.jpg',
      description:
        'Dark fantasy action-adventure featuring souls-like combat and atmospheric world design.',
      href: '/games/stellar-odyssey',
      price: {
        amount: 59.99,
        currencyCode: 'USD'
      }
    },
    {
      id: 3,
      title: 'COD Infinite Warfare',
      image:
        'http://camphillplayntrade.com/wp-content/uploads/2016/10/Call-of-Duty-Official-Cover-Art-5_feature.jpg',
      description:
        'Cyberpunk racing game with procedurally generated tracks and multiplayer modes.',
      href: '/games/neon-drift',
      price: {
        amount: 39.99,
        currencyCode: 'USD'
      }
    },
    {
      id: 4,
      title: 'Battlefield 1',
      image: 'http://camphillplayntrade.com/wp-content/uploads/2016/10/BF-cover-1200x609.jpg',
      description:
        'Cyberpunk racing game with procedurally generated tracks and multiplayer modes.',
      href: '/games/neon-drift',
      price: {
        amount: 49.99,
        currencyCode: 'USD'
      }
    }
  ]; */

  // Format price with currency
  const formatPrice = (amount, currencyCode) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode
    }).format(amount);
  };
</script>

<div class="mx-auto max-w-md space-y-6 p-4">
  {#each games as game (game.id)}
    <a
      href={`/product/${game.handle}`}
      class="group card block transform cursor-pointer overflow-hidden rounded-lg bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div class="relative overflow-hidden">
        <img
          src={game.media[0].image.originalSrc}
          alt={game.title}
          class="h-auto w-full transition-transform duration-300 group-hover:scale-105"
        />
        <div
          class="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-40"
        />
      </div>

      <div class="p-4">
        <div class="mb-2 flex items-start justify-between">
          <h2 class="text-xl font-bold transition-colors duration-300 group-hover:text-blue-600">
            {game.title}
          </h2>
          <span class="font-semibold text-green-600">
            {formatPrice(
              game.priceRange.minVariantPrice.amount,
              game.priceRange.minVariantPrice.currencyCode
            )}
          </span>
        </div>

        <p
          class="h-0 overflow-hidden text-sm text-gray-600 opacity-0 transition-opacity duration-300 group-hover:h-auto group-hover:opacity-100"
        >
          {game.description}
        </p>
      </div>
    </a>
  {/each}
</div>

<style>
  .card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
