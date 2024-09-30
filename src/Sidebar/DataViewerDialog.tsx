
import { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface Props {
  show?: boolean;
  data?: any;
  onHide?: any;
}

export default function(props: Props) { 
  const [show, setShow] = useState(false);
  const chartDataRef = useRef();
  const chartInstanceRef = useRef();

  useEffect(() => {
    if (props.show) {
      setTimeout(() => {
        (chartDataRef.current as any).data = props.data.chartData;
        (chartInstanceRef.current as any).data = props.data.chartInstance;
      })
      setShow(props.show);
    }
  }, [props]);

  function onHide() {
    setShow(false);
    props.onHide(false); // set this props.show as false
  }
  
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Data Viewer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <b>chart data </b>
        <x-json level="2" ref={chartDataRef}></x-json>
        <b>chart instance</b>
        <x-json level="1" ref={chartInstanceRef}></x-json>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => setShow(false)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
