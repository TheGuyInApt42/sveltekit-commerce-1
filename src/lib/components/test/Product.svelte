<script>
  // Props for the game data
  export let game = {
    title: 'Stellar Odyssey: Infinite Horizon',
    price: 59.99,
    images: ['/api/placeholder/800/450', '/api/placeholder/800/450', '/api/placeholder/800/450'],
    trailer: {
      thumbnailUrl: '/api/placeholder/1280/720',
      videoUrl: 'https://example.com/trailer.mp4',
      duration: '2:35'
    },
    releaseDate: 'December 15, 2024',
    platforms: ['PS5', 'Xbox Series X', 'PC'],
    description:
      'Embark on an epic journey through the cosmos in this groundbreaking space exploration RPG. Discover uncharted worlds, forge alliances with alien civilizations, and unravel the mysteries of the universe.',
    features: [
      'Vast open-world galaxy to explore',
      'Dynamic choice-driven narrative',
      'Next-gen graphics with ray tracing',
      'Multiplayer space combat'
    ],
    rating: 'ESRB T (Teen)',
    developer: 'Cosmic Games Studio',
    publisher: 'Galaxy Entertainment'
  };

  let currentImageIndex = 0;
  let selectedPlatform = game.platforms[0];
  let showTrailer = false;
</script>

<!-- Video Trailer Modal -->
{#if showTrailer}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
    on:click={() => (showTrailer = false)}
  >
    <div class="relative aspect-video w-full max-w-6xl">
      <button
        class="absolute -top-10 right-0 text-white hover:text-gray-300"
        on:click={() => (showTrailer = false)}
      >
        Close ×
      </button>
      <iframe
        title="Game Trailer"
        class="h-full w-full"
        src={game.trailer.videoUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  </div>
{/if}

<div class="min-h-screen bg-gray-50">
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- Game Header -->
    <div class="flex flex-col gap-8 lg:flex-row">
      <!-- Left Column - Images & Trailer -->
      <div class="space-y-8 lg:w-2/3">
        <!-- Trailer Section -->
        <div
          class="group relative aspect-video cursor-pointer overflow-hidden rounded-xl bg-black"
          on:click={() => (showTrailer = true)}
        >
          <img
            src={game.trailer.thumbnailUrl}
            alt="Watch trailer"
            class="h-full w-full object-cover transition group-hover:opacity-75"
          />
          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-lg transition group-hover:scale-110"
            >
              <div
                class="ml-2 h-0 w-0 border-b-[12px] border-l-[24px] border-t-[12px] border-b-transparent border-l-black border-t-transparent"
              />
            </div>
          </div>
          <div
            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
          >
            <div class="text-white">
              <span class="font-semibold">Watch Trailer</span>
              <span class="mx-2">•</span>
              <span>{game.trailer.duration}</span>
            </div>
          </div>
        </div>

        <!-- Main Image Gallery -->
        <div class="relative overflow-hidden rounded-xl bg-black">
          <img src={game.images[currentImageIndex]} alt={game.title} class="w-full object-cover" />
          <!-- Navigation Arrows -->
          <div class="absolute inset-0 flex items-center justify-between p-4">
            <button
              class="rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
              on:click={() =>
                (currentImageIndex =
                  (currentImageIndex - 1 + game.images.length) % game.images.length)}
            >
              ←
            </button>
            <button
              class="rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
              on:click={() => (currentImageIndex = (currentImageIndex + 1) % game.images.length)}
            >
              →
            </button>
          </div>
        </div>

        <!-- Thumbnail Strip -->
        <div class="flex gap-2">
          {#each game.images as image, i}
            <button
              class="h-16 w-24 overflow-hidden rounded-lg {currentImageIndex === i
                ? 'ring-2 ring-blue-500'
                : ''}"
              on:click={() => (currentImageIndex = i)}
            >
              <img src={image} alt="" class="h-full w-full object-cover" />
            </button>
          {/each}
        </div>
      </div>

      <!-- Rest of the component remains the same -->
      <!-- Right Column - Game Info -->
      <div class="space-y-6 lg:w-1/3">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{game.title}</h1>
          <p class="text-lg text-gray-500">{game.developer}</p>
        </div>

        <div class="rounded-xl bg-white p-6 shadow-sm">
          <div class="mb-4 text-3xl font-bold text-gray-900">${game.price}</div>

          <!-- Platform Selection -->
          <div class="mb-6 space-y-3">
            <label class="block text-sm font-medium text-gray-700">Select Platform</label>
            <div class="flex gap-2">
              {#each game.platforms as platform}
                <button
                  class="rounded-lg px-4 py-2 {selectedPlatform === platform
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
                  on:click={() => (selectedPlatform = platform)}
                >
                  {platform}
                </button>
              {/each}
            </div>
          </div>

          <button
            class="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>

        <div class="space-y-4 rounded-xl bg-white p-6 shadow-sm">
          <div>
            <h3 class="font-semibold text-gray-900">Release Date</h3>
            <p class="text-gray-600">{game.releaseDate}</p>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Rating</h3>
            <p class="text-gray-600">{game.rating}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Game Details -->
    <div class="mt-12 grid gap-8 md:grid-cols-3">
      <div class="space-y-8 md:col-span-2">
        <div>
          <h2 class="mb-4 text-2xl font-bold text-gray-900">About the Game</h2>
          <p class="leading-relaxed text-gray-600">{game.description}</p>
        </div>

        <div>
          <h2 class="mb-4 text-2xl font-bold text-gray-900">Key Features</h2>
          <ul class="space-y-2">
            {#each game.features as feature}
              <li class="flex items-start">
                <span class="mr-2 text-blue-500">•</span>
                <span class="text-gray-600">{feature}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>

      <div>
        <div class="rounded-xl bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-xl font-bold text-gray-900">Game Info</h2>
          <dl class="space-y-4">
            <div>
              <dt class="text-sm font-medium text-gray-500">Developer</dt>
              <dd class="text-gray-900">{game.developer}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Publisher</dt>
              <dd class="text-gray-900">{game.publisher}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Platforms</dt>
              <dd class="text-gray-900">{game.platforms.join(', ')}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</div>
