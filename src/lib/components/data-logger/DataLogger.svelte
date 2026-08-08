<script>
    /** @type {{loadedData: any}} */
    let { loadedData } = $props();
</script>

<pre>{JSON.stringify(loadedData, null, 2)}</pre>