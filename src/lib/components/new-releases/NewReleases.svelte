<script>
	import Card from "$lib/components/card/Card.svelte";
	import { onMount } from "svelte";
	export let releases = [];
	//console.log(releases);
	let games = []

	onMount(async() =>{
		games = await releases;
		console.log(games);
	})


</script>

<section id="new-releases">
<h2 class="text-center mb-8">New Releases</h2>
<div class="flex gap-8 flex-wrap justify-center items-center overflow-hidden">
	{#await games}
		<!-- promise is pending -->
		<p>Getting New Releases</p>
	{:then value}
		<!-- promise was fulfilled -->
		{#each games as release}

<!-- Card -->
			<Card release={release} showSystems={true} size={'large'}/>

			
		{/each}
	{:catch error}
		<!-- promise was rejected -->
		<p>{error.message}</p>
	{/await}

</div>

</section>


