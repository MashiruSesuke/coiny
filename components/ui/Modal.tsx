'use client';

import { ReactNode, useEffect } from 'react';

/**
 * Props for the Modal component.
 */
interface ModalProps {
  /** Whether the modal is currently visible. */
  isOpen: boolean;
  /** Callback invoked to close the modal. */
  onClose: () => void;
  /** Content rendered inside the modal dialog. */
  children: ReactNode;
}

/**
 * Modal — a simple overlay dialog component.
 *
 * Renders a centered dialog with a semi-transparent backdrop and a close button.
 * Hides body scroll when open and restores it when closed.
 * Returns null when `isOpen` is false (no mount overhead).
 */
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
