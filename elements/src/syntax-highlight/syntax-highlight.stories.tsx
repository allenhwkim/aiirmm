import * as React from 'react';

import { SyntaxHighlight } from '../index';
customElements.define('syntax-highlight', SyntaxHighlight);

export default {
  title: 'Components/syntax-highlight',
};

const Template = (args?: any) => {
  function srcFunc(search: string) {
    return fetch('https://dummyjson.com/products/search?q='+search)
      .then(res => res.json())
      .then(res => res.products || [])
  }

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