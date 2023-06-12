<script lang='ts'>
  import type { FormDiagram } from '@formflow/elements/src';
  import { onMount } from 'svelte';

  import AppSideBar from './app-sidebar.svelte';
  import AppDataDialog from './app-data.dialog.svelte';
  import AppFileDialog from './app-file.dialog.svelte';
  import { FormflowFile } from './formflow-file';
  import { Storage } from './storage';

  const dq = document.querySelector.bind(document);
  const dqa = document.querySelectorAll.bind(document);

  let chartEl: FormDiagram;
  let dataDialogData: any = {};
  let fileDialogMessage: string;
  let currentFile: FormflowFile;
  let fileDialog: any, dataDialog: any;

  onMount(() => {
    currentFile ||= new FormflowFile(chartEl);
    dataDialog = new (window as any).bootstrap.Modal(document.querySelector('#data-dialog'));
    fileDialog = new (window as any).bootstrap.Modal(document.querySelector('#file-dialog'));
  });

  function handleReactflowEvent(e: any) {
    const {action, type, node, edge} = e.detail;
    const id = node?.id || edge?.id || '';
    console.log('handleReactflowEvent', {type, action, node, edge});

    dq('#event-type').innerText = type || '';
    dq('#event-id').innerText = id;
    dq('#event-label').innerText = node?.data?.label || edge?.data?.label || '';
    dq('#event-action').innerText = action || '';
    dq('#event-detail').innerText = (node || edge) ? JSON.stringify(node || edge, null, '  ') : '';

    dqa('.collapse.show').forEach(el => new (window as any).bootstrap.Collapse(el));

    if (action === 'init') {
      const {nodes, edges} = chartEl.getData();
      const node = nodes.find(el => el.id === 'start');
      chartEl.fireEvent({action: 'selected', type: 'node', node, nodes, edges})
    } else if (node?.type === 'start' || node?.type === 'end') {
      new (window as any).bootstrap.Collapse(dq('#properties'));
    } else if (node?.type === 'custom') {
      new (window as any).bootstrap.Collapse(dq('#form-designer'));
      setTimeout(() => Storage.setItem('currentFormflow.data', chartEl.getData()));
      currentFile.modified = true;
    } else if (edge?.type === 'custom') {
      new (window as any).bootstrap.Collapse(dq('#properties'));
      setTimeout(() => Storage.setItem('currentFormflow.data', chartEl.getData()));
      currentFile.modified = true;
    }
  }

  function handleSideBarClick(event: any) {
    const command = event.target.innerText;
    if (command === 'Show data') {
      dataDialogData.reactflowData = chartEl.getData();
      dataDialogData.reactflowInstance = chartEl.getInstance();
      dataDialog.show();
    } else if (command === 'New') {
      if (currentFile.modified === true) {
        fileDialogMessage = 'The current formflow is modified, but not saved. Please save.';
        fileDialog.show();
      } else {
        Storage.removeItem('currentFormflow');
        currentFile = new FormflowFile(chartEl);
        fileDialogMessage = 'A new file is opened';
        fileDialog.show();
      }
    } else if (command === 'Open') {
      if (currentFile.modified === true && currentFile.name !== 'Untitled') {
        fileDialogMessage = 'The current formflow is modified, but not saved. Please save.';
        fileDialog.show();
      } else {
        fileDialogMessage = 'listAllFiles';
        fileDialog.show();
      }
    } else if (command === 'Save' && currentFile.name === 'Untitled') {
      fileDialogMessage = 'getFileName';
      fileDialog.show(); // will call saveFileAs(newFileName)
    } else if (command === 'Save As') {
      fileDialogMessage = 'getFileName';
      fileDialog.show(); // will call saveFileAs(newFileName)
    } else if (command === 'Save') {
      currentFile.save();
      fileDialogMessage = 'listAllFiles';
    } else {
      console.log('handleSidebarClick', {currentFile, command})
    }
  }

  function openFile(event) { // file dialog event handler
    currentFile.name = event.detail.name;
    currentFile.data = event.detail.data;
    fileDialogMessage = `File ${currentFile.name} opened`;
  }

  function saveFileAs(event) { // file dialog event handler
    currentFile.name = event.detail.fileName;
    currentFile.save();
    fileDialogMessage = `Saved file as "${currentFile.name}""`;
    currentFile.modified = false;
  }
</script>

<style lang="scss"></style>

<svelte:window on:resize={() => chartEl.getInstance().fitView()} />

<button data-x-target="sidebar" class="position-absolute top-0 start-0 border-0 fs-4" style="z-index: 1">☰</button>
<h1 hidden>Form Flow Dashboard</h1> <!--for a11y-->

<AppSideBar on:click={handleSideBarClick}></AppSideBar>

<resize-divs width class="h-100" on:resize-move={() => chartEl.getInstance().fitView()}>
  <div class="position-relative" style="width: 33%">
    <form-diagram bind:this={chartEl} on:reactflow={handleReactflowEvent}></form-diagram>
  </div>
  <div class="accordion flex-fill" id="right-section" role="navigation">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#properties">
          Properties of "{currentFile?.name || 'Untitled'}"
        </button>
      </h2>
      <div id="properties" class="accordion-collapse collapse" data-bs-parent="#right-section">
        <div class="accordion-body">
          <span id="event-type"></span>
          <span id="event-id"></span>
          <span id="event-label"></span>
          <span id="event-action"></span>
          <pre id="event-detail"></pre>
        </div>
        <pre>
          todo 2
          * save htmlcss by nodeId to a sessionStorage
          * restore htmlcss when node is clicked from sessionStorage
        </pre>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#form-designer">
          Form Designer 
        </button>
      </h2>
      <div id="form-designer" class="accordion-collapse collapse" data-bs-parent="#right-section">
        <div class="accordion-body p-0 py-1">
          <form-designer></form-designer>
        </div>
      </div>
    </div>
  </div>
</resize-divs>

<AppDataDialog data={dataDialogData}></AppDataDialog>
<AppFileDialog 
  message={fileDialogMessage} 
  on:open-file={openFile} 
  on:save-file-as={saveFileAs}>
</AppFileDialog>
