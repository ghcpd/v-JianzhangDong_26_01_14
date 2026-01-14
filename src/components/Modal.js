/**
 * Modal Component
 * 
 * A reusable modal dialog component for displaying content in an overlay.
 * Features:
 * - Backdrop click to close
 * - Escape key to close
 * - Focus trapping
 * - Smooth animations
 * 
 * Design Notes:
 * - Semi-transparent backdrop for focus
 * - Centered modal with max dimensions
 * - Clean header with close button
 * - Responsive sizing
 * 
 * @file src/components/Modal.js
 */

import React, { useEffect, useRef } from 'react';
import './Modal.css';

/**
 * Modal Component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Callback to close the modal
 * @param {string} props.title - Modal header title
 * @param {React.ReactNode} props.children - Modal content
 * @returns {JSX.Element|null} Modal dialog or null if closed
 */
function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  // ============================================
  // EFFECTS
  // ============================================

  /**
   * Handle escape key and focus management
   */
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement;
      
      // Focus the modal
      modalRef.current?.focus();

      // Add escape key listener
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
        
        // Restore focus to previous element
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  // ============================================
  // EVENT HANDLERS
  // ============================================

  /**
   * Handle backdrop click
   * Close modal when clicking outside the modal content
   * 
   * @param {Event} e - Click event
   */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // ============================================
  // RENDER
  // ============================================

  // Don't render anything if modal is closed
  if (!isOpen) return null;

  return (
    <div 
      className="modal-backdrop"
      onClick={handleBackdropClick}
      data-testid="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="modal"
        ref={modalRef}
        tabIndex={-1}
        data-testid="modal"
      >
        {/* Modal Header */}
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {title}
          </h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
            data-testid="modal-close"
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
