import { ReactNode } from 'react';

import './Modal.scss';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ open, onClose, children }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <button type="button" className="ModalWrapper" onClick={onClose}>
      <button type="button" className="ModalContent" onClick={(e) => e.stopPropagation()}>
        <button className="ModalClose" type="button" onClick={onClose}>Close</button>
        <div className="ModalChildren">
          {children}
        </div>
      </button>
    </button>
  );
}

export default Modal;
