<script>
  import GridTile from '$components/GridTile.svelte';
  import { onMount } from 'svelte';
  /** @type {{products?: any}} */
  let { products = [] } = $props();
  //console.log(releases);
  let displayedProducts = [];

  onMount(async () => {
    displayedProducts = await products[3].node?.products?.edges;
    //console.log(displayedProducts);
  });
  //NOTE: https://codepen.io/danielmorales/pen/gVbqBW
</script>

<main class="container">
  <a href="#" class="site-logo">
    <img
      class="img-responsive"
      src="https://i.postimg.cc/hP3Bt6yD/magic-logo.png"
      alt="letters on top of a banner behind shooter stars"
    />
  </a><!-- .logo -->
  <section class="events">
    <nav class="events__tabs">
      <a class="events__tab -active" data-tabcontent="tab-1" role="button">Xbox</a>
      <a class="events__tab" data-tabcontent="tab-2" role="button">PlayStation</a>
      <a class="events__tab" data-tabcontent="tab-3" role="button">Switch</a>
      <a class="events__trigger" href="#" role="button">
        <span class="sr-only">Open and Close</span>
        <i class="fas fa-chevron-down"></i>
        <i class="fas fa-chevron-up"></i>
      </a>
    </nav>
    <div id="tab-1" class="events__list -active"></div>

    <div id="tab-2" class="events__list"></div>
    <div id="tab-3" class="events__list"></div>
  </section>
  <!-- .events -->
</main>
<!-- .container -->
