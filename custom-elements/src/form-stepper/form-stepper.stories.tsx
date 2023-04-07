import * as React from 'react';
import { FormStepper } from "./form-stepper"; // Shares the same FormController
import { useEffect, useRef, useState } from 'react';
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

const myForm = {
  Hello: {
    source: () => `
      <style>form.error-checked :invalid {outline: 1px solid red;}</style>
      First Name: <input name="first" required> <br>
      Last Name: <input name="last" required>
      <br>
      <input type="radio" name="my-radio" value="1" required> option 1
      <input type="radio" name="my-radio" value="2" required> option 2
      <br>
      <input type="checkbox" name="my-check" required> check
    `,
    getErrors: function(data: any) {
      if (data.first !== data.last) {
        return ['first and last name must be the same'];
      }
      return null;
    } 
  }, 
  World: {
    source: () => `Optional: <br/>  Address: <input name="address" />`,
    skippable: true
  }, 
  Review: {
    type: 'review',
    source: () => `This is a review page.`,
  },
  Submit: {
    type: 'submit',
    method: 'POST',
    source: () => 'Thank you',
    url: 'https://reqbin.com/echo/post/json',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    payload: function(formUserData: any): any {
      return { id: 78912 };
    },
    onSuccess: function(resp: Response) {
      console.log('resp. success', resp);
    },
    onError: function(error: Response) {
      console.log('resp. error', error);
    }
  }
}

const Template = (args?: any) => {
  const [userData, setUserData] = useState(JSON.stringify(FormController.userData));
  const clearStorage = () => (sessionStorage.clear(), setUserData(''));
  window.addEventListener('form-user-data', (event: any) => setUserData(JSON.stringify(event.detail)));

  const formStepper = useRef<any>();
  useEffect(() => { formStepper.current.forms = myForm })

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
