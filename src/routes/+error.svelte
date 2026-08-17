<script>
  import Icons from '$components/Icons.svelte';
</script>

<div class="not-found-page">
  <div class="not-found-card">
    <div class="icon-badge">
      <Icons type="search" strokeColor="#1e3a8a" width="28px" height="28px" />
    </div>
    <h1>Page Not Found</h1>
    <p>The page you're looking for doesn't exist or may have been moved.</p>
    <a href="/" data-sveltekit-prefetch class="home-btn">Return to Home Page</a>
  </div>
</div>

<style>
  .not-found-page {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
  }
  .not-found-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 400px;
  }
  .icon-badge {
    width: 64px;
    height: 64px;
    border-radius: 999px;
    background: #eef2ff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
  }
  p {
    color: #666;
    margin-bottom: 2rem;
  }
  .home-btn {
    padding: 0.75rem 2rem;
    background: var(--playntrade-blue, #1e3a8a);
    color: white;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 700;
    transition: opacity 0.15s ease;
  }
  .home-btn:hover {
    opacity: 0.9;
  }
</style>
