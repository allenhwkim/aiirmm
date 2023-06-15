import * as React from 'react';

import { MonacoEditor } from '../index';
import { fixIndent } from '../../lib';
customElements.define('monaco-editor', MonacoEditor);

export default {
  title: 'Components/monaco-editor',
};

const Template = (args?: any) => {
  const data = fixIndent(`
    function foo(items) {
      var x = "All this is syntax highlighted";
      return x;
    }`);
  return <>
    <h1>Monaco Editor</h1>
    <monaco-editor data={data} theme="vs-dark" language="javascript"></monaco-editor>
  </>
};

export const Primary = Template.bind({});