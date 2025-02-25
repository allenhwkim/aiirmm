import { useState } from 'react';
import { debounce } from 'lodash';
import * as monaco from 'monaco-editor';
import { Panel, PanelGroup, PanelResizeHandle, } from 'react-resizable-panels';
import FormFlow from './FormFlow/FormFlow';
import GrapesJs from './GrapesJs/GrapesJs';
import { ReactFlowInstance, Node, Edge } from '@xyflow/react';
import { Editor } from 'grapesjs';
import MonacoEditor from './MonacoEditor';

export default function() {
  const [reactflow, setReactFlow] = useState<ReactFlowInstance>();
  const [gjsEditor, setGjsEditor] = useState<Editor>();
  const [txtEditor, setTxtEditor] = useState<monaco.editor.IStandaloneCodeEditor>();
  const [selected, setSelected] = useState<Node|Edge>();

  const fitView = debounce(() => {
    reactflow?.fitView();
    gjsEditor?.refresh();
  }, 50);

  function updateChartData(selected, data) {
    if (!data) return;
    const func = selected?.position ? 'setNodes' :
      selected?.source ? 'setEdges' : 'n/a';
    reactflow?.[func]?.(els => els.map((el) => {
      (el.id === selected?.id) && (el.data = {...el.data, ...data});
      return el;
    }));
  };

  const onMonacoLoad = function(editor: monaco.editor.IStandaloneCodeEditor) {
    setTxtEditor(editor);
    editor.onDidBlurEditorText(() => {
      console.log('onTxtEditorBlur value', editor.getValue());
    });
  };

  const onGjsLoad = function(editor: Editor) {
    setGjsEditor(editor);
    const iframe: any = document.querySelector('.gjs-frame');
    iframe.contentWindow.addEventListener('blur', () => {
      const finalHtml = editor.getHtml();
      console.log('Canvas iframe lost focus. Final HTML:', finalHtml);
    });
  }

  return (
    <PanelGroup direction="horizontal" className="container mw-100">
      <Panel className="vh-100 position-relative"
        onResize={fitView} defaultSize={30}>
        <FormFlow
          onInit={(instance) => setReactFlow(instance)}
          onNodeClick={(_, node) => setSelected(node)}
          onEdgeClick={(_, edge) => setSelected(edge)}
        />
      </Panel>
      <PanelResizeHandle style={{width: '4px', background: '#CCC'}} />
      <Panel defaultSize={70} minSize={30}>
        <PanelGroup direction="vertical">
          <Panel defaultSize={30}>
            <MonacoEditor
              options={{
                value: selected?.data,
                language: 'json',
                automaticLayout: true,
              }}
              onLoad={onMonacoLoad}
            />
          </Panel>
          <PanelResizeHandle style={{height: '4px', background: '#CCC'}} />
          <Panel defaultSize={70}>
            <GrapesJs
              onLoad={onGjsLoad}
            />
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  )
}
