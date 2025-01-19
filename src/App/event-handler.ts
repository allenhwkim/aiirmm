
import equal from 'fast-deep-equal';
import type { FormFlow as XFormflow } from 'elements-x';
import { Storage } from '../stroage';
import { fireEvent, getSteps } from '../util';

function writeConsole(eventName, data) {
  document.querySelector('#console')?.
    insertAdjacentHTML('beforeend', `${eventName} ${JSON.stringify(data)}\n`)
}

export default function eventHandler() {
  const chartEl: XFormflow = document.querySelector('x-formflow');
  const designerEl = document.querySelector('x-formdesigner') as any;
  const monacoEditor: any = document.querySelector('x-monaco');

  // event from <x-monaco> element
  document.body.addEventListener('monaco-change' as any, (_event: CustomEvent) => {
    writeConsole('monaco-change', 'json code is updated')
  });

  // event from <x-formflow>
  document.body.addEventListener('formflow' as any, (event: CustomEvent) => {
    const chartData = chartEl.getData();
    const {action, type, node, edge} = event.detail;
    writeConsole('formflow', {action, type})

    switch(action) {
    case 'init': {
      const initNode = chartData.nodes.find(el => el.id === 'start');
      initNode && monacoEditor.setValue(JSON.stringify(initNode.data, null, '  '))
      break;
    }
    case 'change': {
      type === 'chart' && Storage.setItem('formflow', 'chart', chartData);
      break;
    }
    case 'selected': {
      nodeSelected(node || edge);
      (['custom', 'thankyou'].includes(node?.type)) && 
            fireEvent('form-designer', {type: 'init', chartData, selectedNode: node.id});
      monacoEditor.setValue(JSON.stringify((node || edge).data, null, '  '))
      break;
    }
    }
  });

  // event to <x-formdesigner>
  document.body.addEventListener('form-designer' as any, (event: CustomEvent) =>  {
    writeConsole('form-designer', {type: event.detail.type})
    switch(event.detail.type) {
    case 'init': {
      const {chartData, selectedNode} = event.detail;
      const steps = getSteps(chartData, selectedNode).slice(1, -1);
      const stepperEl = designerEl.editor.Canvas.getBody().querySelector('x-stepper');
      stepperEl?.setAttribute('steps', steps.join(','));
      stepperEl?.setAttribute('active', selectedNode);
      break;
    }
    case 'update': {
      const {id, detail} = event.detail;
      const html = detail.replace(/<\/?body>/g,'');
      chartEl?.updateNodeData(id, html);
      break;
    }
    }
  })
}

function nodeSelected(node) {
  const formflow = Storage.getItem('formflow') || 'Untitled';
  const chartEl: XFormflow = document.querySelector('x-formflow');
  const storageChart = formflow.chart;
  const currentChart = chartEl.getData();
  const chartModified = !equal(storageChart, currentChart);
  if (chartModified) {
    Storage.setItem('formflow', 'setModified', true);
    Storage.setItem('formflow', 'chart', currentChart);
  }
  Storage.setItem('formflow', 'selected', node);
}
