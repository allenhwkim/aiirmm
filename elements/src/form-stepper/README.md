`<form-stepper current-step="form1" data="forms"></form-stepper>`

Must display steps by the forms data

A step shows its status
* x-error: formdata found and getErrors() returns errors.
* x-complete: formdata found and getErrors() returns null.
* x-active: currentForm is being filled in.
* x-incomplete: formdata not found and currentForm has less index.
* x-skipped: formdata not found and currenForm has bigger index.

Inputs : current-step and forms


https://codesandbox.io/s/stepper-html-css-g5tqs8?file=/src/style2.scss

const forms: IForms = {
  steps: ['form1', 'form2', 'form3', 'review', 'thankyou'],
  form1: {
    url: '/step1',
    getErrors: (userData: any) => [],
  },
  form2: {
    skippable: true,
  },
  form3: {
    label: 3,
    description: 'Step 3Description',
    url: '/step3',
    formUrl: '/form3.html',
    skippable: true,
  },
  submit: { /* mostly submitted from review page */
    method: 'POST',
    url: '/api/submit',
    headers: {},
    getData: (userData: any) => {},
    onSuccess: (resp: any) => {},
    onError: (error: any) => {}
  } as IFormsSubmit,
  thankyou: {
    formUrl: '/form3.html',
  }
}