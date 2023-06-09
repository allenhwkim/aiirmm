import * as React from 'react';
import { Handle, Position, Node, useReactFlow } from 'reactflow';
import useStore from '../store';

function EndNode({ data }: Node) {
  const { addNodeAbove } = useStore();
  const { fitView} = useReactFlow();

  const onClick = () => {
    addNodeAbove('end');
    setTimeout(() => fitView({duration: 500}));
  }

  return (
    <div className="container">
      <span className="add-node-button top" onClick={onClick}>+</span>
      <Handle type="target" position={Position.Top} />
      END 
    </div>
  );
}

export default EndNode;