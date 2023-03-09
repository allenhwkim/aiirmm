import { IForms, IForm, IFormsSubmit, IUserData} from './types';

export const FormController = {
  steps: ['Name', 'Contact', 'Review'], 
  forms: {
    Name: {}, 
    Contact: {}, 
    Review: {type: 'review'}
  } as IForms,
  currentForm: '',

  initForm(target: string = 'auto') {
    FormController.steps ||= Object.keys(FormController.forms).filter(el => el !== 'steps');
    FormController.currentForm ||= FormController.steps[0];

    const steps = FormController.steps;
    let nextFormIndex = 0;
    if (steps.includes(target)) {
      nextFormIndex = steps.indexOf(target);
      FormController.currentForm = target;
    } else if (['submit', 'review', 'auto', 'prev', 'next'].includes(target)) {
      const currentFormIndex = steps.indexOf(FormController.currentForm);

      if (target === 'submit' || target === 'review') {
        nextFormIndex = steps.findIndex((formId: string) => formId = 'submit');
      } else if (target === 'auto') {
        nextFormIndex = steps.findIndex((formId: string) =>  FormController.getStatus(formId) !== 'complete')
      } else if (target === 'prev') {
        nextFormIndex = (currentFormIndex - 1) % steps.length;
      } else if (target === 'next') {
        nextFormIndex = (currentFormIndex + 1) % steps.length;
      }

      FormController.currentForm = steps[nextFormIndex]
    }

    FormController.initStepperEl();
    FormController.initErrorsEl();
    FormController.initFormEl();
    FormController.initButtonsEl();
  },

  getStatus(formId: string): 'error' | 'complete' | 'active' | 'incomplete' | 'skipped'  { 
    const userDataJson = window.sessionStorage.getItem('form-user-data');
    const userData: IUserData = userDataJson ? JSON.parse(userDataJson) : null;
    const form: IForm = FormController.forms[formId];
    if (formId === FormController.currentForm) {
      return 'active';
    } else if (userData?.[formId]) { // user has visited this formId already and saved data 
      const errors = FormController.getErrors(formId);
      return errors ? 'error' : 'complete';
    } else {
      const currentFormIndex = Object.keys(FormController.forms).indexOf(FormController.currentForm);
      const formIndex = Object.keys(FormController.forms).indexOf(formId);
      if (form.skippable && formIndex > currentFormIndex) {
        return 'skipped';
      } else {
        return 'incomplete';
      }
    }
  },

  getErrors(formId: string): string[] | null{
    // returns errors of the given formId
    const getErrorFunc = FormController.forms[formId].getErrors;
    if (getErrorFunc) {
      const userDataJson = window.sessionStorage.getItem('form-user-data');
      const userData = userDataJson ? JSON.parse(userDataJson) : null;
      return getErrorFunc(userData[formId]);
    } else {
      return null;
    }
  },

  initStepperEl(): void {
    const stepperEl: any = document.querySelector('form-stepper');
    stepperEl?.render();
  },

  initErrorsEl(): void {
    const errorsEl = document.querySelector('.form-errors');
    if (errorsEl) {
      errorsEl.innerHTML = '';
      const errors = FormController.getErrors(FormController.currentForm);
      (errors||[]).forEach(error => {
        errorsEl.insertAdjacentHTML('beforeend', `<div class="error">${error}</div>`)
      });
    }
  },

  initFormEl(): void { // set innerHTML of <form> element
    const formEl = document.querySelector('form.x-form');
    const source = FormController.forms[FormController.currentForm].source;
    if (formEl && source) {
      const html = typeof source === 'string' ? source : source();
      formEl.innerHTML = html;
    }
  },
  
  initButtonsEl(): void { // set buttons text and availability
    const reviewButtonEl = document.querySelector('.form-buttons .form-review');
    const prevButtonEl = document.querySelector('.form-buttons .form-prev');
    const nextButtonEl = document.querySelector('.form-buttons .form-next');
    const steps = FormController.steps;
    const currentFormIndex = Object.keys(steps).indexOf(FormController.currentForm);
    if (reviewButtonEl) {
      (reviewButtonEl as HTMLButtonElement).disabled = !FormController.isReviewable();
    }
    if (prevButtonEl) {
      // 0-1-2-3-current -> enabled,  current-1-2-3-review -> disabled
      (prevButtonEl as HTMLButtonElement).disabled = !(currentFormIndex > 0);
    }
    if (nextButtonEl) {
      // 0-1-2-3-current -> disabled, current-1-2-3-review -> enabled
      (nextButtonEl as HTMLButtonElement).disabled = !(currentFormIndex !== steps.length - 1);
    }
  },

  setUserData(key: string, data: { [key: string] : any }) : void { // update session storage dat 
    const userDataJson = window.sessionStorage.getItem('form-user-data');
    const formUserData: IUserData = userDataJson ? JSON.parse(userDataJson) : {};
    formUserData[key] = data;
    window.sessionStorage.setItem('form-user-data', JSON.stringify(formUserData));
  }, 

  isReviewable(): boolean {
    // complete - skippable - skippable - review => true
    // incomplete - skippable - skippable - review => false
    const steps = FormController.steps;
    for (var i = 0; i < steps.length; i++) {
      const stepName = steps[i];
      const stepStatus = FormController.getStatus(stepName);
      const form = FormController.forms[stepName];
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
