<script>
  import Manual from "./Manual/Manual.svelte";
  import Automated from "./Automated/Automated.svelte";
  import Hero from "./Hero.svelte";
</script>

<style>
  :global(:root) {
    --dark-grey: #1a1a1a;
    --unselected: #e0e0e0;
    --selected: #3b1bb9;
  }
</style>

<Hero />

<Manual />

<Automated />
