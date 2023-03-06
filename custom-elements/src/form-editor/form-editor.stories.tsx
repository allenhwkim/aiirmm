import * as React from 'react';
import { FormEditor } from "./form-editor";
import CustomDocumentation from './form-editor.mdx';
(!customElements.get('form-editor')) && customElements.define('form-editor', FormEditor);

export default {
  title: 'Components/form-editor',
  component: FormEditor,
  parameters: {
    docs: { page: CustomDocumentation },
  },
  // argTypes: {
  //   data: { control: 'object' },
  // }
};

const Template = (args?: any) => {
  return <form-editor></form-editor>;
}; 

export const Primary = Template.bind({});
