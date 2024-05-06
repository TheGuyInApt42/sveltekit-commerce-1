<script>
    export let size = 'mid'
    export let release = {}
    export let showSystems = false

	const removeNullValues = array => {
  const filtered = array.filter(e => e);

  return filtered;
};


	const consoles = removeNullValues(release.game.platforms)

	let firstRowConsoles = []
	let secondRowConsoles = []

	if (consoles.length > 3){
		firstRowConsoles = consoles.slice(0, 3)

		secondRowConsoles = consoles.splice(3,3)

	}
	else{
		firstRowConsoles = consoles
	}

	const cardStyles = size === 'mid'  ? `card w-48 bg-base-100 shadow-xl black-bg same-height` : `card w-64 bg-base-100 shadow-xl black-bg same-height`

	

</script>



<!-- Card -->
	<div class="h-[575px] card md:w-1/4">
		{#if release.bigCover !== "noCover"}
			<figure>
			<img
				src={release.bigCover}
				alt={release.game.name}
				class="rounded-xl"
			/>
		</figure>
		{/if}
		
		<!-- add flexibility class as grow to ensure same height -->
		<div class="card-body items-center text-center">
			<h3 class="card-title text-black">{release.game.name}</h3>
			<p>{release.human}</p> <!-- Release Date -->

            {#if showSystems}
                <p>{firstRowConsoles}</p> 
				{#if secondRowConsoles}
					<p>{secondRowConsoles}</p>
				{/if}
				
            {/if}
			
		</div>
	</div>
	

<style>

	.card{
		width: fit-content;
	}
	.black-bg{
		background-color: black;
		border: 1px solid var(--playntrade-turquoise);
		
	}

	

	

	.same-height{
		text-align:center;
  display:inline-block;
  vertical-align:top;
  margin-right: 5px;
  margin-bottom: 5px;
	}

	p{
		width: 90%;
		margin-left: auto;
		margin-right: auto;
		color: black;
		flex-grow: 0;
	}
</style>
