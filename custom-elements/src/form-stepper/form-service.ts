import { IForms, IFormsSubmit, IUserData} from './types.d';

export const FormService = {
  forms: {} as any,
  currentForm: '',
  stepperEl: undefined,
  errorsEl: undefined,
  formEl: undefined,
  buttonsEl: undefined,

  setForm(target: string = 'auto') {
    FormService.forms.steps ??= Object.keys(FormService.forms).filter(el => el !== 'steps');
    FormService.currentForm ??= FormService.forms.steps[0];

    const currentFormIndex = Object.keys(FormService.forms).indexOf(FormService.currentForm);
    let nextFormIndex = 0;

    if (target === 'submit' || target === 'review') {
      nextFormIndex = FormService.forms.steps
        .findIndex((formId: string) => formId = 'submit');
    } else if (target === 'auto') {
      nextFormIndex = FormService.forms.steps
        .findIndex((formId: string) => FormService.getStatus(formId) !== 'complete')
    } else if (target === 'prev') {
      nextFormIndex = currentFormIndex - 1 % FormService.forms.steps.length;
    } else if (target === 'next') {
      nextFormIndex = currentFormIndex + 1 % FormService.forms.steps.length;
    }
    FormService.currentForm = FormService.forms.steps[nextFormIndex]

    FormService.setStepperEl();
    FormService.setErrorsEl();
    FormService.setFormEl();
    FormService.setButtonsEl();
  },

  getStatus(formId: string): 'error' | 'complete' | 'active' | 'incomplete' | 'skipped'  { 
    const userDataJson = window.sessionStorage.getItem('form-user-data');
    const userData: IUserData = userDataJson ? JSON.parse(userDataJson) : null;
    const form = FormService.forms[formId];
    if (userData) { // user has visited this formId already and saved data 
      if (formId === FormService.currentForm) {
        return 'active';
      } 
      const errors = FormService.getErrors(formId);
      return errors ? 'error' : 'complete';
    } else {
      const currentFormIndex = Object.keys(FormService.forms).indexOf(FormService.currentForm);
      const formIndex = Object.keys(FormService.forms).indexOf(formId);
      if (form.skippable && formIndex > currentFormIndex) {
        return 'skipped';
      } else {
        return 'incomplete';
      }
    }
  },

  getErrors(formId: string): string[] | null{
    // returns errors of the given formId
    const getErrorFunc = FormService.forms[formId].getErrors;
    if (getErrorFunc) {
      const userDataJson = window.sessionStorage.getItem('form-user-data');
      const userData = userDataJson ? JSON.parse(userDataJson) : null;
      return getErrorFunc(userData[formId]);
    } else {
      return null;
    }
  },

  setStepperEl(): void {
  },

  setErrorsEl(): void {
  },

  setFormEl(): void {
    // set innerHTML of <form> element
  },
  
  setFormElErrors(): void {
    // add 'error' classe of form control element
  },

  setButtonsEl(): void {
    // set buttons text and availability
  },
  setUserData(key: string, data: { [key: string] : any }) : void {
    // update session storage dat 
  }
}
