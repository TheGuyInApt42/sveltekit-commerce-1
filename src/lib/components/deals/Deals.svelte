<script>
  import { onMount } from 'svelte';
  import GridTile from '$components/GridTile.svelte';
  import Button from '../button/Button.svelte';
  export let products = [];
  //console.log(releases);
  let displayedProducts = [];

  onMount(async () => {
    displayedProducts = await products[2].node?.products?.edges;
    //console.log(displayedProducts);
  });
</script>

<div
  id="deals"
  class="prose prose-black flex flex-col gap-4 pt-16 lg:prose-xl prose-p:text-black prose-strong:text-black
	prose-ol:text-black prose-ul:text-xl prose-ul:text-black"
>
  <h2 class="mb-8 text-center text-black">Check Out Our Deals</h2>
  <div>
    <ul class="grid grid-flow-row gap-4 sm:grid-cols-2 md:grid-cols-3">
      {#each displayedProducts as product, i (product.node.id)}
        <li>
          <div class="group relative block aspect-square overflow-hidden bg-dark">
            <GridTile
              title={product.node.title}
              href={`/product/${product.node.handle}`}
              price={product.node.priceRange.maxVariantPrice.amount}
              currencyCode={product.node.priceRange.maxVariantPrice.currencyCode}
              imageSrc={product.node.images.edges[0].node.originalSrc}
            />
          </div>
        </li>
      {:else}
        <p>No products :(</p>
      {/each}
    </ul>
  </div>

  <Button text={'See All Deals'} route={'/deals'} />
</div>

<style>
  h2 {
    text-decoration: underline;
    text-decoration-color: var(--playntrade-turquoise);
    text-decoration-thickness: 2px;
    text-underline-offset: 0.5rem;
  }
</style>
