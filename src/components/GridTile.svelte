<script>
  /** @type {{title?: string, removeLabels?: boolean, imageSrc: any, price?: string, currencyCode?: string, href?: string, priority?: string}} */
  let {
    title = '',
    removeLabels = false,
    imageSrc,
    price = '',
    currencyCode = '',
    href = '',
    priority = 'lazy'
  } = $props();

  let hover = $state(false);
</script>

<div
  onmouseenter={() => {
    hover = true;
  }}
  onmouseleave={() => {
    hover = false;
  }}
  class="h-full w-full overflow-hidden"
>
  <a
    data-test="grid-tile"
    {href}
    data-sveltekit-prefetch
    class="relative flex h-full w-full items-center justify-center focus:border-2 focus:border-blue-500"
  >
    <img
      alt={title}
      class={`w-full flex-none transition duration-300 ease-in-out md:w-1/2 lg:w-full ${
        hover ? 'scale-110' : ''
      }`}
      fetchpriority={priority === 'eager' ? 'high' : 'low'}
      decoding="async"
      loading={priority}
      src={imageSrc}
    />
    {#if !removeLabels}
      <div class="roboto-text absolute left-0 top-0">
        <div class=" bg-black p-3  text-2xl font-medium text-white">
          {title}
        </div>
        <div class="w-fit bg-black p-3 text-sm text-accent-color">
          ${price}
          {currencyCode}
        </div>
      </div>
    {/if}
  </a>
</div>

<style>
  .roboto-text {
    font-family: 'Roboto Mono', monospace;
  }
</style>
