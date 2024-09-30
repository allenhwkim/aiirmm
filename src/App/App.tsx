import SideBar from '../Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { Storage } from '../stroage';
import Chart from '../Chart/Chart';
import FormDesigner from '../FormDesigner/FormDesigner';
import MonacoEditor from '../MonacoEditor/MonacoEditor';
import { Accordion } from 'react-bootstrap';

export default function() {
  const [chartSize, setChartSize] = useState(3);
  const [activeAccordion, setActiveAccordion] = useState('FormDesigner');

  const formflow = Storage.getItem('formflow') || 'Untitled';
  const {selected, chart} = formflow;
  useEffect(() => {
    const chartEl = document.querySelector('x-formflow') as any;
    const formDesigner = document.querySelector('form-designer') as any;
    formDesigner?.editor.on('update', function() {  // html is updated
      const html = formDesigner.html.replace(/^<body>/,'').replace(/<\/body>$/,''); 
      (selected.type === 'custom') && chartEl?.updateNodeData(selected.id, {html})
    });

    chartEl?.setData(chart);

    document.body.addEventListener('formflow', (e: any) => {
      const {action, node} = e.detail;
      const nodeType = node?.type;
      const designRequired = action === 'selected' && ['custom', 'thankyou'].includes(nodeType);
      const activeSection = designRequired ? 'FormDesigner' : 'Properties';
      setActiveAccordion(activeSection);
    });
    window.addEventListener('resize', _e => {
      (document.querySelector('x-formflow') as any).getInstance().fitView();
    })

    document.body.addEventListener('resize-move', _e => { // x-resize event handler
      (document.querySelector('x-formflow') as any).getInstance().fitView();
    })

  }, []);

  function bigger(w) { 
    setChartSize(w === 'chart' ? 9 : 3);
    const chartEl = document.querySelector('x-formflow') as any;
    setTimeout(() => chartEl.getInstance().fitView(), 100)
  }

  return (<>

    <div className="container">
      <SideBar></SideBar>

      <div className="row">
        <div className={'vh-100 position-relative col-' + chartSize}>
          <Chart />
          <div className="position-absolute top-0 end-0 transition-middle">
            { chartSize === 3 && <button className="btn btn-light" onClick={() => bigger('chart')}>+</button> }
            { chartSize === 9 && <button className="btn btn-light" onClick={() => bigger('else')}>-</button> }
          </div>
        </div>
        <Accordion className={'col-' + (11 - chartSize)} activeKey={activeAccordion}>
          <Accordion.Item eventKey="Properties">
            <Accordion.Header onClick={() => setActiveAccordion('Properties')}>
              {selected?.data?.label} properties
            </Accordion.Header>
            <Accordion.Body>
              <MonacoEditor language="json" value="" />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="FormDesigner">
            <Accordion.Header onClick={() => setActiveAccordion('FormDesigner')}>
              {selected?.data?.label} form
            </Accordion.Header>
            <Accordion.Body>
              <FormDesigner />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  </>)
}
