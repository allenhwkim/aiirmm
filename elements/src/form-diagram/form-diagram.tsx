import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { Node, Edge, ReactFlowInstance } from 'reactflow';
import { toPng } from 'html-to-image';
import { FormflowChart } from '../react-components/FormflowChart/FormflowChart';

const initialNodes: Node[] = [
  {id: 'start', type: 'start', deletable: false, position: { x: 100, y: 0 }},
  {id: 'end', type: 'end', deletable: false, position: { x: 100, y: 150 }},
] as Node[];

const initialEdges: Edge[]  = [
  {id: 'start-end', source: 'start', target: 'end', type: 'custom'},
];

export class FormDiagram extends HTMLElement {
  root: any;
  reactflowInstance!: ReactFlowInstance;

  constructor() {
    super(); 
  }

  connectedCallback() {
    this.mount(); // sets this.root and this.reactflowInstance
  }
  
  disconnectedCallback() {
    setTimeout( () => this.root.unmount());
  }

  setData(data: any) {
    setTimeout(() => { // to avoid warning, asynchornously unmount a root while React was already rendering.
      this.root?.unmount();
      this.mount(data.nodes, data.edges);
    })
  }

  getData() {
    const data = this.reactflowInstance.toObject()
    console.log(data);
    alert(JSON.stringify(data))
  }

  async getImage() {
    const blobUrl = await toPng(
      this.querySelector('.react-flow') as HTMLElement, 
      {
        filter: (node: HTMLElement) => !(
          node.classList?.contains('react-flow__minimap') ||
          node.classList?.contains('react-flow__controls')
        )
      }
    );
    console.log(blobUrl);
    alert(blobUrl);
  };

  getInstance() {
    console.log(this.reactflowInstance);
    alert(JSON.stringify(this.reactflowInstance) + '\nFor more, check console');
  }

  private fireCustomEvent(detail: any) {
    const customEvent = new CustomEvent('reactflow', { detail, bubbles: true});
    this.dispatchEvent( customEvent );
  }

  mount(nodes: Node[] = initialNodes, edges: Edge[] = initialEdges) {
    const onNodeClick = (node: Node, nodes: Node[], edges: Edge[]) => {
      this.fireCustomEvent({ action: 'selected', type: 'node', node, nodes, edges })
    };
  
    const onEdgeClick =(edge: Edge, nodes: Node[], edges: Edge[]) => {
      this.fireCustomEvent({ action: 'selected', type: 'edge', edge, nodes, edges })
    };
  
    const onInit = (event: ReactFlowInstance) => {
      this.reactflowInstance = event;
      this.fireCustomEvent({ action: 'init', event })
    }
  
    this.root = createRoot(this);
    this.root.render(
      <StrictMode>
        <FormflowChart
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onInit={onInit}
        />
      </StrictMode>
    );
  }

}