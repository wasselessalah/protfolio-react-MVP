// src/components/shared/Modal.tsx
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const { theme } = useTheme();

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // lock background scroll

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div
        className={cn(
          "relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl",
          "animate-[fadeIn_0.2s_ease-out]",
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        )}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className={cn(
            "absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full transition-colors",
            theme === "dark"
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          <FaTimes size={16} />
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}
