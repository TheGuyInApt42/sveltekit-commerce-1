<script>
	// Start: Local Imports
	// Models


	// Components
	import SEO from '../seo/SEO.svelte';
	// End: Local Imports

	const description =
		'Sveltekit starter project created with sveltekit, typescript, tailwindcss, postcss, husky, and storybook. The project has the structure set up for the scaleable project. (sveltekit, typescript, tailwindcss, postcss, husky, Storybook).';

	// Start: Exported Properties
	export let metaData = {};
	// End: Exported Properties

	metaData = {
		title: metaData.title ? metaData.title : 'Sveltekit Starter',
		description: metaData.description ? metaData.description : description,
		...metaData,
	};
</script>

<SEO metaData="{metaData}" />