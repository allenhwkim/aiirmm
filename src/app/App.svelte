<style>
  :global(html, body) { height: 100% }
  #monaco-editor { height: 100%; }
  #monaco-editor x-monaco { height: 100%; }
  .accordion-body { height: 100%; }
</style>

<script lang="ts">
  import { onMount } from 'svelte';

  import SideBar from '../Sidebar.svelte';
  import DataViewerDialog from '../dialogs/data-viewer.dialog.svelte';
  import OpenSaveFileDialog from '../dialogs/open-save-file.dialog.svelte';
  import { name, selected, chart } from '../store/store';
  import { chartEventHandler } from './chart-event-handler';

  $: selectedId = $selected?.id;
  $: selectedType = $selected?.source ? 'case' : 'form';
  $: selectedLabel = $selected?.data?.label || $selected?.label || $selected?.id || '';

  onMount(() => {
    const chartEl = document.querySelector('.x.formflow') as any;
    const formDesigner = document.querySelector('.x.form-designer') as any;
    formDesigner.editor.on('update', function() {  // html is updated
      const html = formDesigner.html.replace(/^<body>/,'').replace(/<\/body>$/,''); 
      ($selected.type === 'custom') && chartEl.updateNodeData(selectedId, {html})
    });

    chartEl.setData($chart);
  });

  document.body.addEventListener('formflow', e => chartEventHandler(e));
  
  window.addEventListener('resize', e => {
    (document.querySelector('.x.formflow') as any).getInstance().fitView();
  })

  document.body.addEventListener('resize-move', e => { // x-resize event handler
    (document.querySelector('.x.formflow') as any).getInstance().fitView();
  })

  document.body.addEventListener('monaco-change', (e:any) => { // monaco editor change handler
    console.log(e.detail);
  });

  let dataViewerDialog, openSaveFileDialog;
  document.body.addEventListener('sidebar-message', (event: any) => { // sidebar message handler
    if (event.detail === 'show-data') {
     const chartEl = document.querySelector('.x.formflow') as any;
     dataViewerDialog.show({chartData: chartEl.getData(), chartInstance: chartEl.getInstance()})
    }
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
      <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#form-designer">
          {selectedLabel} {selectedType}
        </button>
      </h2>
      <div id="form-designer" class="accordion-collapse collapse" data-bs-parent="#right-section">
        <div class="accordion-body p-0 py-1">
          <x-formdesigner></x-formdesigner>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#monaco-editor">
          {selectedLabel} properties
        </button>
      </h2>
      <div id="monaco-editor" class="accordion-collapse collapse" data-bs-parent="#right-section">
        <div class="accordion-body">
          <x-monaco data-language="json"></x-monaco>
        </div>
      </div>
    </div>
  </div>
</x-resize>

<DataViewerDialog bind:this={dataViewerDialog}></DataViewerDialog> 
<OpenSaveFileDialog bind:this={openSaveFileDialog}></OpenSaveFileDialog>
