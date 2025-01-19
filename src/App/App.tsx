import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import ReactModal from 'react-modal';
import JsonView from '@uiw/react-json-view';
import { Storage } from '../stroage';
import { Panel, PanelGroup, PanelResizeHandle, } from 'react-resizable-panels';
import eventHandler from './event-handler';
import { fireEvent } from '../util';
import DraggableConsole from './DraggableConsole';

const resetChart = debounce((_size) => {
  const chartEl = document.querySelector('x-formflow') as any;
  chartEl.getInstance().fitView();
}, 300);

window.addEventListener('resize', resetChart);

export default function() {
  const {selected, chart} = Storage.getItem('formflow') || {};
  const [showModal, setShowModal] = useState(false);
  const [data, setChartData] = useState();

  useEffect(() => {
    const chartEl = document.querySelector('x-formflow') as any;
    chartEl?.setData(chart);

    const formDesigner = document.querySelector('form-designer') as any;
    formDesigner?.editor.on('update', () => { 
      fireEvent('form-designer', {type: 'update', id: selected.id, html: formDesigner.html})
    });
    eventHandler();
  }, []);

  document.body.addEventListener('formflow' as any, (event: CustomEvent) => {
    if (event.detail.action === 'data') {
      setChartData(event.detail.event);
      setShowModal(true);
    }
  });

  return (
    <PanelGroup direction="horizontal" className="container mw-100">
      <Panel className="vh-100 position-relative"
        onResize={resetChart} defaultSize={30} minSize={20}>
        <x-formflow></x-formflow>
      </Panel>
      <PanelResizeHandle style={{width: '4px', background: '#CCC'}} />
      <Panel defaultSize={70} minSize={30}>
        <PanelGroup direction="vertical">
          <Panel defaultSize={30}>
            {/* refer event-halder.ts for set/get of this value */}
            <x-monaco language='javascript'></x-monaco>
          </Panel>
          <PanelResizeHandle style={{height: '4px', background: '#CCC'}} />
          <Panel defaultSize={70}>
            {/* refer event-halder.ts for set/get of this value */}
            <x-formdesigner></x-formdesigner>
          </Panel>
        </PanelGroup>
      </Panel>

      <ReactModal ariaHideApp={false} 
        isOpen={showModal} 
        onRequestClose={() => setShowModal(false)}>
        <JsonView value={data} collapsed={2}></JsonView>
      </ReactModal>{/* show chart data */}

      <DraggableConsole>
        <pre id="console" className="console"></pre>
      </DraggableConsole>
    </PanelGroup>
  )
}
