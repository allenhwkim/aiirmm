<script lang='ts'>
  import type { FormDiagram, SideBar } from '@formflow/elements/src';
  import AppDataDialog from './app-data.dialog.svelte';
  import AppSideBar from './app-sidebar.svelte';
  import { onMount } from 'svelte';

  const dq = document.querySelector.bind(document);
  const dqa = document.querySelectorAll.bind(document);

  let chartEl: FormDiagram;
  let dataDialogEl: any;

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
    if (node?.type === 'start' || node?.type === 'end' || edge?.type === 'custom') {
      new (window as any).bootstrap.Collapse(dq('#properties'));
    } else if (node?.type === 'custom') {
      new (window as any).bootstrap.Collapse(dq('#form-designer'));
    }

    if (action === 'init') {
      const {nodes, edges} = chartEl.getData();
      const node = nodes.find(el => el.id === 'start');
      chartEl.fireEvent({action: 'selected', type: 'node', node, nodes, edges})
    }
  }
</script>

<style lang="scss">
</style>

<svelte:window on:resize={() => chartEl.getInstance().fitView()} />

<button data-x-target="sidebar" class="position-absolute top-0 start-0 border-0 fs-4" style="z-index: 1">☰</button>
<h1 hidden>Form Flow Dashboard</h1> <!--for a11y-->

<AppSideBar chartEl={chartEl} dataDialogEl={dataDialogEl}></AppSideBar>

<resize-divs width class="h-100" on:resize-move={() => chartEl.getInstance().fitView()}>
  <div class="position-relative" style="width: 33%">
    <form-diagram bind:this={chartEl} on:reactflow={handleReactflowEvent}></form-diagram>
  </div>
  <div class="accordion flex-fill" id="right-section" role="navigation">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#properties">
          Properties
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
          todo 1
          * save reactflow to a sessionStorage
          * restore reactflow from a sessionStorage

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

<AppDataDialog bind:this={dataDialogEl}></AppDataDialog>