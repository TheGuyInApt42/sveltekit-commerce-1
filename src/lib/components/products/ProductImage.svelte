<script>
	import ProductCard from './ProductCard.svelte';

	let currentImageIndex = $state(0);

	/** @type {{images?: any, variants?: any}} */
	let { images = [], variants = [] } = $props();
	let highlightedImageSrc = $derived(images.length > 0 ? images[currentImageIndex]?.src : '');
</script>

<div class="md:h-90 md:w-2/3 flex flex-col gap-8 pl-4 md:flex-row">
	<div class="flex md:flex-col h-1/5 variants">
		{#each variants as variant, i}
			<button
				onclick={() => {
					currentImageIndex = i;
				}}
			>
				<ProductCard img={variant.src} isThumbnail={true} />
			</button>
		{/each}
	</div>
	{#key highlightedImageSrc}
		<div class="relative h-4/5 md:w-1/2 w-[95%]">
			<ProductCard img={highlightedImageSrc} />
		</div>
	{/key}
</div>

<style>
	@media (max-width: 768px) {
		.variants {
			order: 2;
			gap: 1rem;
		}
	}
</style>
