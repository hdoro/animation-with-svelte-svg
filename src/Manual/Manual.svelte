<script>
  import { onMount, onDestroy } from "svelte";

  import Searchbox from "./Searchbox.svelte";
  import Shape from "../Shape.svelte";
  import Cursor from "./Cursor.svelte";
  import Timer from "../Timer.svelte";

  import { getRandomInt, getArrayEntry } from "../utils.js";
  import { getSearchText } from "../constants.js";

  // constants
  const shapeCount = 6;
  const newSearchTimeout = 2000;

  const createShapes = () =>
    Array(shapeCount)
      .fill(false)
      .map((selected, index) => ({
        size: getRandomInt(3, 8),
        selected,
        index
      }));

  // shape-related variables
  let totalGathered = 0;
  let shapes = createShapes();
  let currentIndex = 0;
  // How many more shapes before shuffling shapes again?
  let remainingPicks = getRandomInt(2, shapeCount - 1);
  // Used to toggle between search and shape-choosing states
  let showingShapes = false;
  // Animation won't start if startMoment = 0
  let startMoment = 0;
  // used for disabling transitions when off-screen
  let isOnScreen = false;
  // Text to show in the Searchbox
  let searchText = getSearchText();
  let showSearch = false;

  // reactive declaration to get current shape's info
  $: currentPos = document.getElementById(`shape-${currentIndex}`)
    ? document.getElementById(`shape-${currentIndex}`).getBoundingClientRect()
    : undefined;

  const getTimeout = () => getRandomInt(1000, 2000);

  const resetShapes = () => {
    showingShapes = false;
    shapes = createShapes();
    remainingPicks = getRandomInt(2, shapeCount - 1);

    setTimeout(() => {
      showSearch = false;
    }, 400);

    setTimeout(() => {
      searchText = getSearchText();
      showSearch = true;
    }, newSearchTimeout - 500);

    // start showing search instead of shapes. After timeout
    // go back to shapes and re-start the cycle.
    setTimeout(() => {
      showingShapes = true;
      pickShape();
    }, newSearchTimeout);
  };

  const pickShape = () => {
    if (remainingPicks === 0) {
      resetShapes();
      return;
    }
    const notPicked = shapes.filter(s => s.selected === false);
    const nextShape = getArrayEntry(notPicked);

    shapes = shapes.map(s =>
      s.index === nextShape.index ? { ...s, selected: true } : s
    );
    remainingPicks -= 1;
    totalGathered += 1;
    currentIndex = nextShape.index;

    // Replay
    setTimeout(pickShape, getTimeout());
  };

  // start the animation when the element gets into the screen
  onMount(() => {
    const section = document.getElementById("manual-section");
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // if we already had the first intersection, startMoment !== 0,
            // then we want to skip any other processes
            isOnScreen = true;
            if (startMoment !== 0) {
              return;
            }

            // Else, it's our first time and we want to kick-start the animation
            startMoment = Date.now();
            showSearch = true;
            setTimeout(() => {
              showingShapes = true;
              pickShape();
            }, newSearchTimeout);
          } else {
            isOnScreen = false;
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(section);
  });

  // Clear the timeout before destroying the component to
  // prevent memory leaks
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
    flex-wrap: wrap;
    justify-content: center;
  }
  section.disabled :global(*) {
    transition: none;
  }

  section.hidden :global(.cursor) {
    opacity: 0;
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
    grid-template-columns: repeat(auto-fill, minmax(calc(50px + 5vw), 1fr));
    grid-gap: 15px;
    --cursor-left: 0px;
    --cursor-top: 0px;
  }
  .shapes > :global(.shape) {
    animation: leave 0.5s 0.3s ease forwards reverse;
  }

  .shapes.hidden > :global(.shape) {
    animation: leave 0.5s ease forwards;
  }

  @keyframes leave {
    100% {
      /* transform: rotate(180deg) scale(0); */
      opacity: 0;
    }
  }

  .shapes :global(.cursor) {
    width: 2vw;
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(var(--cursor-left), var(--cursor-top));
    will-change: transform;
    transition: 0.5s ease transform, 0.2s ease opacity;
  }

  .count {
    background: #f5e8a3;
    text-align: center;
    padding: 0.75em 1.5em;
    font-size: 1.25em;
  }

  .count__wrapper {
    margin-top: 1.5rem;
    transition: 0.8s ease;
    will-change: transform, opacity;
    /* transform: none; */
  }
  .count__wrapper.hidden {
    transform: scale(0.5);
    opacity: 0;
  }

  .text_center {
    text-align: center;
    margin-top: 0.5rem;
  }
</style>

<section
  id="manual-section"
  class={`${startMoment === 0 ? 'hidden' : 'shown'} ${isOnScreen ? '' : 'disabled'}`}>
  <div class="left">
    <Searchbox text={searchText} {showSearch} />
    <div
      class={`shapes ${showingShapes ? '' : 'hidden'}`}
      id="shapes"
      style={`
        --cursor-left: ${!showingShapes ? '50px' : currentPos && currentPos.left ? `${currentPos.left - document
                  .getElementById('shapes')
                  .getBoundingClientRect().left + currentPos.width / 2}px` : '-100vw'};
        --cursor-top: ${!showingShapes ? '-50px' : currentPos && currentPos.top ? `${currentPos.top - document
                  .getElementById('shapes')
                  .getBoundingClientRect().top + currentPos.height / 2}px` : '-100vh'};
      `}>
      {#each shapes as s, i}
        <Shape sideNumber={s.size} selected={shapes[i].selected} index={i} />
      {/each}
      <Cursor />
    </div>
    <div class={`count__wrapper ${totalGathered > 1 ? 'shown' : 'hidden'}`}>
      <div class="count">
         {totalGathered} data points in
        <Timer startDate={startMoment} />
        seconds
      </div>
      <p class="text_center">(and you still need to consolidate them)</p>
    </div>
  </div>
  <div class="right">
    <h2>Manually gathering data is hard</h2>
    <p>
      To back-up important decisions, you need a lot of quality, standardized
      data, and this takes time and effort to gather.
    </p>
  </div>
</section>
