import equal from 'fast-deep-equal';
import type { FormFlow as XFormflow } from 'elements-x';
import { Storage } from '../stroage';
import { fireEvent } from '../util';

/**
 * custom element <x-formflow> fires these event
 *  - init:     {action: 'init', event: <chart instance>}
 *  - selected: {action: 'selected', type: 'node' | 'edge', nodes: Node[], edges: Edge[] }
 *  - change:   {action: 'change', type: 'chart' }
 */
function chartEventHandler(e: any ) { // x-formflow event handler
  const formflow = Storage.getItem('formflow') || 'Untitled';
  const chartEl: XFormflow = document.querySelector('x-formflow');
  const storageChart = formflow.chart;
  const currentChart = chartEl.getData();
  const {nodes, edges} = currentChart;
  const {action, type, node, edge} = e.detail;
  const chartModified = !equal(storageChart, currentChart);
  const designRequired = ['custom', 'thankyou'].includes(node?.type);

  console.log('chartEventHandler.....', e.detail);
  if (action === 'init') { // when init, select the start node
    e.detail.event.zoomOut(); // e.detail is chart instance
    const node = nodes.find(el => el.id === 'start');
    node && chartEl.fireEvent({action: 'selected', type: 'node', node, nodes, edges})
  } 
  else if (action === 'change' && type === 'chart') {
    Storage.setItem('formflow', 'chart', currentChart);
  } 
  else if (action === 'selected') { 
    const selected = node || edge;
    console.log({chartModified, designRequired})
    if (chartModified) {
      Storage.setItem('formflow', 'setModified', true);
      Storage.setItem('formflow', 'chart', currentChart);
    }
    if (designRequired) {
      fireEvent('designer', {chartData: currentChart, selectedNode: node.id});
    }

    fireEvent('text-editor', selected.data); // Ask text editor to change its text
    Storage.setItem('formflow', 'selected', selected);
  }
}

export default function({className}) {
  document.body.addEventListener('formflow',  chartEventHandler);

  return (
    <>
      <x-formflow class={className}></x-formflow>
    </>
  )
}