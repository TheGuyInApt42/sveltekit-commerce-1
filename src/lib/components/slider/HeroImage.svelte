<script>
  export let src = '';
  export let alt = 'Featured image';
  export let href = null; // Optional link for clickable ads
  export let height = '500px'; // Customizable height
  export let fullHeight = false; // If true, uses calc(100vh - 90px) to account for header
  export let headerOffset = 90; // Header height in pixels (default 90px)

  $: computedHeight = fullHeight ? `calc(100vh - ${headerOffset}px)` : height;
  $: heroClass = fullHeight ? 'hero-image full-height' : 'hero-image';
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
