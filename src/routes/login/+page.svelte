<script>
  // Define props to receive the data
  export let data;
</script>

<h1>Shop Details</h1>

<!-- Render shop details in the component -->
<pre>{JSON.stringify(data, null, 2)}</pre>

<!-- <form on:submit={handleSubmit}>
  <label for="email">Email:</label>
  <input type="email" id="email" bind:value={email} required />

  <label for="password">Password:</label>
  <input type="password" id="password" bind:value={password} required />

  <button type="submit">Login</button>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if success}
    <p class="success">{success}</p>
  {/if}
</form>

<style>
  .error {
    color: red;
  }
  .success {
    color: green;
  }
</style>
 -->

<!-- <script>
  import Login from '../../lib/components/login/Login.svelte';
</script>

<Login /> -->
