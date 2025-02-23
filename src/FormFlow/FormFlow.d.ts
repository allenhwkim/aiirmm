import {
  Node, Edge,
  OnInit, OnConnect,
  OnNodesChange, OnEdgesChange,
  NodeMouseHandler, EdgeMouseHandler
} from '@xyflow/react';
import { EventHandler, DragEvent, KeyboardEvent } from 'react';

export interface FormFlowProps {
  nodes?: Node[];
  edges?: Edge[];
  onInit?: OnInit<Node, Edge>;
  onNodesChange?: OnNodesChange<Node>;
  onEdgesChange?: OnEdgesChange<Edge>;
  onConnect?: OnConnect;
  onDragOver?: EventHandler<DragEvent> | undefined;
  onDrop?: EventHandler<DragEvent> | undefined;
  onKeyDown?: EventHandler<KeyboardEvent> | undefined;
  onNodeDoubleClick?: NodeMouseHandler<Node>;
  onEdgeDoubleClick?: EdgeMouseHandler<Edge>;
  onNodeMouseEnter?: NodeMouseHandler<Node>;
  onNodeClick?: NodeMouseHandler<Node>;
  onEdgeClick?: EdgeMouseHandler<Edge>;
}
