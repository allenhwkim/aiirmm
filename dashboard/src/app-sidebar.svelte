<style lang="scss">
  li:not(:has(ul)) { cursor: pointer; }
  li:not(:has(ul)):hover { background: #EEE;}
</style>

<side-bar on:click on:keydown>
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