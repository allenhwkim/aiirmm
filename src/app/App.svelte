<style>
  :global(html, body) { height: 100% }
  #monaco-editor { height: 100%; }
  #monaco-editor x-monaco { height: 100%; }
  .accordion-body { height: 100%; }
</style>

<script>
  // @ts-nocheck
  import { onMount } from 'svelte';

  import SideBar from '../Sidebar.svelte';
  import DataViewerDialog from '../dialogs/data-viewer.dialog.svelte';
  import OpenSaveFileDialog from '../dialogs/open-save-file.dialog.svelte';
  import formflow from '../store';
  import { chartEventHandler } from './chart-event-handler';

  $: selectedId = $formflow.selected?.id;
  $: selectedType = $formflow.selected?.source ? 'EDGE' : 'NODE';
  $: selectedLabel = $formflow.selected?.data?.label || $formflow.selected?.label || '';

  onMount(() => {
    const chartEl = document.querySelector('.x.formflow');
    const formDesigner = document.querySelector('.x.form-designer');
    formDesigner.editor.on('update', function() {  // html is updated
      const html = formDesigner.getHtml().replace(/^<body>/,'').replace(/<\/body>$/,''); 
      selectedType === 'NODE' && chartEl.updateNodeData(selectedId, {html})
    });

    $formflow.setChartEl(chartEl);
  });

  document.body.addEventListener('reactflow', e => chartEventHandler(e, $formflow));
  
  window.addEventListener('resize', e => {
    document.querySelector('.x.formflow').getInstance().fitView();
  })

  document.body.addEventListener('resize-move', e => { // x-resize event handler
    document.querySelector('.x.formflow').getInstance().fitView();
  })

  document.body.addEventListener('monaco-change', e => { // monaco editor change handler
    console.log(e.detail);
  });

  document.body.addEventListener('message', event => { // sidebar message handler
    const {dataMessage, fileMessage} = event.detail;
    fileMessage && 
      document.querySelector('#open-save-file-dialog').show(fileMessage);
    dataMessage && 
      document.querySelector('#data-viewer-dialog').show(dataMessage);
  });

</script>

<button class="sidebar toggle position-absolute top-0 start-0 border-0 fs-4" style="z-index: 1">☰</button>
<h1 hidden>Form Flow Dashboard</h1> <!--for a11y-->

<SideBar></SideBar>

<x-resize width class="h-100">
  <div class="position-relative" style="width: 33%">
    <x-formflow></x-formflow>
  </div>
  <div class="accordion flex-fill" id="right-section" role="navigation">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#monaco-editor">
           Properties of {selectedType.toLowerCase()} "{$formflow?.name || 'Untitled'}" - "{selectedLabel}"
        </button>
      </h2>
      <div id="monaco-editor" class="accordion-collapse collapse" data-bs-parent="#right-section">
        <div class="accordion-body">
          <x-monaco data-language="json"></x-monaco>
        </div>
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
          <x-formdesigner></x-formdesigner>
        </div>
      </div>
    </div>
  </div>
</x-resize>

<DataViewerDialog id="data-viewer-dialog"></DataViewerDialog> 
<OpenSaveFileDialog id="open-save-file-dialog"></OpenSaveFileDialog>
