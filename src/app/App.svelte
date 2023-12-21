<style>
  :global(html, body) { height: 100% }
  #node-edge-data { height: 100%; }
  .accordion-body { height: 100%; }
  #node-edge-data x-monaco { height: 100%; }
</style>

<script lang='ts'>
  import type { FormDesigner, Monaco, Formflow as XFormflow } from 'elements-x';
  import { StepperStorage } from 'elements-x';
  import { onMount } from 'svelte';
  import equal from 'fast-deep-equal';

  import SideBar from '../Sidebar.svelte';
  import DataViewerDialog from '../dialogs/data-viewer.dialog.svelte';
  import OpenSaveFileDialog from '../dialogs/open-save-file.dialog.svelte';
  import formflow from '../store';
  // import { setForm } from './app';

  let chartEl: XFormflow;          // <x-formflow>
  let formDesigner: FormDesigner; // <x-formdesigner>
  let monacoEditor: Monaco;       // <x-monaco>

  let sidebarEl: SideBar;
  let dataViewerDialog: DataViewerDialog;
  let openSaveFileDialog: OpenSaveFileDialog;

  $: selectedId = $formflow.selected?.id;
  $: selectedType = $formflow.selected?.source ? 'EDGE' : 'NODE';
  $: selectedLabel = $formflow.selected?.data?.label || $formflow.selected?.label || '';

  onMount(() => {
    $formflow.setChartEl(chartEl);
    formDesigner.editor.on('update', function() {  // html is updated
      const html = formDesigner.getHtml().replace(/^<body>/,'').replace(/<\/body>$/,''); 
      selectedType === 'NODE' && chartEl.updateNodeData(selectedId, {html})
    });
  });

  function handleMonacoChange(e: any) { 
    console.log(e.detail);
  }

  function handleSideBarMessage(event: any) {
    const {dataMessage, fileMessage} = event.detail;
    fileMessage && openSaveFileDialog.show(fileMessage);
    dataMessage && dataViewerDialog.show(dataMessage);
  }

  function showTab(id) {
    const nodeEdgeDataSection: any = document.querySelector('.accordion-item:has(#node-edge-data)');
    const formDesignerSection: any = document.querySelector('.accordion-item:has(#form-designer)');
    const bootstrap = (window as any).bootstrap;
    if (id === 'node-edge-data') {
      formDesignerSection.style.display = 'none';
      nodeEdgeDataSection.style.height = '100%';
    } else {
      formDesignerSection.style.display = '';
      nodeEdgeDataSection.style.height = 'auto';
    }
    
    // collapse all bootstrap accordions, then show only selected one
    document.querySelectorAll('.collapse.show').forEach(el => new bootstrap.Collapse(el));
    new bootstrap.Collapse(document.getElementById(id));
  }

  function handleReactflowEvent(e: any) {
    const {action, type, node, edge} = e.detail;
    if (action === 'init') { // when init, select the start node
      (window as any).reactflow = chartEl.getInstance();
      (window as any).reactflow.zoomOut();
      showTab('node-edge-data');

      const {nodes, edges} = chartEl.getData();
      const node = nodes.find(el => el.id === 'start');
      chartEl.fireEvent({action: 'selected', type: 'node', node, nodes, edges})
    } else if (action === 'selected') { 
      $formflow.selected = node || edge;

      const editorValue = 
        node?.data?.props || edge?.data?.props || {id: node?.id || edge?.id};
      monacoEditor.setValue(JSON.stringify(editorValue, null, '  '));
      if (node?.type === 'start') {
        showTab('node-edge-data');
      } else if (node?.type === 'end') {
        showTab('node-edge-data');
      } else if (edge?.type === 'custom') {
        showTab('node-edge-data');
      } else if (edge?.type === 'custom') {
      } else if (node?.type === 'custom') {
        showTab('form-designer');
        if (!equal($formflow.chart, chartEl?.getData())) {
          $formflow.modified = true;
          $formflow.chart = chartEl?.getData();
        }

        const nodes = chartEl.getData().nodes;
        // const nodeIndex = nodes.findIndex(el => el.id == node.id) as number;
        // const html = nodes[nodeIndex].data.html;
        // setForm(chartEl?.getData(), node, html); // set stepper, html, css
      }
    } else if (action === 'change' && type === 'chart') {
      StepperStorage.setItem('formflow.chart', chartEl.getData());
    }
  }
</script>

<svelte:window on:resize={() => chartEl.getInstance().fitView()} />

<button class="sidebar toggle position-absolute top-0 start-0 border-0 fs-4" style="z-index: 1">☰</button>
<h1 hidden>Form Flow Dashboard</h1> <!--for a11y-->

<SideBar bind:this={sidebarEl} on:message={handleSideBarMessage}>
</SideBar>

<x-resize width class="h-100" on:resize-move={() => chartEl.getInstance().fitView()}>
  <div class="position-relative" style="width: 33%">
    <x-formflow bind:this={chartEl} on:reactflow={handleReactflowEvent}>
    </x-formflow>
  </div>
  <div class="accordion flex-fill" id="right-section" role="navigation">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#node-edge-data">
           Properties of {selectedType.toLowerCase()} "{$formflow?.name || 'Untitled'}" - "{selectedLabel}"
        </button>
      </h2>
      <div id="node-edge-data" class="accordion-collapse collapse" data-bs-parent="#right-section">
        <div class="accordion-body">
          <x-monaco bind:this={monacoEditor} on:monaco-change={handleMonacoChange} data-language="json">
          </x-monaco>
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
          <x-formdesigner bind:this={formDesigner}></x-formdesigner>
        </div>
      </div>
    </div>
  </div>
</x-resize>

<DataViewerDialog bind:this={dataViewerDialog}>
</DataViewerDialog> 
<OpenSaveFileDialog bind:this={openSaveFileDialog}>
</OpenSaveFileDialog>
