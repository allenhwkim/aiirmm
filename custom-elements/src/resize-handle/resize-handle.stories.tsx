import * as React from 'react';
import { ResizeHandle } from "./resize-handle"; // Shares the same FormController
import './resize-handle.stories.css';
import { useRef, useEffect } from 'react';
import { XTouchSwipe } from './touch-swipe';

(!customElements.get('resize-handle')) && customElements.define('resize-handle', ResizeHandle);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'resize-handle': any;
    }
  }
}

export default {
  title: 'Components/resize-handle',
  component: ResizeHandle,
  parameters: {
    // docs: { page: CustomDocumentation },
  },
  // argTypes: {
  //   data: { control: 'object' },
  // }
};

const Template = (args?: any) => {
  // const myRef = useRef(null);
  const touchStart = {left: 0, top: 0};
  const touchListener =  (event: any) => {
    const {type, x0, y0, x1, y1, x2, y2, distanceX, distanceY, distance} = event.detail;
    const {duration, speed, distance0, duration0, speed0, touchStaEl, orgEvent } = event.detail;
    if (!touchStaEl.classList.contains('draggable')) return;

    const [dx, dy] = [x2 - x0, y2 - y0];
    if (type === 'start') {
      touchStaEl.style.userSelect = 'none';
      touchStart.top  = touchStaEl.offsetTop;
      touchStart.left = touchStaEl.offsetLeft;
      document.querySelectorAll('.draggable').forEach(el => (el as any).style.zIndex = '');
      touchStaEl.style.zIndex = 1;
    }
    if (type === 'move') {
      touchStaEl.style.top = `${touchStart.top + dy}px`;
      touchStaEl.style.left = `${touchStart.left + dx}px`;
    }
    if (type === 'end') {
      touchStaEl.style.userSelect = 'none';
    } 
  }

  useEffect(() => {
    document.querySelectorAll('.draggable').forEach(el => new XTouchSwipe(el as any));
    
    document.addEventListener('x-swipe', touchListener);
    return () => document.removeEventListener('x-swipe', touchListener);
  }, []); // This runs only on mount (when the component appears)

  return <>
    <div className="border-solid flex-center draggable" 
      style={{position: 'absolute', width: '400px', height: '100px', background: '#FFF'}}>
      Resizable DIV
      <resize-handle top left></resize-handle>
      <resize-handle top right></resize-handle>
      <resize-handle bottom left></resize-handle>
      <resize-handle bottom right></resize-handle>
    </div>
    <div className="border-solid flex-center draggable" 
      style={{position: 'absolute', width: '400px', height: '100px', top: '90px', left: '50px',  background: '#FFF'}}>
      Resizable DIV
      <resize-handle bottom right></resize-handle>
    </div>
  </>
}; 

export const Primary = Template.bind({});
