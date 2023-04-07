import * as React from 'react';
import { FormStepper } from "./form-stepper"; // Shares the same FormController
import { useState } from 'react';
import { FormController } from './form-controller';

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
};

const Template = (args?: any) => {
  const [userData, setUserData] = useState(JSON.stringify(FormController.userData));

  const clearStorage = () => (sessionStorage.clear(), setUserData(''));
  window.addEventListener('form-user-data', (event: any) => setUserData(JSON.stringify(event.detail)));
  
  return <>
    <form-stepper></form-stepper>
    <div className="form-flow form-errors" style={{padding: 16}}>
      Error goes here
    </div>
    <form className="form-flow" style={{border: '1px dashed', padding: 16}}>
      Form goes here.
    </form>
    <div className="form-flow form-buttons" style={{border: '1px dashed', padding: 16}}>
      <button className="form-prev">Prev</button>
      <button className="form-next">Next</button>
      <button className="form-review">Review</button>
      <button className="form-submit">Submit</button>
    </div>
    <pre className="user-form-data"> {userData} </pre>
    <button className="clear-user-form-data" onClick={clearStorage}>Clear storage</button>
  </>
}; 

export const Primary = Template.bind({});
