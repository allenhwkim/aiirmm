import { useEffect, useRef, useState } from 'react'
import './DraggableConsole.scss';

export default function DraggableConsole({children}) {
  const [pressed, setPressed] = useState(false);
  const [staPos, setStaPos] = useState<any>();
  const [minimized, setMinimized] = useState(true);
  const ref = useRef<any>();

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [pressed]);

  function onMouseDown(event) {
    // iframe has its own event.pageX, different from main window
    document.querySelector('iframe')?.setAttribute('style', 'pointer-events: none');
    const rect = ref.current?.getBoundingClientRect();
    setStaPos({
      pageX: event.pageX,
      pageY: event.pageY,
      elX: rect.x,
      elY: rect.y
    } as any);
    setPressed(true);
  }

  // Update the current position if mouse is down
  function onMouseMove (event) {
    const dialogEl = ref.current as any;
    if (pressed) {
      const {pageX:pageX, pageY:pageY} = event;
      dialogEl.style.left = `${staPos.elX + (pageX - staPos.pageX)}px`;
      dialogEl.style.top = `${staPos.elY + (pageY - staPos.pageY)}px`;
    }
  }

  function onMouseUp(_event) {
    setPressed(false);
    document.querySelector('iframe')?.removeAttribute('style');
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  return (
    <div ref={ref} className={`draggable-console shadow-sm ${minimized && 'collapsed'}`}>
      <div className="title" onMouseDown={onMouseDown}>
        <span>console</span>
        <div className="icons">
          { !minimized &&
              <svg viewBox="0 0 512 512" onClick={() => setMinimized(true)}>
                <path d="M24 432c-13.3 0-24 10.7-24 24s10.7 24 24 24l464 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L24 432z"/>
              </svg>
          }

          { minimized &&
              <svg viewBox="0 0 512 512" onClick={() => setMinimized(false)}>
                <path d="M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z"/>
              </svg>
          }
        </div>
      </div>
      {children}
    </div>
  )
}
