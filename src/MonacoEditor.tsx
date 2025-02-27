import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useEffect, useRef, useImperativeHandle, useState } from 'react';

interface IProps {
  options: monaco.editor.IStandaloneEditorConstructionOptions;
  override?: monaco.editor.IEditorOverrideServices;
  onLoad?: (Editor: monaco.editor.IStandaloneCodeEditor) => void;
}

export default function(props: IProps, ref: React.ForwardedRef<any>) {
  const divRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor>();

  useImperativeHandle(ref, () => editor, [editor]);

  useEffect(() => {
    const editor = monaco.editor.create(
      divRef.current as HTMLElement,
      props.options,
      props.override
    );
    props.onLoad?.(editor);
    setEditor(editor);
  }, [])

  useEffect(() => {
    const value = JSON.stringify(props.options.value, null, '  ');
    editor?.setValue(value)
  }, [props.options.value]);

  useEffect(() => {
    console.log(props.options)
    editor?.updateOptions({readOnly: props.options.readOnly})
  }, [props.options.readOnly]);

  return (
    <div ref={divRef}
      style={{height: '100%'}}
      className="monaco-editor"
    />
  );
}