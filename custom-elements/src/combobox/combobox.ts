import { customElement, ICustomElement } from '@elements-x/core';
import { highlightNext, highlightValue, highlightSearch } from './highlight';
import css from './combobox.css';

const CLASS_HIGHLIGHTED = `x-highlighted`;
const CLASS_SELECTED = `x-selected`;
const CLASS_HIDDEN = `hidden`;

function selectHandler(event: any, inputEl: HTMLInputElement, highlightedEl: HTMLLIElement) {
  const liEl = event.target.closest('ul') && event.target.closest('li');
  if (event instanceof MouseEvent && liEl) { // <li> mouse clicked
    const value = liEl.dataset.value !== undefined ?  liEl.dataset.value : liEl.innerText;
    liEl.dispatchEvent(new CustomEvent('select', {bubbles: true, detail: value}));
    inputEl.value = value;
    inputEl.blur();
  } else if (event instanceof KeyboardEvent && highlightedEl) { // keyboard enter
    const value = highlightedEl.dataset.value !== undefined ? 
      highlightedEl.dataset.value : highlightedEl.innerText;
    highlightedEl.dispatchEvent(new CustomEvent('select', {bubbles: true, detail: value}));
    inputEl.value = value as string;
    inputEl.blur();
  }
}

export const Combobox = customElement({
  debug: true,
  css, 
  attributeChangedCallback(this: ICustomElement, name, oldVal, newVal) {
    this.render?.();
  },
  connectedCallback(this: ICustomElement) { // do not call this.render() here, it's called already
    const custEl = this as any;
    const inputEl = custEl.querySelector('input');
    const listEl = custEl.querySelector('ul');
    inputEl?.addEventListener('focus', () => highlightValue(listEl, inputEl.value))

    // mousedown -> inputEl.blur(), hide dropdown -> input:focus, show dropdown, 
    // do not call selectHandler with click event, but only with mousedown
    listEl?.addEventListener('mousedown', function(event: any) { 
      const highlightedEl = custEl.querySelector(`.${CLASS_HIGHLIGHTED}:not(.${CLASS_HIDDEN})`);
      selectHandler(event, inputEl, highlightedEl)
    });

    inputEl?.addEventListener('keydown', function(event: any) {
      const highlightedEl = custEl.querySelector(`.${CLASS_HIGHLIGHTED}:not(.${CLASS_HIDDEN})`);
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(event.key)) {
        if      (event.key === 'ArrowDown') { highlightNext( listEl, 1); }
        else if (event.key === 'ArrowUp') { highlightNext( listEl, -1); } 
        else if (event.key === 'Escape') { inputEl.blur(); }
        else if (event.key === 'Enter') { selectHandler(event, inputEl, highlightedEl) }
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    });

    inputEl?.addEventListener('input', function(event: any) { // input key event handler
      highlightSearch(listEl, inputEl.value);
    });
  },
});