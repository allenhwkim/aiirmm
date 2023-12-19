<style lang="scss">
  li:not(:has(ul)) { cursor: pointer; }
  li:not(:has(ul)):hover { background: #EEE;}
</style>

<script lang="typescript">
  import { createEventDispatcher } from 'svelte';
  import { StepperStorage } from 'elements-x';
  import currentFile from './store';
  import { CurrentFile } from './current-file';

  const dispatch = createEventDispatcher();
  
  function showData() {
    const chartEl = $currentFile.chartEl;
    dispatch('message', {
      dataMessage: {
        reactflowData: chartEl.getData(),
        reactflowInstance: chartEl.getInstance()
      }
    });
  }

  function newFile() {
    if ($currentFile.modified === true) {
      dispatch('message', {fileMessage: 'The current formflow is modified, but not saved. Please save.'});
    } else {
      StepperStorage.removeItem('currentFormflow');
      const chartEl = $currentFile.chartEl;
      $currentFile = new CurrentFile(undefined, chartEl);
      dispatch('message', {fileMessage: 'A new file is opened'});
    }
  }

  function openFile() {
    if ($currentFile.modified === true && $currentFile.name !== CurrentFile.DEFAULT_NAME) {
      const fileMessage = 'The current formflow is modified, but not saved. Please save.';
      dispatch('message', {fileMessage});
    } else {
      dispatch('message', {fileMessage: 'LIST_ALL_FILES'});
    }
  }

  function saveFile() {
    if ($currentFile.name === CurrentFile.DEFAULT_NAME) {
      dispatch('message', {fileMessage: 'GET_FILE_NAME'})
    } else {
      $currentFile.save();
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