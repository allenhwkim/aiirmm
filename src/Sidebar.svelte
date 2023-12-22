<style lang="scss">
  li:not(:has(ul)) { cursor: pointer; }
  li:not(:has(ul)):hover { background: #EEE;}
</style>

<script lang="typescript">
  import { createEventDispatcher } from 'svelte';
  import formflow, {FormFlow} from './store/';

  const dispatch = createEventDispatcher();
  
  function showData() {
    const chartEl = $formflow.chartEl;
    dispatch('message', {
      dataMessage: {
        chartData: chartEl.getData(),
        chartInstance: chartEl.getInstance()
      }
    });
  }

  function newFile() {
    if ($formflow.modified === true) {
      dispatch('message', {fileMessage: 'The current formflow is modified, but not saved. Please save.'});
    } else {
      $formflow.removeStorage('formflow');
      const chartEl = $formflow.chartEl;
      $formflow = new FormFlow(undefined, chartEl);
      dispatch('message', {fileMessage: 'A new file is opened'});
    }
  }

  function openFile() {
    if ($formflow.modified === true && $formflow.name !== 'Untitled') {
      const fileMessage = 'The current formflow is modified, but not saved. Please save.';
      dispatch('message', {fileMessage});
    } else {
      dispatch('message', {fileMessage: 'LIST_ALL_FILES'});
    }
  }

  function saveFile() {
    if ($formflow.name === 'Untitled') {
      dispatch('message', {fileMessage: 'GET_FILE_NAME'})
    } else {
      $formflow.save();
      dispatch('message', {fileMessage: 'File is saved'});
    }
  }

  function saveFileAs() {
    dispatch('message', {fileMessage: 'GET_FILE_NAME'})
  }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<x-sidebar>
  <ul>
    <li>
      File
      <ul>
        <li on:click={newFile}>New</li>
        <li on:click={openFile}>Open</li>
        <li on:click={saveFile}>Save</li>
        <li on:click={saveFileAs}>Save As</li>
      </ul>
    </li>
    <li on:click={showData}>Show data</li>
  </ul>
</x-sidebar>