import {useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import DataViewerDialog from './DataViewerDialog';

export default function() {
  const [show, setShow] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogData, setDialogData] = useState({} as any);

  function showData() {
    const chartEl = document.querySelector('x-formflow') as any;
    setDialogData({chartData: chartEl.getData(), chartInstance: chartEl.getInstance()});
    setShowDialog(true);
  }

  return (
    <>
      <button className="btn btn-light position-absolute z-1" onClick={() => setShow(true)}>☰</button>

      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sidebar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <button className="btn btn-light" onClick={showData}>Show data</button>
        </Offcanvas.Body>
      </Offcanvas>
      
      <DataViewerDialog show={showDialog} data={dialogData} onHide={setShowDialog}/> 
    </>
  );

}