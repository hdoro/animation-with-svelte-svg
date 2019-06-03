<script>
  import { onMount, onDestroy } from "svelte";

  import Pacman from "./Pacman.svelte";
  import Shape from "../Shape.svelte";

  import { getRandomInt, getRandomNum, getArrayEntry } from "../utils.js";

  export let increase = () => {
    return;
  };

  // animation constants
  const trackSpeed = getRandomNum(2, 8);
  const eatInterval = trackSpeed * 150;
  const trackSize = 8;
  let shapeCount = getRandomInt(3, trackSize);

  const createShapes = () =>
    Array(trackSize)
      .fill(false)
      .map((success, index) => ({
        size: getRandomInt(3, 8),
        success,
        index
      }));

  // shape-related variables
  let totalGathered = 0;
  let shapes = createShapes();
  let currentIndex = 0;

  // $: trackPosition = Math.floor(currentIndex / trackSize);
  $: wrapperVariables = `
    --trackSpeed: ${trackSpeed}s;
    transform: translate(calc(${Math.floor(
      (currentIndex / (trackSize + 1)) * 10
    )} * (var(--trackHeight) + var(--gridGap))), -50%);
  `;

  const eatShape = () => {
    if (currentIndex >= trackSize) {
      shapeCount = getRandomInt(3, trackSize);
      shapes = createShapes();
      currentIndex = 0;
      setTimeout(eatShape, eatInterval);
      return;
    }

    // Recycle and animate
    shapes = shapes.map(s =>
      s.index === currentIndex ? { ...s, success: true } : s
    );
    currentIndex += 1;
    increase();
    setTimeout(eatShape, eatInterval);
  };

  onMount(() => {
    setTimeout(eatShape, getRandomInt(500, 1100));
  });

  onDestroy(() => {
    clearTimeout(eatShape);
  });
</script>

<style>
  .wrapper {
    --trackHeight: 40px;
    --padingLeft: 50px;
    --gridGap: 10px;
    margin: 40px 0;
    padding: 10px 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, var(--trackHeight));
    grid-template-rows: 1fr;
    align-content: center;
    justify-items: center;
    grid-gap: var(--gridGap);
    overflow: hidden;
    grid-auto-flow: column;
    position: relative;
  }

  .wrapper > span,
  .wrapper :global(.shape) {
    font-size: calc(var(--trackHeight) / 2);
    height: 1em;
    width: 1em;
  }
  span {
    background: #61d197;
    display: block;
  }
  :global(.pacman) {
    height: var(--trackHeight);
    background: rgba(255, 255, 255, 0.7);
  }

  .pacman__wrapper {
    --trackSpeed: 2.5s;
    position: absolute;
    z-index: 1;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    transition: 0.2s transform;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    will-change: transform;
  }
</style>

<div class="wrapper">
  <div class="pacman__wrapper" style={wrapperVariables}>
    <Pacman />
  </div>
  {#each shapes as s, i}
    {#if s.success}
      <span />
    {:else}
      <Shape sideNumber={s.size} selected={shapes[i].selected} index={i} />
    {/if}
  {/each}
</div>
