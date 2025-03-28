import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { Panel, PanelGroup, PanelResizeHandle, } from 'react-resizable-panels';
import MonacoEditor from '@monaco-editor/react';
import FormFlow from './FormFlow/FormFlow';
import GrapesJs from './GrapesJs/GrapesJs';
import { ReactFlowInstance, Node, Edge } from '@xyflow/react';
import { Editor as GjsEditor } from 'grapesjs';

function getEditableData(val) {
  if(!val) return;
  const newVal = {...val};
  [
    'position', 'measured', 'selected',
    'dragging', 'deletable', 'origin', 'style',
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
  const [gjsEditor, setGjsEditor] = useState<GjsEditor>();
  const [selected, setSelected] = useState<Node|Edge>();
  const [monacoVal, setMonacoVal] = useState('');
  const editorRef = useRef<any>(null);

  const fitView = debounce(() => {
    reactflow?.fitView();
    gjsEditor?.refresh();
  }, 50);

  useEffect(() => {
    const value = JSON.stringify(getEditableData(selected), null, '  ');
    setMonacoVal(value);
    gjsEditor?.setComponents(selected?.data?.html || '');
    _setSelected(selected);
  }, [selected])

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
  }, [gjsEditor, reactflow]);

  const onMonacoChange = (value) => {
    const sel = getSelected();
    try {
      const parsed = JSON.parse(value);
      if (sel.position) {
        (reactflow as ReactFlowInstance).setNodes(els => els.map((el) => {
          (el.id === sel.id) && (el = {...el, ...parsed});
          return el;
        }));
      } else {
        (reactflow as ReactFlowInstance).setEdges(els => els.map((el) => {
          (el.id === sel.id) && (el = {...el, ...parsed});
          return el;
        }));
      }
    } catch(e) {
      // do nothing
    }
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
          <Panel defaultSize={30} className={selected? '' : 'pe-none'}>
            <MonacoEditor
              defaultLanguage="json"
              value={monacoVal}
              onChange={onMonacoChange}
              onMount={(editor) => editorRef.current = editor }
            />
          </Panel>
          <PanelResizeHandle style={{height: '4px', background: '#CCC'}} />
          <Panel defaultSize={70}>
            {selected && <GrapesJs onLoad={setGjsEditor} /> }
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  )
}
