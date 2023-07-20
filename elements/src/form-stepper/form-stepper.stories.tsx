import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { AppStorage, FormStepper } from "../index"; // Shares the same FormController
import { defaultForms } from './default-forms';
!customElements.get('form-stepper') && customElements.define('form-stepper', FormStepper);

export default {
  title: 'Components/form-stepper',
  component: FormStepper,
};

const Template = (args?: any) => {
  const storageUserData = AppStorage.getItem('currentFormflow.userData');
  const [userData, setUserData] = useState(storageUserData);
  const clearStorage = () => (sessionStorage.clear(), setUserData(''));
  window.addEventListener('app-storage', (event: any) => setUserData(JSON.stringify(event.detail.data)));

  const formStepper = useRef<any>();
  useEffect(() => { formStepper.current.forms = defaultForms })

  return <>
    <form-stepper ref={formStepper}></form-stepper>  {/* forms={myForm} */}

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
