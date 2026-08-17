<script>
  import { Search, SquareMenu } from 'svelte-lucide';
  import Icon from '$lib/components/icons/Icons.svelte';
  import { cartUI } from '$lib/state/cart-ui.svelte.js';
  import { goto } from '$app/navigation';

  let { cart } = $props();

  let isMenuOpen = $state(false);
  let searchOpen = $state(false);
  let searchTerm = $state('');

  const toggleMenu = () => (isMenuOpen = !isMenuOpen);
  const closeMenu = () => (isMenuOpen = false);

  function toggleSearch() {
    searchOpen = !searchOpen;
  }

  function closeSearch() {
    searchOpen = false;
    searchTerm = '';
  }

  function submitSearch(e) {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    goto(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    closeSearch();
  }
</script>

<header class="header">
  <div class="header-container">
    <div class="logo">
      <a href="/">
        <img src="/images/logos/ptnlogo.png" alt="Play N Trade Logo" />
      </a>
    </div>

    <button class="hamburger-menu md:hidden" onclick={toggleMenu} aria-expanded={isMenuOpen}>
      <SquareMenu class="menu-icon text-[2rem] text-gray-800" />
    </button>

    <div class="right-side">
      <button class="search-toggle" onclick={toggleSearch} aria-label="Search">
        <Icon type="search" strokeColor="#333333" width="20px" height="20px" />
      </button>

      <nav class={`navigation ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="/" onclick={closeMenu}>Home</a></li>
          <li><a href="/about" onclick={closeMenu}>About</a></li>
          <li><a href="/contact" onclick={closeMenu}>Contact</a></li>
          <li class="cart-item">
            <button class="cart-toggle" onclick={() => (cartUI.open = true)} aria-label="Open cart">
              <Icon type="cart" strokeColor="#333333" />
              {#await cart then data}
                {#if data && data.totalQuantity > 0}
                  <span class="cart-badge">{data.totalQuantity}</span>
                {/if}
              {/await}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  {#if searchOpen}
    <div class="search-bar">
      <form onsubmit={submitSearch}>
        <input
          type="text"
          placeholder="Search games, systems, accessories..."
          bind:value={searchTerm}
          autofocus
        />
        <button type="submit">Search</button>
      </form>
      <button class="search-close" onclick={closeSearch} aria-label="Close search">
        <Icon type="close" strokeColor="#333333" width="20px" height="20px" />
      </button>
    </div>
  {/if}
</header>

<style>
  /* General Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .header {
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    padding: 0 30px;
    position: fixed;
    width: 100%;
    height: 92px;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
  }

  .logo {
    margin: 31px 0;
    float: left;
    overflow: hidden;
  }

  .logo a {
    display: block;
  }

  .logo img {
    height: 50px;
    width: auto;
  }
  .navigation {
    float: right;
    font:
      14px / 16px 'MuseoSlab500Regular',
      arial,
      helvetica,
      sans-serif;
    font-family: 'Antic Slab', Arial, Helvetica, sans-serif;
  }

  .navigation ul {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .navigation li {
    padding-right: 45px;
    position: relative;
    float: left;
    margin: 0;
  }

  .navigation ul li a {
    height: 83px;
    line-height: 83px;
    color: #333333;
    border-color: #1a80b6;
  }

  .navigation ul li > a {
    border-top: 3px solid transparent;
    display: block;
    border-top-width: 3px;
  }

  .navigation ul li a:hover {
    color: #007bff;
  }
  .last-menu-item {
    padding-right: 0 !important;
  }

  .navigation ul li > a.search-link {
    display: flex;
    align-items: center;
  }

  /* Responsive Design */
  @media screen and (max-width: 768px) {
    .navigation {
      display: none;
      position: absolute;
      top: 92px;
      left: 0;
      width: 100%;
      background: white;
      flex-direction: column;
      gap: 10px;
      padding: 10px 0;
      border-top: 1px solid #ccc;
      transition:
        transform 0.3s ease-in-out,
        opacity 0.3s ease-in-out;
      transform: translateY(-100%);
      opacity: 0;
    }

    .navigation.open {
      display: flex;
      transform: translateY(0);
      opacity: 1;
    }

    .hamburger-menu {
      display: flex;
    }

    .logo img {
      height: auto;
      width: auto;
    }

    .navigation ul {
      flex-direction: column;
    }

    .navigation ul li {
      padding: 10px 30px;
    }

    .cart-item {
      padding-right: 30px !important;
    }
  }

  .cart-item {
    padding-right: 0 !important;
    display: flex;
    align-items: center;
    height: 83px;
  }

  .cart-toggle {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #333333;
    padding: 0;
  }

  .cart-toggle:hover {
    color: #007bff;
  }

  .cart-toggle:hover :global(svg) {
    stroke: #007bff;
  }

  .cart-badge {
    position: absolute;
    top: -6px;
    right: -8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.1rem;
    height: 1.1rem;
    padding: 0 0.3rem;
    border-radius: 999px;
    background: var(--playntrade-blue, #1e3a8a);
    color: white;
    font-size: 0.65rem;
    font-weight: 700;
    line-height: 1;
  }

  .right-side {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .search-toggle {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .search-toggle:hover :global(svg) {
    stroke: #007bff;
  }
  .search-bar {
    border-top: 1px solid #eee;
    padding: 0.75rem 30px;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .search-bar form {
    flex: 1;
    display: flex;
    gap: 0.5rem;
    max-width: 500px;
    margin: 0 auto;
  }
  .search-bar input {
    flex: 1;
    padding: 0.6rem 1rem;
    border: 1px solid #ddd;
    border-radius: 0.375rem;
    font-size: 0.95rem;
  }
  .search-bar input:focus {
    outline: none;
    border-color: var(--playntrade-blue, #1e3a8a);
  }
  .search-bar button[type='submit'] {
    padding: 0.6rem 1.25rem;
    background: var(--playntrade-blue, #1e3a8a);
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    cursor: pointer;
  }
  .search-close {
    background: none;
    border: none;
    cursor: pointer;
  }
</style>
