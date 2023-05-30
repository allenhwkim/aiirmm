import { customElement } from '../../lib';
import css from './form-stepper.css';

import { FormController } from './form-controller';

export const FormStepper = customElement({
  css,
  props: {
    formController : FormController
  },

  constructorCallback() {
    this.addEventListener('click', function(event: UIEvent) {
      const formLinkEl = (event.target as any).closest('.form-link');
      const formStepEl = (event.target as any).closest('.form-step');
      const visitable = !formStepEl.classList.contains('incomplete');
      const formName = formLinkEl.dataset?.name;
      if (formName && visitable) {
        const customEvent = new CustomEvent('form-goto', {bubbles: true, detail: formName}) as any;
        event.target?.dispatchEvent(customEvent);
      }
    });
  },

  connectedCallback() {
    this.formController = new FormController();

    if (this.forms) { // data-form attribute
      this.formController.forms = this.forms;
      this.formController.steps = Object.keys(this.forms);
    }

    this.formController.initForm();
  },

  disconnectedCallback() {
    this.formController.removeEventListeners();
  },

  render() {
    if (!this.formController?.forms) return;

    this.innerHTML = '';
    const formCtrl = this.formController;
    formCtrl.steps.forEach( (formName: string, index: number) => {
      const activeClass = formName === formCtrl.currentForm ? ' active' : '';
      const formProp = formCtrl.forms[formName];
      const formType = formProp.type ? ` ${formProp.type}` : '';
      const label = formProp.label || index + 1;
      this.insertAdjacentHTML(`beforeend`, `
        <div class="form-step ${ formCtrl.getStatus(formName) }${activeClass}${formType}">
          ${ index ? `<div class="connection-line"></div>`: '' }
          <div class="form-link" data-name="${formName}">
            <!-- ${ formCtrl.getStatus(formName)}${activeClass} -->
            <div class="form-label">${label}</div>
            <div class="form-title">${formProp.title || formName}</div>
            <div class="form-desc">${formProp.description || ''}</div>
          </div>
        </div>
      `)
    });
  },

});
