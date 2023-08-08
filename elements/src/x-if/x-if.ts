import morphdom from 'morphdom/dist/morphdom-esm';
import { hash } from "../../lib";
import { XChecks } from './x-checks';

export class XIf extends HTMLElement {
  props = {checkedValue : false};
  template = '';

  constructor() {
    super();
    for (let key in this.props) {  //  getter and setters of all reactive props
      Object.defineProperty(this, key, {
        get() { return this.props[key]; },
        set(value) {
          if (this.props[key] === value) return;
          this.props[key] = value;
          this.#updateDOM(); // react to props change
        }
      });
    }
  }

  render(this:any) {
    const ifExpr = this.getAttribute('if');
    this.checkValue = !!(new Function(`return ${ifExpr}`)());
    this.innerHTML = this.checkValue ? this.template : '';
  }

  connectedCallback() {
    const ifExpr = this.getAttribute('if');
    if (ifExpr === null) {
      this.innerHTML = 'ERROR: if expression is required, e.g., if="true"';
    } else {
      const ifHash = XChecks.add(ifExpr);
      this.setAttribute(ifHash, '');

      this.template = this.innerHTML;
    }
  }

  #timer: any;
  #updateDOM() { 
    clearTimeout(this.#timer);
    this.#timer = setTimeout(async () => { 
      const newHTML = await this.render();
      const updated = document.createElement('div');
      updated.innerHTML += newHTML;
      morphdom(this, updated, { childrenOnly: true }); 
    }, 50);
  }

  disconnectedCallback() {
    const ifExpr = this.getAttribute('if');
    if (ifExpr) {
      const els = document.querySelectorAll(`[${hash(ifExpr)}]`);
      (els.length < 1) && (XChecks.remove(ifExpr));
    }
  }
}
