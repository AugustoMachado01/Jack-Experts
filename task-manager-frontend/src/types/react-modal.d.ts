declare module 'react-modal' {
    import * as React from 'react';
  
    interface ModalProps {
      isOpen: boolean;
      onRequestClose: () => void;
      contentLabel?: string;
      className?: string;
      overlayClassName?: string;
      shouldCloseOnOverlayClick?: boolean;
      shouldCloseOnEsc?: boolean;
      ariaHideApp?: boolean;
      children?: React.ReactNode; // Adicionado para incluir children
    }
  
    class Modal extends React.Component<ModalProps> {}
  
    export default Modal;
  }
  