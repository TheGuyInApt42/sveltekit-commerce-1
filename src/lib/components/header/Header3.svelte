<script>
  import { Search, SquareMenu } from 'svelte-lucide';
  import SearchBar from '$lib/components/searchbar/SearchBar2.svelte';
  import { onMount } from 'svelte';

  let isMenuOpen = false; // State to toggle the menu
  let searchOpen = false;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };

  function toggleSearch() {
    searchOpen = !searchOpen;
    console.log('search');
  }

  function closeSearch() {
    searchOpen = false;
  }
</script>

<header class="header">
  <div class="header-container">
    <!-- Search Icon (Visible on Mobile, Right on Desktop) -->
    <!-- <button on:click={toggleSearch} class="search-link mobile-search md:hidden">
      <Search
        class="search-icon p-1.5 text-[1.5rem] text-gray-800 transition-colors duration-300 ease-in-out"
      />
    </button>
    {#if searchOpen}
      <SearchBar isOpen={searchOpen} onClose={closeSearch} />
    {/if} -->

    <!-- <a href="#" id="mobile-search-link" class="search-link mobile-search md:hidden">
      <Search
        class="search-icon p-1.5 text-[1.5rem] text-gray-800 transition-colors duration-300 ease-in-out"
      />
    </a> -->

    <!-- Logo -->
    <div class="logo">
      <a href="/">
        <img
          src="http://camphillplayntrade.com/wp-content/uploads/2015/01/ptnlogo.png"
          alt="Play N Trade Logo"
        />
      </a>
    </div>

    <!-- Hamburger Menu -->
    <button class="hamburger-menu md:hidden" on:click={toggleMenu} aria-expanded={isMenuOpen}>
      <SquareMenu class="menu-icon text-[2rem] text-gray-800" />
    </button>

    <!-- Navigation -->
    <nav class={`navigation ${isMenuOpen ? 'open' : ''}`}>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>

        <li><a href="/contact">Contact</a></li>
        <!-- Search Icon -->
        <!-- <li class="main-nav-search last-menu-item flex justify-center">
          <button
            on:click={toggleSearch}
            id="main-nav-search-link"
            class="search-link desktop-search"
          >
            <Search size="32" class=" text-gray-800 transition-colors duration-300 ease-in-out" />
          </button>
        </li> -->
      </ul>
    </nav>
  </div>
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
    font: 14px / 16px 'MuseoSlab500Regular', arial, helvetica, sans-serif;
    font-family: 'Antic Slab', Arial, Helvetica, sans-serif;
  }

  .navigation ul {
    display: flex;
    list-style: none;
    /* gap: 20px; */
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
    color: #007bff; /* Add a hover effect with an accent color */
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
      display: none; /* Hide navigation by default on smaller screens */
      position: absolute;
      top: 92px;
      left: 0;
      width: 100%;
      background: white;
      flex-direction: column;
      gap: 10px;
      padding: 10px 0;
      border-top: 1px solid #ccc;
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
      transform: translateY(-100%);
      opacity: 0;
    }

    .navigation.open {
      display: flex; /* Show navigation when menu is toggled */
      transform: translateY(0); /* Slide down effect */
      opacity: 1; /* Fade in effect */
    }

    .hamburger-menu {
      display: flex; /* Hamburger menu visible only on small screens */
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
  }
</style>
