<script>
  export let isOpen = false;
  export let onClose = () => {}; // Optional callback to handle close

  import { Search, CircleX } from 'svelte-lucide';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let value = $page.url.searchParams.get('q');

  async function submit(e) {
    let query = new URLSearchParams();
    if (value) {
      query.set('q', value);
    }

    await goto(`/search${query ? `?${query}` : ''}`, { keepFocus: true });
  }
</script>

<div class="search-container relative" class:open={isOpen}>
  <form on:submit|preventDefault={submit} class="grid">
    <input
      class="search-bar"
      type="text"
      bind:value
      placeholder="Search store"
      aria-label="Search Store"
    />
    <button type="submit">
      <Search color="#9dddf9" />
    </button>
    <button on:click={onClose}>
      <CircleX color="#9dddf9" />
    </button>
  </form>
</div>

<style>
  .search-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--primary2);
    overflow: hidden;
    z-index: 2;
  }

  form {
    grid-template-columns: 90% 1fr 1fr;
  }
  .search-bar {
    width: 100%;
    padding: 10px;
    transition: height 0.3s ease-in-out;
    height: 0;
    background-color: var(--secondary3);
    color: #000;
  }

  input::placeholder {
    color: #000;
  }

  .search-container.open .search-bar {
    height: 70px; /* Adjust the height as needed */
  }

  @media (max-width: 768px) {
    form {
      grid-template-columns: 80% 1fr 1fr;
    }
  }
</style>
