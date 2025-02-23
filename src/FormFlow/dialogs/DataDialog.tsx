import { useReactFlow } from '@xyflow/react';
import { JsonEditor } from 'json-edit-react';
import { useRef, useEffect, PropsWithoutRef } from 'react';

export default function DataDialog(props: PropsWithoutRef<any>) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const reactFlow = useReactFlow();

  useEffect(() => {
    const modalEl = modalRef.current as HTMLDialogElement;
    modalEl.showModal();
  }, []);

  function closeModal() {
    props.onClose?.();
    modalRef.current?.close();
  };

  return (
    <dialog className="dialog-modal shadow-sm" ref={modalRef}
      onClick={ e => e.target === modalRef.current && closeModal()}
      onKeyDown={e => (e.key === 'Escape') && closeModal()}>
      <JsonEditor
        data={ reactFlow?.toObject() }
        collapse={1}
        enableClipboard={false}
        collapseAnimationTime={100}
        restrictAdd={true}
        restrictEdit={true}
        restrictDelete={true}
        rootFontSize={'12px'}
      />
    </dialog>
  );
}