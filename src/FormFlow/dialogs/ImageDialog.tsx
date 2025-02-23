import { toPng } from 'html-to-image';
import { useRef, useEffect, PropsWithoutRef } from 'react';

export default function ImageDialog(props: PropsWithoutRef<any>) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const modalEl = modalRef.current as HTMLDialogElement;
    modalEl.showModal();
    toPng(document.querySelector('.react-flow__viewport') as HTMLElement)
      .then(blobUrl => {
        (imgRef.current as HTMLImageElement).src = blobUrl;
      })
  }, []);

  function closeModal() {
    props.onClose?.();
    modalRef.current?.close();
  };

  return (
    <dialog className="dialog-modal shadow-sm" ref={modalRef}
      onClick={ e => e.target === modalRef.current && closeModal()}
      onKeyDown={e => (e.key === 'Escape') && closeModal()}>
      <img ref={imgRef} />
    </dialog>
  );
}