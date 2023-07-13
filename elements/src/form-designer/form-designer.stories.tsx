import * as React from 'react';

import { FormDesigner, defineAll } from "../index";
defineAll();

export default {
  title: 'Components/form-designer',
  component: FormDesigner,
};

const Template = (args?: any) => {
  return <>
    <form-designer></form-designer>
  </>;
}; 

export const Primary = Template.bind({});
