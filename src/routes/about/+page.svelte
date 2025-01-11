<script>
  // Components
  import HeadTags from '$lib/components/head-tags/HeadTags.svelte';
  import Banner from '$lib/components/banner/Banner.svelte';

  // Start: Local component properties
  const metaData = {
    title: `PlayNTrade | About`,
    description:
      'Sveltekit starter project created with sveltekit, typescript, tailwindcss, postcss, husky, and storybook. The project has the structure set up for the scaleable project. (sveltekit, typescript, tailwindcss, postcss, husky, Storybook).',
    keywords: ['about playntrade', 'learn more about playntrade', 'story of playntrade']
  };
</script>

<!-- Start: Header Tag -->
<HeadTags {metaData} />
<!-- End: Header Tag -->

<!-- <Banner bannerImg="http://camphillplayntrade.com/wp-content/uploads/2015/01/sliderptn.jpg" /> -->

<div class="avada-row">
  <div class="img-container">
    <img src="/images/PTN.png" alt="Play N Trade" class="responsive-img" />
  </div>
</div>

<div class="content prose-xl flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
  <h1 class="mb-4 text-center text-3xl sm:text-4xl md:text-5xl">About Play N Trade</h1>

  <h2 class="mb-6 text-center text-2xl sm:text-3xl">
    Bringing you the Ultimate Gaming Experience!
  </h2>

  <p class="prose max-w-prose text-center text-base sm:text-lg md:text-xl">
    Your Camp Hill Play N Trade is independently and locally owned, operated, and the best place to
    shop for all your video game needs. We are not just a standard game store. We buy, sell, and
    trade all video game way back to the Atari 2600 to the new Xbox Series S/X and PS5. We have the
    lowest prices on all used games and accessories. Stop in and check us out.
  </p>
</div>

<style>
  .avada-row {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .img-container {
    width: 100%;
    margin: 0 auto;
    padding: 1rem 0;
  }

  .responsive-img {
    width: 100%;
    height: auto;
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }

  .content {
    width: 100%;
    margin-top: var(--column-margin-top);
    margin-bottom: var(--column-margin-bottom);
    max-width: 65ch;
    margin-left: auto;
    margin-right: auto;
  }

  p {
    font-family: 'Roboto Mono', monospace;
    color: black;
    margin: 0 auto;
    line-height: 1.75;
  }

  h1,
  h2 {
    width: 100%;
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    .avada-row {
      padding: 0 0.5rem;
    }

    .content {
      padding: 0 1rem;
    }

    .img-container {
      padding: 0.5rem;
    }

    p {
      padding: 0;
      font-size: 1rem;
    }

    h1 {
      font-size: 2rem;
      padding: 0 0.5rem;
    }

    h2 {
      font-size: 1.5rem;
      padding: 0 0.5rem;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .content {
      padding: 0 2rem;
    }

    p {
      font-size: 1.125rem;
    }
  }
</style>
