import * as React from 'react';
import { Handle, Position, Node, useReactFlow } from 'reactflow';
import useStore from '../store';

function StartNode({ data }: Node) {
  const { addNodeBelow } = useStore();
  const { fitView} = useReactFlow();

  const onClick = () => {
    addNodeBelow('start');
    setTimeout(() => fitView({duration: 500}));
  }

  return (
    <div className="container">
      START 
      <Handle type="source" position={Position.Bottom} />
      <span className="add-node-button bottom" onClick={onClick}>+</span>
    </div>
  );
}

export default StartNode;