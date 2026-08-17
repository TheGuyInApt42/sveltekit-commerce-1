<script>
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import Autoplay from 'embla-carousel-autoplay';

  let { products = [] } = $props();

  const options = { loop: true };
  const plugins = [Autoplay({ delay: 5000, stopOnInteraction: false })];
</script>

<div class="hero-carousel" use:emblaCarouselSvelte={{ options, plugins }}>
  <div class="embla__container">
    {#each products as product (product.id)}
      <div class="embla__slide">
        <a href={`/products/${product.handle}`} class="slide-link">
          <img
            src={product.featuredImage?.url}
            alt={product.featuredImage?.altText ?? product.title}
            class="slide-image"
          />
          <div class="slide-overlay">
            <h2>{product.title}</h2>
            <p>${product.variants.edges[0]?.node.price.amount}</p>
            <span class="cta">Shop Now →</span>
          </div>
        </a>
      </div>
    {/each}
  </div>
</div>

<style>
  .hero-carousel {
    overflow: hidden;
    width: 100%;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    position: relative;
    flex: 0 0 100%;
    min-width: 0;
    aspect-ratio: 16 / 7;
  }
  .slide-link {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .slide-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .slide-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent 60%);
    color: white;
  }
  .slide-overlay h2 {
    font-size: 2rem;
    margin: 0 0 0.25rem;
  }
  .cta {
    margin-top: 0.5rem;
    font-weight: 600;
    text-decoration: underline;
  }
</style>
