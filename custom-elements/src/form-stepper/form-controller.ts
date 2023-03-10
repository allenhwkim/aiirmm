import { IForms, IForm, IFormsSubmit, IUserData} from './types';

const defaultForms = {
  Name: {
    source: () => `Name: <input name="first" />`,
  }, 
  Contact: {
    source: () => `Address: <input name="address" />`,
    skippable: true
  }, 
  Review: {
    type: 'review',
  }
};

let instance: FormController;
export class FormController {
  steps: string[] = [];
  currentForm: string = '';
  forms: IForms = {};
  _docGotoListener = (event: any) => this.initForm(event.detail);
  _docClickListener = (event: any) => {
    if (event.target.classList.contains('form-review')) {
      this.initForm('review'); 
    } else if (event.target.classList.contains('form-prev')) {
      this.initForm('prev'); 
    } else if (event.target.classList.contains('form-next')) { 
      this.setUserData(this.currentForm, {foo: 1});
      this.initForm('next');
    }
  }

  constructor(forms?: IForms) {
    if (!instance) {
      this.forms = forms || defaultForms;
      this.steps = Object.keys(this.forms);
      this.currentForm = this.steps[0];
      this.addEventListeners();
      instance = this;
    }
    return instance;
  }

  addEventListeners() {
    document.addEventListener('form-goto', this._docGotoListener);
    document.addEventListener('click', this._docClickListener);
  }

  removeEventListeners() {
    document.removeEventListener('form-goto', this._docGotoListener);
    document.removeEventListener('click', this._docClickListener);
  }

  initForm(target: string = 'auto') {
    let nextFormIndex = 0;
    if (this.steps.includes(target)) {
      nextFormIndex = this.steps.indexOf(target);
      this.currentForm = target;
    } else if (['submit', 'review', 'auto', 'prev', 'next'].includes(target)) {
      const currentFormIndex = this.steps.indexOf(this.currentForm);

      if (target === 'submit' || target === 'review') {
        nextFormIndex = this.steps.findIndex((formId: string) => formId = 'submit');
      } else if (target === 'auto') {
        nextFormIndex = this.steps.findIndex((formId: string) =>  this.getStatus(formId) !== 'complete')
      } else if (target === 'prev') {
        nextFormIndex = (currentFormIndex - 1) % this.steps.length;
      } else if (target === 'next') {
        nextFormIndex = (currentFormIndex + 1) % this.steps.length;
      }

      this.currentForm = this.steps[nextFormIndex]
    }

    this.initStepperEl();
    this.initErrorsEl();
    this.initFormEl();
    this.initButtonsEl();
  }

  getStatus(formId: string): 'error' | 'complete' | 'active' | 'incomplete' | 'skipped'  { 
    const userDataJson = window.sessionStorage.getItem('form-user-data');
    const userData: IUserData = userDataJson ? JSON.parse(userDataJson) : null;
    const form: IForm = this.forms[formId];
    if (formId === this.currentForm) {
      return 'active';
    } else if (userData?.[formId]) { // user has visited this formId already and saved data 
      const errors = this.getErrors(formId);
      return errors ? 'error' : 'complete';
    } else {
      const currentFormIndex = Object.keys(this.forms).indexOf(this.currentForm);
      const formIndex = Object.keys(this.forms).indexOf(formId);
      if (form.skippable && formIndex < currentFormIndex) {
        return 'skipped';
      } else {
        return 'incomplete';
      }
    }
  }

  getErrors(formId: string): string[] | null{
    // returns errors of the given formId
    const getErrorFunc = this.forms[formId].getErrors;
    if (getErrorFunc) {
      const userDataJson = window.sessionStorage.getItem('form-user-data');
      const userData = userDataJson ? JSON.parse(userDataJson) : null;
      return getErrorFunc(userData[formId]);
    } else {
      return null;
    }
  }

  initStepperEl(): void {
    const stepperEl: any = document.querySelector('form-stepper');
    stepperEl?.render();
  }

  initErrorsEl(): void {
    const errorsEl = document.querySelector('.form-errors');
    if (errorsEl) {
      errorsEl.innerHTML = '';
      const errors = this.getErrors(this.currentForm);
      (errors||[]).forEach(error => {
        errorsEl.insertAdjacentHTML('beforeend', `<div class="error">${error}</div>`)
      });
    }
  }


  async initFormEl(): Promise<void> { // set innerHTML of <form> element
    const formEl = document.querySelector('form.x-form');
    const source = this.forms[this.currentForm].source;
    if (formEl) {
      if (typeof source === 'string') {
        window.fetch(source)
          .then(resp => resp.text())
          .then(resp => formEl.innerHTML = resp)
          .catch(error => formEl.innerHTML = error)
      } else if (typeof source === 'function') {
        formEl.innerHTML = source();
      } else {
        formEl.innerHTML = `HTML for "${this.currentForm} form" goes here`;
      }
    }
  }  

  initButtonsEl(): void { // set buttons text and availability
    console.log('initButtonsEl called')
    const reviewButtonEl = document.querySelector('.form-buttons .form-review');
    const prevButtonEl = document.querySelector('.form-buttons .form-prev');
    const nextButtonEl = document.querySelector('.form-buttons .form-next');
    const currentFormIndex = this.steps.indexOf(this.currentForm);
    if (reviewButtonEl) {
      (reviewButtonEl as HTMLButtonElement).disabled = !this.isReviewable();
    }
    if (prevButtonEl) {
      // 0-1-2-3-current -> enabled,  current-1-2-3-review -> disabled
      (prevButtonEl as HTMLButtonElement).disabled = !(currentFormIndex > 0);
      console.log('!(currentFormIndex > 0);', currentFormIndex, !(currentFormIndex > 0))
    }
    if (nextButtonEl) {
      // 0-1-2-3-current -> disabled, current-1-2-3-review -> enabled
      (nextButtonEl as HTMLButtonElement).disabled = !(currentFormIndex !== this.steps.length - 1);
    }
  }

  setUserData(key: string, data?: { [key: string] : any }) : void { // update session storage dat 
    // TODO: collect user data from formElement
    const userDataJson = window.sessionStorage.getItem('form-user-data');
    const formUserData: IUserData = userDataJson ? JSON.parse(userDataJson) : {};
    formUserData[key] = data;
    window.sessionStorage.setItem('form-user-data', JSON.stringify(formUserData));
  } 

  isReviewable(): boolean {
    // complete - skippable - skippable - review => true
    // incomplete - skippable - skippable - review => false
    const steps = this.steps;
    for (var i = 0; i < steps.length; i++) {
      const stepName = steps[i];
      const stepStatus = this.getStatus(stepName);
      const form = this.forms[stepName];
      if (!(stepStatus === 'complete' || form.skippable)) {
        return false;
      }
      if (form.type === 'review') {
        return true;
      }
    }
    return false;
  }
}
