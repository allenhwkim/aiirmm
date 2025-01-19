import { useRef, useEffect } from 'react';
import './DialogModal.scss';

interface ModalProps {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

export default function DialogModal({isOpen, hasCloseBtn, onClose, children}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modalEl = modalRef.current;
    if (!modalEl) return;

    isOpen ? modalEl.showModal() : modalEl.close();
  }, [isOpen]);

  function closeModal() {
    onClose?.();
    modalRef.current?.close();
  };

  return (
    <dialog className="dialog-modal shadow-sm" ref={modalRef}
      onClick={ e => e.target === modalRef.current && closeModal()}
      onKeyDown={e => (e.key === 'Escape') && closeModal()}>
      {hasCloseBtn &&
        <div
          className="btn-close"
          aria-label="Close"
          onClick={closeModal}>
        </div>
      }
      {children}
    </dialog>
  );
}