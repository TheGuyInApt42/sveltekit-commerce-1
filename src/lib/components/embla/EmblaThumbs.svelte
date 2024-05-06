<script>
	import embla from 'svelte-embla';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

	export let photos = [];

	
	const gallery = writable();
	const thumbnails = writable();

	


	
	$: selected = $gallery?.selectedScrollSnap() ?? 0;

	

	const onThumbnailSelect = (index) => () => {
		if (!$thumbnails?.clickAllowed()) return;
		$gallery?.scrollTo(index);
		$thumbnails.scrollTo(index);
	};

	

	const onGallerySelect = () => {
		selected = $gallery?.selectedScrollSnap() ?? 0;
		$thumbnails?.scrollTo(selected);
	};

	const getCovers = async (data) => {
		let games = await data;
		
		return games.fixed.map((game) => game?.bigCover);
	};

	const getThumbs = async (data) => {
		let games = await data;

		return games.games.map((game) => game?.cover.url);
	};

	//console.log(photos);
	

</script>


{#await getCovers(photos)}
	<!-- promise is pending -->
	<h2>Loading</h2>
{:then bigPhotos}
	<!-- promise was fulfilled -->
	<div class="w-full lg:max-w-[1280px] bg-embla-carousel p-4 rounded-[.25rem] overflow-hidden">
	<div
		class="overflow-hidden"
	
		use:embla={{ store: gallery, loop: true, skipSnaps: false }}
		on:e-select={onGallerySelect}
	>

		
		<div class="grid grid-flow-col auto-cols-[100%] grid-rows-[400px] gap-x-[10px]">
			{#each bigPhotos as photo, index}
				<div class="relative last:mr-[10px]">
					<p
						class="absolute top-[8px] right-[9px] font-semibold text-svelte z-20 w-12 h-12 rounded-full bg-embla-carousel grid place-items-center"
					>
						{index + 1}
					</p>
					<img class="w-full h-full object-contain rounded-[.25rem] z-10" src={photo} alt="" />
				</div>
			{/each}
		</div>

		
	</div>

	{#await getThumbs(photos) then smallPhotos}
		<!-- promise was fulfilled -->
		<div
		class="overflow-hidden mt-[10px]"
		
		use:embla={{ dragFree: true, align: 'start', containScroll: 'keepSnaps', store: thumbnails }}
	>

		<div class="grid grid-flow-col auto-cols-[89px] grid-rows-[70px] gap-x-[10px]">
			{#each smallPhotos as photo, index}
				<button
					class="group relative rounded-[.25rem] overflow-hidden"
					disabled={selected === index}
					on:click={onThumbnailSelect(index)}
				>
					<img class="w-full h-full object-contain" src={photo} alt="" />

					{#if selected === index}
						<div
							class="absolute top-0 left-0 w-full h-full bg-black opacity-60"
							transition:fade={{ duration: 250 }}
						/>
					{/if}

					<p
						class="absolute top-1 right-1 grid place-items-center bg-embla-carousel rounded-full text-svelte w-8 h-8"
					>
						{index + 1}
					</p>
				</button>
			{/each}
		</div>

		
	</div>
	{/await}

	
</div>

{:catch error}
	<!-- promise was rejected -->
	<h2>There's a problem Houston</h2>
{/await}

	

