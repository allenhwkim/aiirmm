import * as React from 'react';

import { OlMap } from '../index';
customElements.define('ol-map', OlMap);

export default {
  title: 'Components/ol-map',
};

const Template = (args?: any) => {
  function srcFunc(search: string) {
    return fetch('https://dummyjson.com/products/search?q='+search)
      .then(res => res.json())
      .then(res => res.products || [])
  }

  return <>
    <ol-map zoom="11" center="Brampton Ontario, Canada"></ol-map>
  </>
};

export const Primary = Template.bind({});