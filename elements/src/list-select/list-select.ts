import { customElement } from '../../lib';
import css from './list-select.css';

export const ListSelect = customElement({
  shadow: true,
  css, 
  observedAttributes: ['selected', 'expanded'],
  connectedCallback() {
    this.host.addEventListener('keydown', e => this.keydownHandler(e));
  },
  render({attrs}) {
    this.init(attrs.expanded === 'true');
    this.initHighlightAndSelect(attrs.selected)
  },
  keydownHandler(event) {
    const ulEl = event.target;
    const highlightedEl = ulEl.querySelector('.x-highlighted');
    const hasUlEl = highlightedEl.querySelector('ul');

    const highlightNextEl = (ulEl, inc=1) => {
      const allEls = ulEl.querySelectorAll('li:not(.disabled)');
      const visibles: any = Array.from(allEls)
        .filter((el:any) => el.offsetParent !== null);
      const highlightedEl = ulEl.querySelector('.x-highlighted');
      const curIndex = visibles.indexOf(highlightedEl);
      const nxtIndex = (visibles.length + curIndex + inc) % visibles.length;

      highlightedEl?.classList.remove('x-highlighted');
      visibles[nxtIndex]?.classList.add('x-highlighted');
    }

    if (['Enter', 'Space'].includes(event.code)) {
      this.toggleList(highlightedEl);
      (event.code === 'Enter') && this.fireSelect(highlightedEl);
    } else if (['ArrowUp', 'ArrowLeft'].includes(event.code)) {
      highlightNextEl(ulEl, -1);
    } else if (['ArrowDown', 'ArrowRight'].includes(event.code)) {
      highlightNextEl(ulEl);
    }
    if (['Enter', 'Space', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(event.code)) {
      event.stopPropagation();
      event.preventDefault();
    }
  }, 
  init(expanded) {
    const highlightEl = (ulEl, el) => {
      const highlightedEl = ulEl.querySelector('.x-highlighted');
      highlightedEl && highlightedEl.classList.remove('x-highlighted');
      el.classList.add('x-highlighted');
    }

    const ulEl = this.host.querySelector('ul');
    !ulEl.getAttribute('tabindex') && ulEl.setAttribute('tabindex', '0');
    ulEl.querySelectorAll('li > ul, li > * > ul').forEach(el => {
      !expanded && el.setAttribute('hidden', '') 
    });
    ulEl.querySelectorAll('li').forEach(el => {
      el.addEventListener('click', (event) => {
        const liEl = event.target.closest('li');
        liEl.querySelector('ul') && this.toggleList(event);
        highlightEl(ulEl, liEl);
        this.fireSelect(liEl);
        event.stopPropagation();
      });
    });
  },
  initHighlightAndSelect(selected) {
    const ulEl = this.host.querySelector('ul');
    const liEl = ulEl.querySelector('#'+ selected || 'unknown');
    if (liEl) {
      liEl.classList.add('x-highlighted');
      let expandable = liEl.parentElement.closest('ul');
      while(expandable && ulEl.contains(expandable)) { 
        expandable.removeAttribute('hidden');
        expandable = expandable.parentElement?.closest('ul');
      }
      this.fireSelect(ulEl.querySelector('.x-highlighted'));
    }
  },
  toggleList(eventOrEl) {
    const liEl = eventOrEl.target || eventOrEl;
    const child = liEl.querySelector('ul');
    if (child) {
      child.getAttribute('hidden') !== null ?
        child.removeAttribute('hidden') : child.setAttribute('hidden', '');
    }
  },

  fireSelect(el) {
    // unselect prev highlighted ones, and highlight and fire event
    const ulEl = el.closest('ul');
    const highlightedEl = ulEl.querySelector('.x-highlighted');
    highlightedEl && highlightedEl.classList.remove('x-highlighted');
    if (el && (el.offsetParent !== null)) { // if visible
      el.classList.add('x-highlighted');
      el.dispatchEvent(new CustomEvent('select', { bubbles: true, composed: true, detail: el }));
    }
  }
});
