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
