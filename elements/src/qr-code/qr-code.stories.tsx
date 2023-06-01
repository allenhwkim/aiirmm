import * as React from 'react';

import { QrCode } from '../index';
customElements.define('qr-code', QrCode);

export default {
  title: 'Components/qr-code',
};

const Template = (args?: any) => {
  return <>
    <qr-code id="qrcode" 
      value="Hello QR Code from https://github.com/soldair/node-qrcode">
    </qr-code>
  </>
};

export const Primary = Template.bind({});