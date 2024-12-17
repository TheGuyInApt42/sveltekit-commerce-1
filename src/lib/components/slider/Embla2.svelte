<script>
  import { onMount } from 'svelte';
  import emblaCarousel from 'embla-carousel';
  import AutoPlay from 'embla-carousel-autoplay';
  import AutoScroll from 'embla-carousel-auto-scroll';
  import { writable } from 'svelte/store';
  import { ArrowBigLeft, ArrowBigRight } from 'svelte-lucide';

  let emblaNode; // DOM node for Embla
  let emblaApi = null; // Embla instance
  const selected = writable(0);

  const images = [
    'http://camphillplayntrade.com/wp-content/uploads/2016/10/Battlefield-1-Main-Banner.jpg',
    'http://camphillplayntrade.com/wp-content/uploads/2016/10/gallery_1911_1454361543_poster.jpg',
    'http://camphillplayntrade.com/wp-content/uploads/2016/10/watch-dogs-2-banner-rivela-data-uscita-v2-263543-1280x720.jpg'
  ];

  // Initialize Embla with AutoPlay and AutoScroll
  onMount(() => {
    emblaApi = emblaCarousel(
      emblaNode,
      {
        loop: true // Infinite looping
      },
      [AutoPlay({ delay: 3000 }), AutoScroll({ speed: 2 })]
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
<div class="carousel" bind:this={emblaNode}>
  <div class="carousel__container">
    {#each images as src, index}
      <div class="carousel__slide">
        <img {src} alt="Slide {index + 1}" />
        <p
          class="absolute right-[8px] top-[8px] grid h-12 w-12 place-items-center rounded-full bg-black/50 text-white"
        >
          {index + 1}
        </p>
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
    border-radius: 0.25rem;
  }
  .carousel__container {
    display: flex;
    gap: 10px;
  }
  .carousel__slide {
    flex: 0 0 100%;
    position: relative;
    overflow: hidden;
  }
  .carousel__slide img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 0.25rem;
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
</style>
