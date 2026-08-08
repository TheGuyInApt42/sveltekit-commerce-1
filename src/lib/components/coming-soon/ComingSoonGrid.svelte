<script>
  /** @type {{title?: string, removeLabels?: boolean, imageSrc: any, href?: string, priority?: string}} */
  let {
    title = '',
    removeLabels = false,
    imageSrc,
    href = '#',
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
    class="focus:border-blue-500 focus:border-2 relative flex h-full w-full items-center justify-center"
  >
    <img
      alt={title}
      class={`w-full md:w-1/2 lg:w-full flex-none transition duration-300 ease-in-out ${
        hover ? 'scale-110' : ''
      }`}
      fetchpriority={priority === 'eager' ? 'high' : 'low'}
      decoding="async"
      loading={priority}
      src={imageSrc}
    />
    {#if !removeLabels}
      <div class="absolute top-0 left-0">
        <div class="bg-black p-3 text-2xl  font-medium">
          {title}
        </div>

      </div>
    {/if}
  </a>
</div>
