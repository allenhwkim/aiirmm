import * as React from 'react';

import { BarCode } from '../index';
!customElements.get('bar-code') && customElements.define('bar-code', BarCode);

export default {
  title: 'Components/bar-code',
};

const Template = () => <>
    <bar-code value="Hello Bar Code" format="code128">
    </bar-code>
  </>;

export const Primary = Template.bind({});