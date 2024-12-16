<!-- src/lib/components/Carousel.svelte -->
<script>
  import Glide from '@glidejs/glide';
  import { onMount } from 'svelte';

  export let options = {
    type: 'carousel',
    perView: 3,
    gap: 20,
    autoplay: 3000
  };

  export let slides = []; // Add this to track number of slides for bullets

  let glideInstance;
  let glideElement;

  onMount(() => {
    glideInstance = new Glide(glideElement, options);
    glideInstance.mount();

    return () => {
      if (glideInstance) {
        glideInstance.destroy();
      }
    };
  });
</script>

<div class="glide" bind:this={glideElement}>
  <div class="glide__track" data-glide-el="track">
    <ul class="glide__slides">
      <slot />
    </ul>
  </div>

  <div class="glide__arrows" data-glide-el="controls">
    <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
    <button class="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
  </div>

  <!-- Bullets are now handled directly in the carousel component -->
  <div class="glide__bullets" data-glide-el="controls[nav]">
    {#each slides as _, index}
      <button class="glide__bullet" data-glide-dir={`=${index}`} />
    {/each}
  </div>
</div>

<style>
  :global(.glide__arrow) {
    padding: 0.5rem 1rem;
    background: #333;
    color: white;
    border: none;
    cursor: pointer;
  }

  :global(.glide__bullets) {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  :global(.glide__bullet) {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ddd;
    border: none;
    cursor: pointer;
  }

  :global(.glide__bullet--active) {
    background: #333;
  }
</style>
