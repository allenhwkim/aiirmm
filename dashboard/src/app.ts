import type { IForm } from "./global";
import type { ReactFlowJsonObject, Node } from 'reactflow';

function getSteps(chartData: ReactFlowJsonObject, activeNode: Node): string[] {
  const steps = [activeNode.data.label];
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
    steps.push(node.data?.label || node.id)
    outgoingNodes = getOutgoingNodes(node);
  }

  let incomingNodes = getIncomingNodes(activeNode);
  while (incomingNodes.length) {
    const node = incomingNodes[0];
    steps.unshift(node.data?.label || node.id)
    incomingNodes = getIncomingNodes(node);
  }

  return steps;
}

function getForms(chartData: ReactFlowJsonObject, steps: string[]): any {
  const forms = {};
  steps.forEach( (step: string) => {
    // this is temporary, this should be from a storage data
    forms[step] = {
      type: step.indexOf('Review') === -1 ? 'form' : 'review',
      // label: step + ' label',
      title: step + ' title',
      description: step + ' description',
      html: '',
      skippable: true,
      getErrors: null
    } as IForm; // TODO
  });
  return forms;
}

export function setForm(chartData: ReactFlowJsonObject, activeNode: Node, html?: string) {
  const steps = getSteps(chartData, activeNode).slice(1, -1);
  const forms = getForms(chartData, steps);
  const currentStep = activeNode.data.label;
  (document.querySelector('form-designer') as any)?.runCommand(
    'set-forms-steps', {forms, steps, currentStep, html}
  )
}

