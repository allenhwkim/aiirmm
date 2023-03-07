import { customElement } from '@elements-x/core';
import css from './form-stepper.css';

import { FormService } from './form-service';

export const FormStepper = customElement({
  debug: true,
  css: css,
  props: { 
    forms: {steps: [1, 2, 3], 1: {}, 2: {}, 3: {}} 
  },
  attrs: {
    'current-form': ''
  },

  events: {
    click(event) {console.log('clicked', event.target)}
  },

  propsChangedCallback(name, value) {
    if (name === 'forms') {
      FormService.forms = value;
      this.render?.();
    }
  },

  attributeChangedCallback(name, oldValue, newValue) {
    (name === 'current-form') && this.render?.();
  },

  render() {
    this.innerHTML = '';
    this._props.forms.steps.foreach( (formName: string, index: number) => {
      const step = this._props.forms[formName];
      const label = step.label || index + 1;
      this.insertAdjacentHTML(`beforeend`, `
        <div class="form-step ${FormService.getStatus(formName)}">
          <div class="form-label">${label}</div>
          <div class="form-title">${step.title || formName}</div>
          <div class="form-desc">${step.description}</div>
          <div class="connection-line"></div>
        </div>
      `)
    });
  },
  connectedCallback() {
  },
});

