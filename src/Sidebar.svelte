<style>
  li:not(:has(ul)) { cursor: pointer; }
  li:not(:has(ul)):hover { background: #EEE;}
</style>

<script lang="typescript">
  let thisEl;
  
  function showData() {
    thisEl.dispatchEvent(new CustomEvent('sidebar-message', {bubbles: true, detail: 'show-data'}));
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<x-sidebar bind:this={thisEl}>
  <ul>
    <li>
      File
      <ul>
      </ul>
    </li>
    <li on:click={showData}>Show data</li>
  </ul>
</x-sidebar>