import morphdom from 'morphdom/dist/morphdom-esm';
import { hash } from "../../lib";
import { XChecks } from "./x-checks";

export class XBind extends HTMLElement {
  props = { 
    checkValue: undefined, 
    bindExpr: undefined 
  };

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

  connectedCallback() {
    (this as any).bindExpr = this.innerText;
    if ((this as any).bindExpr === null) {
      this.innerHTML = 'ERROR: bind expression is required, e.g., bind="foo"';
    } 
    const bindHash = XChecks.add((this as any).bindExpr);
    this.setAttribute(bindHash, '');
    (this as any).checkValue = new Function(`return ${(this as any).bindExpr}`)();
    this.#updateDOM();
  }

  disconnectedCallback() {
    const hashStr = hash((this as any).bindExpr);
    if (hashStr) {
      const els = document.querySelectorAll(`[${hashStr}]`);
      (els.length < 1) && (XChecks.remove((this as any).bindExpr));
    }
  }

  render() {
    this.#updateDOM();
  }

  #timer: any;
  #updateDOM() { 
    clearTimeout(this.#timer);
    this.#timer = setTimeout(async () => { 
      const updated = document.createElement('div');
      updated.innerHTML = (this as any).checkValue;
      morphdom(this, updated, { childrenOnly: true }); 
    }, 50);
  }
}