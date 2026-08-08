<script>
	import { run } from 'svelte/legacy';


	/** @type {{href?: string, ariaLabel?: string, cssClasses?: string, children?: import('svelte').Snippet}} */
	let {
		href = '',
		ariaLabel = '',
		cssClasses = $bindable(''),
		children
	} = $props();

	run(() => {
		if (!cssClasses) {
			cssClasses =
				'text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-500 transition';
		}
	});
</script>

{#if href}
	{#if ariaLabel}
		<a
			href="{href}"
			class="{cssClasses}"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="{ariaLabel}"
		>
			{@render children?.()}
		</a>
	{:else}
		<a href="{href}" class="{cssClasses}" target="_blank" rel="noopener noreferrer">
			{@render children?.()}
		</a>
	{/if}
{/if}