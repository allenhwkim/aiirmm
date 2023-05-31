import { waitFor, loadScript, customElement } from '../../lib';

export const QrCode = customElement({
  observedAttributes: ['value'],
  constructorCallback() {
    loadScript('//unpkg.com/qrcode@1.4.4/build/qrcode.min.js');
  },
  async render({attrs}) {
    await waitFor('window.QRCode');
    const {value = 'Hello QR Code'} = attrs;
    const imgUrl = await window['QRCode'].toDataURL(value)
    return `<img alt="${value}" src="${imgUrl}" /><br/>${value}`;
  }
});
