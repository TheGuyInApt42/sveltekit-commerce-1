<script>
  import { getCart, removeCartLine } from '$lib/functions/cart.remote.js';
  import { cartUI } from '$lib/state/cart-ui.svelte.js';

  const cart = getCart();

  /* $effect(() => {
    if (!cartUI.open) return;

    function handleKeydown(e) {
      if (e.key === 'Escape') cartUI.open = false;
    }

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }); */
</script>

{#if cartUI.open}
  <button class="overlay" aria-label="Close cart" onclick={() => (cartUI.open = false)}></button>
  <aside class="drawer">
    <div class="drawer-header">
      <h2>Your Cart</h2>
      <button class="close-btn" onclick={() => (cartUI.open = false)}>✕</button>
    </div>

    {#await cart}
      <p class="status">Loading cart...</p>
    {:then data}
      {#if !data || data.lines.edges.length === 0}
        <p class="status">Your cart is empty.</p>
      {:else}
        <div class="lines">
          {#each data.lines.edges as { node } (node.id)}
            <div class="line">
              <img
                src={node.merchandise.product.featuredImage?.url ?? '/images/placeholder.png'}
                alt=""
              />
              <div class="line-info">
                <a href={`/products/${node.merchandise.product.handle}`}>
                  {node.merchandise.product.title}
                </a>
                <p class="line-price">
                  ${node.merchandise.price.amount}
                  {node.merchandise.price.currencyCode}
                </p>
                <button class="remove" onclick={() => removeCartLine(node.id)}>Remove</button>
              </div>
            </div>
          {/each}
        </div>

        <div class="drawer-footer">
          <div class="subtotal">
            <span>Subtotal</span>
            <span>${data.cost.subtotalAmount.amount}</span>
          </div>
          <a href={data.checkoutUrl} class="checkout-btn">Checkout</a>
        </div>
      {/if}
    {:catch}
      <p class="status">Couldn't load your cart.</p>
    {/await}
  </aside>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    border: none;
    z-index: 40;
    cursor: default;
  }
  .drawer {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: min(400px, 100vw);
    background: white;
    z-index: 50;
    display: flex;
    flex-direction: column;
    box-shadow: -4px 0 16px rgba(0, 0, 0, 0.15);
  }
  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
    border-bottom: 1px solid #eee;
  }
  .close-btn {
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
  }
  .status {
    padding: 2rem;
    text-align: center;
    color: #666;
  }
  .lines {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
  }
  .line {
    display: flex;
    gap: 0.75rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid #f0f0f0;
  }
  .line img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 0.25rem;
    background: #f5f5f5;
  }
  .line-info a {
    font-weight: 600;
    text-decoration: none;
    color: inherit;
    font-size: 0.9rem;
  }
  .line-price {
    margin: 0.25rem 0;
    font-weight: 600;
  }
  .remove {
    background: none;
    border: none;
    padding: 0;
    color: #b91c1c;
    font-size: 0.8rem;
    cursor: pointer;
    text-decoration: underline;
  }
  .drawer-footer {
    padding: 1.25rem;
    border-top: 1px solid #eee;
  }
  .subtotal {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  .checkout-btn {
    display: block;
    text-align: center;
    padding: 0.9rem;
    background: var(--playntrade-blue, #1e3a8a);
    color: white;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 700;
  }

  /* in CartDrawer.svelte */
  .overlay {
    z-index: 1100;
  }
  .drawer {
    z-index: 1101;
  }
</style>
