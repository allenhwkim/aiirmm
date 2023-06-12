<script>
  import { createEventDispatcher } from 'svelte';
  import { Storage } from './storage';

  export let message;

  const dispatch = createEventDispatcher();

  let fileName;
  function getAllFiles() {
    return Object.entries(Storage.getItem('formflows') || []);
  }
  
  function saveFileAs() {
    const sameFileExists = Storage.getItem(`formflows.${fileName}`);
    if (sameFileExists) {
      if (window.confirm(`The same file name "${fileName}" already exists. Do you want to overwrite?`)) {
        dispatch('save-file-as', {fileName});
      }
    } else {
      dispatch('save-file-as', {fileName});
    }
  }
</script>

<style>
  input:not(:valid) + button { opacity: .7; cursor:auto; pointer-events: none; }
</style>

<!-- Data Dialog -->
<div class="modal fade" id="file-dialog" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">File Dialog</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="dialog-contents">
      {#if message ==='listAllFiles'}
        {#if getAllFiles().length}
          <ul>
            {#each getAllFiles() as [name, data]}
              <li>
                nodes: {data.nodes.length}, edges: {data.edges.length}
                <button on:click={() => dispatch('open-file', {name, data})}>{name}</button>
              </li>
            {/each}
          </ul>
        {:else}
          No items to display
        {/if}
      {:else if message==='getFileName'}
        <input bind:value={fileName} required>
        <button on:click={saveFileAs}>Save</button>
      {:else if message}
        {message}
      {/if}
      </div>
    </div>
  </div>
</div>