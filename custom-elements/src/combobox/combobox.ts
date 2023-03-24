import { customElement, ICustomElement } from '@elements-x/core';
import { highlightNext, highlightValue, highlightSearch, rewriteListEl } from './highlight';
import css from './combobox.css';

const CLASS_HIGHLIGHTED = `x-highlighted`;
const CLASS_SELECTED = `x-selected`;
const CLASS_HIDDEN = `hidden`;

function debounce(func: Function, wait = 500) {
  let timeout: any;
  return function (this: any, ...args: any) {
    var context = this;
    var later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function getElProp(el: any, propName: string) {
  // react <x-combobox src={func}>     ----> $0.__reactProps$xxxxxx.src;
  // angular <x-combobox [src]="func"> ----> $0.src
  // vuejs <x-combobox :src="func"> ----> $0.src
  const reactPropKey = Object.keys(el).find( key => key.startsWith('__reactProps$')) // react 17+
  return reactPropKey ?
    el[reactPropKey][propName] :
      el[propName] ? el[propName] : (globalThis as any)[propName];
}

/* action when an dropdown list is selected */
function selectHandler(event: any, inputEl: HTMLInputElement, highlightedEl: any) {
  const liEl = event.target.closest('ul') && event.target.closest('li');
  if (event instanceof MouseEvent && liEl) { // <li> mouse clicked
    const value = liEl.dataset.value !== undefined ?  liEl.dataset.value : liEl.innerText;
    const detail = liEl.data || value;
    liEl.dispatchEvent(new CustomEvent('select', {bubbles: true, detail}));
    inputEl.value = value;
    inputEl.blur();
  } else if (event instanceof KeyboardEvent && highlightedEl) { // keyboard enter
    const value = highlightedEl.dataset.value !== undefined ?  highlightedEl.dataset.value : highlightedEl.innerText;
    const detail = highlightedEl.data || value;
    highlightedEl.dispatchEvent(new CustomEvent('select', {bubbles: true, detail}));
    inputEl.value = value as string;
    inputEl.blur();
  }
}

export const Combobox = customElement({
  // debug: true,
  css, 
  connectedCallback(this: ICustomElement) { // do not call this.render() here, it's called already
    const custEl = this as any;
    const inputEl = custEl.querySelector('input');
    const listEl = custEl.querySelector('ul');
    const srcFunc = getElProp(custEl, 'src');
    if (srcFunc) {
      custEl.template = listEl.children[0]?.outerHTML;
      listEl.innerHTML = '';
    }

    inputEl?.addEventListener('focus', () => highlightValue(listEl, inputEl.value))

    // mousedown -> inputEl.blur(), hide dropdown -> input:focus, show dropdown, 
    // do not call selectHandler with click event, but only with mousedown
    listEl?.addEventListener('mousedown', function(event: any) { 
      const highlightedEl = custEl.querySelector(`.${CLASS_HIGHLIGHTED}:not(.${CLASS_HIDDEN})`);
      custEl.querySelector(`.${CLASS_SELECTED}`)?.classList.remove(CLASS_SELECTED);
      selectHandler(event, inputEl, highlightedEl)
    });

    // remove highlighted part when input focused out to remove duplicated highlighting.
    inputEl?.addEventListener('blur', function(event: any) { 
      const highlightedEl = listEl.querySelector(`.${CLASS_HIGHLIGHTED}`);
      highlightedEl?.classList.remove(CLASS_HIGHLIGHTED);
    });

    inputEl?.addEventListener('keydown', function(event: any) {
      const highlightedEl = custEl.querySelector(`.${CLASS_HIGHLIGHTED}:not(.${CLASS_HIDDEN})`);
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(event.key)) {
        if      (event.key === 'ArrowDown') { highlightNext( listEl, 1); }
        else if (event.key === 'ArrowUp') { highlightNext( listEl, -1); } 
        else if (event.key === 'Escape') { inputEl.blur(); }
        else if (event.key === 'Enter') { 
          custEl.querySelector(`.${CLASS_SELECTED}`)?.classList.remove(CLASS_SELECTED);
          selectHandler(event, inputEl, highlightedEl);
        }
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    });

    const inputListener = srcFunc ? 
      debounce(() => srcFunc(inputEl.value).then((resp: any[]) => {
        rewriteListEl(listEl, resp, custEl.template)
      }), 500) : () => highlightSearch(listEl, inputEl.value);
    inputEl?.addEventListener('input', inputListener
      // function(event: any) { // input key event handler
      //   if (typeof srcFunc === 'function') { // async API call
      //     srcFunc(inputEl.value)
      //       .then((resp: any[]) => rewriteListEl(listEl, resp, custEl.template))
      //   } else {
      //     highlightSearch(listEl, inputEl.value);
      //   }
      // }
    );

  },
});