import * as React from 'react';

import { JsonViewer } from '../index';
customElements.define('json-viewer', JsonViewer);

export default {
  title: 'Components/json-viewer',
  component: JsonViewer,
};

const Template = (args?: any) => {
  const data = {
    Droids: {
      Astromech: { R2_Units: [ 'R2-D2', 'R2-KT' ], 'R5-D4': 'I am R5 D4', },
      Protocol: { 'C-3PO': 1, 'TC-3': 2, },
    },
    Aliens: [ 'Greedo', 'Hammerhead', 'Snaggletooth', { foo: 1, bar: 2 } ]
  };

  return <>
    <json-viewer level="3" data={data}></json-viewer>
  </>
}; 

export const Primary = Template.bind({});
