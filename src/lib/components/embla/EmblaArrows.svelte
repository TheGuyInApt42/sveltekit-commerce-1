<script>
	import embla from "svelte-embla"
    import { writable } from 'svelte/store';
	import { onMount } from "svelte";


const carousel = writable(); // Initialize writable store

const onLeft = () => $carousel?.canScrollPrev() && $carousel?.scrollPrev();
	const onRight = () => $carousel?.canScrollNext() && $carousel?.scrollNext();
	const select = index => () => $carousel?.scrollTo(index);

	$: selected = $carousel?.selectedScrollSnap() ?? 0;
	const onSelect = () => {
		selected = $carousel?.selectedScrollSnap();
	};

  

    export let photos = []
	let bigPhotos = []
	
	
	const getCovers = async (data) => {
		let games = await data;
		console.log(await data);
		return games.fixed.map((game) => game?.bigCover);
	};

	const getThumbs = async (data) => {
		let games = await data;

		return games.games.map((game) => game?.cover.url);
	};

	
	onMount(async () => {
		// TODO: clean this up
		//bigPhotos = await getCovers(photos)
	
	

		
		
		
		
	});


	let photoStyles = `grid grid-flow-col grid-cols-[repeat(${photos.length},100%)] grid-rows-[500px] gap-x-[10px]`
</script>

{#await getCovers(photos) then bigPhotos}
	<!-- promise was fulfilled -->
	<div class="w-full max-w-[1200px]  p-2 rounded-[.25rem] overflow-hidden">
	<div class="overflow-hidden" use:embla={{ store: carousel }} on:e-select={onSelect}>
		<div class="grid grid-flow-col grid-cols-[repeat(17,100%)] grid-rows-[600px] gap-x-[10px]">
			{#each bigPhotos as photo, index}
				<div class="relative last:mr-[10px]">
					<p
						class="absolute top-[8px] right-[9px] font-semibold playntrade-turquoise z-20 w-12 h-12 rounded-full bg-embla-carousel grid place-items-center"
					>
						{index + 1}
					</p>
					<img
						class="w-full h-full object-cover rounded-[.25rem] z-10"
						src={photo}
						alt=""
					/>
				</div>
			{/each}
		</div>
	</div>





    <button
		class="absolute top-[50%] left-4 disabled:opacity-30 disabled:cursor-not-allowed"
		disabled={selected === 0}
		on:click={onLeft}
	>
		<img class="w-[26px] h-[26px] rotate-180" src="carousel-arrow.svg" alt="" />
	</button>
	<button
		class="absolute top-[50%] right-4 disabled:opacity-30 disabled:cursor-not-allowed"
		disabled={selected === photos.length - 1}
		on:click={onRight}
	>
		<img class="w-[26px] h-[26px]" src="carousel-arrow.svg" alt="" />
	</button>

    <div class="absolute left-0 w-full flex justify-center gap-4">
		{#each bigPhotos as photo, index}
			<button class="w-[30px] h-[30px] grid place-items-center" on:click={select(index)}>
				<div
					class="w-full h-[3px] bg-black rounded-[.25rem]"
					class:[background:linear-gradient(45deg,#ff9500,#ffcc00)]={selected === index}
				/>
			</button>
		{/each}
	</div>
</div>
{/await}
