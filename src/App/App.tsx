import SideBar from '../Sidebar/Sidebar';
import { useEffect } from 'react';
import { Storage } from '../stroage';
import Chart from '../Chart/Chart';
import FormDesigner from '../FormDesigner/FormDesigner';
import MonacoEditor from '../MonacoEditor/MonacoEditor';
import { Panel, PanelGroup, PanelResizeHandle, } from 'react-resizable-panels';
import { debounce } from 'lodash';

const resetChart = debounce((_size) => {
  const chartEl = document.querySelector('x-formflow') as any;
  chartEl.getInstance().fitView();
}, 300);

function saveFormDesignerHTMLToChart(id:string, html:string) {
  const newHtml = html.replace(/<\/?body>/g,'');
  const chartEl = document.querySelector('x-formflow') as any;
  chartEl?.updateNodeData(id, {html: newHtml});
}

export default function() {
  const {selected, chart} = Storage.getItem('formflow');

  window.addEventListener('resize', resetChart);

  useEffect(() => {
    const chartEl = document.querySelector('x-formflow') as any;
    chartEl?.setData(chart);

    const formDesigner = document.querySelector('form-designer') as any;
    formDesigner?.editor.on('update', 
      () => saveFormDesignerHTMLToChart(selected.id, formDesigner.html)
    );
  }, []);

  return (
    <div className="container mw-100">
      <SideBar></SideBar>

      <PanelGroup direction="horizontal">
        <Panel defaultSize={30} minSize={20} onResize={resetChart}>
          <Chart id="chart" className='vh-100 position-relative' /> 
        </Panel>
        <PanelResizeHandle style={{width: '4px', background: '#CCC'}} />
        <Panel defaultSize={70} minSize={30}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={30}>
              <MonacoEditor language="json" theme="visual-studio" value="" />
            </Panel>
            <PanelResizeHandle style={{height: '4px', background: '#CCC'}} />
            <Panel defaultSize={70}>
              <FormDesigner /> 
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  )
}
