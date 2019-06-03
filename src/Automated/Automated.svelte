<script>
  import Track from './Track.svelte'
  import Timer from "../Timer.svelte";


  let totalGathered = 0;

  const increaseGathered = () => totalGathered += 1;
</script>

<style>
  section {
    max-width: 1200px;
    margin: 10rem auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
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
  .count {
    background: rgb(97, 209, 151, 0.5);
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

  .text_center {
    text-align: center;
    margin-top: 0.5rem;
  }
</style>

<section>
  <div class="left">
    <Track increase={increaseGathered} />
    <Track increase={increaseGathered} />
    <Track increase={increaseGathered} />
    <div class="count__wrapper">
      <div class="count">
      {totalGathered} consolidated data points in <Timer /> seconds
      </div>
      <p class="text_center">Ready to be analyzed!</p>
    </div>
  </div>
  <div class="right">
    <h2>We deploy robots to do this job for you, at scale.</h2>
    <p>
      Enjoy standardized data from several sources around the web and get actionable insights that will drive your company forward.
    </p>
  </div>
</section>