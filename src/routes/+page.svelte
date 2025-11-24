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
  import HeroImage from '$lib/components/slider/HeroImage.svelte';

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
  <HeroImage
    src="https://res.cloudinary.com/blackgandalf/image/upload/v1763940900/PlayNTrade/-2962841903998648511_mwhk9g.webp"
    alt="Featured image"
    href="/"
    fullHeight={true}
  />
</div>

<h1 class="text-center">Play N Trade Camp Hill</h1>
<!-- <NewsletterSignup /> -->

<!-- <div class="flex w-full justify-center px-4 sm:px-6 md:px-8">
    <div
      class="divider divider-neutral w-full max-w-[280px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1100px]"
    >
      <h2 class="text-center text-base sm:text-lg md:text-xl lg:text-2xl">New Released Games</h2>
    </div>
  </div> -->

<!-- SingleCol {games} /> -->

<!--  <div class="site-content flex flex-col md:flex-row">
    <Events />
    <NewReleases3 />
  </div> -->

<section
  class="prose prose-black mx-auto flex max-w-full flex-col gap-4 px-4 pt-16 lg:prose-xl prose-p:text-black prose-strong:text-black prose-ol:text-xl
	prose-ol:text-black prose-ul:text-xl prose-ul:text-black sm:px-6 md:max-w-3xl md:px-8"
>
  <div class="not-prose my-4 flex flex-col items-center justify-center gap-4 py-8 sm:flex-row">
    <span class="hidden sm:block">
      <img src="/images/controller.png" alt="" class="h-8 w-8" />
    </span>
    <h2 class="text-bold text-center text-2xl text-black sm:text-3xl">
      Welcome to Our Retro Gaming Paradise!
    </h2>
    <span class="hidden sm:block">
      <img src="/images/controller.png" alt="" class="h-8 w-8" />
    </span>
  </div>

  <p class="text-base sm:text-lg">
    At <strong>Camp Hill Play N Trade</strong>, we're not just a store; we're a
    <strong>time machine</strong>
    that transports you back to the golden era of gaming. Whether you're a seasoned gamer or a curious
    newbie, we've got something special for you:
  </p>

  <ol class="not-prose space-y-4 pl-4 text-base text-black sm:text-lg">
    <li class="mb-4">
      <strong>Classic Games</strong>: Dive into nostalgia with our extensive collection of vintage
      video games. From pixelated adventures on the Atari to epic quests on the NES, we've curated
      the best titles from the '80s and '90s. Rediscover the magic of games that stood the test of
      time!
    </li>
    <li class="mb-4">
      <strong>New Releases</strong>: Stay ahead of the gaming curve! We stock the latest releases
      for all major consoles. Whether you're a PlayStation devotee, an Xbox enthusiast, or a
      Nintendo loyalist, we've got your gaming fix covered. Pre-order, grab your controller, and
      embark on epic quests in stunning high-definition.
    </li>
    <li class="mb-4">
      <strong>Old Accessories, New Thrills</strong>: Need a trusty controller for your retro
      console? Looking for that elusive memory card? Our shelves are brimming with vintage
      accessories that'll level up your gaming experience. Plus, we've got the latest gaming
      peripherals to enhance your gameplay—because classics deserve modern comfort too!
    </li>
    <li class="mb-4">
      <strong>Systems Galore</strong>: Ready to relive the past or embrace the future? Choose from
      our refurbished old-school systems or the latest gaming powerhouses. Whether you crave the
      simplicity of the Sega Genesis or crave the cutting-edge graphics of the PlayStation 5, we've
      got the perfect system waiting for you.
    </li>
  </ol>

  <div class="not-prose my-4 flex flex-col items-center justify-center gap-4 py-8 sm:flex-row">
    <span class="hidden sm:block">
      <img src="/images/flames.png" alt="" class="h-8 w-8" />
    </span>
    <h2 class="text-bold text-center text-2xl text-black sm:text-3xl">
      Why Choose Camp Hill Play N Trade?
    </h2>
    <span class="hidden sm:block">
      <img src="/images/flames.png" alt="" class="h-8 w-8" />
    </span>
  </div>

  <ol class="not-prose space-y-4 pl-4 text-base text-black sm:text-lg">
    <li class="mb-4">
      <strong>Quality Assurance</strong>: All our games and systems undergo rigorous testing. No
      glitches, no surprises—just pure gaming joy.
    </li>
    <li class="mb-4">
      <strong>Friendly Experts</strong>: Our team lives and breathes gaming. Ask us anything—from
      cheat codes to console hacks, we've got the answers.
    </li>
    <li class="mb-4">
      <strong>Collector's Paradise</strong>: Looking for rare gems? We've got your back. WATA-graded
      games? Check. Limited editions? Double-check.
    </li>
  </ol>

  <p class="text-base sm:text-lg">
    So, whether you're chasing high scores, reliving childhood memories, or exploring new realms,
    step into <strong>Camp Hill Play N Trade</strong>. Because in our world, pixels are forever, and
    the adventure never ends.
  </p>
  <p class="text-base sm:text-lg">
    Swing by our cozy store in Mechanicsburg. Let's press start and create gaming legends together!
    🕹️
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
