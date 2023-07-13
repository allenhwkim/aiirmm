import * as React from 'react';

import { XIf, XBind } from '../index';
!customElements.get('x-if') && customElements.define('x-if', XIf);
!customElements.get('x-bind') && customElements.define('x-bind', XBind);

export default {
  title: 'Components/x-if',
};

const Template = (args?: any) => {
  globalThis.myVar = 0; 
  setInterval(() => {
    globalThis.myVar++; 
    globalThis.XChecks.check();
  }, 1000);

  return <>
    <p> 
      myVar: <x-bind>myVar</x-bind>
    </p>
    <p> 
      myVar: <x-bind>myVar</x-bind>
    </p>
    <pre>x-if if="myVar % 3 === 0"</pre>
    <p>
      <x-if if="myVar % 3 === 0"> Hello myVar is <x-bind>myVar</x-bind> </x-if>
    </p>
    <p>
      <x-if if="myVar % 3 === 0"> Hello myVar is <x-bind>myVar</x-bind> </x-if>
    </p>
  </>
};

export const Primary = Template.bind({});