import { customElement } from '@elements-x/core';
import css from './form-stepper.css';

import { FormController } from './form-controller';

export const FormStepper = customElement({
  debug: true,
  css: css,
  props: { forms: FormController.forms },

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

  propsChangedCallback(name, value) {
    if (name === 'forms' && value) {
      FormController.forms = value;
      this.render?.();
    }
  },

  // attributeChangedCallback(name, oldValue, newValue) {
  //   console.log('attributeChangedCallback', {name, oldValue, newValue});
  //   (name === 'current-form') && this.render?.();
  // },

  render() {
    this.innerHTML = '';
    FormController.steps.forEach( (formName: string, index: number) => {
      const step = this._props.forms[formName];
      const label = step.label || index + 1;
      this.insertAdjacentHTML(`beforeend`, `
        <div class="form-step ${FormController.getStatus(formName)}">
          <div class="form-link" data-name="${formName}">
            <div class="form-label">${label}</div>
            <div class="form-title">${step.title || formName}</div>
            <div class="form-desc">${step.description || ''}</div>
          </div>
          ${ index ? `<div class="connection-line"></div>`: '' }
        </div>
      `)
    });
  },

  connectedCallback: function() {
    FormController.initForm(); // set FormController.steps and FormController.currentForm
  },
});

