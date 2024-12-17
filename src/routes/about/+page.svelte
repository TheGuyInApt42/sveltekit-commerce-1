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

<Banner bannerImg="http://camphillplayntrade.com/wp-content/uploads/2015/01/sliderptn.jpg" />

<div class="content prose-xl flex flex-col items-center justify-center">
  <h1>About Play N Trade</h1>

  <h2>Bringing you the Ultimate Gaming Experience!</h2>

  <p class="prose">
    Your Camp Hill Play N Trade is independently and locally owned, operated, and the best place to
    shop for all your video game needs. We are not just a standard game store. We buy, sell, and
    trade all video game way back to the Atari 2600 to the new Xbox Series S/X and PS5. We have the
    lowest prices on all used games and accessories. Stop in and check us out.
  </p>
</div>

<style>
  .content {
    width: 100%;

    margin-top: var(--column-margin-top);
    margin-bottom: var(--column-margin-bottom);
  }

  p {
    font-family: 'Roboto Mono', monospace;
    font-size: 1.25em;
    color: black;
  }

  @media (max-width: 768px) {
    h2,
    p {
      padding: 0 5%;
    }
  }
</style>
