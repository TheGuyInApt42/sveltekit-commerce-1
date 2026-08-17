<script>
  import HeadTags from '$lib/components/head-tags/HeadTags.svelte';
  import { getProduct } from '$lib/functions/products.remote.js';

  import AddToCartButton from '$lib/components/cart/AddToCartButton.svelte';
  import { page } from '$app/state';

  const handle = $derived(page.params.handle);
  const productQuery = $derived(getProduct(handle));

  let selectedImageIndex = $state(0);
</script>

{#await productQuery}
  <div class="loading">Loading...</div>
{:then product}
  {#if !product}
    <div class="not-found">
      <h1>Product not found</h1>
      <a href="/shop">Back to shop</a>
    </div>
  {:else}
    {@const images = product.images.edges.map((e) => e.node)}
    {@const variant = product.variants.edges[0]?.node}
    {@const inStock = variant?.availableForSale}

    <HeadTags
      metaData={{
        title: `PlayNTrade | ${product.title}`,
        description: `${product.title} - available at Camp Hill Play N Trade`,
        keywords: ['playntrade', product.title]
      }}
    />

    <div class="product-page">
      <div class="gallery">
        <div class="main-image">
          {#if images.length > 0}
            <img
              src={images[selectedImageIndex].url}
              alt={images[selectedImageIndex].altText ?? product.title}
            />
          {:else}
            <img src="/images/placeholder.png" alt={product.title} />
          {/if}
        </div>

        {#if images.length > 1}
          <div class="thumbnails">
            {#each images as image, i}
              <button
                class="thumb"
                class:active={i === selectedImageIndex}
                onclick={() => (selectedImageIndex = i)}
              >
                <img src={image.url} alt={image.altText ?? ''} />
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <div class="details">
        <h1>{product.title}</h1>

        <p class="price">
          {#if variant}
            ${variant.price.amount} {variant.price.currencyCode}
          {/if}
        </p>

        <p class="stock-status" class:in-stock={inStock} class:out-of-stock={!inStock}>
          {inStock ? 'In stock' : 'Sold out'}
        </p>

        {#if product.descriptionHtml}
          <div class="description">
            {@html product.descriptionHtml}
          </div>
        {/if}

        {#if inStock && variant}
          <AddToCartButton variantId={variant.id} />
        {:else}
          <button class="buy-button" disabled>Sold Out</button>
        {/if}

        <a href="/shop" class="back-link">← Back to shop</a>
      </div>
    </div>
  {/if}
{:catch error}
  <div class="error">
    <p>Something went wrong loading this product.</p>
  </div>
{/await}

<style>
  .loading,
  .not-found,
  .error {
    text-align: center;
    padding: 4rem 1rem;
  }

  .product-page {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1rem 4rem;
  }

  @media (min-width: 768px) {
    .product-page {
      grid-template-columns: 1fr 1fr;
    }
  }

  .main-image {
    aspect-ratio: 1;
    border-radius: 0.5rem;
    overflow: hidden;
    background: #f5f5f5;
  }
  .main-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .thumbnails {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
  .thumb {
    width: 60px;
    height: 60px;
    padding: 0;
    border: 2px solid transparent;
    border-radius: 0.25rem;
    overflow: hidden;
    cursor: pointer;
    background: none;
  }
  .thumb.active {
    border-color: var(--playntrade-blue, #1e3a8a);
  }
  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .details h1 {
    font-size: 1.75rem;
    margin: 0 0 0.5rem;
  }

  .price {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
  }

  .stock-status {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
  .stock-status.in-stock {
    background: #dcfce7;
    color: #166534;
  }
  .stock-status.out-of-stock {
    background: #fee2e2;
    color: #991b1b;
  }

  .description {
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .buy-button {
    display: block;
    width: 100%;
    padding: 0.9rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: white;
    background: var(--playntrade-blue, #1e3a8a);
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  .buy-button:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }

  .back-link {
    display: inline-block;
    margin-top: 1.5rem;
    color: var(--playntrade-blue, #1e3a8a);
    text-decoration: none;
  }
</style>
