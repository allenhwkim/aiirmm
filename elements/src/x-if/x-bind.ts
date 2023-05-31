import { customElement, hash } from "../../lib";
import { XChecks } from "./x-checks";

export const XBind = customElement({
  props: { checkValue: undefined, bindExpr: undefined },
  connectedCallback() {
    this.bindExpr = this.innerText;
    if (this.bindExpr === null) {
      this.innerHTML = 'ERROR: bind expression is required, e.g., bind="foo"';
    } 
    const bindHash = XChecks.add(this.bindExpr);
    this.setAttribute(bindHash, '');
    this.checkValue = new Function(`return ${this.bindExpr}`)();
  },
  disconnectedCallback() {
    const hashStr = hash(this.bindExpr);
    if (hashStr) {
      const els = document.querySelectorAll(`[${hashStr}]`);
      (els.length < 1) && (XChecks.remove(this.bindExpr));
    }
  },
  render() {
    this.innerHTML = this.checkValue;
  }
}) as any;
