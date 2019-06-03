<script>
  import { onMount, onDestroy } from "svelte";

  import Searchbox from "./Searchbox.svelte";
  import Shape from "./Shape.svelte";
  import Cursor from "./Cursor.svelte";

  // constants
  const shapeCount = 6;
  const changeTimeout = 3000;

  // 3 <= num <= 8
  let shapeSizes = Array(shapeCount)
    .fill(0)
    .map(() => 3 + Math.floor(Math.random() * shapeCount));
  let activeShapes = Array(shapeCount).fill(false);
  let currentShape = 0;

  $: currentPos = document.getElementById(`shape-${currentShape}`)
    ? document.getElementById(`shape-${currentShape}`).getBoundingClientRect()
    : undefined;

  const pickShape = () => {
    const chosenIndex = Math.ceil(Math.random() * shapeCount) - 1;
    activeShapes = activeShapes.map((_n, i) =>
      i === chosenIndex ? !activeShapes[i] : activeShapes[i]
    );
    currentShape = chosenIndex;
    setTimeout(pickShape, changeTimeout);
  };
  // $: cursorPos = () => {
  //   const shape = document.getElementById(`shape-${currentShape}`);
  //   console.log(shape);
  //   return 0
  // }

  onMount(() => {
    setTimeout(() => {
      pickShape();
    }, 500);
  });
  onDestroy(() => {
    clearTimeout(pickShape);
  });
</script>

<style>
  section {
    max-width: 1200px;
    margin: 6rem auto;
    display: flex;
    align-items: center;
  }
  .right {
    max-width: 25em;
    margin-left: 5vw;
    font-size: 21px;
  }
  .left {
    flex: 1 0 250px;
    max-width: calc((50px + 5vw) * 4);
    font-family: monospace;
  }
  .shapes {
    position: relative;
    margin-top: 25px;
    display: grid;
    grid-template-columns: repeat(auto-fill, calc(50px + 5vw));
    grid-gap: 15px;
    --cursor-left: 0px;
    --cursor-top: 0px;
  }

  .shapes :global(.cursor) {
    width: 2vw;
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(var(--cursor-left), var(--cursor-top));
    will-change: transform;
    transition: .5s ease transform;
  }

  .box {
    background:#F5E8A3;
    text-align: center;
  }
</style>

<section>
  <div class="left">
    <Searchbox />
    <div
      class="shapes"
      id="shapes"
      style={`
        --cursor-left: ${currentPos && currentPos.left ? currentPos.left - document.getElementById('shapes').getBoundingClientRect().left + currentPos.width / 2 : '-100vw'}px;
        --cursor-top: ${currentPos && currentPos.top ? currentPos.top - document.getElementById('shapes').getBoundingClientRect().top + currentPos.height / 2 : '-100vh'}px
      `}>
      {#each shapeSizes as num, i}
        <Shape
          sideNumber={num}
          selected={activeShapes[i]}
          index={i} />
      {/each}
      <Cursor />
    </div>
    <div class="box">110 data point per hour</div>
    <span>and you still need to standardize and analyse them</span>
    <!-- Animation stuff -->
  </div>
  <div class="right">
    <h2>Manually gathering data is hard</h2>
    <p>
      To back-up important decisions, you need a lot of quality, standardized
      data, and this takes time and effort to gather.
    </p>
  </div>
</section>
