<script>
  import { addToCart } from '$lib/functions/cart.remote.js';
  import { cartUI } from '$lib/state/cart-ui.svelte.js';

  let { variantId, disabled = false } = $props();
  let loading = $state(false);

  async function handleClick() {
    loading = true;
    await addToCart({ variantId, quantity: 1 });
    cartUI.open = true;
    loading = false;
  }
</script>

<button class="add-btn" onclick={handleClick} disabled={disabled || loading}>
  {loading ? 'Adding...' : 'Add to Cart'}
</button>

<style>
  .add-btn {
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
    transition: opacity 0.15s ease;
  }
  .add-btn:hover:not(:disabled) {
    opacity: 0.9;
  }
  .add-btn:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
</style>
