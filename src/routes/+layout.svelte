<script>
  import { onMount } from 'svelte';
  import Header from '$lib/components/header/Header.svelte';
  import Header3 from '$lib/components/header/Header3.svelte';

  // shopping cart
  import ShoppingCart from '$lib/components/shopping-cart/ShoppingCart.svelte';
  import { getCartItems } from '../store';
  import { createCart } from '$utils/shopify';
  import Headroom from '$lib/components/headroom/Headroom.svelte';
  import FooterSocial from '$lib/components/footer-social/FooterSocial.svelte';
  import Banner from '$lib/components/banner/Banner.svelte';
  import { page } from '$app/stores';
  import '../app.postcss';

  // Variables
  let cartId;
  let checkoutUrl;
  let cartCreatedAt;
  let cartItems = [];

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

  //Functions
  async function callCreateCart() {
    console.log('create');
    const cartRes = await createCart();

    if (typeof window !== 'undefined') {
      localStorage.setItem('cartCreatedAt', Date.now());
      localStorage.setItem('cartId', JSON.stringify(cartRes.body?.data?.cartCreate?.cart?.id));
      localStorage.setItem(
        'cartUrl',
        JSON.stringify(cartRes.body?.data?.cartCreate?.cart?.checkoutUrl)
      );
    }
  }

  async function loadCart() {
    const res = await getCartItems();
    cartItems = res?.body?.data?.cart?.lines?.edges;
  }

  let showCart = false;
  let loading = false;

  async function openCart() {
    console.log('parent open');
    /* let alert = document.querySelector('.alert')
  
    alert.style.display = 'none' */
    await loadCart();
    showCart = true;
  }
  function hideCart() {
    showCart = false;
  }

  function getCheckoutUrl() {
    window.open(checkoutUrl, '_blank');
    loading = false;
  }

  async function addToCart(event) {
    await fetch('/cart.json', {
      method: 'PATCH',
      body: JSON.stringify({ cartId: cartId, variantId: event.detail.body })
    });
    // Wait for the API to finish before updating cart items
    await loadCart();
    loading = false;
  }

  async function removeProduct(event) {
    if (typeof window !== 'undefined') {
      cartId = JSON.parse(localStorage.getItem('cartId'));
    }
    await fetch('/cart.json', {
      method: 'PUT',
      body: JSON.stringify({
        cartId,
        lineId: event.detail.body.lineId,
        quantity: event.detail.body.quantity,
        variantId: event.detail.body.variantId
      })
    });
    await loadCart();
    loading = false;
  }

  onMount(async () => {
    /* !(function () {
      if (!window.klaviyo) {
        window._klOnsite = window._klOnsite || [];
        try {
          window.klaviyo = new Proxy(
            {},
            {
              get: function (n, i) {
                return 'push' === i
                  ? function () {
                      var n;
                      (n = window._klOnsite).push.apply(n, arguments);
                    }
                  : function () {
                      for (var n = arguments.length, o = new Array(n), w = 0; w < n; w++)
                        o[w] = arguments[w];
                      var t = 'function' == typeof o[o.length - 1] ? o.pop() : void 0,
                        e = new Promise(function (n) {
                          window._klOnsite.push(
                            [i].concat(o, [
                              function (i) {
                                t && t(i), n(i);
                              }
                            ])
                          );
                        });
                      return e;
                    };
              }
            }
          );
        } catch (n) {
          (window.klaviyo = window.klaviyo || []),
            (window.klaviyo.push = function () {
              var n;
              (n = window._klOnsite).push.apply(n, arguments);
            });
        }
      }
    })(); */
    let todayHours = document.querySelector(`[data-id='${today}']`);
    let highlightedDay = 'text-xl font-bold playntrade-turquoise'.split(' ');
    todayHours.classList.add(...highlightedDay);

    if (typeof window !== 'undefined') {
      const cartIdString = localStorage.getItem('cartId');
      if (cartIdString !== null && cartIdString !== 'undefined') {
        // Parse the value only if it's not null
        cartId = JSON.parse(cartIdString);
        //console.log('id is', cartId);
      } else {
        console.log('Cart ID is not available in local storage.');
      }
      cartCreatedAt = JSON.parse(localStorage.getItem('cartCreatedAt'));
      const checkoutUrlString = localStorage.getItem('cartUrl');
      if (checkoutUrlString !== null && checkoutUrlString !== 'undefined') {
        // Parse the value only if it's not null
        checkoutUrl = JSON.parse(checkoutUrlString);
        //console.log('id is', checkoutUrl);
      } else {
        console.log('Cart URL is not available in local storage.');
      }

      let currentDate = Date.now();
      let difference = currentDate - cartCreatedAt;
      let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
      let cartIdExpired = totalDays > 6;
      if (cartIdString === 'undefined' || cartIdString === 'null' || cartIdExpired) {
        await callCreateCart();
      }
      await loadCart();
      document.addEventListener('keydown', (e) => {
        let keyCode = e.keyCode;
        if (keyCode === 27) {
          showCart = false;
        }
      });
    }
  });
</script>

<!-- <svelte:head>
  <script
    async
    type="text/javascript"
    src="//static.klaviyo.com/onsite/js/klaviyo.js?company_id=VdFLP5"
  ></script>;
</svelte:head> -->

<div class="flex flex-col">
  <div id="header-wrapper">
    <Headroom>
      <Header3 on:openCart={openCart} />

      <!-- <div role="alert" class="alert shadow-lg bg-black border-black border-none">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <div>
    <h3 class="font-bold playntrade-blue">Website still in reconstruction!</h3> -->
      <!-- <div class="text-xs">Check out our current deals!</div> -->
      <!-- </div> -->
      <!-- <button class="btn btn-sm">See</button> -->
      <!-- </div>  -->
    </Headroom>
  </div>
  <!-- Check page route to see if should show banner-->

  <!-- {#if $page.url.pathname === '/about' || $page.url.pathname === '/contact'}
    <Banner bannerImg={'/images/sliderptn.jpg'} alt={'picture of inside store'} />
  {/if} -->

  <main class={`${showCart ? 'h-screen' : 'min-h-screen'} overflow-hidden`}>
    {#if showCart}
      <ShoppingCart
        items={cartItems}
        on:click={hideCart}
        on:removeProduct={removeProduct}
        on:addProduct={addToCart}
        on:getCheckoutUrl={getCheckoutUrl}
        bind:loading
      />
    {/if}

    <slot />
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
