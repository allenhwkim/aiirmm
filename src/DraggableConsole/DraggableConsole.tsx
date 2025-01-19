import { useEffect, useRef, useState } from 'react'
import './DraggableConsole.scss';

export default function DraggableConsole({children}) {
  const [pressed, setPressed] = useState(false);
  const [staPos, setStaPos] = useState<any>();
  const ref = useRef<any>();

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [pressed]);

  function onMouseDown(event) {
    document.querySelector('iframe')?.setAttribute('style', 'pointer-events: none');
    setStaPos({x: event.pageX, y: event.pageY} as any);
    setPressed(true);
  }

  // Update the current position if mouse is down
  function onMouseMove (event) {
    const dialogEl = ref.current as any;
    if (pressed) {
      const {pageX, pageY} = event;
      const move = {x: pageX - staPos.x , y: pageY - staPos.y}
      dialogEl.style.left = `${staPos.x + move.x}px`;
      dialogEl.style.top = `${staPos.y + move.y}px`;
    }
  }

  function onMouseUp(_event) {
    setPressed(false);
    document.querySelector('iframe')?.removeAttribute('style');
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  return (
    <div ref={ref} className="draggable-console collapsed">
      <div className="title bg-secondary cursor-pointer p-2 py-1 text-white" 
        onMouseDown={onMouseDown}
        onDoubleClick={() => ref.current?.classList.toggle('collapsed')}>console</div>
      {children}
    </div>
  )
}
