import { XTouchSwipe } from './touch-swipe';

const css = /*css*/ `
  resize-divs { display: block; }
  resize-divs[width] { display: flex; }
  resize-divs:has(.resize-bar.active) { user-select: none; }
  resize-divs .resize-bar { background: #CCC; display: block; }
  resize-divs .resize-bar:is(.active, :hover) { background: #00F; }
  resize-divs[width] .resize-bar { cursor: col-resize ; width: 2px;}
  resize-divs[height] .resize-bar { cursor: row-resize; height: 2px;}
`;

export class ResizeDivs extends HTMLElement {
  private touchStart: any;

  resizeListener = (event: any)  => {
    const {type, touchStaEl, x0, y0, x2, y2} = event.detail;
    const prevEl = touchStaEl.previousElementSibling;
    const nextEl = touchStaEl.nextElementSibling;
    if (touchStaEl.parentElement !== this) return;

    if (type === 'start') {
      touchStaEl.classList.add('active');
      this.touchStart = {
        prevElW: prevEl.offsetWidth, 
        prevElH: prevEl.offsetHeight,
        nextElW: nextEl.offsetWidth, 
        nextElH: nextEl.offsetHeight,
      }
    } else if (type === 'move') {
      if (this.getAttribute('width') !== null) {
        prevEl.style.width = Math.max(this.touchStart.prevElW + (x2 - x0), 20) + 'px';
        nextEl.style.width = Math.max(this.touchStart.nextElW - (x2 - x0), 20) + 'px';
      } else if (this.getAttribute('height') !== null) {
        prevEl.style.height = Math.max(this.touchStart.prevElH + (y2 - y0), 20) + 'px';
        nextEl.style.height = Math.max(this.touchStart.nextElH - (y2 - y0), 20) + 'px';
      }
    } else if (type === 'end') {
      touchStaEl.classList.remove('active');
    } 
  }

  connectedCallback() {
    setTimeout( () => { // svelte runs too fast
      Array.from(this.children).slice(0, -1).forEach(el => {
        console.log('.........el', el);
        const resizeBarEl = document.createElement('div');
        resizeBarEl.classList.add('resize-bar');
        new XTouchSwipe(resizeBarEl);
        console.log('.........resizeBarEl', resizeBarEl);
        el.insertAdjacentElement('afterend', resizeBarEl);
      })
    })

    document.addEventListener('x-swipe', this.resizeListener);
    addCss(this, css);
  }

  disconnectedCallback() {
    document.removeEventListener('x-swipe', this.resizeListener);
    removeCss(this);
  }
}

function addCss(el: HTMLElement, css: string) {
  const tagName = el.tagName.toLowerCase();
  if (!document.querySelector(`style[${tagName}]`)) {
    const styleEl = document.createElement('style');
    styleEl.setAttribute(tagName,'');
    styleEl.appendChild(document.createTextNode(css));
    document.head.appendChild(styleEl);
  }
}

function removeCss(el: HTMLElement) {
  const tagName = el.tagName.toLowerCase();
  const numXElements = document.body.querySelectorAll(`${tagName}`).length;
  const styleEl = document.querySelector(`style[${tagName}]`);
  (styleEl && numXElements < 1) && document.querySelector(`style[${tagName}]`)?.remove();
}