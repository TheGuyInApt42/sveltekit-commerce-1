<script>
  const categories = [
    {
      title: 'All',
      link: '/search'
    },

    {
      title: 'Featured',
      link: '/search/featured'
    },
    {
      title: 'Deals',
      link: 'deals'
    },
    {
      title: 'New Releases',
      link: 'search/new'
    },
    {
      title: 'Xbox',
      link: 'search/xbox'
    },
    {
      title: 'PlayStation',
      link: 'search/playstation'
    },
    {
      title: 'Switch',
      link: 'search/switch'
    }
  ]
</script>


<div class="flex">
  <nav class="col-span-2 hidden w-1/6 flex-none py-8 pl-6 lg:block">
    <h1 class="text-lg font-semibold">Categories</h1>
    <ul>
      {#each categories as category}
        <li class="mt-2 text-sm text-gray-300">
        <a
          data-sveltekit-prefetch
          data-testid="category-link"
          aria-selected="true"
          class="whitespace-nowrap hover:underline focus:underline text-black hover:decoration-accent-color"
          href={category.link}>{category.title}</a
        >
      </li>
      {/each}
     
    </ul>
  </nav>
  <div class="min-h-screen">
    <slot />
  </div>
</div>
