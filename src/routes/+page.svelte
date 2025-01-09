<!-- <script>
  import ThreeItemGrid from '$components/ThreeItemGrid.svelte';
  import Carousel from '$components/Carousel.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  $: clothesCollection = data.products[0]?.node?.products?.edges;
  $: featuredCollection = data.products[1]?.node?.products?.edges;
  $: console.log(clothesCollection);
  $: console.log(featuredCollection);
</script>

<svelte:head>
  <title>Home – SvelteKit Commerce</title>
</svelte:head>

<main>
  <section>
    <div class="lg:h-[90vh]">
      <ThreeItemGrid products={featuredCollection} />
    </div>
  </section>
  <section>
    <Carousel items={featuredCollection} />
  </section>
  <section>
    <div
      class="flex flex-col px-8 py-20 text-white border border-black bg-dark lg:flex-row lg:items-center"
    >
      <div
        class="flex-none mb-4 mr-8 text-3xl font-black text-left md:text-4xl lg:mb-0 lg:w-1/3 lg:text-right lg:text-6xl"
      >
        Dessert dragée halvah croissant.
      </div>
      <div>
        <div class="lg:text-2xl">
          Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon
          bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans.
          Tiramisu sweet roll cheesecake pie carrot cake.
        </div>
        <button class="mt-4 font-bold text-svelteOrange hover:text-svelteDark lg:text-2xl">
          Read it here
        </button>
      </div>
    </div>
  </section>
</main>
 -->
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  // Components
  import HeadTags from '$lib/components/head-tags/HeadTags.svelte';
  import NewReleases2 from '$lib/components/new-releases/NewReleases2.svelte';
  import Featured from '../lib/components/embla/Featured.svelte';
  import DataLogger from '$lib/components/data-logger/DataLogger.svelte';
  import ComingSoon from '$lib/components/coming-soon/ComingSoon.svelte';
  import EmblaThumbs from '$lib/components/embla/EmblaThumbs.svelte';
  import Deals from '$lib/components/deals/Deals.svelte';
  import Facebook from '../lib/components/facebook/Facebook.svelte';
  import NewsletterSignup from '$lib/components/newsletter-signup/NewsletterSignup.svelte';
  import Embla2 from '$lib/components/slider/Embla2.svelte';
  import Events from '$lib/components/events/Events.svelte';
  import NewReleases3 from '../lib/components/new-releases/NewReleases3.svelte';
  import Copy from '$lib/components/test/Copy.svelte';
  import SingleCol from '../lib/components/test/SingleCol.svelte';

  // Start: Local component properties
  const metaData = {
    title: `PlayNTrade | Home`,
    description:
      'Camp Hill Play N Trade is a local retro video game store in Camp Hill, PA where you can buy and trade physical video games and accessories',
    keywords: [
      'playntrade',
      'video games',
      'physical video games',
      'retro games',
      'trade in video games',
      'camp hill video games'
    ]
  };

  export let data;

  //TODO: check handling end of month/new month
  $: recent = data.recent;
  $: soon = data.soon;
  $: top = data.top;
  $: games = data.products;
  let topGames = {};

  //TODO: check into local storage fallback
  async function storeTopGames() {
    if (browser) window.localStorage.setItem('top', JSON.stringify(await data.top));
  }

  async function retrieveTopGames() {
    if (browser) {
      return JSON.parse(window.localStorage.getItem('top'));
    }
  }

  onMount(async () => {
    topGames = await retrieveTopGames();
  });
</script>

<!-- Start: Header Tag -->
<HeadTags {metaData} />
<!-- End: Header Tag -->

<div class="flex flex-col items-center justify-center gap-4">
  <section class="w-full">
    <Embla2 />
  </section>

  <h1>STAGING TEST2</h1>
  <h1 class="text-center">Play N Trade Camp Hill</h1>
  <!-- <NewsletterSignup /> -->

  <div class="flex w-full justify-center px-4 sm:px-6 md:px-8">
    <div
      class="divider divider-neutral w-full max-w-[280px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1100px]"
    >
      <h2 class="text-center text-base sm:text-lg md:text-xl lg:text-2xl">New Released Games</h2>
    </div>
  </div>

  <SingleCol {games} />

  <!--  <div class="site-content flex flex-col md:flex-row">
    <Events />
    <NewReleases3 />
  </div> -->

  <section
    class="prose prose-black flex flex-col gap-4 pt-16 lg:prose-xl prose-p:text-black prose-strong:text-black prose-ol:text-xl
	prose-ol:text-black prose-ul:text-xl prose-ul:text-black"
  >
    <div class="not-prose my-4 flex items-center justify-center gap-4 py-8">
      <span>
        <img src="/images/controller.png" alt="" />
      </span>
      <h2 class="text-bold text-3xl text-black ">Welcome to Our Retro Gaming Paradise!</h2>
      <span>
        <img src="/images/controller.png" alt="" />
      </span>
    </div>

    <p>
      At <strong>Camp Hill Play N Trade</strong>, we're not just a store; we're a
      <strong>time machine</strong>
      that transports you back to the golden era of gaming. Whether you're a seasoned gamer or a curious
      newbie, we've got something special for you:
    </p>
    <ol class="not-prose text-black">
      <li>
        <strong>Classic Games</strong>: Dive into nostalgia with our extensive collection of vintage
        video games. From pixelated adventures on the Atari to epic quests on the NES, we've curated
        the best titles from the '80s and '90s. Rediscover the magic of games that stood the test of
        time!
      </li>
      <li>
        <strong>New Releases</strong>: Stay ahead of the gaming curve! We stock the latest releases
        for all major consoles. Whether you're a PlayStation devotee, an Xbox enthusiast, or a
        Nintendo loyalist, we've got your gaming fix covered. Pre-order, grab your controller, and
        embark on epic quests in stunning high-definition.
      </li>
      <li>
        <strong>Old Accessories, New Thrills</strong>: Need a trusty controller for your retro
        console? Looking for that elusive memory card? Our shelves are brimming with vintage
        accessories that'll level up your gaming experience. Plus, we've got the latest gaming
        peripherals to enhance your gameplay—because classics deserve modern comfort too!
      </li>
      <li>
        <strong>Systems Galore</strong>: Ready to relive the past or embrace the future? Choose from
        our refurbished old-school systems or the latest gaming powerhouses. Whether you crave the
        simplicity of the Sega Genesis or crave the cutting-edge graphics of the PlayStation 5,
        we've got the perfect system waiting for you.
      </li>
    </ol>

    <div class="not-prose my-4 flex items-center justify-center py-8">
      <span>
        <img src="/images/flames.png" alt="" />
      </span>
      <h2 class="text-bold text-3xl text-black ">Why Choose Camp Hill Play N Trade?</h2>
      <span>
        <img src="/images/flames.png" alt="" />
      </span>
    </div>

    <ol class="not-prose text-black">
      <li>
        <strong>Quality Assurance</strong>: All our games and systems undergo rigorous testing. No
        glitches, no surprises—just pure gaming joy.
      </li>
      <li>
        <strong>Friendly Experts</strong>: Our team lives and breathes gaming. Ask us anything—from
        cheat codes to console hacks, we've got the answers.
      </li>
      <li>
        <strong>Collector's Paradise</strong>: Looking for rare gems? We've got your back.
        WATA-graded games? Check. Limited editions? Double-check.
      </li>
    </ol>

    <p>
      So, whether you're chasing high scores, reliving childhood memories, or exploring new realms,
      step into <strong>Camp Hill Play N Trade</strong>. Because in our world, pixels are forever,
      and the adventure never ends.
    </p>
    <p>
      Swing by our cozy store in Mechanicsburg. Let's press start and create gaming legends
      together! 🕹️
    </p>
  </section>

  <!-- <section class="py-16">
    <Deals {products} />
  </section>

  <section class="py-16">
    <NewReleases2 {products} />
  </section>

  <section class="py-16">
    <ComingSoon {products} />
  </section> -->

  <!-- <section class="py-16">
    <Facebook />
  </section> -->

  <div class="divider pb-8 before:bg-black after:bg-black">
    <h4 class="text-bold text-2xl text-black">Come Check Us Out!</h4>
  </div>
</div>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  h1 {
    color: var(--playntrade-blue);
  }

  .site-content {
    max-width: 1100px;
    margin: 0 auto;
  }

  ol li {
    margin-bottom: 1rem;
  }

  ol strong {
    text-decoration: underline;
    text-decoration-color: var(--playntrade-turquoise);
    text-decoration-thickness: 2px;
    text-underline-offset: 0.5rem;
  }

  p {
    font-family: 'Roboto Mono', monospace;
    font-size: 1.25em;
    color: black;
  }
</style>
