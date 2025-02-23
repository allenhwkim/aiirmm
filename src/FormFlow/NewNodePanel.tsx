export default () => {

  const onDragStart = (event: any) => {
    event.dataTransfer?.clearData();
    (event.dataTransfer as any).effectAllowed = 'move';
  };

  return (
    <aside className="add-node-dnd">
      <div className="dndnode react-flow__node draggable"
        draggable
        title="Drag and drop this to add a node"
        onDragStart={onDragStart}>
        +Form
      </div>
    </aside>
  );
};
