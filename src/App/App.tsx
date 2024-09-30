import SideBar from '../Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { Storage } from '../stroage';
import Chart from '../Chart/Chart';
import FormDesigner from '../FormDesigner/FormDesigner';
import MonacoEditor from '../MonacoEditor/MonacoEditor';
import { Accordion } from 'react-bootstrap';

export default function() {
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

  return (<>

    <div className="container">
      <SideBar></SideBar>

      <div className="row">
        <Chart className="col vh-100" />
        <Accordion className="col-9" activeKey={activeAccordion}>
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
