import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { Panel, PanelGroup, PanelResizeHandle, } from 'react-resizable-panels';
import DraggableConsole from './DraggableConsole/DraggableConsole';
import FormFlow from './FormFlow/FormFlow';
import GrapesJs from './GrapesJs/GrapesJs';
import { ReactFlowInstance, Node, Edge } from '@xyflow/react';
import { Editor } from 'grapesjs';

export default function() {
  const [reactflow, setReactFlow] = useState<ReactFlowInstance>();
  const [gjsEditor, setGjsEditor] = useState<Editor>();
  const [selected, setSelected] = useState<Node|Edge>();
  const monacoRef = useRef<any>();

  useEffect(() => {
    const handleMonacoChange = event => {
      const jsonCode = event.detail;
      console.log('monaco-change', event.detail);
      selected && updateDataSelected(selected, JSON.parse(jsonCode));
    }
    const jsonStr = JSON.stringify(selected?.data || {}, null, '  ')
    const monacoEl = monacoRef.current;
    monacoEl.setValue(jsonStr);
    monacoEl.addEventListener('monaco-change', handleMonacoChange);

    return () => {
      monacoEl.removeEventListener('monaco-change', handleMonacoChange);
    };
  }, [selected]);

  useEffect(() => {
    gjsEditor?.on('change', (e) => {
      console.log('grapesjs', 'change', e);
      const html = gjsEditor.getHtml().replace(/<\/?body>/g,'');
      updateDataSelected(selected, {html});
    })
  }, [gjsEditor]);

  const fitView = debounce(() => {
    reactflow?.fitView();
    gjsEditor?.refresh();
  }, 50);

  const updateDataSelected = (selected, data) => {
    if ((selected as Node)?.position) {
      reactflow?.setNodes((nds) => nds.map((node) => {
        (node.id === selected?.id) && (node.data = {...node.data, ...data});
        return node;
      }));
    }
    else if ((selected as Edge)?.source) {
      reactflow?.setEdges((eds) => eds.map((edge) => {
        (edge.id === selected?.id) && (edge.data = {...edge.data, ...data});
        return edge;
      }));
    }
  };

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
            selected: {JSON.stringify(selected)}
            <x-monaco ref={monacoRef} language='javascript'></x-monaco>
          </Panel>
          <PanelResizeHandle style={{height: '4px', background: '#CCC'}} />
          <Panel defaultSize={70}>
            <GrapesJs onLoad={setGjsEditor} />
          </Panel>
        </PanelGroup>
      </Panel>

      <DraggableConsole>
        <pre id="console" className="console"></pre>
      </DraggableConsole>
    </PanelGroup>
  )
}
