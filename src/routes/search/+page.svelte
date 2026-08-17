<script>
  import HeadTags from '$lib/components/head-tags/HeadTags.svelte';
  import { searchProducts } from '$lib/functions/products.remote.js';
  import { page } from '$app/state';

  const term = $derived(page.url.searchParams.get('q') ?? '');
  const resultsQuery = $derived(term ? searchProducts(term) : Promise.resolve([]));

  function extractPlatform(title) {
    const match = title?.match(/\(([^)]+)\)\s*$/);
    return match ? match[1] : null;
  }
  function stripPlatform(title) {
    return title?.replace(/\s*\([^)]+\)\s*$/, '') ?? title;
  }

  const metaData = $derived({
    title: `PlayNTrade | Search${term ? `: ${term}` : ''}`,
    description: `Search results for ${term} at Camp Hill Play N Trade.`
  });
</script>

<HeadTags {metaData} />

<section class="search-header">
  <h1>{term ? `Results for "${term}"` : 'Search'}</h1>
</section>

<section class="products">
  {#await resultsQuery}
    <p class="status">Searching...</p>
  {:then results}
    {#if !term}
      <p class="status">Enter a search term to find games and accessories.</p>
    {:else if results.length === 0}
      <p class="status">No results found for "{term}".</p>
    {:else}
      <div class="grid">
        {#each results as product (product.id)}
          {@const platform = extractPlatform(product.title)}
          <a href={`/products/${product.handle}`} class="product-card">
            <div class="card-image">
              {#if product.featuredImage?.url}
                <img src={product.featuredImage.url} alt={product.title} />
              {:else}
                <div class="card-placeholder">
                  <img src="/images/logos/ptnlogo.png" alt="" />
                </div>
              {/if}
              {#if platform}
                <span class="platform-tag">{platform}</span>
              {/if}
            </div>
            <h3>{stripPlatform(product.title)}</h3>
            <p>${product.variants.edges[0]?.node.price.amount}</p>
          </a>
        {/each}
      </div>
    {/if}
  {:catch}
    <p class="status">Something went wrong searching. Try again.</p>
  {/await}
</section>

<style>
  .search-header {
    text-align: center;
    padding: 2rem 1rem 1rem;
  }
  .status {
    text-align: center;
    padding: 3rem 1rem;
    color: #666;
  }
  .products {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 1rem 4rem;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  @media (min-width: 480px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 768px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: 1024px) {
    .grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  .product-card {
    display: block;
    text-decoration: none;
    color: inherit;
    border: 1px solid #e5e5e5;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  .card-image {
    position: relative;
  }
  .card-image img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
  .card-placeholder {
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: repeating-linear-gradient(45deg, #f5f5f5, #f5f5f5 10px, #efefef 10px, #efefef 20px);
  }
  .card-placeholder img {
    width: 35%;
    opacity: 0.4;
  }
  .platform-tag {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    background: var(--playntrade-blue, #1e3a8a);
    color: white;
    font-size: 0.65rem;
    font-weight: 700;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    text-transform: uppercase;
  }
  .product-card h3 {
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem 0.25rem;
    margin: 0;
  }
  .product-card p {
    padding: 0 0.75rem 0.75rem;
    margin: 0;
    font-weight: 600;
  }
</style>
