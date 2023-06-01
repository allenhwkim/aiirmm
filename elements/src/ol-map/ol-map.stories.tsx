import * as React from 'react';

import { OlMap } from '../index';
customElements.define('ol-map', OlMap);

export default {
  title: 'Components/ol-map',
};

const Template = (args?: any) => {
  return <>
    <ol-map zoom="11" center="Brampton Ontario, Canada"></ol-map>
  </>
};

export const Primary = Template.bind({});