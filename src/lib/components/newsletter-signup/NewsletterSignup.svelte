<script>
  let email = '';
  let message = '';
  let success = false;

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      console.log('result: ', result);

      if (response.ok) {
        success = true;
        message = result.success;
      } else {
        success = false;
        message = result.error;
      }
    } catch (error) {
      success = false;
      message = 'An unexpected error occurred.';
    }
  }
</script>

<form on:submit={handleSubmit}>
  <label for="email">Email:</label>
  <input type="email" id="email" bind:value={email} required />
  <button type="submit">Subscribe</button>
</form>

{#if message}
  <p class={success ? 'success' : 'error'}>{message}</p>
{/if}
