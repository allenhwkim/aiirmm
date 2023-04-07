import * as React from 'react';
import { FormDesigner } from "./form-designer";
import CustomDocumentation from './custom-documentation.mdx';
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
  parameters: {
    docs: { page: CustomDocumentation },
  },
  // argTypes: {
  //   data: { control: 'object' },
  // }
};

const Template = (args?: any) => {
  return <form-designer></form-designer>;
}; 

export const Primary = Template.bind({});
