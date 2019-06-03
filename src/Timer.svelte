<script>
  export let startDate = Date.now();

  import { onMount, onDestroy, beforeUpdate } from "svelte";

  let elapsed = 0;
  const getSecondsDiff = initial => {
    if (initial <= 0) {
      return 0
    }

    return Math.floor((Date.now() - initial) / 1000);
  };

  const updateSeconds = () => {
    elapsed += 1;
    setTimeout(updateSeconds, 1000);
  };

  onMount(() => {
    elapsed = getSecondsDiff(startDate);
    setTimeout(updateSeconds, 1000);
  });

  onDestroy(() => {
    clearTimeout(updateSeconds);
  });
</script>

{(startDate && elapsed) || ''}
