<style lang="scss">
  li:not(:has(ul)) { cursor: pointer; }
  li:not(:has(ul)):hover { background: #EEE;}
</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<side-bar on:click>
  <ul>
    <li>
      File
      <ul>
        <li>New</li>
        <li>Open</li>
        <li>Save</li>
        <li>Save As</li>
      </ul>
    </li>
    <li>Show data</li>
  </ul>
</side-bar>