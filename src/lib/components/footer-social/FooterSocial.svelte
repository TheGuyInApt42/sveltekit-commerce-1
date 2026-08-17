<script>
  import ExternalLink from '../../components/external-link/ExternalLink.svelte';
  /** @type {{address?: string, hours?: string, children?: import('svelte').Snippet}} */
  let { address = '', hours = '', children } = $props();
</script>

<div class="flex flex-col">
  <div class="flex flex-col gap-4 pt-6 md:flex-row md:gap-0 md:pt-0">
    <div id="hours" class="flex-1">
      <h3 class="pb-4 font-bold">Hours</h3>
      {#if children}{@render children()}{:else}{@html hours}{/if}
    </div>

    <div id="social">
      <h3 class="pb-4 font-bold">Connect With Us</h3>
      <div id="footer-social-icons">
        <ExternalLink
          href={'https://www.facebook.com/CampHillPlayNTrade/'}
          cssClasses={'mr-1'}
          ariaLabel={'Facebook link'}
        >
          <span class="facebook-icon"></span>
        </ExternalLink>

        <ExternalLink
          href={'https://www.instagram.com/explore/locations/81968605/camp-hill-play-n-trade/'}
          ariaLabel={'Instagram link'}
        >
          <span class="instagram-icon"></span>
        </ExternalLink>
      </div>
    </div>

    <div id="address" class="flex-1">
      <h3 class="pb-4 font-bold">Visit Us</h3>
      {#if children}{@render children()}{:else}{@html address}{/if}
    </div>
  </div>

  <div class="footer-divider"></div>

  <div class="footer-legal">
    <a href="/policies/privacy">Privacy Policy</a>
    <span class="legal-sep">·</span>
    <a href="/policies/refund">Refund Policy</a>
    <span class="legal-sep">·</span>
    <a href="/policies/shipping">Shipping Policy</a>
    <span class="legal-sep">·</span>
    <a href="/policies/terms">Terms of Service</a>
  </div>

  <div class="flex flex-col pb-2 md:pb-0">
    <p>Play N Trade @{new Date().getFullYear()}</p>
    <p>
      Made By
      <ExternalLink
        href={'https://gorhamwebconsulting.com'}
        cssClasses={'font-display playntrade-turquoise'}>Gorham Web Consulting</ExternalLink
      >
    </p>
    <p>
      Icons by <ExternalLink
        href={'https://icons8.com/'}
        cssClasses={'font-display playntrade-turquoise'}>Icon8</ExternalLink
      >
    </p>
  </div>
</div>

<style>
  h3 {
    font-family: 'Oswald', sans-serif;
    font-size: 1.5em;
    color: var(--playntrade-dark-blue);
  }

  p {
    font-family: 'Oswald', sans-serif;
    color: var(--playntrade-dark-blue);
  }

  .facebook-icon {
    vertical-align: middle;
    width: 48px;
    height: 48px;
    background: url('/images/facebook48.png');
    display: inline-table;
  }

  .instagram-icon {
    vertical-align: middle;
    width: 48px;
    height: 48px;
    background: url('/images/instagram48.png');
    display: inline-block;
  }

  .footer-divider {
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.15);
    margin: 2rem 0 1.5rem;
  }

  .footer-legal {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    font-family: 'Oswald', sans-serif;
    font-size: 0.85rem;
  }

  .footer-legal a {
    color: var(--playntrade-turquoise, #22d3ee);
    text-decoration: none;
  }

  .footer-legal a:hover {
    text-decoration: underline;
  }

  .legal-sep {
    color: rgba(255, 255, 255, 0.3);
  }

  div {
    text-align: center;
  }
</style>