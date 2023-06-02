import { customElement } from '../../lib';
import css from './list-select.css';

export const ListSelect = customElement({
  shadow: true,
  css, 
  observedAttributes: ['selected'],

  connectedCallback() {
    this.host.addEventListener('keydown', e => this.keydownHandler(e));
    this.host.addEventListener('click', e => this.clickHandler(e));
  },

  render({attrs}) {
    this.init(); // set tabindex attr, and hide all <ul>
    this.initHighlightAndSelect(attrs.selected); // expand selected on
  },
  
  clickHandler(event: any) {
    const liEl = event.target?.closest('li');
    if (liEl) {
      this.highlightEl(liEl);
      this.toggleChildList();
      this.fireSelect(liEl);
    }
  },

  keydownHandler(event: any) {
    const highlightNextEl = (inc=1, siblingOnly=false) => {
      const allEls = this.host.querySelectorAll(siblingOnly ? 'ul:has(.x-highlighted) > li:not(.disabled)': 'li:not(.disabled)');
      const visibles: any[] = [...allEls].filter((el:any) => el.offsetParent !== null);
      const curIndex = visibles.indexOf(this.host.querySelector('.x-highlighted'));
      const nxtIndex = (visibles.length + curIndex + inc) % visibles.length;

      visibles[curIndex]?.classList.remove('x-highlighted');
      visibles[nxtIndex]?.classList.add('x-highlighted');
    }

    if (['Enter', 'Space'].includes(event.code)) {
      this.toggleChildList();
      (event.code === 'Enter') && this.fireSelect();
    } else if (event.code === 'ArrowUp') {
      highlightNextEl(-1);
    } else if (event.code === 'ArrowDown') {
      highlightNextEl(1);
    } else if (event.code === 'ArrowLeft') {
      highlightNextEl(-1, true);
    } else if (event.code === 'ArrowRight') {
      highlightNextEl(1, true);
    }
    if (['Enter', 'Space', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(event.code)) {
      event.stopPropagation();
      event.preventDefault();
    }
  }, 

  init() {
    const ulEl = this.host.querySelector('ul');
    !ulEl.getAttribute('tabindex') && ulEl.setAttribute('tabindex', '0');
    ulEl.querySelectorAll('li > ul, li > * > ul').forEach(el => el.setAttribute('hidden', ''));
  },

  initHighlightAndSelect(selected) {
    const isMenuStyle = this.host.querySelector('ul.menu')
    const ulEl = this.host.querySelector('ul');
    const liEl = ulEl.querySelector('#'+ selected || 'unknown');
    if (!isMenuStyle && liEl) {
      liEl.classList.add('x-highlighted');
      let expandable = liEl.parentElement.closest('ul');
      while(expandable && ulEl.contains(expandable)) { 
        expandable.removeAttribute('hidden');
        expandable = expandable.parentElement?.closest('ul');
      }
      this.fireSelect();
    }
  },

  highlightEl(el: any) {
    this.host.querySelector('.x-highlighted')?.classList.remove('x-highlighted');
    el.classList.add('x-highlighted');
  },

  toggleChildList() {
    const highlightedEl = this.host.querySelector('.x-highlighted');
    const child = highlightedEl?.querySelector('ul');
    if (child) {
      child.getAttribute('hidden') !== null ?
        child.removeAttribute('hidden') : child.setAttribute('hidden', '');
    }
  },

  fireSelect() {
    const highlightedEl = this.host.querySelector('.x-highlighted');
    const event = new CustomEvent('select', { bubbles: true, composed: true, detail: highlightedEl });
    highlightedEl.dispatchEvent(event);
  }
});
