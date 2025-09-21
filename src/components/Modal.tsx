import React from "react";

import { TheButton } from "./TheButton";
import { X } from "lucide-react";

interface ModalAction {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  actions?: ModalAction[];
}

const Modal = ({ isOpen, onClose, children, title, actions }: ModalProps) => {
  if (!isOpen) return null;
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={handleBackgroundClick}
      ></div>

      <div className="relative bg-white rounded-lg shadow-lg w-1/3 max-h-[80%] flex flex-col overflow-hidden">
        <div className="px-4 py-2 flex items-center flex-row justify-between border-b border-indigo-800/30">
          <div className="font-semibold text-lg">{title}</div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-indigo-500 transition duration-200 transform hover:rotate-90 hover:scale-110"
          >
            <X />
          </button>
        </div>
        <div className="p-4 overflow-auto flex-1">{children}</div>
        {actions && actions.length > 0 && (
          <div className="px-4 py-2 border-t border-indigo-800/30 text-right flex gap-2 justify-end">
            {actions.map((action, idx) => (
              <TheButton key={idx} onClick={action.onClick}>
                {action.label}
              </TheButton>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
