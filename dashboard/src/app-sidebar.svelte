<script lang='ts'>
  import { beforeUpdate } from "svelte";

  export let chartEl: any;
  export let dataDialogEl: any;

  function openAppDataDialog() {
    new (window as any).bootstrap.Modal(document.querySelector('#dialog')).toggle();
    dataDialogEl.reactflowData.data = chartEl.getData();
    dataDialogEl.reactflowInstance.data = chartEl.getInstance();
  }
  
  beforeUpdate(() => {
    console.log({chartEl, dataDialogEl})
  })
</script>

<style lang="scss"></style>

<side-bar>
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
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li on:click={openAppDataDialog}>
      Show data
    </li>
  </ul>
</side-bar>