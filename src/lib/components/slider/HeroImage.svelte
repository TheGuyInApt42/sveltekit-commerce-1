<script>
  /** @type {{src?: string, alt?: string, href?: any, height?: string, fullHeight?: boolean, headerOffset?: number}} */
  let {
    src = '',
    alt = 'Featured image',
    href = null,
    height = '500px',
    fullHeight = false,
    headerOffset = 90
  } = $props();

  let computedHeight = $derived(fullHeight ? `calc(100vh - ${headerOffset}px)` : height);
  let heroClass = $derived(fullHeight ? 'hero-image full-height' : 'hero-image');
</script>

{#if href}
  <a {href} class="hero-image-link">
    <div class={heroClass} style="height: {computedHeight}">
      <img {src} {alt} />
    </div>
  </a>
{:else}
  <div class={heroClass} style="height: {computedHeight}">
    <img {src} {alt} />
  </div>
{/if}

<style>
  .hero-image {
    position: relative;
    overflow: hidden;
    border-radius: 0.25rem;
    width: 100%;
  }

  .hero-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.25rem;
    display: block;
  }

  .hero-image-link {
    display: block;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }

  .hero-image-link:hover {
    opacity: 0.95;
  }

  /* Mobile responsive styles - override height for full-height images */
  @media (max-width: 768px) {
    .hero-image.full-height {
      height: 60vh !important;
      min-height: 400px;
    }

    .hero-image.full-height img {
      object-fit: contain;
      object-position: center;
    }
  }

  /* Small mobile devices */
  @media (max-width: 480px) {
    .hero-image.full-height {
      height: 50vh !important;
      min-height: 300px;
    }
  }
</style>
