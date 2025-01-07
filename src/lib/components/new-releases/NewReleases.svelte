<script>
  import Card from '$lib/components/card/Card.svelte';
  import { onMount } from 'svelte';
  export let releases = [];
  //console.log(releases);
  let games = [];

  onMount(async () => {
    games = await releases;
    //console.log(games);
  });
</script>

<section id="new-releases">
  <h2 class="mb-8 text-center">New Releases</h2>
  <div class="flex flex-wrap items-center justify-center gap-8 overflow-hidden">
    {#await games}
      <!-- promise is pending -->
      <p>Getting New Releases</p>
    {:then value}
      <!-- promise was fulfilled -->
      {#each games as release}
        <!-- Card -->
        <Card {release} showSystems={true} size={'large'} />
      {/each}
    {:catch error}
      <!-- promise was rejected -->
      <p>{error.message}</p>
    {/await}
  </div>
</section>
