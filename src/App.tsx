import './style.css';
import SideBar from './Sidebar';
import { useEffect, useRef } from 'react';
import { chartEventHandler } from './chart-event-handler';
import { Storage } from './stroage';
import DataViewerDialog, {DialogRef} from './DataViewerDialog';
import Chart from './Chart/Chart';
import FormDesigner from './FormDesigner/FormDesigner';
import MonacoEditor from './MonacoEditor/MonacoEditor';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name: string]: React.DetailedHTMLProps<any, HTMLElement>;
    }
  }
}
export default function() {
	const dialogRef = useRef<DialogRef>(null);

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

    document.body.addEventListener('formflow', e => chartEventHandler(e));
    window.addEventListener('resize', _e => {
      (document.querySelector('x-formflow') as any).getInstance().fitView();
    })

    document.body.addEventListener('resize-move', _e => { // x-resize event handler
      (document.querySelector('x-formflow') as any).getInstance().fitView();
    })

    document.body.addEventListener('monaco-change', (e:any) => { // monaco editor change handler
      console.log(e.detail);
    });

    document.body.addEventListener('sidebar-message', (event: any) => { // sidebar message handler
      if (event.detail === 'show-data') {
        const chartEl = document.querySelector('x-formflow') as any;
        dialogRef.current?.show({chartData: chartEl.getData(), chartInstance: chartEl.getInstance()})
      }
    });
  }, []);

  return (<>
    <button 
      className="sidebar toggle position-absolute top-0 start-0 border-0 fs-4" 
      style={{zIndex: 1}}>☰</button>

    <SideBar></SideBar>

    <x-resize className="h-100">
      <div className="position-relative" style={{width: '33%'}}>
        <Chart />
      </div>
      <div className="accordion flex-fill" id="right-section" role="navigation">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#form-designer">
              {selected?.data?.label} form
            </button>
          </h2>
          <div id="form-designer" className="accordion-collapse collapse" data-bs-parent="#right-section">
            <div className="accordion-body p-0 py-1">
              <FormDesigner />
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#monaco-editor">
              {selected?.data?.label} properties
            </button>
          </h2>
          <div id="monaco-editor" className="accordion-collapse collapse" data-bs-parent="#right-section">
            <div className="accordion-body">
              <MonacoEditor language="json" value="" />
            </div>
          </div>
        </div>
      </div>
    </x-resize>

    <DataViewerDialog ref={dialogRef}/> 
  </>)
}
