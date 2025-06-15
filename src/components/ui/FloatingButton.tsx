import React from "react";
import { FaPlus } from "react-icons/fa";

type FloatingActionButtonProps = {
  onClick: () => void;
};

export default function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 md:hidden">
      <button 
        onClick={onClick}
        className="bg-royal-DEFAULT text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-royal-dark transition duration-300"
      >
        <FaPlus className="text-xl" />
      </button>
    </div>
  );
}