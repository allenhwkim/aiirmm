import * as React from 'react';

import { QrCode } from '../index';
customElements.define('qr-code', QrCode);

export default {
  title: 'Components/qr-code',
};

const Template = (args?: any) => {
  function srcFunc(search: string) {
    return fetch('https://dummyjson.com/products/search?q='+search)
      .then(res => res.json())
      .then(res => res.products || [])
  }

  return <>
    <qr-code id="qrcode" 
      value="Hello QR Code from https://github.com/soldair/node-qrcode">
    </qr-code>
  </>
};

export const Primary = Template.bind({});