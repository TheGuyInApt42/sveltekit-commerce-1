<script>
  import { onMount } from 'svelte';
  import emblaCarousel from 'embla-carousel';
  import AutoPlay from 'embla-carousel-autoplay';
  import { writable } from 'svelte/store';
  import { ArrowBigLeft, ArrowBigRight } from 'svelte-lucide';

  export let fullHeight = false; // If true, uses calc(100vh - 90px) to account for header
  export let headerOffset = 90; // Header height in pixels (default 90px)
  export let images = [
    'https://images.igdb.com/igdb/image/upload/t_720p/ar3p7p.webp',
    'https://images.igdb.com/igdb/image/upload/t_720p/ar3lza.webp',
    'https://images.igdb.com/igdb/image/upload/t_720p/ar4u71.webp',
    'https://images.igdb.com/igdb/image/upload/t_720p/ar47zf.webp', // TODO: Replace with current game image 4
    'https://images.igdb.com/igdb/image/upload/t_720p/ar3vs2.webp' // TODO: Replace with current game image 5
  ];

  export let autoPlayDelay = 5000; // Delay between slides in milliseconds

  let emblaNode; // DOM node for Embla
  let emblaApi = null; // Embla instance
  const selected = writable(0);

  $: computedHeight = fullHeight ? `calc(100vh - ${headerOffset}px)` : '500px';
  $: carouselClass = fullHeight ? 'carousel full-height' : 'carousel';

  // Initialize Embla with AutoPlay
  onMount(() => {
    emblaApi = emblaCarousel(
      emblaNode,
      {
        loop: true, // Infinite looping
        duration: 20 // Smooth transition duration
      },
      [AutoPlay({ delay: autoPlayDelay, stopOnInteraction: false })]
    );

    // Update selected slide on change
    emblaApi.on('select', () => {
      selected.set(emblaApi.selectedScrollSnap());
    });
  });

  // Navigation controls
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  const scrollTo = (index) => emblaApi && emblaApi.scrollTo(index);
</script>

<!-- Embla Carousel -->
<div class={carouselClass} style="height: {computedHeight}" bind:this={emblaNode}>
  <div class="carousel__container">
    {#each images as image, index}
      <div class="carousel__slide">
        <img src={image.src} alt={image.name} />
        <div class="carousel__overlay">
          <h2 class="game-title">{image.name}</h2>
        </div>
      </div>
    {/each}
  </div>

  <!-- Navigation Buttons -->
  <button class="carousel__nav left" on:click={scrollPrev}>
    <ArrowBigLeft size="24" />
  </button>
  <button class="carousel__nav right" on:click={scrollNext}>
    <ArrowBigRight size="24" />
  </button>

  <!-- Pagination -->
  <div class="pagination">
    {#each images as _, index}
      <button class:active={$selected === index} on:click={() => scrollTo(index)} />
    {/each}
  </div>
</div>

<style>
  .carousel {
    overflow: hidden;
    position: relative;
    width: 100%; /* Ensure it spans the full width */
    /* Remove border-radius if you want it to look like a true hero banner */
    border-radius: 0;
  }
  .carousel__container {
    display: flex;
    height: 100%;
  }
  .carousel__slide {
    flex: 0 0 100%;
    position: relative;
    height: 100%;
  }

  .carousel__overlay {
    position: absolute;
    inset: 0; /* Cover the whole slide */
    display: flex;
    flex-direction: column;
    justify-content: flex-end; /* Push text to the bottom */
    padding: 2rem;
    /* This gradient makes white text readable on ANY image */
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.2) 40%,
      transparent 100%
    );
    pointer-events: none; /* Let clicks pass through to the slider */
  }

  .game-title {
    color: white; /* Force white text */
    font-size: 3rem;
    font-weight: 900;
    text-transform: uppercase;
    margin: 0;
    line-height: 1;
    /* Optional: subtle glow effect common in gaming UI */
    text-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  }
  .carousel__slide img {
    width: 100%;
    height: 100%;
    /* 'cover' is correct for Hero, but 'screenshots' will make it look right */
    object-fit: cover;
    /* High-end games often put focal points at the top, so we shift the focus */
    object-position: center 20%;
    display: block;
  }
  .carousel__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 50%;
    padding: 8px;
  }
  .carousel__nav.left {
    left: 1rem;
  }
  .carousel__nav.right {
    right: 1rem;
  }
  .pagination {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
  }
  .pagination button {
    width: 12px;
    height: 12px;
    background: black;
    border-radius: 50%;
    border: none;
    cursor: pointer;
  }
  .pagination button.active {
    background: linear-gradient(45deg, #ff9500, #ffcc00);
  }

  /* Mobile responsive styles - override height for full-height carousel */
  @media (max-width: 768px) {
    .carousel.full-height {
      height: 65vh !important; /* Slightly shorter for mobile */
    }
    .carousel__slide img {
      object-fit: cover; /* Keep it full screen */
      object-position: center;
    }

    .game-title {
      font-size: 1.5rem;
      text-align: center;
    }
    .carousel__overlay {
      padding: 1.5rem;
      justify-content: center; /* Center text on mobile for better visibility */
      align-items: center;
    }
  }

  /* Small mobile devices */
  @media (max-width: 480px) {
    .carousel.full-height {
      height: 50vh !important;
      min-height: 300px;
    }
    .carousel__slide img {
      object-fit: contain;
      object-position: center;
      background-color: #000;
    }
    .carousel__nav {
      padding: 6px;
    }
    .carousel__nav.left {
      left: 0.5rem;
    }
    .carousel__nav.right {
      right: 0.5rem;
    }
  }
</style>
