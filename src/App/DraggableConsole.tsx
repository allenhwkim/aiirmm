import { useEffect, useRef, useState } from 'react'

export default function DraggableConsole({children}) {
  const [pressed, setPressed] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0});
  const ref: any = useRef();

  // Monitor changes to position state and update DOM
  useEffect(() => {
    if (ref.current) {
      ref.current.style.left = `${position.x}px`;
      ref.current.style.top = `${position.y}px`;
    }
  }, [position])

  // Update the current position if mouse is down
  function onMouseMove (event) {
    if (pressed) {
      setPosition({
        x: position.x + event.movementX,
        y: position.y + event.movementY
      })
    }
  }

  function onMouseDown(_event) {
    setPressed(true);
    ref?.current.addEventListener('mousemove', onMouseMove)
  }

  function onMouseUp(_event) {
    setPressed(false);
    ref?.current.removeEventListener('mousemove', onMouseMove)
  }

  return (
    <div ref={ ref } className="draggable-console collapsed" 
      onMouseMove={ onMouseMove }
      onMouseUp={ onMouseUp } onMouseLeave={ onMouseUp}>
      <div className="title bg-secondary cursor-pointer p-2 py-1 text-white" 
        onDoubleClick={() => ref.current.classList.toggle('collapsed')}
        onMouseDown={ onMouseDown }>console</div>
      {children}
    </div>
  )
}
