import type { ReactFlowJsonObject, Node } from 'reactflow';
import type { FormDesigner } from 'elements-x';

function getSteps(chartData: ReactFlowJsonObject, formId: string): string[] {
  const steps = [formId];
  const getNodeById = (id: string) => chartData.nodes.find(node => node.id === id);
  const getOutgoingNodes = (node: Node) => {
    const outgoingEdges = chartData.edges.filter(edge => edge.source === node.id);
    return outgoingEdges.map(edge => getNodeById(edge.target))
  }
  const getIncomingNodes = (node: Node) => {
    const incomingEdges = chartData.edges.filter(edge => edge.target === node.id);
    return incomingEdges.map(edge => getNodeById(edge.source))
  }

  const currentNode = getNodeById(formId);
  let outgoingNodes = getOutgoingNodes(currentNode);
  while (outgoingNodes.length) {
    const node = outgoingNodes[0];
    steps.push(node.id)
    outgoingNodes = getOutgoingNodes(node);
  }

  let incomingNodes = getIncomingNodes(currentNode);
  while (incomingNodes.length) {
    const node = incomingNodes[0];
    steps.unshift(node.id)
    incomingNodes = getIncomingNodes(node);
  }

  return steps;
}

export function setForm(chartData: ReactFlowJsonObject, formId: string) {
  const steps = getSteps(chartData, formId).slice(1, -1);
  const forms = steps.reduce((acc, nodeId) => {
    const node = chartData.nodes.find(el => el.id === nodeId)
    acc[nodeId] = { 
      ...{ title: node.data.label, defaultValues: {} },
      ...node.data
    };
    return acc;
  }, {});

  const formDesigner = document.querySelector('x-formdesigner') as FormDesigner;
  formDesigner.forms = forms; // this sets steps
  formDesigner.setAttribute('step', formId);
}

