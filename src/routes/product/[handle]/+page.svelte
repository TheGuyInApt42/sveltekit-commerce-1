<script>
  import { getCartItems } from '$store';
  import HeadTags from '$lib/components/head-tags/HeadTags.svelte';
  import { findVariantId, formatPrice } from '$utils/shopify';
  import { onMount } from 'svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  let product;
  let trailers = [];
  let selectedOptions = {};
  let cartLoading = false;
  let currentImageIndex = 0;
  let currentVariant = null;
  let variantId = null;
  let highlightedImageSrc = null;
  let showTrailer = false;
  let currentTrailer = null;
  let dataInitialized = false;

  // Initialize data immediately since it's available
  if (data?.product) {
    product = data.product;
    selectedOptions = { ...data.product.defaultSelectedOptions };
    currentVariant = data.product.variants?.[0];
  }

  if (data?.trailers) {
    trailers = data.trailers || [];
    if (trailers.length > 0) {
      currentTrailer = trailers[0];
    }
  }

  // Additional initialization on mount if needed
  onMount(() => {
    console.log('Component mounted with data:', { product, trailers });
  });

  // Handle variant ID updates
  $: if (product?.variants) {
    variantId = findVariantId(product.variants, selectedOptions) || product.id;
  }

  function updateCurrentVariant() {
    if (!product?.variants) return;
    currentVariant =
      product.variants.find((variant) =>
        variant.selectedOptions.every((option) => selectedOptions[option.name] === option.value)
      ) || null;
  }

  function handleOptionChange(optionName, value) {
    selectedOptions = { ...selectedOptions, [optionName]: value };
    updateCurrentVariant();
  }

  function selectTrailer(trailer) {
    currentTrailer = trailer;
    showTrailer = true;
  }

  async function addToCart() {
    if (!product) return;

    try {
      cartLoading = true;
      const cartId =
        typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cartId')) : null;
      const itemId = variantId || product.id;

      if (!itemId) {
        throw new Error('No variant found for selected options');
      }

      await fetch('/cart.json', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId, variantId: itemId })
      });

      await getCartItems();
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      cartLoading = false;
    }
  }

  const metaData = {
    title: `${product?.title || 'Product'} | Store`,
    description: product?.description || '',
    keywords: ['games', 'store']
  };
</script>

<!-- Add a loading state -->
{#if !product}
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="text-center">
      <div class="lds-ring mb-4">
        <div />
        <div />
        <div />
        <div />
      </div>
      <p class="text-gray-600">Loading product data...</p>
    </div>
  </div>
{:else}
  <HeadTags {metaData} />

  {#if showTrailer && currentTrailer}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      on:click|self={() => (showTrailer = false)}
    >
      <div class="relative aspect-video w-full max-w-6xl">
        <button
          class="absolute -top-10 right-0 text-white hover:text-gray-300"
          on:click={() => (showTrailer = false)}
        >
          Close ×
        </button>
        <iframe
          title={currentTrailer.name || 'Game Trailer'}
          class="h-full w-full"
          src={`https://www.youtube.com/embed/${currentTrailer.video_id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    </div>
  {/if}

  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {#if product}
        <div class="flex flex-col gap-8 lg:flex-row">
          <div class="space-y-8 lg:w-2/3">
            {#if trailers && trailers.length > 0}
              <!-- Main Trailer Display -->
              <div
                class="group relative aspect-video cursor-pointer overflow-hidden rounded-xl bg-black"
                on:click={() => selectTrailer(trailers[0])}
              >
                <img
                  src={trailers[0].thumbnail.high}
                  alt={trailers[0].name || 'Watch trailer'}
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
                    <span class="font-semibold">{trailers[0].name || 'Watch Trailer'}</span>
                  </div>
                </div>
              </div>

              <!-- Additional Trailers -->
              {#if trailers.length > 1}
                <div class="flex gap-4 overflow-x-auto pb-4">
                  {#each trailers.slice(1) as trailer}
                    <div
                      class="group relative aspect-video w-64 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg"
                      on:click={() => selectTrailer(trailer)}
                    >
                      <img
                        src={trailer.thumbnail.medium}
                        alt={trailer.name}
                        class="h-full w-full object-cover transition group-hover:opacity-75"
                      />
                      <div class="absolute inset-0 flex items-center justify-center">
                        <div
                          class="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition group-hover:scale-110"
                        >
                          <div
                            class="ml-1 h-0 w-0 border-b-[8px] border-l-[16px] border-t-[8px] border-b-transparent border-l-black border-t-transparent"
                          />
                        </div>
                      </div>
                      <div
                        class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2"
                      >
                        <div class="text-sm text-white">
                          <span class="font-semibold">{trailer.name || 'Additional Trailer'}</span>
                        </div>
                      </div>
                    </div>
                  {/each}
                </div>
              {/if}
            {/if}

            <div class="relative overflow-hidden rounded-xl bg-black">
              <img
                src={product.images[currentImageIndex].src}
                alt={product.title}
                class="w-full object-cover"
              />
              <div class="absolute inset-0 flex items-center justify-between p-4">
                <button
                  class="rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                  on:click={() =>
                    (currentImageIndex =
                      (currentImageIndex - 1 + product.images.length) % product.images.length)}
                >
                  ←
                </button>
                <button
                  class="rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                  on:click={() =>
                    (currentImageIndex = (currentImageIndex + 1) % product.images.length)}
                >
                  →
                </button>
              </div>
            </div>

            <div class="flex gap-2">
              {#each product.images as image, i}
                <button
                  class="h-16 w-24 overflow-hidden rounded-lg {currentImageIndex === i
                    ? 'ring-2 ring-blue-500'
                    : ''}"
                  on:click={() => (currentImageIndex = i)}
                >
                  <img src={image.src} alt="" class="h-full w-full object-cover" />
                </button>
              {/each}
            </div>
          </div>

          <div class="space-y-6 lg:w-1/3">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">{product.title}</h1>
              <p class="text-lg text-gray-500">Cosmic Games Studio</p>
            </div>

            <div class="rounded-xl bg-white p-6 shadow-sm">
              <div class="mb-4 text-3xl font-bold text-gray-900">
                {formatPrice(currentVariant?.price, currentVariant?.currencyCode) || '0.00'}
              </div>

              <div class="mb-6 space-y-3">
                <label class="block text-sm font-medium text-gray-700">Select Platform</label>
                <div class="flex gap-2">
                  {#each product.variants as variant}
                    <button
                      class="rounded-lg px-4 py-2 {selectedOptions.Platform ===
                      variant.selectedOptions[0].value
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
                      on:click={() =>
                        handleOptionChange('Platform', variant.selectedOptions[0].value)}
                    >
                      {variant.selectedOptions[0].value}
                    </button>
                  {/each}
                </div>
              </div>

              <button
                on:click={addToCart}
                disabled={cartLoading}
                class="cart-button w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600"
              >
                <span>{cartLoading ? 'Adding...' : 'Add To Cart'}</span>
                {#if cartLoading}
                  <div class="lds-ring ml-4">
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                {/if}
              </button>
            </div>

            <div class="mt-12 grid gap-8 md:grid-cols-3">
              <div class="space-y-8 md:col-span-2">
                <div>
                  <h2 class="mb-4 text-2xl font-bold text-gray-900">About the Game</h2>
                  <p class="leading-relaxed text-gray-600">{product.description}</p>
                </div>

                <div>
                  <h2 class="mb-4 text-2xl font-bold text-gray-900">Key Features</h2>
                  <ul class="space-y-2">
                    {#each ['Vast open-world galaxy to explore', 'Dynamic choice-driven narrative', 'Next-gen graphics with ray tracing', 'Multiplayer space combat'] as feature}
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
                      <dd class="text-gray-900">Cosmic Games Studio</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-gray-500">Publisher</dt>
                      <dd class="text-gray-900">Galaxy Entertainment</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-gray-500">Platforms</dt>
                      <dd class="text-gray-900">PS5, Xbox Series X, PC</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .cart-button {
    color: var(--primary2);
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .cart-button:hover {
    background-color: var(--secondary);
    color: var(--primary);
  }

  .cart-button:active {
    transform: scale(0.98);
  }

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    margin: 2px;
    border: 2px solid #000;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000 transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    h1 {
      text-align: unset;
    }
  }
</style>
