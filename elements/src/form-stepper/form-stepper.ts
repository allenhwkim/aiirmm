import { addCss, removeCss, customElement } from '../../lib';
import css from './form-stepper.css';

import { FormController } from './form-controller';

export class FormStepper extends HTMLElement {
  formController: FormController;

  get forms() {
    return this.formController.forms;
  }

  set forms(arg) {
    this.formController.forms = arg;
    this.formController.steps = Object.keys(arg);
    this.formController.initForm();
    this.render();
  }

  _steps = [];
  get steps() {
    return this.formController.steps;
  }

  set steps(arg) {
    this.formController.steps = Object.keys(arg);
    this.formController.initForm();
    this.render();
  }

  constructor() { 
    super();

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

    this.formController = new FormController();
  }

  connectedCallback() {
    addCss('form-stepper', css);

    if (this.forms) { // data-form attribute
      this.formController.forms = this.forms;
      this.formController.steps = Object.keys(this.forms);
    }

    this.formController.initForm();
    this.render();
  }

  disconnectedCallback() {
    this.formController?.removeEventListeners?.();
    removeCss('form-stepper');
  }

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
        <div class="form-step ${formCtrl.getStatus(formName)}${activeClass}${formType}">
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
  }
}
