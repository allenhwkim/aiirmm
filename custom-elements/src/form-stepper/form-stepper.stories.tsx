import * as React from 'react';
import { FormController } from './form-controller';
import { FormStepper } from "./form-stepper"; // Shares the same FormController

// import CustomDocumentation from './form-editor.mdx';
(!customElements.get('form-stepper')) && customElements.define('form-stepper', FormStepper);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'form-stepper': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export default {
  title: 'Components/form-stepper',
  component: FormStepper,
  parameters: {
    // docs: { page: CustomDocumentation },
  },
  // argTypes: {
  //   data: { control: 'object' },
  // }
};

const Template = (args?: any) => {
  document.addEventListener('form-goto', (event: any) => { // clicked on stepper
    FormController.initForm(event.detail);
  });
  document.addEventListener('click', (event: any) => { // clicked on buttons
    if (event.target.classList.contains('form-review')) {
      FormController.initForm('review'); 
    } else if (event.target.classList.contains('form-prev')) {
      FormController.initForm('prev'); 
    } else if (event.target.classList.contains('form-next')) {
      FormController.setUserData(FormController.currentForm, {foo: 1});
      FormController.initForm('next'); 
    }
  })

  return <>
    <form-stepper></form-stepper>
    <div className="form-errors" style={{border: '1px dashed', padding: 16}}>
      Error goes here
    </div>
    <form className="x-form" style={{border: '1px dashed', padding: 16}}>
      Form goes here.
    </form>
    <div className="form-buttons" style={{border: '1px dashed', padding: 16}}>
      <button className="form-review">Review + Submit</button>
      <button className="form-prev">Prev</button>
      <button className="form-next">Next</button>
    </div>
  </>
}; 

export const Primary = Template.bind({});
