<script>
  import { page } from '$app/stores';
  import Icons from '../icons/Icons.svelte';
	import { cartQuantity } from '../../../store';
	import SearchBar from '../searchbar/SearchBar.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  const logo = "http://camphillplayntrade.com/wp-content/uploads/2015/01/ptnlogo.png";

  	$: currentRoute = $page.url.pathname;

	let showMenu = false;

  let tabs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];
  function openCart() {
    console.log('open');
    showMenu = false;
    dispatch('openCart', true);
  }
</script>

<nav class="flex items-center border-b  p-4 lg:px-6  drop-shadow-lg bg-black h-[90px]">
  <div class="flex w-1/3 items-center">
    <div class="mr-4" class:active={currentRoute === '/'}>
      <a href="/" data-sveltekit-prefetch class="">
        <picture>
          <source srcset={logo} type="image/png" />
          <img
            alt="PNT Logo"
            
            decoding="async"
            
            loading="eager"
            src={logo}
         
          />
        </picture>
      </a>
    </div>
    <div class="hidden lg:flex links-wrapper">
      {#each tabs as tab, i (tab.name)}
        <div class:active={currentRoute === tab.path}>
          <a
            data-sveltekit-prefetch
            href={tab.path}
            class={`hover:opacity-100 px-2 py-1 nav-link rounded-lg ${
              currentRoute === tab.path ? 'opacity-100' : 'opacity-75'
            }`}>{tab.name}</a
          >
        </div>
      {/each}
    </div>
  </div>
  <div class="hidden w-1/3 lg:block">
    <SearchBar />
  </div>
  <div class="ml-auto flex items-center">
    <button on:click={openCart} class="relative my-2 mx-4">
      <Icons strokeColor="#fff" type="cart" />
      <div
        data-test="cart-quantity"
        class="absolute bottom-0 left-0 -ml-3 -mb-3 flex h-5 w-5 items-center justify-center rounded-full border border-black bg-white text-xs text-black"
      >
        {$cartQuantity}
      </div>
    </button>
    <button
      on:click={() => {
        showMenu = true;
      }}
      aria-label="Open menu"
      class="lg:hidden"
    >
      <Icons type="menu" />
    </button>
  </div>
  {#if showMenu}
    <div
      on:click|self={() => {
        showMenu = false;
      }}
      class="absolute inset-0 z-50 flex max-h-screen w-full justify-end overflow-hidden bg-black/50 lg:hidden"
    >
      <div class="z-30 w-full bg-black p-6 md:w-1/2 lg:w-1/3">
        <div class="flex w-full items-center justify-between">
          <button
            aria-label="Close menu"
            on:click={() => {
              showMenu = false;
            }}
          >
            <Icons strokeColor="#fff" type="close" />
          </button>
          <button on:click={openCart} class="relative mr-4">
            <Icons strokeColor="#fff" type="cart" />
            <div
              class="absolute bottom-0 left-0 -ml-3 -mb-3 flex h-5 w-5 items-center justify-center rounded-full border border-black bg-white text-xs text-black"
            >
              {$cartQuantity}
            </div>
          </button>
        </div>
        <div class="mt-6 flex w-full flex-col">
          {#each tabs as tab, i (tab.name)}
            <div
              class:active={currentRoute === tab.path}
              on:click={() => {
                showMenu = false;
              }}
            >
              <a
                data-sveltekit-prefetch
                href={tab.path}
                class={`hover:opacity-100 px-2 py-1 text-white font-bold text-xl rounded-lg ${
                  currentRoute === tab.path ? 'opacity-100' : 'opacity-75'
                }`}>{tab.name}</a
              >
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</nav>


<style>
    .nav-link{
        display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--playntrade-dark-blue);
		font-weight: 700;
	
		text-transform: uppercase;
		letter-spacing: 10%;
		text-decoration: none;
		transition: color 0.2s linear;
    }

    a:hover {
		color: var(--playntrade-turquoise);
		
	}

    @media screen and (min-width: 768px){
	.links-wrapper div {
		position: relative;
		height: 100%;
	}
	}
	.links-wrapper div.active::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: -25%;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--playntrade-turquoise);
	}
</style>
