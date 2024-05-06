<script>
	import Card from "$lib/components/card/Card.svelte";
    import ComingSoonGrid from './ComingSoonGrid.svelte'
	import { onMount } from "svelte";
  import { fade } from "svelte/transition";
	export let releases = [];

	let games = []

	onMount(async() =>{
		games = await releases;
		console.log(games);
	})




</script>

<section id="coming-soon">
<h2 class="text-center mb-8">Coming Soon</h2>

<div class="tabset">
  <!-- Tab 1 -->
  <input type="radio" name="tabset" id="tab1" aria-controls="PlayStation" checked>
  <label for="tab1">PlayStation</label>
  <!-- Tab 2 -->
  <input type="radio" name="tabset" id="tab2" aria-controls="Xbox">
  <label for="tab2">Xbox</label>
  <!-- Tab 3 -->
  <input type="radio" name="tabset" id="tab3" aria-controls="Nintendo">
  <label for="tab3">Nintendo</label>
  
  <div class="tab-panels">
    <section id="PlayStation" class="tab-panel" fade>
<h3 class="text-center mb-4">PlayStation</h3>
		<div class="flex flex-wrap gap-8 justify-center items-center overflow-hidden">
     {#each games as release}
{#if release.game.platforms.includes("PS5") || release.game.platforms.includes("PS4")}
	 <!-- Card -->
	<!-- <Card release={release} /> -->
    <ComingSoonGrid imageSrc={release.game.cover.url}/>

{/if}
	
{/each}
</div>
  </section>
    <section id="Xbox" class="tab-panel" fade>
      <h3 class="text-center mb-4">Xbox</h3>
	  <div class="flex flex-wrap gap-8 justify-center items-center overflow-hidden">
	  {#each games as release}
{#if release.game.platforms.includes("Xbox One") || release.game.platforms.includes("Xbox Series")}

	<!-- Card -->
	<Card release={release} />

{/if}
	
{/each}
     <!--  <p><strong>Overall Impression:</strong>  An elegant, malty German amber lager with a balanced, complementary beechwood smoke character. Toasty-rich malt in aroma and flavor, restrained bitterness, low to high smoke flavor, clean fermentation profile, and an attenuated finish are characteristic.</p>
      <p><strong>History:</strong> A historical specialty of the city of Bamberg, in the Franconian region of Bavaria in Germany. Beechwood-smoked malt is used to make a Märzen-style amber lager. The smoke character of the malt varies by maltster; some breweries produce their own smoked malt (rauchmalz).</p> -->
    </div>
	</section>
    <section id="Nintendo" class="tab-panel" fade>
      <h3 class="text-center mb-4">Nintendo</h3>
	  <div class="flex flex-wrap gap-8 justify-center items-center overflow-hidden">
		{#each games as release}
{#if release.game.platforms.includes("Nintendo Switch")}

	<!-- Card -->
	<Card release={release}/>

{/if}
	
{/each}

	  
      <!-- <p><strong>Overall Impression:</strong> A dark, strong, malty German lager beer that emphasizes the malty-rich and somewhat toasty qualities of continental malts without being sweet in the finish.</p>
      <p><strong>History:</strong> Originated in the Northern German city of Einbeck, which was a brewing center and popular exporter in the days of the Hanseatic League (14th to 17th century). Recreated in Munich starting in the 17th century. The name “bock” is based on a corruption of the name “Einbeck” in the Bavarian dialect, and was thus only used after the beer came to Munich. “Bock” also means “Ram” in German, and is often used in logos and advertisements.</p> -->
    </div>
	</section>
  </div>
  
</div>



</section>



<style>
  #coming-soon{
    font-family: 'Roboto Mono', monospace;
  }
	h3{
		font-size: 3rem;
		color: black;
	}

	.tabset > input[type="radio"] {
  position: absolute;
  left: -200vw;
}

.tabset .tab-panel {
  display: none;
}

.tabset > input:first-child:checked ~ .tab-panels > .tab-panel:first-child,
.tabset > input:nth-child(3):checked ~ .tab-panels > .tab-panel:nth-child(2),
.tabset > input:nth-child(5):checked ~ .tab-panels > .tab-panel:nth-child(3),
.tabset > input:nth-child(7):checked ~ .tab-panels > .tab-panel:nth-child(4),
.tabset > input:nth-child(9):checked ~ .tab-panels > .tab-panel:nth-child(5),
.tabset > input:nth-child(11):checked ~ .tab-panels > .tab-panel:nth-child(6) {
  display: block;
}

/*
 Styling
*/


.tabset > label {
  position: relative;
  display: inline-block;
  padding: 15px 15px 25px;
  border: 1px solid transparent;
  border-bottom: 0;
  cursor: pointer;
  font-weight: 600;
}

.tabset > label::after {
  content: "";
  position: absolute;
  left: 15px;
  bottom: 10px;
  width: 22px;
  height: 4px;
  background: var(--playntrade-turquoise);
}

input:focus-visible + label {
  outline: 2px solid rgba(0,102,204,1);
  border-radius: 3px;
}

.tabset > label:hover,
.tabset > input:focus + label,
.tabset > input:checked + label {
  color: black;
}

.tabset > label:hover::after,
.tabset > input:focus + label::after,
.tabset > input:checked + label::after {
  background: var(--playntrade-turquoise);
}

.tabset > input:checked + label {
  border-color: black;
  border-bottom: 1px solid black;
  margin-bottom: -1px;
}

.tab-panel {
  padding: 30px 0;
  border-top: 1px solid black;
}

/*
 Demo purposes only
*/
*,
*:before,
*:after {
  box-sizing: border-box;
}


.tabset {
  max-width: 65em;
}
</style>