import type { IForm } from "./global";
import type { ReactFlowJsonObject, Node } from 'reactflow';

function getSteps(chartData: ReactFlowJsonObject, activeNode: Node): string[] {
  const steps = [activeNode.id];
  const getNodeById = (id: string) => chartData.nodes.find(node => node.id === id);
  const getOutgoingNodes = (node: Node) => {
    const outgoingEdges = chartData.edges.filter(edge => edge.source === node.id);
    return outgoingEdges.map(edge => getNodeById(edge.target))
  }
  const getIncomingNodes = (node: Node) => {
    const incomingEdges = chartData.edges.filter(edge => edge.target === node.id);
    return incomingEdges.map(edge => getNodeById(edge.source))
  }

  let outgoingNodes = getOutgoingNodes(activeNode);
  while (outgoingNodes.length) {
    const node = outgoingNodes[0];
    steps.push(node.id)
    outgoingNodes = getOutgoingNodes(node);
  }

  let incomingNodes = getIncomingNodes(activeNode);
  while (incomingNodes.length) {
    const node = incomingNodes[0];
    steps.unshift(node.id)
    incomingNodes = getIncomingNodes(node);
  }

  return steps;
}

function getForms(chartData: ReactFlowJsonObject, steps: string[]): any {
  const forms = {};
  steps.forEach( (nodeId: string) => {
    const node = chartData.nodes.find(el => el.id === nodeId)
    forms[nodeId] = {
      type: 
        node.data?.label.indexOf('Review') !== -1 ? 'review' : 
        node.data?.label.indexOf('Thankyou') !== -1 ? 'submit' : 'form',
      title: node.data?.label,
      description: node.data?.label + ' description',
      html: '', // this is temporary, this should be from a storage data
      skippable: true,
      getErrors: null
    } as IForm; // TODO
  });
  return forms;
}

export function setForm(chartData: ReactFlowJsonObject, activeNode: Node, html?: string) {
  const steps = getSteps(chartData, activeNode).slice(1, -1);
  const forms = getForms(chartData, steps);
  const currentStepId = activeNode.id;
  (document.querySelector('form-designer') as any)?.runCommand(
    'set-forms-steps', {forms, steps, currentStepId, html}
  )
}

