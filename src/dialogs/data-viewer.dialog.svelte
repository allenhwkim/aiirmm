<script lang="ts">
  import { onMount } from "svelte";

  let data;
  let bootstrapDialog;
  let dialogEl;

  onMount(() => {
    $$props.id && dialogEl.setAttribute('id', $$props.id);
    $$props.class && dialogEl.classList.add(...$$props.class.split(/\s+/));
    bootstrapDialog= new window['bootstrap'].Modal(dialogEl);
  });
  
  export function show(message: any) {
    data = message;
    bootstrapDialog.show();
  }
</script>

<!-- Data Dialog -->
<div class="modal fade" bind:this={dialogEl} tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Data Viewer</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="dialog-contents">
        <b>chart data </b>
        <json-viewer level="2" data={data?.chartData}></json-viewer>
        <b>chart instance</b>
        <json-viewer data={data?.chartInstance}></json-viewer>
      </div>
    </div>
  </div>
</div>