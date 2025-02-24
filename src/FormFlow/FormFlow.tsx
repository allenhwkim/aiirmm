import {
  PropsWithoutRef, useCallback, useEffect, useState, DragEvent
} from 'react';
import {
  ReactFlow, ReactFlowProvider,
  Background, Panel, BackgroundVariant,
  Node, Edge, isNode, isEdge,
  applyEdgeChanges, applyNodeChanges,
  NodeChange, EdgeChange,
  Connection, ReactFlowInstance,
  XYPosition,
  Controls, ControlButton
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './styles.css';

import initial from './default-nodes-edges';
import NewNodePanel from './NewNodePanel';
import { LabelDialog, DataDialog, ImageDialog} from './dialogs';
import UndoRedo, {addUndoRedo} from './undo-redo';
import { FormFlowProps } from './FormFlow.d';

function FormFlow(props: PropsWithoutRef<FormFlowProps> ) {
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance>();
  const [nodes, setNodes] = useState(props.nodes || initial.nodes);
  const [edges, setEdges] = useState(props.edges || initial.edges);
  const [dblClick, setDblClick] = useState<MouseEvent>();
  const [selected, setSelected] = useState<Node|Edge>();
  const [dialog, setDialog] = useState<string>();

  useEffect(() => {
    UndoRedo.reset(initial);
  }, [])

  const onInit = useCallback((instance:ReactFlowInstance) => {
    setRfInstance(instance);
    props.onInit?.(instance);
  }, []);

  const onNodesChange = useCallback((changes:NodeChange<Node>[]) => {
    if (changes.length) {
      addUndoRedo(rfInstance, changes, ['position', 'dimensions']);
      setNodes((nds: Node[]) => applyNodeChanges(changes, nds));
      props.onNodesChange?.(changes);
    }
  }, [setNodes, rfInstance]);

  const onEdgesChange = useCallback((changes: EdgeChange<Edge>[]) => {
    if (changes.length) {
      addUndoRedo(rfInstance, changes, ['remove']);
      setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds));
      props.onEdgesChange?.(changes);
    }
  }, [setEdges, rfInstance]);

  const onConnect = useCallback((connection: Connection) => {
    addUndoRedo(rfInstance);
    const {source, target} = connection;
    const newEdge = { id: `${source}-$${target}`, source, target };
    setEdges((eds: Edge[]) => [...eds, newEdge]);
    props.onConnect?.(connection);
  }, [setEdges, rfInstance]);

  const onDragOver = useCallback((event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    props.onDragOver?.(event);
  }, []);

  const onDrop = useCallback((event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    const {clientX: x, clientY: y} = event;
    const position = rfInstance?.screenToFlowPosition({x,y}) as XYPosition;
    const id =  Date.now().toString(36);
    const newNode: Node = {
      id, position, data: { label: 'Node' }, origin: [0.5, 0.0],
    };
    setNodes(nodes => [...nodes, newNode]);
    props.onDrop?.(event);
  }, [rfInstance]);

  const onKeyDown = useCallback((event : any) => {
    const ctrl = event.ctrlKey ? 'Control+' : '';
    const alt = event.altKey ? 'Alt+' : '';
    const meta = event.metaKey ? 'Meta+' : '';
    const shift = event.shiftKey ? 'Shift+' : '';
    const key = `${ctrl}${alt}${shift}${meta}${event.key}`;
    // (ctrl || alt || meta || shift) && console.log(key, ' pressed');
    if (key === 'Meta+z') {
      const undo = UndoRedo.undo();
      undo && (setNodes(_ => undo.nodes), setEdges(_ => undo.edges));
    } else if (key === 'Shift+Meta+z') {
      const redo = UndoRedo.redo();
      redo && (setNodes(_ => redo.nodes), setEdges(_ => redo.edges));
    }
    props.onKeyDown?.(event);
  }, []);

  const onNodeClick = (event:any, node: Node) => {
    setSelected(node)
    props.onNodeClick?.(event, node);
  };
  const onEdgeClick = (event:any, edge: Edge) => {
    setSelected(edge);
    props.onEdgeClick?.(event, edge);
  }

  const onNodeDoubleClick = (event: any, node: Node) => {
    setDblClick(event);
    props.onNodeDoubleClick?.(event, node);
  }
  const onEdgeDoubleClick = (event: any, edge: Edge) => {
    setDblClick(event);
    props.onEdgeDoubleClick?.(event, edge);
  }

  const onLabelChange = (event: any) => { // event form <PopupForLabel>
    if (isNode(selected)) {
      setNodes((nds) => nds.map((node) => {
        (node.id === selected.id) &&
          (node.data.label = event.target.value);
        return node;
      }));
    } else if (isEdge(selected)) {
      setEdges((eds) => eds.map((edge) => {
        (edge.id === selected.id) &&
          (edge.label = event.target.value);
        return edge;
      }));
    }
  };

  return (
    <ReactFlowProvider>
      <ReactFlow tabIndex={0}
        nodes={nodes}
        edges={edges}
        onInit={onInit}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onKeyDown={onKeyDown}
        onNodeDoubleClick={onNodeDoubleClick}
        onEdgeDoubleClick={onEdgeDoubleClick}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        snapToGrid={true}
        snapGrid={[50,50]}
        fitView>
        <Background color="#ccc" variant={BackgroundVariant.Dots} />
        <Controls orientation='horizontal'>
          <ControlButton onClick={() => setDialog('image')}> &#x1F4F7;</ControlButton>
          <ControlButton onClick={() => setDialog('data')}> {'{..}'} </ControlButton>
        </Controls>

        <Panel position="top-right"><NewNodePanel /></Panel>
      </ReactFlow>
      {dblClick &&
        <LabelDialog
          event={dblClick}
          selected={selected}
          onLabelChange={onLabelChange}
          onClose={() => setDblClick(undefined)} />
      }
      {dialog === 'data' && <DataDialog onClose={() => setDialog(undefined)} /> }
      {dialog === 'image' && <ImageDialog onClose={() => setDialog(undefined)} />
      }
    </ReactFlowProvider>
  );
}

export default FormFlow;