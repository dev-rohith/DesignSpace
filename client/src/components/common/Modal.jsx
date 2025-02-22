import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4 relative">
        {/* Header */}
        <div className="p-4">
          {title && (
            <h2 className="text-xl font-semibold text-gray-900 pr-8">
              {title}
            </h2>
          )}
          <button
          type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
