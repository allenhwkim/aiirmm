import type { FormDiagram } from '@formflow/elements/src';
import type AppSidebar from './app-sidebar.svelte';
import { CurrentFile } from './current-file';
import { Storage } from './storage';

export function handleReactflowEvent(e:any, currentFile: CurrentFile, chartEl: any) {
  document.querySelectorAll('.collapse.show').forEach(el => new (window as any).bootstrap.Collapse(el));
  (document.querySelector('#form-designer-group') as any).style.display = 
    e.detail.node?.type === 'custom' ? '': 'none';

  const {action, node, edge} = e.detail;
  node && (currentFile.activeNode = node);
  if (action === 'init') {
    const {nodes, edges} = chartEl.getData();
    const node = nodes.find(el => el.id === 'start');
    chartEl.fireEvent({action: 'selected', type: 'node', node, nodes, edges})
  } else if (node?.type === 'start' || node?.type === 'end') {
    new (window as any).bootstrap.Collapse(document.querySelector('#properties'));
  } else if (node?.type === 'custom') {
    new (window as any).bootstrap.Collapse(document.querySelector('#form-designer'));
    setTimeout(() => Storage.setItem('currentFormflow.chart', chartEl?.getData()));
    currentFile.modified = true;
  } else if (edge?.type === 'custom') {
    new (window as any).bootstrap.Collapse(document.querySelector('#properties'));
    setTimeout(() => Storage.setItem('currentFormflow.chart', chartEl?.getData()));
    currentFile.modified = true;
  }
}
