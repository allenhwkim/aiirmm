import { ReactFlowJsonObject } from 'reactflow';
import { getSteps } from './get-steps';

function eventHandler(e: any) {
  const chartData : ReactFlowJsonObject = e.detail.chartData;
  const selectedNode = e.detail.selectedNode;
  const steps = getSteps(chartData, selectedNode).slice(1, -1);

  const designerEl = document.querySelector('x-formdesigner') as any;
  const stepperEl = designerEl.editor.Canvas.getBody().querySelector('x-stepper');
  stepperEl?.setAttribute('steps', steps.join(','));
  stepperEl?.setAttribute('active', selectedNode);
}

export default function() {
  document.body.addEventListener('designer', eventHandler);

  return (
    <>
      <x-formdesigner></x-formdesigner>
    </>
  )
}