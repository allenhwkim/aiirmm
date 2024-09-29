
import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { forwardRef } from 'react';

interface Props {
  id?: string;
  class?: string;
}
export type DialogRef = {
	show: (message: any) => void;
}

const DataViewerDialog = forwardRef<DialogRef, Props>((props, ref) => { 
  const [data, setData] = useState() as any;
  const [dialog, setDialog] = useState() as any;
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialogEl = dialogRef.current as any;
    props.id && dialogEl.setAttribute('id', props.id);
    props.class && dialogEl.classList.add(...props.class.split(/\s+/));
    setDialog(new window['bootstrap'].Modal(dialogEl));
  }, []);
  
	// Pass the ref to the useImperativeHandle hook
	useImperativeHandle(ref, () => ({
		show: (message) => {
      setData(message);
      dialog.show();
		}
	}));

  return (
    <div className="modal fade" ref={dialogRef} tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Data Viewer</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body" id="dialog-contents">
            <b>chart data </b>
            <x-json level="2" data={data?.chartData}></x-json>
            <b>chart instance</b>
            <x-json level="1" data={data?.chartInstance}></x-json>
          </div>
        </div>
      </div>
    </div>
  );
});

export default DataViewerDialog;