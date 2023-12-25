import equal from 'fast-deep-equal';
import type { FormFlow } from 'src/store';

function showSection(selector) {
  const monacoEditorSection: any = document.querySelector('.accordion-item:has(#monaco-editor)');
  const formDesignerSection: any = document.querySelector('.accordion-item:has(#form-designer)');
  const bootstrap = (window as any).bootstrap;
  if (selector === '#monaco-editor') {
    formDesignerSection.style.display = 'none';
    monacoEditorSection.style.height = '100%';
  } else {
    formDesignerSection.style.display = '';
    monacoEditorSection.style.height = 'auto';
  }
  
  // collapse all bootstrap accordions, then show only selected one
  document.querySelectorAll('.collapse.show').forEach(el => new bootstrap.Collapse(el));
  new bootstrap.Collapse(document.querySelector(selector));
}

export function chartEventHandler(e: any, $formflow: FormFlow ) { // x-formflow event handler
  const {action, type, node, edge} = e.detail;
  const chartEl: any = document.querySelector('.x.formflow');

  if (action === 'init') { // when init, select the start node
    (window as any).chart = chartEl.getInstance();
    (window as any).chart.zoomOut();
    showSection('#monaco-editor');

    const {nodes, edges} = chartEl.getData();
    const node = nodes.find(el => el.id === 'start');
    chartEl.fireEvent({action: 'selected', type: 'node', node, nodes, edges})
  } else if (action === 'selected') { 
    $formflow.selected = node || edge;
    const monacoEditor: any = document.querySelector('.x.monaco');

    const editorValue = node?.data?.props || edge?.data?.props || {id: node?.id || edge?.id};
    monacoEditor.setValue(JSON.stringify(editorValue, null, '  '));
    if (['start', 'submit', 'end'].includes(node?.type) || edge?.type === 'custom') {
      showSection('#monaco-editor');
    } else if (['custom', 'thankyou'].includes(node?.type)) {
      showSection('#form-designer');
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
    $formflow.chart = chartEl.getData();
  }
}