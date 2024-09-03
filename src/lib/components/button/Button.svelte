<script>
  import { goto } from '$app/navigation';
  export let text = '';
  export let route = '';
</script>

<div class="flex justify-center">
  <button class="button" on:click={goto(route)}>
    <div class="bg-container">
      <div class="bg-circle" />
    </div>
    <div class="front">
      <span>{text}</span>
    </div>
  </button>
</div>

<style>
  button {
    appearance: none;
    background: transparent;
    border: none;
    cursor: pointer;
    isolation: isolate;
    width: 40%;
  }

  .button {
    isolation: isolate;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--playntrade-turquoise);
    border-radius: 9999rem;
    background: black;
    position: relative;
    cursor: pointer;
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  .button > .bg-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border-radius: inherit;
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: -1;
  }

  .button > .bg-container > .bg-circle {
    width: 150%;
    aspect-ratio: 1;
    background: white;
    border-radius: 50%;
    position: absolute;
    transform: translate(60%, 60%);
    filter: blur(60px);
    transition: 500ms ease;
  }

  .button > .front {
    color: white;
    padding-block: 12px;
    padding-inline: 24px 120px;
    border-radius: inherit;
    transition: 200ms ease;
  }

  .button:hover .bg-circle,
  .button:focus .bg-circle {
    transition: transform 1s ease;
    transform: translate(0, 0);
  }

  .button:hover > .front,
  .button:focus > .front {
    color: hsl(0deg, 0%, 10%);
  }

  .button:focus-visible {
    outline-color: white;
  }
</style>
