import { 
  Node, Edge,
  OnNodesChange, 
  OnEdgesChange, 
  OnConnect, 
  OnEdgeUpdateFunc,
} from 'reactflow';

export type TAddNodeOptions = {
  nodes: Node[];
  edges: Edge[];
  nodeId: string;
};

export type TAddNode = {
  nodes: Node[]; 
  edges: Edge[];
}

// zustand store state and methods
export type TStoreState = {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  nextNodeId: number,
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onEdgeUpdate: OnEdgeUpdateFunc,
  onConnect: OnConnect;
  updateEdgeLabel: (nodeId: string, label: string) => void;
  setNodeData: (nodeId: string, data: any) => void;
  setEdgeData: (nodeId: string, data: any) => void;
  addNodeBeside: (nodeId: string, position: string) => void;
  addNodeBelow: (nodeId: string) => void;
  addNodeAbove: (nodeId: string) => void;
  undo: () => void;
  redo: () => void;
};