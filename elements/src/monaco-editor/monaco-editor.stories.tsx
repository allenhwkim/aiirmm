import * as React from 'react';

import { MonacoEditor } from '../index';
import { fixIndent } from '../../lib';
import { useEffect, useRef } from 'react';

!customElements.get('monaco-editor') && customElements.define('monaco-editor', MonacoEditor);

export default {
  title: 'Components/monaco-editor',
};

const Template = (args?: any) => {
  const monacoEditorRef = useRef();  

  useEffect(() => {
    const changeListener = e => console.debug('monaco-editor change event', e);
    if (monacoEditorRef?.current) {
      const monacoEditor: any = monacoEditorRef.current;
      monacoEditor.addEventListener('monaco-change', changeListener);
      return () => monacoEditor.removeEventListener('monaco-change', changeListener);
    }
  }, []);

  const data = fixIndent(`
    function foo(items) {
      var x = "All this is syntax highlighted";
      return x;
    }`);
  return <>
    <h1>Monaco Editor</h1>
    <monaco-editor 
      ref={monacoEditorRef}
      data={data} 
      theme="vs-dark" 
      language="javascript"
    >
    </monaco-editor>
  </>
};

export const Primary = Template.bind({});