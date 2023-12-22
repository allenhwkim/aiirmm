<script lang="typescript">
  import { onMount } from 'svelte';
  // import type { Formflow as XFormflow } from 'elements-x';
  // import formflow, {FormFlow} from '../store/';

  let message: string;
  // let fileName: string;
  let bootstrapDialog: any;
  let dialogEl;

  onMount(() => {
    $$props.id && dialogEl.setAttribute('id', $$props.id);
    $$props.class && dialogEl.classList.add(...$$props.class.split(/\s+/));
    bootstrapDialog= new (window as any).bootstrap.Modal(dialogEl);
  });

  export function show(param: any) {
    message = param;
    bootstrapDialog.show();
  }

  // function getAllFiles() {
  //   return $formflow.getStorage('formflows') || [];
  // }
  
  // function openFile(formFile: any) { // file dialog event handler
  //   const chartEl: XFormflow = $formflow.chartEl;
  //   $formflow = new FormFlow(formFile, chartEl);
  //   message = `File ${$formflow.name} opened`;
  // }

  // function saveFileAs() {
  //   const allFormflows = $formflow.getStorage('formflows') || []; // returns array
  //   const index = allFormflows.findIndex( el => el.name === fileName);
  //   const confirmed = index === -1 ? 
  //     true : window.confirm(`The same file name "${fileName}" already exists. Do you want to overwrite?`);
  //   if (confirmed) {
  //     $formflow.name = fileName;
  //     $formflow.save();
  //     $formflow.modified = false;
  //     message = `Saved file as "${fileName}"`;
  //   }
  // }
</script>

<style>
  /* input:not(:valid) + button { opacity: .7; cursor:auto; pointer-events: none; } */
</style>

<!-- Data Dialog -->
<div class="modal fade" bind:this={dialogEl} tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">File Dialog</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="dialog-contents">
      {#if message ==='LIST_ALL_FILES'}
        <!-- {#if getAllFiles().length}
          <ul>
            {#each getAllFiles() as file}
              <li>
                nodes: {file.chart.nodes.length}, edges: {file.chart.edges.length}
                <button on:click={() => openFile(file)}>{file.name}</button>
              </li>
            {/each}
          </ul>
        {:else}
          No items to display
        {/if} -->
      {:else if message==='GET_FILE_NAME'}
        <!-- <input bind:value={fileName} required> -->
        <!-- <button on:click={saveFileAs}>Save</button> -->
      {:else if message}
        {message}
      {/if}
      </div>
    </div>
  </div>
</div>