import * as React from 'react';

import { FileSelect } from '../index';
customElements.define('file-select', FileSelect);

export default {
  title: 'Components/file-select',
};

const Template = (args?: any) => {
  function srcFunc(search: string) {
    return fetch('https://dummyjson.com/products/search?q='+search)
      .then(res => res.json())
      .then(res => res.products || [])
  }

  return <>
    <file-select></file-select>
  </>
};

export const Primary = Template.bind({});
