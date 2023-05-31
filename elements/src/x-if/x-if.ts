import { customElement, hash } from "../../lib";
import { XChecks } from './x-checks';

export const XIf = customElement({
  props: { checkValue: false },
  connectedCallback() {
    const ifExpr = this.getAttribute('if');
    if (ifExpr === null) {
      this.innerHTML = 'ERROR: if expression is required, e.g., if="true"';
    } else {
      const ifHash = XChecks.add(ifExpr);
      this.setAttribute(ifHash, '');

      this.template = this.innerHTML;
    }
  },
  disconnectedCallback() {
    const ifExpr = this.getAttribute('if');
    if (ifExpr) {
      const els = document.querySelectorAll(`[${hash(ifExpr)}]`);
      (els.length < 1) && (XChecks.remove(ifExpr));
    }
  },
  render() {
    const ifExpr = this.getAttribute('if');
    this.checkValue = !!(new Function(`return ${ifExpr}`)());
    this.innerHTML = this.checkValue ? this.template : '';
  }
});