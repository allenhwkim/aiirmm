<script lang='ts'>
  import { AppStorage, type FormDesigner, type FormDiagram } from '@formflow/elements/src';
  import { onMount } from 'svelte';

  import AppSideBar from './app-sidebar.svelte';
  import AppDataDialog from './app-data.dialog.svelte';
  import AppFileDialog from './app-file.dialog.svelte';
  import currentFile from './store';
  import equal from 'fast-deep-equal';
  import { setForm } from './app';

  // custom elements
  let chartEl: FormDiagram;
  let menuEl: AppSideBar;
  let formDesigner: FormDesigner;
  let appDataDialog: AppDataDialog;
  let appFileDialog: AppFileDialog;

  let formProps = $currentFile.properties || {default: {}};

  onMount(() => {
    $currentFile.setChartEl(chartEl);
    formDesigner.on('update', function() { 
      const htmls = AppStorage.getItem('currentFormflow.htmls') || {};
      htmls[activeNodeName] = formDesigner.editor.getHtml();
      AppStorage.setItem('currentFormflow.htmls', htmls);
    });
  });

  $: activeNodeName = $currentFile.activeNode?.data?.label || '';

  function formPropsChanged(e: any) {
    $currentFile.properties = JSON.parse(e.detail);
  }

  function handleSideBarMessage(event: any) {
    const {dataMessage, fileMessage} = event.detail;
    fileMessage && appFileDialog.show(fileMessage);
    dataMessage && appDataDialog.show(dataMessage);
  }

  function handleReactflowEvent(e:any) {
    document.querySelectorAll('.collapse.show') // collapse all accordion
      .forEach(el => new (window as any).bootstrap.Collapse(el));
    (document.querySelector('#form-designer-group') as any).style.display =  // if not node, hide designer 
      e.detail.node?.type === 'custom' ? '': 'none';

    const {action, node, edge} = e.detail;
    node && ($currentFile.activeNode = node);
    if (action === 'init') { // when init, select the start node
      const {nodes, edges} = chartEl.getData();
      const node = nodes.find(el => el.id === 'start');
      chartEl.fireEvent({action: 'selected', type: 'node', node, nodes, edges})
    } else if (action === 'selected') { 
      if (node?.type === 'start' || node?.type === 'end' || edge?.type === 'custom') {
        new (window as any).bootstrap.Collapse(document.querySelector('#properties'));
      } 
      else if (node?.type === 'custom') {
        new (window as any).bootstrap.Collapse(document.querySelector('#form-designer'));
        $currentFile.activeNode = node;
        if (!equal($currentFile.chart, chartEl?.getData())) {
          $currentFile.modified = true;
          $currentFile.chart = chartEl?.getData();
        }
        const activeNodeName = node.data?.label;
        if (activeNodeName) {
          const html = AppStorage.getItem('currentFormflow.htmls')?.[activeNodeName];
          setForm(chartEl?.getData(), node, html); // set stepper, html, css
        }
      }
    }
  }
</script>

<style lang="scss"></style>

<svelte:window on:resize={() => chartEl.getInstance().fitView()} />

<button data-x-target="sidebar" class="position-absolute top-0 start-0 border-0 fs-4" style="z-index: 1">☰</button>
<h1 hidden>Form Flow Dashboard</h1> <!--for a11y-->

<AppSideBar bind:this={menuEl} 
  on:message={handleSideBarMessage}
></AppSideBar>

<resize-divs width class="h-100" on:resize-move={() => chartEl.getInstance().fitView()}>
  <div class="position-relative" style="width: 33%">
    <form-diagram bind:this={chartEl} 
      on:reactflow={handleReactflowEvent}>
    </form-diagram>
  </div>
  <div class="accordion flex-fill" id="right-section" role="navigation">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#properties">
           {activeNodeName} Properties of "{$currentFile?.name || 'Untitled'}" 
        </button>
      </h2>
      <div id="properties" class="accordion-collapse collapse" data-bs-parent="#right-section">
        <div class="accordion-body">
          <monaco-editor language="json"
            data={JSON.stringify(formProps, null, '  ')}
            on:monaco-change={formPropsChanged}
          ></monaco-editor>
        </div>
      </div>
    </div>
    <div class="accordion-item" id="form-designer-group">
      <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#form-designer">
          Form Designer 
        </button>
      </h2>
      <div id="form-designer" class="accordion-collapse collapse" data-bs-parent="#right-section">
        <div class="accordion-body p-0 py-1">
          <form-designer bind:this={formDesigner}></form-designer>
        </div>
      </div>
    </div>
  </div>
</resize-divs>

<AppDataDialog bind:this={appDataDialog}></AppDataDialog>
<AppFileDialog bind:this={appFileDialog}></AppFileDialog>
