// components/ui/FloatingButton.tsx
import React from 'react';

type FloatingActionButtonProps = {
  onClick: () => void;
  icon: React.ReactNode;
};

export function FloatingActionButton({ onClick, icon }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="md:hidden fixed w-12 h-12  flex items-center justify-center  bottom-6 right-6 bg-royal-DEFAULT text-white rounded-full p-4 shadow-lg hover:bg-royal-dark transition-colors duration-300 z-30"
      aria-label="Open community sidebar"
    >
      {icon}
    </button>
  );
}