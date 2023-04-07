import { customElement } from '@elements-x/core';
import css from './form-stepper.css';

import { FormController } from './form-controller';

export const FormStepper = customElement({
  debug: true,
  css: css,
  props: {
    formController : FormController
  },

  events: {
    click(event: UIEvent) {
      const formLinkEl = (event.target as any).closest('.form-link');
      const formStepEl = (event.target as any).closest('.form-step');
      const visitable = !formStepEl.classList.contains('incomplete');
      const formName = formLinkEl.dataset.name;
      if (visitable) {
        const customEvent = new CustomEvent('form-goto', {bubbles: true, detail: formName}) as any;
        this.dispatchEvent(customEvent);
      }
    }
  },

  render() {
    if (!this._props?.formController?.forms) return;

    this.innerHTML = '';
    const formCtrl = this._props?.formController;
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

  connectedCallback: function(this:any) {
    if (this._props) {
      this._props.formController = new FormController();
      this.render?.();
      this._props.formController.initForm();

      if (this.forms) { // data-form attribute
        this._props.formController.forms = this.forms;
        this._props.formController.steps = Object.keys(this.forms);
      }
    }

  },

  disconnectedCallback: function() {
    this._props?.formController.removeEventListeners();
  }
});

