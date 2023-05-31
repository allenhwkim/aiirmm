import * as React from 'react';

import { BarCode } from '../index';
customElements.define('bar-code', BarCode);

export default {
  title: 'Components/bar-code',
};

const Template = (args?: any) => {
  function srcFunc(search: string) {
    return fetch('https://dummyjson.com/products/search?q='+search)
      .then(res => res.json())
      .then(res => res.products || [])
  }

  return <>
    <bar-code value="Hello Bar Code" format="code128">
    </bar-code>
  </>
}

export const Primary = Template.bind({});