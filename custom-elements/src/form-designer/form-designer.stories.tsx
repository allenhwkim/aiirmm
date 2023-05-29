import * as React from 'react';
import { FormDesigner } from "./form-designer";
(!customElements.get('form-designer')) && customElements.define('form-designer', FormDesigner);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'form-designer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export default {
  title: 'Components/form-designer',
  component: FormDesigner,
};

const Template = (args?: any) => {
  return <form-designer></form-designer>;
}; 

export const Primary = Template.bind({});
