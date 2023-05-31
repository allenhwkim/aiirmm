import * as React from 'react';

import { Pagination } from '../index';
customElements.define('x-pagination', Pagination);

export default {
  title: 'Components/x-pagination',
};

const Template = (args?: any) => {
  function srcFunc(search: string) {
    return fetch('https://dummyjson.com/products/search?q='+search)
      .then(res => res.json())
      .then(res => res.products || [])
  }

  return <>
    <x-pagination></x-pagination>
    <p></p>
    <x-pagination 
      total="500" 
      page="8" 
      num-per-page="20" 
      num-pages="7">
    </x-pagination>
  </>
};

export const Primary = Template.bind({});