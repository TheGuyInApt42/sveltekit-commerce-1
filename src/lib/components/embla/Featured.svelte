<script>
  import embla from 'svelte-embla';
  import { writable } from 'svelte/store';
  import { fade } from 'svelte/transition';
  import { getAllCollections } from '$utils/shopify';
  import { onMount } from 'svelte';
  import { error } from '@sveltejs/kit';
  import DataLogger from '$lib/components/data-logger/DataLogger.svelte';

  //export let photos = [];

  const gallery = writable();
  const thumbnails = writable();
  let featured;

  onMount(async () => {
    const res = await getAllCollections();
    console.log(res);

    if (res.status === 200) {
      const collections = res.body?.data?.collections?.edges;

      if (collections) {
        console.log(res);
        featured = collections[1]?.node?.products?.edges;
        console.log(featured);
      }
    } /* else {
    throw error(res.status);
  }  */
  });

  $: selected = $gallery?.selectedScrollSnap() ?? 0;

  const onThumbnailSelect = (index) => () => {
    if (!$thumbnails?.clickAllowed()) return;
    $gallery?.scrollTo(index);
    $thumbnails.scrollTo(index);
  };

  const onGallerySelect = () => {
    selected = $gallery?.selectedScrollSnap() ?? 0;
    $thumbnails?.scrollTo(selected);
  };

  const getCovers = async (data) => {
    let games = await data;

    return games.fixed.map((game) => game?.bigCover);
  };

  const getThumbs = async (data) => {
    let games = await data;

    return games.games.map((game) => game?.cover.url);
  };

  //console.log(photos);
</script>

{#await getAllCollections()}
  <!-- promise is pending -->
  <h2>Loading</h2>
{:then shopifyData}
  <!-- promise was fulfilled -->
  <div class="bg-embla-carousel w-full overflow-hidden rounded-[.25rem] p-4 lg:max-w-[1280px]">
    <div
      class="overflow-hidden"
      use:embla={{ store: gallery, loop: true, skipSnaps: false }}
      on:e-select={onGallerySelect}
    >
      <div class="grid auto-cols-[100%] grid-flow-col grid-rows-[400px] gap-x-[10px]">
        {#each featured as product, i (product.node.id)}
          <div class="relative last:mr-[10px]">
            <p
              class="text-svelte bg-embla-carousel absolute right-[9px] top-[8px] z-20 grid h-12 w-12 place-items-center rounded-full font-semibold"
            >
              {i + 1}
            </p>
            <a href={`/product/${product.node.handle}`}>
              <img
                class="z-10 h-full w-full rounded-[.25rem] object-contain"
                src={product.node.images.edges[0].node.originalSrc}
                alt=""
              />
            </a>
          </div>
        {/each}
      </div>
    </div>

    <!-- promise was fulfilled -->
    <div
      class="mt-[10px] overflow-hidden"
      use:embla={{ dragFree: true, align: 'start', containScroll: 'keepSnaps', store: thumbnails }}
    >
      <div class="grid auto-cols-[89px] grid-flow-col grid-rows-[70px] gap-x-[10px]">
        {#each featured as product, i (product.node.id)}
          <button
            class="group relative overflow-hidden rounded-[.25rem]"
            disabled={selected === i}
            on:click={onThumbnailSelect(i)}
          >
            <img
              class="h-full w-full object-contain"
              src={product.node.images.edges[0].node.originalSrc}
              alt=""
            />

            {#if selected === i}
              <div
                class="absolute left-0 top-0 h-full w-full bg-black opacity-60"
                transition:fade={{ duration: 250 }}
              />
            {/if}

            <p
              class="bg-embla-carousel text-svelte absolute right-1 top-1 grid h-8 w-8 place-items-center rounded-full"
            >
              {i + 1}
            </p>
          </button>
        {/each}
      </div>
    </div>
  </div>
{:catch error}
  <h2>There's a problem Houston{error.message}</h2>
{/await}
