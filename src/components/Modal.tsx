import React, { useEffect } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Handle click on overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={handleOverlayClick}
    >
      <div
        className="relative w-full max-w-2xl rounded-lg shadow-xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #f9f9f9 0%, #ffffff 100%)',
          border: '1px solid rgba(26, 35, 126, 0.1)',
        }}
      >
        {/* Modal Header */}
        <div
          className="px-6 py-4"
          style={{
            background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
            color: '#ffd700',
          }}
        >
          <h2 className="text-xl font-bold">{title}</h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gold-500 hover:text-gold-300 transition-colors"
              style={{ color: '#ffd700' }}
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6">{children}</div>

        {/* Modal Footer (optional) */}
        <div
          className="px-6 py-4 border-t flex justify-end space-x-3"
          style={{ borderColor: 'rgba(26, 35, 126, 0.1)' }}
        >
          <button
            onClick={onClose}
            className="px-4 py-2 rounded font-medium transition-colors"
            style={{
              backgroundColor: '#f0f0f0',
              color: '#1a237e',
            }}
          >
            Close
          </button>
          <button
            className="px-4 py-2 rounded font-medium transition-colors"
            style={{
              background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
              color: '#ffd700',
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;