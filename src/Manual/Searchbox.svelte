<script>
  export let text = 'My competitors'
  export let showSearch = false
</script>

<style>
  div {
    --fill: #a7a7a7;
    border: 2px solid var(--fill);
    padding: 10px 14px;
    display: flex;
    align-items: center;
    font-family: monospace;
    transition: .2s ease color, .2s ease border;
  }
  svg {
    fill: var(--fill);
    width: 2em;
    margin-right: 1em;
  }
</style>

<div style={`color: ${showSearch ? 'var(--dark-grey)' : 'transparent'}; --fill: ${showSearch ? '#a7a7a7' : 'var(--selected)'}`}>
  <svg viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.0104 12.2028c2.53841 2.5384 6.65398 2.5384 9.1924 0 2.5384-2.53842 2.5384-6.65399 0-9.1924-2.53842-2.538404-6.65399-2.538404-9.1924 0-2.538404 2.53841-2.538404 6.65398 0 9.1924zm-.7071.7071c2.92893 2.9289 7.67767 2.9289 10.6066 0 2.9289-2.92893 2.9289-7.67767 0-10.6066-2.92893-2.928935-7.67767-2.928935-10.6066 0-2.928935 2.92893-2.928935 7.67767 0 10.6066z"/>
  <path d="M12.5563 11.8492l9.8995 9.8995-.7071.7071-9.8995-9.8995.7071-.7071z"/>
</svg>
{text}
</div>