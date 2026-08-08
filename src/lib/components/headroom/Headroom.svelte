<script>
  import { run } from 'svelte/legacy';

    // credit to svelte-headroom
  import { createEventDispatcher } from "svelte";
      import validate from "./validation";

  /** @type {{duration?: string, offset?: number, tolerance?: number, children?: import('svelte').Snippet}} */
  let {
    duration = "300ms",
    offset = 0,
    tolerance = 0,
    children
  } = $props();
  let headerClass = $state("pin");
  let lastHeaderClass = $state("pin");
  let y = $state(0);
  let lastY = 0;
  const dispatch = createEventDispatcher();
  function deriveClass(y = 0, scrolled = 0) {
    if (y < offset) return "pin";
    if (!scrolled || Math.abs(scrolled) < tolerance) return headerClass;
    const dir = scrolled < 0 ? "down" : "up";
    if (dir === "up") return "pin";
    if (dir === "down") return "unpin";
    return headerClass;
  }
  function updateClass(y = 0) {
    const scrolledPxs = lastY - y;
    const result = deriveClass(y, scrolledPxs);
    lastY = y;
    return result;
  }
  function action(node) {
    node.style.transitionDuration = duration;
  }

  run(() => {
    validate({ duration, offset, tolerance });
    headerClass = updateClass(y);
    if (headerClass !== lastHeaderClass) {
      dispatch(headerClass);
    }
    lastHeaderClass = headerClass;
  });
  
</script>

<style>
  div {
    position: fixed;
    width: 100%;
    top: 0;
    transition: transform 300ms linear;
    z-index: 100;
  }
  .pin {
    transform: translateY(0%);
  }
  .unpin {
    transform: translateY(-100%);
  }
</style>

<svelte:window bind:scrollY={y} />
<div use:action class={headerClass}>
  {@render children?.()}
</div>