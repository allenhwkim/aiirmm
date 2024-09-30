import equal from 'fast-deep-equal';
import type { FormFlow as XFormflow } from 'elements-x';
import { Storage } from './stroage';
import { setForm } from './set-form';

export function chartEventHandler(e: any ) { // x-formflow event handler
  const formflow = Storage.getItem('formflow') || 'Untitled';
  const {chart} = formflow;

  console.log(e.detail);
  if (e.detail.action === 'init') { // when init, select the start node
    const {event} = e.detail;
    (window as any).chart = event;
    (window as any).chart.zoomOut();
    showSection('#monaco-editor');

    const chartEl: XFormflow = document.querySelector('x-formflow');
    const {nodes, edges} = chartEl.getData();
    const node = nodes.find(el => el.id === 'start');
    node && chartEl.fireEvent({action: 'selected', type: 'node', node, nodes, edges})
  } else if (e.detail.action === 'selected') { 
    const {type, node, edge} = e.detail;
    console.log('selected....', {type, node, edge});
    const selected = node || edge;
    Storage.setItem('formflow', 'selected', selected);

    const monacoEditor: any = document.querySelector('x-monaco');
    monacoEditor.setValue(JSON.stringify(selected.data, null, '  '))
    if (['start', 'submit', 'end'].includes(node?.type) || edge?.type === 'custom') {
      showSection('#monaco-editor');
    } else if (['custom', 'thankyou'].includes(node?.type)) {
      showSection('#form-designer');
      const chartEl: XFormflow = document.querySelector('x-formflow');
      if (!equal(chart, chartEl?.getData())) {
        Storage.setItem('formflow', 'setModified', true);
        Storage.setItem('formflow', 'chart', chartEl?.getData());
      }

      setForm(chartEl?.getData(), node.id); // set stepper
    }
  } else if (e.detail.action === 'change' && e.detail.type === 'chart') {
    const chartEl: XFormflow = document.querySelector('x-formflow');
    Storage.setItem('formflow', 'chart', chartEl.getData());
  }
}

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
