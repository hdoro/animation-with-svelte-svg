<style>
  svg {
    fill: #FBC531;
    --animDur: .4s;
  }

  path {
    opacity: 0;
  }

  .mid {
    /* animation: blink var(--animDur) steps(1) infinite; */
    /* animation: blink var(--animDur) calc((var(--animDur) * -1) / 3)s steps(1) infinite; */
    animation: blink var(--animDur) calc(var(--animDur) / 3) steps(1) infinite;
  }
  .open {
    /* animation: blink var(--animDur) -2s steps(1) infinite; */
    animation: blink var(--animDur) calc(var(--animDur) * 2 / 3) steps(1) infinite;
  }
  .closed {
    animation: blink var(--animDur) var(--animDur) steps(1) infinite;
  }
  
  @keyframes blink {
    66% {
      opacity: 1;
    }
  }
</style>

<svg class="pacman" viewBox="0 0 52 52">
  <path class="closed" d="M36 52H16v-4H8v-4H4v-8H-.0000014l-.0000017-20H4V8h4V4h8V.0000031l20-.0000017V4h8v4h4v8h4v20h-4v8h-4v4h-8v4z"/>
  <path class="mid" d="M36 52H16v-4H8v-4H4v-8H-.0000014l-.0000017-20H4V8h4V4h8V.0000028L36 .000001V4h8v4h4v8h-8v4H28v4H16v4h12v4h12v4h8v8h-4v4h-8v4z"/>
  <path class="open" d="M36 52H16v-4H8v-4H4v-8H-.0000014l-.0000017-20H4V8h4V4h8V.0000017L36 0v8h-4v4h-4v4h-4v4h-4v4h-4v4h4v4h4v4h4v4h4v4h4v8z"/>
</svg>
