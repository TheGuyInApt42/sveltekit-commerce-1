<script>
  import HeadTags from '$lib/components/head-tags/HeadTags.svelte';

  let { title, lastUpdated, children } = $props();
</script>

<HeadTags
  metaData={{
    title: `PlayNTrade | ${title}`,
    description: `${title} for Camp Hill Play N Trade.`
  }}
/>

<section class="policy-page">
  <div class="policy-header">
    <h1>{title}</h1>
    {#if lastUpdated}
      <p class="last-updated">Last updated: {lastUpdated}</p>
    {/if}
  </div>

  <div class="prose prose-black policy-content">
    {@render children?.()}
  </div>

  <a href="/" class="back-link">← Back to home</a>
</section>

<style>
  .policy-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 3rem 1.5rem 5rem;
  }
  .policy-header {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  .policy-header h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  .last-updated {
    color: #888;
    font-size: 0.85rem;
  }
  .policy-content {
    line-height: 1.7;
  }
  .policy-content :global(h2) {
    font-size: 1.2rem;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }
  .policy-content :global(p) {
    margin-bottom: 1rem;
  }
  .policy-content :global(ul) {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }
  .back-link {
    display: inline-block;
    margin-top: 2.5rem;
    color: var(--playntrade-blue, #1e3a8a);
    text-decoration: none;
  }
</style>