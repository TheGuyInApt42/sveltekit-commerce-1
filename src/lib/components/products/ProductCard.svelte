<script>
  export let img = '';

  export let type = '';
  export let title = '';
  export let href = '';
  export let videoSrc = '';
  export let price = '';
  export let isThumbnail = false;
  export let removeLabels = true;
  export let priority = 'lazy';
  export let reviewBadge = false;
  export let product = {};
  let hover = false;
</script>

<a
  {href}
  data-sveltekit-prefetch
  class="product-card"
  on:mouseenter={() => {
    hover = true;
  }}
  on:mouseleave={() => {
    hover = false;
  }}
>
  {#if videoSrc}
    <video src={videoSrc} autoplay loop class:isThumbnail={'thumbnail'} />
  {:else}
    <img
      src={img}
      alt={title}
      class={`product-image h-full w-full flex-none transition duration-300 ease-in-out md:w-1/2 lg:w-full ${
        hover ? 'scale-110' : ''
      } ${isThumbnail ? 'thumbnail' : ''}`}
      fetchpriority={priority === 'eager' ? 'high' : 'low'}
      decoding="async"
      loading={priority}
      data-hero-key="product-1"
    />
  {/if}
  {#if !removeLabels}
    <div class="product-text">
      <div class="product-type">{type}</div>
      <div class="product-title">{title}</div>
      <div class="product-price">{price}</div>
    </div>
  {/if}
</a>

<style>
  .product-card {
    display: block;
    position: relative;
    text-decoration: none;
    transition: transform 0.2s ease-in-out;
  }

  .product-card:hover {
    transform: translateY(-5px);
  }

  .product-image {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 2rem;
    border: 2px solid var(--primary);
  }

  .product-text {
    text-align: center;
    padding: 1rem 0.5rem;
  }

  .product-type {
    color: var(--primary);
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 0.25rem;
  }

  .product-title {
    color: var(--primary);
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  .product-price {
    color: var(--secondary2);
    font-size: 1.5rem;
    font-weight: 700;
  }

  .thumbnail {
    width: 150px;
    height: 150px;
  }

  /* If you need to adjust the spacing between cards in a grid */
  @media (min-width: 768px) {
    .product-card {
      margin-bottom: 2rem;
    }
  }
</style>
