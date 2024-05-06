<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Icons from '../icons/Icons.svelte';

  let value = $page.url.searchParams.get('q');

  async function submit(e) {
    let query = new URLSearchParams();
    if (value) {
      query.set('q', value);
    }
    await goto(`/search${query ? `?${query}` : ''}`, { keepFocus: true });
  }
</script>

<form on:submit|preventDefault={submit} class="relative flex w-full items-center">
  <div class="absolute top-0 right-0 mr-2">
    <Icons strokeColor="#fff" type="search" />
  </div>
  <input
    id="searchInput"
    type="text"
    bind:value
    placeholder="Search for products..."
    autocomplete="off"
    class="w-full border bg-transparent p-2"
  />
</form>

<style>
  form {
    margin: 0px;
    padding: 0px;
    display: inline;
  }

  input{
    border-color: var(--playntrade-dark-blue);
    color: var(--playntrade-turquoise);
  }
  input::placeholder {
    color: var(--playntrade-turquoise);
  }
</style>
