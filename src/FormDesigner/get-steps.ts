import type { ReactFlowJsonObject, Node } from 'reactflow';

/**
 * Returns form steps related to this step
 */
export function getSteps(chartData: ReactFlowJsonObject, formId: string): string[] {
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

  const currentNode = getNodeById(formId) as Node;
  let outgoingNodes = getOutgoingNodes(currentNode);
  while (outgoingNodes.length) {
    const node = outgoingNodes[0] as Node;
    steps.push(node.id)
    outgoingNodes = getOutgoingNodes(node);
  }

  let incomingNodes = getIncomingNodes(currentNode);
  while (incomingNodes.length) {
    const node = incomingNodes[0] as Node;
    steps.unshift(node.id)
    incomingNodes = getIncomingNodes(node);
  }

  return steps;
}
