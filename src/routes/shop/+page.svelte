<script>
  import HeadTags from '$lib/components/head-tags/HeadTags.svelte';
  import { getProductsByType } from '$lib/functions/products.remote.js';
  import { page } from '$app/state';

  const type = $derived(page.url.searchParams.get('type') ?? '');

  let products = $state([]);
  let endCursor = $state(null);
  let hasNextPage = $state(false);
  let loading = $state(true);
  let loadingMore = $state(false);

  function extractPlatform(title) {
    const match = title?.match(/\(([^)]+)\)\s*$/);
    return match ? match[1] : null;
  }
  function stripPlatform(title) {
    return title?.replace(/\s*\([^)]+\)\s*$/, '') ?? title;
  }

  async function loadInitial() {
    loading = true;
    const result = await getProductsByType({ type: type || undefined });
    products = result.products;
    hasNextPage = result.pageInfo.hasNextPage;
    endCursor = result.pageInfo.endCursor;
    loading = false;
  }

  async function loadMore() {
    loadingMore = true;
    const result = await getProductsByType({ type: type || undefined, cursor: endCursor });
    products = [...products, ...result.products];
    hasNextPage = result.pageInfo.hasNextPage;
    endCursor = result.pageInfo.endCursor;
    loadingMore = false;
  }

  $effect(() => {
    type; // re-run when platform filter changes
    loadInitial();
  });

  const metaData = $derived({
    title: type ? `PlayNTrade | ${type}` : 'PlayNTrade | Shop',
    description: `Shop our in-stock ${type || 'video game'} inventory at Camp Hill Play N Trade.`,
    keywords: ['playntrade', 'video games', type].filter(Boolean)
  });
</script>

<HeadTags {metaData} />

<section class="shop-header">
  <h1>{type ? `Shop ${type}` : 'Shop All'}</h1>
</section>

<section class="products">
  {#if loading}
    <p class="status">Loading...</p>
  {:else if products.length === 0}
    <p class="status">No products found{type ? ` for ${type}` : ''}.</p>
  {:else}
    <div class="grid">
      {#each products as product (product.id)}
        {@const platform = extractPlatform(product.title)}
        <a href={`/products/${product.handle}`} class="product-card">
          <div class="card-image">
            {#if product.featuredImage?.url}
              <img
                src={product.featuredImage.url}
                alt={product.featuredImage?.altText ?? product.title}
              />
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

    {#if hasNextPage}
      <div class="load-more">
        <button onclick={loadMore} disabled={loadingMore}>
          {loadingMore ? 'Loading...' : 'Load More'}
        </button>
      </div>
    {/if}
  {/if}
</section>

<style>
  .shop-header {
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
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  .product-card {
    display: block;
    text-decoration: none;
    color: inherit;
    border: 1px solid #e5e5e5;
    border-radius: 0.5rem;
    overflow: hidden;
    transition: box-shadow 0.15s ease;
  }
  .product-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  .load-more {
    text-align: center;
    margin-top: 2.5rem;
  }
  .load-more button {
    padding: 0.75rem 2rem;
    background: var(--playntrade-blue, #1e3a8a);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 700;
    cursor: pointer;
  }
  .load-more button:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
</style>
