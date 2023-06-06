<script>
  import { createEventDispatcher } from 'svelte';
  import { Storage } from './storage';

  export let message;
  let fileName;

  const dispatch = createEventDispatcher();

  function openFile(name, data) {
    dispatch('open-file', {name, data});
  }
  function saveFileAs(fileName) {
    dispatch('save-file-as', {fileName});
  }

  const allFiles = Object.entries(Storage.getAll());
</script>

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
          {#each allFiles as el}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={() => openFile(el[0], el[1])}>{el[0]}</li>
          {/each}
        </ul>
      {:else if message==='getFileName'}
        <input bind:value={fileName}>/>
        <button on:click={() => saveFileAs(fileName)}>Save</button>
      {:else if message}
        {message}
      {/if}
      </div>
    </div>
  </div>
</div>