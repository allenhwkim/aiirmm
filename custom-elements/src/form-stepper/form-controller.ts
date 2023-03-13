import { defaultForms } from './default-forms';
import { IForms, IForm, IFormsSubmit, IUserData} from './types';

export class FormController {
  static instance: FormController;
  steps: string[] = [];
  currentForm: string = '';
  currentFormType: string = '';
  forms: IForms = defaultForms;

  _docGotoListener = (event: any) => this.initForm(event.detail);

  _docClickListener = (event: any) => {
    if (event.target.classList.contains('form-review')) {
      const isCurrentReviewForm = this.forms[this.currentForm].type === 'review';
      this.initForm('review'); 
    } else if (event.target.classList.contains('form-submit')) {
      this.initForm('submit');
    } else if (event.target.classList.contains('form-prev')) {
      this.initForm('prev'); 
    } else if (event.target.classList.contains('form-next')) { 
      if (!this.setErrors()) { // set error classes and contents of .form-errors 
        const formEl = document.querySelector('form.form-flow') as HTMLFormElement;
        const formElData = Object.fromEntries(new FormData(formEl).entries())
        if (Object.keys(formElData).length) {
          this.setUserData(this.currentForm, formElData);
        }
        this.initForm('next');
      }
    }
  }

  constructor(forms: IForms = defaultForms) {
    if (!FormController.instance) {
      this.forms = forms;
      this.steps = Object.keys(this.forms);
      this.addEventListeners();
      FormController.instance = this;
    }
    return FormController.instance;
  }

  addEventListeners() {
    document.addEventListener('form-goto', this._docGotoListener);
    document.addEventListener('click', this._docClickListener);
  }

  removeEventListeners() {
    document.removeEventListener('form-goto', this._docGotoListener);
    document.removeEventListener('click', this._docClickListener);
  }

  async initForm(target: string = 'auto') {
    let nextFormIndex = 0;
    if (target === 'auto') {
      nextFormIndex = this.steps.findIndex(formId => this.getStatus(formId) !== 'complete');
    } else if (['review', 'submit', 'prev', 'next'].includes(target)) {
      const currentFormIndex = this.steps.indexOf(this.currentForm);

      if (target === 'review') {
        nextFormIndex = this.steps.findIndex(formId => this.forms[formId]?.type === 'review');
      } else if (target === 'submit') {
        await this.submitForm();
        nextFormIndex = this.steps.findIndex(formId => this.forms[formId]?.type === 'submit');
      } else if (target === 'prev') {
        nextFormIndex = (currentFormIndex - 1) % this.steps.length;
      } else if (target === 'next') {
        nextFormIndex = (currentFormIndex + 1) % this.steps.length;
      }
    } else if (this.steps.indexOf(target)) {
      nextFormIndex = this.steps.indexOf(target);
    }

    this.currentForm = this.steps[nextFormIndex];
    this.currentFormType = this.forms[this.currentForm].type;
    this.initStepperEl();
    this.initFormEl();
    this.initButtonsEl();
  }

  getStatus(formId: string): 'complete' | 'incomplete'  { 
    const userDataJson = window.sessionStorage.getItem('form-user-data');
    const userData: IUserData = userDataJson ? JSON.parse(userDataJson) : null;
    const form: IForm = this.forms[formId];
    if (userData?.[formId]) { // user has visited this formId already and saved data 
      return 'complete';
    } else {
      const currentFormIndex = Object.keys(this.forms).indexOf(this.currentForm);
      const formIndex = Object.keys(this.forms).indexOf(formId);
      return 'incomplete';
    }
  }

  initStepperEl(): void {
    const stepperEl: any = document.querySelector('form-stepper');
    stepperEl?.render();
  }

  async initFormEl(): Promise<void> { // set innerHTML of <form> element
    const formEl = document.querySelector('form.form-flow') as HTMLFormElement;
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

      const userDataJson = window.sessionStorage.getItem('form-user-data');
      const formUserData: IUserData = userDataJson ? JSON.parse(userDataJson) : {};
      for (var key in formUserData[this.currentForm]) {
        const el = formEl.elements[key as any] as HTMLInputElement;
        const value = formUserData[this.currentForm][key];
        if (el.type === 'checkbox') {
          el.checked = ['on', el.value].includes(value);
        } else if (el.type === 'radio') {
          el.checked = value === el.value;
        } else {
          el.value = value;
        }
      }
    }
  }  

  initButtonsEl(): void { // set buttons text and availability
    console.log('initButtonsEl called')
    const reviewButtonEl = document.querySelector('.form-buttons .form-review') as HTMLButtonElement;
    const submitButtonEl = document.querySelector('.form-buttons .form-submit') as HTMLButtonElement;
    const prevButtonEl = document.querySelector('.form-buttons .form-prev') as HTMLButtonElement;
    const nextButtonEl = document.querySelector('.form-buttons .form-next') as HTMLButtonElement;
    const currentFormIndex = this.steps.indexOf(this.currentForm);

    // 0-1-2-3-current -> enabled,  current-1-2-3-review -> disabled
    prevButtonEl && (prevButtonEl.disabled = !(currentFormIndex > 0));
    // 0-1-2-3-current -> disabled, current-1-2-3-review -> enabled
    nextButtonEl && (nextButtonEl.disabled = !(currentFormIndex !== this.steps.length - 1));
    if (submitButtonEl) {
      submitButtonEl.disabled = this.currentFormType !== 'review';
    }
    if (reviewButtonEl) {
      reviewButtonEl.disabled = this.currentFormType === 'review' || !this.isReviewable();
    }
  }

  setErrors(): string[] | void {
    const formEl = document.querySelector('form.form-flow') as HTMLFormElement;
    const errorsEl = document.querySelector('.form-errors') as HTMLElement;
    errorsEl && (errorsEl.innerHTML = '');
    formEl.classList.add('error-checked');

    const nativeErrors: string[] = [];
    Array.from(formEl.elements).forEach( (el: any) => {
      el.classList.remove('error');
      if (!el.checkValidity()) {
        el.classList.add('error');
        const errorMessage = `${el.name || el.tagName}: ${el.validationMessage}`;
        !nativeErrors.includes(errorMessage) && nativeErrors.push(errorMessage);
      }
    });
    if (errorsEl && nativeErrors.length) {
      nativeErrors.forEach(el => errorsEl.insertAdjacentHTML('beforeend', `<div class="error">${el}</div>`))
      return nativeErrors;
    }

    const formElData = Object.fromEntries(new FormData(formEl).entries());
    const getErrorFunc = this.forms[this.currentForm].getErrors;
    const customUserErrors = getErrorFunc && getErrorFunc(formElData);
    if (errorsEl && customUserErrors) {
      customUserErrors.forEach( (el: HTMLElement) => {
        errorsEl.insertAdjacentHTML('beforeend', `<div class="error">${el}</div>`);
      })
      return customUserErrors;
    }
  }

  setUserData(key: string, data?: { [key: string] : any }) : void { // update session storage dat 
    const userDataJson = window.sessionStorage.getItem('form-user-data');
    const formUserData: IUserData = userDataJson ? JSON.parse(userDataJson) : {};
    formUserData[key] = data;
    window.sessionStorage.setItem('form-user-data', JSON.stringify(formUserData));
  } 

  isReviewable(): boolean {
    // complete - skippable - skippable - review => true
    // incomplete - skippable - skippable - review => false
    for (var i = 0; i < this.steps.length; i++) {
      const stepName = this.steps[i];
      const stepStatus = this.getStatus(stepName);
      const form = this.forms[stepName];
      if (form.type === 'review') {
        return true;
      } else if (!(stepStatus === 'complete' || form.skippable)) {
        return false;
      } else {
        console.log('stepStatus', stepStatus)
      }
    }
    return false;
  }

  submitForm(): Promise<Response> {
    const submitFormName = this.steps.find(formId => this.forms[formId]?.type === 'submit') as string;
    const userDataJson = window.sessionStorage.getItem('form-user-data');
    const formUserData: IUserData = userDataJson ? JSON.parse(userDataJson) : {};
    const form = this.forms[submitFormName];
    const payload = form.payload ? JSON.stringify(form.payload(formUserData)) : userDataJson;
    console.log({userDataJson, form, payload})

    return window.fetch(form.url, { method: form.method, headers: form.headers, body: payload })
      .then(response => response.json())
      .then(response => {
        form.onSuccess(response);
        window.sessionStorage.removeItem('form-user-data');
      })
      .catch(error => form.onError(error))
  }
}
