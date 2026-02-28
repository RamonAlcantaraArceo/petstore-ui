import React, { useEffect } from 'react';
import type { FC } from 'react';
import ReactDOM from 'react-dom';
import { theme } from '../../tokens/theme';
import { useAccessibility, useFocusManagement } from '../../accessibility';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
}) => {
  const { ariaAttributes } = useAccessibility({
    'aria-label': title,
  });

  const { elementRef } = useFocusManagement({
    autoFocus: true,
    trapFocus: isOpen,
    restoreFocus: () => null,
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const width = size === 'small' ? '24rem' : size === 'large' ? '48rem' : '36rem';

  const overlayStyles: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: Number(theme.zIndex.modalBackdrop),
    backgroundColor: theme.colors.background.overlay,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing[4],
  };

  const modalStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: width,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.background.primary,
    boxShadow: theme.boxShadow.xl,
    padding: theme.spacing[6],
    maxHeight: '90vh',
    overflow: 'auto',
  };

  const titleStyles: React.CSSProperties = {
    margin: 0,
    marginBottom: theme.spacing[4],
    fontFamily: theme.typography.fontFamily.sans.join(', '),
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text.primary,
  };

  return ReactDOM.createPortal(
    <div style={overlayStyles} onClick={onClose} role="presentation">
      <div
        ref={elementRef as React.RefObject<HTMLDivElement>}
        style={modalStyles}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        {...ariaAttributes}
      >
        <h2 style={titleStyles}>{title}</h2>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
