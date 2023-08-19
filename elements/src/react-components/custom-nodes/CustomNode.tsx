import * as React from 'react';
import { useRef } from 'react';
import { Handle,  Node, Position, useReactFlow, getIncomers, getOutgoers } from 'reactflow';
import useStore from '../store';

function CustomNode({ id, data }: Node): React.ReactElement {
  const { nodes, edges, setNodeData, addNodeBeside, addNodeAbove, addNodeBelow } = useStore();
  const { fitView} = useReactFlow();
  const containerRef = useRef(null);

  const node = nodes.find(el => el.id === id) as Node;
  let [numIncomers, numOutgoers] = [0,0];
  if (node) {
    numIncomers = getIncomers(node, nodes, edges).length;
    numOutgoers = getOutgoers(node, nodes, edges).length;
  }

  const addNodeToLeft = () => {
    addNodeBeside(id, 'left');
    setTimeout(() => fitView({duration: 500}));
  }

  const addNodeToRight = () => {
    addNodeBeside(id, 'right');
    setTimeout(() => fitView({duration: 500}));
  }

  const addNodeAboveThis = () => {
    addNodeAbove(id);
    setTimeout(() => fitView({duration: 500}));
  }

  const addNodeBelowThis = () => {
    addNodeBelow(id);
    setTimeout(() => fitView({duration: 500}));
  }

  const onLabelBlur = (event: React.ChangeEvent<any>) => {
    setNodeData(id, Object.assign(node.data, {label: event.target.textContent}));
  }

  return (
    <div ref={containerRef}
      className={`container in-${numIncomers} out-${numOutgoers}`}>
      <Handle type="target" position={Position.Top} />
      {/* this cannot be <input> for a11y for several reasons. focusable cannot have focusable etc */}
      <div className="nodrag label-input" 
        contentEditable={true} 
        suppressContentEditableWarning={true}
        onBlur={onLabelBlur}
      >
        {data.label}
      </div>
      <span className="add-node-button top" onClick={addNodeAboveThis}>+</span>
      <span className="add-node-button right" onClick={addNodeToRight}>+</span>
      <span className="add-node-button bottom" onClick={addNodeBelowThis}>+</span>
      <span className="add-node-button left" onClick={addNodeToLeft}>+</span>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default CustomNode;
