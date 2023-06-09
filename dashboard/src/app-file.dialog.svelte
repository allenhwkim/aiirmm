<script>
  import { createEventDispatcher } from 'svelte';
  import { Storage } from './storage';

  export let message;

  const dispatch = createEventDispatcher();

  let fileName;
  function getAllFiles() {
    return Object.entries(Storage.getItem('formflows') || []);
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
      {#if message==='listAllFiles'}
        <ul>
          {#each getAllFiles() as [name, data]}
            <li>
              nodes: {data.nodes.length}, edges: {data.edges.length}
              <button on:click={() => dispatch('open-file', {name, data})}>{name}</button>
            </li>
          {/each}
        </ul>
      {:else if message==='getFileName'}
        <input bind:value={fileName} required>
        <button on:click={() => dispatch('save-file-as', {fileName})}>Save</button>
      {:else if message}
        {message}
      {/if}
      </div>
    </div>
  </div>
</div>