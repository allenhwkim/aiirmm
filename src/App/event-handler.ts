
// import equal from 'fast-deep-equal';
import type { FormFlow as XFormflow } from 'elements-x';
import { getSteps, console as konsole, isNode, isEdge } from '../util';
import { Node, Edge } from 'reactflow';

export default function eventHandler() {
  let SELECTED: Node | Edge;

  const chartEl: XFormflow = document.querySelector('x-formflow');
  const designerEl = document.querySelector('x-formdesigner') as any;
  const monacoEl: any = document.querySelector('x-monaco');

  designerEl.editor.on('update', () => {
    konsole('form-designer',  'update');
    const html = designerEl.html.replace(/<\/?body>/g,'');

    chartEl?.updateNodeData(SELECTED.id, {html});
  });

  monacoEl.addEventListener('monaco-change', event => {
    const jsonCode = event.detail;
    konsole('monaco-change', jsonCode);
    const data = JSON.parse(jsonCode);
    isNode(SELECTED) && chartEl?.updateNodeData(SELECTED.id, {data});
    isEdge(SELECTED) && chartEl?.updateEdgeData(SELECTED.id, {data});
  })

  // event from <x-formflow>. functions available:
  //  getData(), await getImage(), getInstance(), fireEvent(detail)
  //  updateNodeData(id, data), updateEdgeData(id, data)
  chartEl.addEventListener('formflow' as any, (event: CustomEvent) => {
    const chartData = chartEl.getData();
    const {action, type, node, edge} = event.detail;
    konsole('formflow', {action, type})

    switch(action) {

      case 'init': {
        const initNode = chartData.nodes.find(el => el.id === 'start');
        SELECTED = initNode;
        initNode && monacoEl.setValue(JSON.stringify(initNode.data, null, '  '))
        break;
      }

      case 'change': {
        break;
      }

      case 'selected': {
        SELECTED = node || edge;
        console.log({SELECTED})
        if (isNode(SELECTED) && ['custom', 'thankyou'].includes(node?.type)) {
          const chartData = chartEl?.getData();
          const steps = getSteps(chartData, SELECTED.id).slice(1, -1);
          const stepperEl = designerEl.editor.Canvas.getBody().querySelector('x-stepper');
          stepperEl?.setAttribute('steps', steps.join(','));
          stepperEl?.setAttribute('active', SELECTED.id);
        }
        const jsonStr = JSON.stringify(SELECTED.data || {}, null, '  ')
        monacoEl.setValue(jsonStr);
        break;
      }

    }
  });

}
