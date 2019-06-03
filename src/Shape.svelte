<script>
  import { possibleColors } from "./constants.js";
  import { getRandomInt } from "./utils.js";

  export let sideNumber = 3;
  export let index = 0;
  export let selected = false;

  const getStyles = side => (side === sideNumber ? "display: block;" : "");
</script>

<style>
  path {
    display: none;
  }
  svg {
    transition: 0.2s 0.5s ease fill,
      0.8s 0.6s cubic-bezier(0.92, 0.44, 0.4, 1.93) transform;
    opacity: 0.9;
    will-change: fill, transform;
  }
</style>

<svg
  id={`shape-${index}`}
  viewBox="0 0 117 117"
  fill={selected ? 'var(--selected)' : possibleColors[Math.floor(Math.random() * possibleColors.length)]}
  class="shape"
  xmlns="http://www.w3.org/2000/svg"
  style={selected ? `transform: rotate(${getRandomInt(-25, 25)}deg)` : ''}>
  <path d="M56.5 0l48.93 84.75H7.56956L56.5 0z" style={getStyles(3)} />
  <path d="M56.5 0L113 56.5 56.5 113 0 56.5 56.5 0z" style={getStyles(4)} />
  <path
    d="M56.5 0l53.735 39.0405-20.5251 63.1685H23.2901L2.76531 39.0405 56.5 0z"
    style={getStyles(5)} />
  <path
    d="M56.5 0l48.93 28.25v56.5L56.5 113 7.56956 84.75v-56.5L56.5 0z"
    style={getStyles(6)} />
  <path
    d="M56.5 0l44.173 21.2728 10.91 47.7996-30.5686 38.3326H31.9856L1.41657
    69.0724 12.3265 21.2728 56.5 0z"
    style={getStyles(7)} />
  <path
    d="M56.5 0l26.2569 6.47173L102.999 24.4043l9.589 25.2854-3.26
    26.8455-15.3616 22.2557-23.9451 12.5671H42.9787L19.0336 98.7909 3.67158
    76.5352.411949 49.6897 10.0014 24.4043 30.2431 6.47173 56.5 0z"
    style={getStyles(8)} />
</svg>
