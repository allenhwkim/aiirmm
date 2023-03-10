import * as React from 'react';
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
  document.addEventListener('click', (event: any) => { // clicked on buttons
    event.target.classList.contains('clear-user-form-data') &&  sessionStorage.clear();
    (document.querySelector('.user-form-data') as HTMLElement).innerText = 
      JSON.stringify(JSON.parse(window.sessionStorage.getItem('form-user-data') as string), null, '  ');
  });

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
    <pre className="user-form-data">
      {JSON.stringify(JSON.parse(window.sessionStorage.getItem('form-user-data') as string), null, '  ')}
    </pre>
    <button className="clear-user-form-data">Clear storage</button>
  </>
}; 

export const Primary = Template.bind({});
