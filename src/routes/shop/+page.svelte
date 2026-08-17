<script>
  import HeadTags from '$lib/components/head-tags/HeadTags.svelte';
  import { getProductsByType } from '$lib/functions/products.remote.js';
  import { page } from '$app/state';

  const type = $derived(page.url.searchParams.get('type') ?? '');
  const productsQuery = $derived(getProductsByType(type || undefined));

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
  {#await productsQuery}
    <p>Loading...</p>
  {:then products}
    {#if products.length === 0}
      <p>No products found{type ? ` for ${type}` : ''}.</p>
    {:else}
      <div class="grid">
        {#each products as product (product.id)}
          <a href={`/products/${product.handle}`} class="product-card">
            <img
              src={product.featuredImage?.url ?? '/images/placeholder.png'}
              alt={product.featuredImage?.altText ?? product.title}
            />
            <h3>{product.title}</h3>
            <p>${product.variants.edges[0]?.node.price.amount}</p>
          </a>
        {/each}
      </div>
    {/if}
  {:catch error}
    <p>Something went wrong loading products.</p>
  {/await}
</section>

<style>
  .shop-header {
    text-align: center;
    padding: 2rem 1rem 1rem;
  }
  .products {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 1rem 4rem;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
  }
  .product-card {
    display: block;
    text-decoration: none;
    color: inherit;
    border: 1px solid #e5e5e5;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  .product-card img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
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
