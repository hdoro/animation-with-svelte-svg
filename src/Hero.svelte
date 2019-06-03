<style>
  section {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: darken 1s 0.5s forwards;
    margin-bottom: 12rem;
  }

  h1 {
    animation: slideUp 0.5s 0.7s forwards;
    opacity: 0;
    font-size: 6vw;
  }

  @keyframes darken {
    100% {
      background-color: blanchedalmond;
    }
  }

  @keyframes slideUp {
    0% {
      transform: translateY(10vh);
      opacity: 0;
    }
    100% {
      transform: none;
      opacity: 1;
    }
  }
</style>

<section>
  <h1>Impactful hero</h1>
</section>
