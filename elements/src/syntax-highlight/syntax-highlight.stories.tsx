import * as React from 'react';

import { SyntaxHighlight } from '../index';
customElements.define('syntax-highlight', SyntaxHighlight);

export default {
  title: 'Components/syntax-highlight',
};

const Template = (args?: any) => {
  return <>
    <syntax-highlight>{`
      function foo(items) {
        var x = "All this is syntax highlighted";
        return x;
      }
    `}</syntax-highlight>
    </>
};

export const Primary = Template.bind({});