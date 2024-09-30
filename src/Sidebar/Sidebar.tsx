import {useState } from 'react';
import Button from 'react-bootstrap/Button';
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
      <Button variant="light" onClick={() => setShow(true)}>☰</Button>

      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sidebar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Button variant="light" onClick={showData}>Show data</Button>
        </Offcanvas.Body>
      </Offcanvas>
      
      <DataViewerDialog show={showDialog} data={dialogData} onHide={setShowDialog}/> 
    </>
  );

}