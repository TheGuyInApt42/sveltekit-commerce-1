<script>
  import HeadTags from '$lib/components/head-tags/HeadTags.svelte';
  import { getProduct } from '$lib/functions/products.remote.js';

  import AddToCartButton from '$lib/components/cart/AddToCartButton.svelte';
  import { page } from '$app/state';

  const handle = $derived(page.params.handle);
  const productQuery = $derived(getProduct(handle));

  let selectedImageIndex = $state(0);

  // Extracts a platform code like (PS2), (XBX), (NSW) from the title, since
  // that's how your Alice POS → Shopify pipeline encodes platform per SKU.
  function extractPlatform(title) {
    const match = title?.match(/\(([^)]+)\)\s*$/);
    return match ? match[1] : null;
  }

  function stripPlatform(title) {
    return title?.replace(/\s*\([^)]+\)\s*$/, '') ?? title;
  }
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
    {@const platform = extractPlatform(product.title)}
    {@const displayTitle = stripPlatform(product.title)}

    <HeadTags
      metaData={{
        title: `PlayNTrade | ${product.title}`,
        description: `${product.title} - available at Camp Hill Play N Trade`,
        keywords: ['playntrade', product.title]
      }}
    />

    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span class="sep">/</span>
      <a href="/shop">Shop</a>
      {#if platform}
        <span class="sep">/</span>
        <a href={`/shop?type=${platform}`}>{platform}</a>
      {/if}
      <span class="sep">/</span>
      <span class="current">{displayTitle}</span>
    </nav>

    <div class="product-page">
      <div class="gallery">
        <div class="main-image">
          {#if images.length > 0}
            <img
              src={images[selectedImageIndex].url}
              alt={images[selectedImageIndex].altText ?? product.title}
            />
          {:else}
            <div class="image-placeholder">
              <img src="/images/logos/ptnlogo.png" alt="" class="placeholder-logo" />
              <span>Cover art coming soon</span>
            </div>
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
        <div class="badges">
          {#if platform}
            <span class="badge platform-badge">{platform}</span>
          {/if}
          <span class="badge condition-badge">Used · Tested</span>
        </div>

        <h1>{displayTitle}</h1>

        <p class="price">
          {#if variant}
            ${variant.price.amount} {variant.price.currencyCode}
          {/if}
        </p>

        <p class="stock-status" class:in-stock={inStock} class:out-of-stock={!inStock}>
          {inStock ? 'Only 1 left in stock' : 'Sold out'}
        </p>

        <div class="description">
          {#if product.descriptionHtml}
            {@html product.descriptionHtml}
          {:else}
            <p>
              Tested and in working condition. Every item at Camp Hill Play N Trade is real,
              in-store inventory — stop by or give us a call if you'd like more details on grading
              or condition before you buy.
            </p>
          {/if}
        </div>

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

  .breadcrumb {
    max-width: 1100px;
    margin: 0 auto;
    padding: 1.5rem 1rem 0;
    font-size: 0.85rem;
    color: #666;
  }
  .breadcrumb a {
    color: #666;
    text-decoration: none;
  }
  .breadcrumb a:hover {
    color: var(--playntrade-blue, #1e3a8a);
    text-decoration: underline;
  }
  .breadcrumb .sep {
    margin: 0 0.4rem;
    color: #ccc;
  }
  .breadcrumb .current {
    color: #333;
    font-weight: 600;
  }

  .product-page {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 1100px;
    margin: 0 auto;
    padding: 1.5rem 1rem 4rem;
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

  .image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    color: #999;
    font-size: 0.85rem;
    background: repeating-linear-gradient(45deg, #f5f5f5, #f5f5f5 10px, #efefef 10px, #efefef 20px);
  }
  .placeholder-logo {
    width: 80px;
    height: auto;
    opacity: 0.5;
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

  .badges {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
  .badge {
    display: inline-block;
    padding: 0.25rem 0.7rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }
  .platform-badge {
    background: var(--playntrade-blue, #1e3a8a);
    color: white;
  }
  .condition-badge {
    background: #f3f4f6;
    color: #374151;
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
    color: #444;
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
