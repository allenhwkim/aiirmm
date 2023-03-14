import { XTouchSwipe } from './touch-swipe';

const css = /*css*/ `
  resize-bar { background: #CCC;}
  resize-bar:is(.active,:hover) { background: #00F;}
  resize-bar[width] {display: block; cursor:col-resize ; min-width: 4px; max-width: 4px;}
  resize-bar[height] {display: block; cursor: row-resize; min-height: 6px; max-height: 6px;}
`;

export class ResizeBar extends HTMLElement {
  swipeListener: any;
  wResizer: boolean | undefined;
  hResizer: boolean | undefined;
  prevEl: HTMLElement | undefined;
  nextEl: HTMLElement | undefined;
  prevElWidth: number | undefined;
  prevElHeight: number | undefined;
  nextElWidth: number | undefined;
  nextElHeight: number | undefined;

  constructor(...args: any) {
    const self: any = super(...(args as []));
    this.swipeListener = this._swipeListener.bind(this);  
    return self;
  }

  connectedCallback() {
    new XTouchSwipe(this);
    this.wResizer = this.getAttribute('width') !== null;
    this.hResizer = this.getAttribute('height') !== null;

    this.prevEl = this.previousElementSibling as HTMLElement;
    this.nextEl = this.nextElementSibling as HTMLElement;

    [this.prevElWidth, this.nextElWidth] = [0, 0];
    [this.prevElHeight, this.nextElHeight] = [0, 0];

    document.addEventListener('x-swipe', this.swipeListener);
    addCss(this, css);
  }

  disconnectedCallback() {
    document.removeEventListener('x-swipe', this.swipeListener);
    removeCss(this);
  }

  _swipeListener(event: any) {
    const {type, touchStaEl, x0, y0, x2, y2} = event.detail;
    if (touchStaEl !== this) return;
    if (type === 'start' && this.prevEl && this.nextEl) {
      this.classList.add('active');
      [this.prevElWidth, this.nextElWidth] = 
        [this.prevEl.offsetWidth, this.nextEl.offsetWidth];
      [this.prevElHeight, this.nextElHeight] = 
        [this.prevEl.offsetHeight, this.nextEl.offsetHeight];
    }
    if (type === 'move' && this.prevEl && this.nextEl ) {
      if (this.wResizer && this.prevElWidth && this.nextElWidth) {
        const change = x2 - x0;
        // console.log({change, x0, x2})
        this.prevEl.style.width = 
          (Math.max(this.prevElWidth + change, 20)) + 'px';
        this.nextEl.style.width = 
          (Math.max(this.nextElWidth - change, 20)) + 'px';
      } else if (this.hResizer && this.prevElHeight && this.nextElHeight) {
        const change = y2 - y0;
        this.prevEl.style.height =
          (Math.max(this.prevElHeight + change, 20)) + 'px';
        this.nextEl.style.height = 
          (Math.max(this.nextElHeight - change, 20)) + 'px';
      }
    }
    if (type === 'end') {
      this.classList.remove('active');
    } 
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