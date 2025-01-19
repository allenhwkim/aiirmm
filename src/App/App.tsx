import { useEffect, useState } from 'react';
import { JsonEditor } from 'json-edit-react'
import { debounce } from 'lodash';
import { Panel, PanelGroup, PanelResizeHandle, } from 'react-resizable-panels';
import { Storage } from '../stroage';
import { fireEvent } from '../util';
import DraggableConsole from '../DraggableConsole/DraggableConsole';
import DialogModal from '../DialogModal/DialogModal';
import eventHandler from './event-handler';

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

      <DialogModal
        isOpen={showModal}
        hasCloseBtn={true}
        onClose={() => setShowModal(false)}>
        <JsonEditor
          data={ data as any }
          collapse={1}
          maxWidth={'100%'}
          enableClipboard={false}
          collapseAnimationTime={100}
          restrictAdd={true}
          restrictEdit={true}
          restrictDelete={true}
          rootFontSize={'12px'}
        />
      </DialogModal>


      <DraggableConsole>
        <pre id="console" className="console"></pre>
      </DraggableConsole>
    </PanelGroup>
  )
}
