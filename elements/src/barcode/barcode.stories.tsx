import * as React from 'react';

import { BarCode } from '../index';
customElements.define('bar-code', BarCode);

export default {
  title: 'Components/bar-code',
};

const Template = (args?: any) => <>
    <bar-code value="Hello Bar Code" format="code128">
    </bar-code>
  </>;

export const Primary = Template.bind({});