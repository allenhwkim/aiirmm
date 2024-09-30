import { ReactFlowJsonObject, Node } from "reactflow";
import type { FormDesigner } from "elements-x";
import { getSteps } from "./get-steps";

function eventHandler(e: any) {
  console.log('designer event', e.detail);
  const chartData : ReactFlowJsonObject = e.detail.chartData;
  const selectedNode = e.detail.selectedNode;
  const steps = getSteps(chartData, selectedNode).slice(1, -1);
  const forms = steps.reduce((acc, nodeId) => {
    const node = chartData.nodes.find(el => el.id === nodeId) as Node;
    acc[nodeId] = { 
      ...{ title: node.data.label, defaultValues: {} },
      ...node.data
    };
    return acc;
  }, {});

  const formDesigner = document.querySelector('x-formdesigner') as FormDesigner;
  formDesigner.forms = forms; // this sets steps
  formDesigner.setAttribute('step', selectedNode);
}

export default function() {
  document.body.addEventListener('designer', eventHandler);

  return (
    <>
      <x-formdesigner></x-formdesigner>
    </>
  )
}