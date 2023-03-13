import { customElement } from '@elements-x/core';
import css from './form-stepper.css';

import { FormController } from './form-controller';

export const FormStepper = customElement({
  debug: true,
  css: css,
  props: { formController : FormController},

  events: {
    click(event) {
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
    if (!this._props.formController) return;
    
    this.innerHTML = '';
    this._props.formController.steps.forEach( (formName: string, index: number) => {
      const activeClass = formName === this._props.formController.currentForm ? ' active' : '';
      const formProp = this._props.formController.forms[formName];
      const formType = formProp.type ? ` ${formProp.type}` : '';
      const label = formProp.label || index + 1;
      this.insertAdjacentHTML(`beforeend`, `
        <div class="form-step ${ this._props.formController.getStatus(formName) }${activeClass}${formType}">
          <div class="form-link" data-name="${formName}">
            ${ this._props.formController.getStatus(formName)}${activeClass}
            <div class="form-label">${label}</div>
            <div class="form-title">${formProp.title || formName}</div>
            <div class="form-desc">${formProp.description || ''}</div>
          </div>
          ${ index ? `<div class="connection-line"></div>`: '' }
        </div>
      `)
    });
  },

  connectedCallback: function() {
    this._props.formController = new FormController();
    this.render();
    this._props.formController.initForm();
  },

  disconnectedCallback: function() {
    this._props.formController.removeEventListeners();
  }
});

