/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */

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
    <div className="ModalWrapper" onClick={onClose}>
      <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
        <button className="ModalClose" type="button" onClick={onClose}>Close</button>
        <div className="ModalChildren">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
