<script>
  import { onMount } from 'svelte';

  let currentIndex = 0;

  onMount(() => {
    const carousel = document.getElementById('carousel');
    const slides = carousel.querySelectorAll('.carousel-item');

    // Ensure the first slide is visible
    slides[currentIndex].classList.add('active');

    // Function to show the next slide
    function showNextSlide() {
      slides[currentIndex].classList.remove('active'); // Remove active from current slide
      currentIndex = (currentIndex + 1) % slides.length; // Move to the next index
      console.log('currentIndex: ', currentIndex);
      slides[currentIndex].classList.add('active'); // Add active to the next slide
    }

    // Autoplay every 3 seconds
    setInterval(showNextSlide, 3000);
  });
</script>

<div class="carousel h-[80vh] w-full" id="carousel">
  <div id="slide1" class="active carousel-item relative w-full">
    <img
      src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
      class="w-full"
    />
  </div>
  <div id="slide2" class="carousel-item relative w-full">
    <img
      src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
      class="w-full"
    />
  </div>
  <div id="slide3" class="carousel-item relative w-full">
    <img
      src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
      class="w-full"
    />
  </div>
  <div id="slide4" class="carousel-item relative w-full">
    <img
      src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
      class="w-full"
    />
  </div>
</div>

<style>
  /* Position all slides on top of each other */
  :global(.carousel-item) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0; /* Start hidden */
    transition: opacity 0.6s ease; /* Smooth fade effect */
    z-index: 0;
  }

  /* Make the active slide visible */
  :global(.carousel-item.active) {
    opacity: 1; /* Fully visible */
    z-index: 1; /* Ensure it is on top */
  }

  :global(.carousel) {
    position: relative;
    overflow: hidden; /* Hide overflowing content */
    height: auto; /* Adjust as needed */
  }

  :global(.carousel img) {
    width: 100%;
    height: auto;
    object-fit: cover; /* Ensure images fill the container */
  }
</style>
