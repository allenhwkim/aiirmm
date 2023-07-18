import type { IEdge, IForm, INode } from "./global";

function getSteps(chartData: {nodes: INode[], edges: IEdge[]}, activeNode: INode): string[] {
  const steps = [activeNode.data.label];
  const getNodeById = (id: string) => chartData.nodes.find(node => node.id === id);
  const getOutgoingNodes = (node: INode) => {
    const outgoingEdges = chartData.edges.filter(edge => edge.source === node.id);
    return outgoingEdges.map(edge => getNodeById(edge.target))
  }
  const getIncomingNodes = (node: INode) => {
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

function getForms(chartData: {nodes: INode[], edges: IEdge[]}, steps: string[]): any {
  const forms = {};
  steps.forEach( (step: string) => {
    forms[step] = {
      type: 'form',
      // label: step + ' label',
      // title: step + ' title',
      // description: step + ' description',
      html: '',
      skippable: false,
      getErrors: null
    } as IForm; // TODO
  });
  return forms;
}

export function setForm(chartData: {nodes: INode[], edges: IEdge[]}, activeNode: INode) {
  const steps = getSteps(chartData, activeNode).slice(1, -1);
  const forms = getForms(chartData, steps);
  (document.querySelector('form-designer') as any)?.editor.runCommand(
    'set-forms-steps', {forms, steps, currentStep: activeNode.data.label}
  )
}

