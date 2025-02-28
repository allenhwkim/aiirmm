import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import * as monaco from 'monaco-editor';
import { Panel, PanelGroup, PanelResizeHandle, } from 'react-resizable-panels';
import FormFlow from './FormFlow/FormFlow';
import GrapesJs from './GrapesJs/GrapesJs';
import { ReactFlowInstance, Node, Edge } from '@xyflow/react';
import { Editor } from 'grapesjs';
import MonacoEditor from './MonacoEditor';

function getEditableData(val) {
  if(!val) return;
  const newVal = {...val};
  [
    'position', 'measured', 'selected', 'dragging', 'deletable', 'origin', 'style',
    'id', 'source', 'target',
  ].forEach( el => delete newVal[el]);

  return newVal;
}

/* To see selected in a deep callback function  */
let _selected;
const getSelected = () => _selected;
const _setSelected = (val) => {_selected = val};

export default function() {
  const [reactflow, setReactFlow] = useState<ReactFlowInstance>();
  const [gjsEditor, setGjsEditor] = useState<Editor>();
  const [monacoEditor, setMonacoEditor] = useState<monaco.editor.IStandaloneCodeEditor>();
  const [selected, setSelected] = useState<Node|Edge>();

  const fitView = debounce(() => {
    reactflow?.fitView();
    gjsEditor?.refresh();
  }, 50);

  useEffect(() => {
    const value = JSON.stringify(getEditableData(selected), null, '  ');
    monacoEditor?.setValue(value)
    gjsEditor?.setComponents(selected?.data?.html || '');
    _setSelected(selected);
  }, [selected])

  useEffect(() => {
    monacoEditor?.onDidBlurEditorText(() => {
      const sel = getSelected();
      const value = monacoEditor.getValue();
      console.log('editor.getValue()', value, 'selected', sel);
      const func = sel['position'] ? 'setNodes' : sel['source'] ? 'setEdges' : '';
      const parsed = JSON.parse(value);
      reactflow?.[func]?.(els => els.map((el) => {
        (el.id === sel.id) && (el = {...el, ...parsed});
        return el;
      }));
    });
  }, [monacoEditor])

  useEffect(() => {
    const iframe: any = document.querySelector('.gjs-frame');
    function onBlur () {
      const selected = getSelected();
      const html = gjsEditor?.getHtml();
      const newHtml = (html as string).replace(/<\/*body.*?>/g, '');
      console.log({newHtml, selected})
      reactflow?.setNodes(els => els.map((el) => {
        (newHtml && (el.id === selected?.id) && (el.data.html = html));
        return el;
      }));
    };
    iframe?.contentWindow.addEventListener('blur', onBlur);

    return () => { iframe?.contentWindow.removeEventListener('blur', onBlur) };
  }, [gjsEditor, monacoEditor, reactflow]);

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
          <Panel defaultSize={30} className={selected? '' : 'pe-none'}>
            <MonacoEditor
              options={{
                language: 'json',
                automaticLayout: true,
                minimap: {enabled: false},
              }}
              onLoad={setMonacoEditor}
            />
          </Panel>
          <PanelResizeHandle style={{height: '4px', background: '#CCC'}} />
          <Panel defaultSize={70}>
            {selected &&
                <GrapesJs onLoad={setGjsEditor} />
            }
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  )
}
