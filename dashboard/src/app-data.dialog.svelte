<script>
  export let reactflowData='', reactflowInstance='';
</script>

<style lang="scss"></style>

<svelte:options accessors/>

<!-- Modal -->
<div class="modal fade" id="dialog" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="dialog-contents">
        <b>reactflow data </b>
        <json-viewer level="2" bind:this={reactflowData}></json-viewer>
        <b>reactflow instance</b>
        <json-viewer bind:this={reactflowInstance}></json-viewer>
      </div>
    </div>
  </div>
</div>