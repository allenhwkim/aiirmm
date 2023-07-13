import * as React from 'react';

import { FileSelect } from '../index';
!customElements.get('file-select') && customElements.define('file-select', FileSelect);

export default {
  title: 'Components/file-select',
};

const Template = (args?: any) => {
  return <>
    <file-select></file-select>
  </>
};

export const Primary = Template.bind({});
