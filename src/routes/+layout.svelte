<script>
  import { onMount } from 'svelte';
  import Header3 from '$lib/components/header/Header3.svelte';
  import CartDrawer from '$lib/components/cart/CartDrawer.svelte';
  import Headroom from '$lib/components/headroom/Headroom.svelte';
  import FooterSocial from '$lib/components/footer-social/FooterSocial.svelte';
  import { getCart } from '$lib/functions/cart.remote.js';
  import { page } from '$app/stores';
  import '../app.postcss';

  let { children } = $props();
  const cart = getCart();

  let currentPath = $derived($page?.url?.pathname);

  $effect(() => {
    if (typeof window !== 'undefined' && window.gtag && currentPath) {
      setTimeout(() => {
        window.gtag('event', 'page_view', {
          page_path: currentPath,
          page_title: document.title,
          page_location: window.location.href
        });
      }, 100);
    }
  });

  const today = new Date().getDay();

  let address = `<p class="font-display playntrade-dark-blue">125 Gateway Dr</p>
                    <p class="font-display playntrade-dark-blue">Mechanicsburg, PA 17050</p>            
                    <a class="font-display playntrade-turquoise" href="tel:7177372324">Tel: (717) 737-2324</a>`;

  let hours = `<p class="font-display playntrade-dark-blue" data-id="1">Mon. 	11:00am – 8:00pm</p>
        <p class="font-display playntrade-dark-blue" data-id="2">Tue. 	11:00am – 8:00pm</p>
            <p class="font-display playntrade-dark-blue" data-id="3">Wed. 	11:00am – 8:00pm</p>
                <p class="font-display playntrade-dark-blue" data-id="4">Thu. 	11:00am – 8:00pm</p>
                    <p class="font-display playntrade-dark-blue" data-id="5">Fri. 	11:00am – 8:00pm</p>
                        <p class="font-display playntrade-dark-blue" data-id="6">Sat. 	11:00am – 8:00pm</p>
                            <p class="font-display playntrade-dark-blue" data-id="0">Sun. 	12pm – 5pm</p>`;

  onMount(() => {
    const todayHours = document.querySelector(`[data-id='${today}']`);
    if (todayHours) {
      todayHours.classList.add('text-xl', 'font-bold', 'playntrade-turquoise');
    }
  });
</script>

<div class="flex flex-col">
  <div id="header-wrapper">
    <Headroom>
      <Header3 {cart} />
    </Headroom>
  </div>

  <main class="min-h-screen overflow-hidden">
    {@render children?.()}
    <CartDrawer />
  </main>

  <footer>
    <FooterSocial {address} {hours} />
  </footer>
</div>

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
    box-sizing: border-box;
    position: relative;
  }
  #header-wrapper {
    height: 90px;
  }
  footer {
    background: var(--black);
  }
  @media (min-width: 480px) {
    footer {
      padding: 2.5rem;
    }
  }
</style>
