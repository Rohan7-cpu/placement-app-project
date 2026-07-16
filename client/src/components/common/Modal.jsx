function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[700px] p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold"
        >
          ✖
        </button>

        {children}

      </div>
    </div>
  );
}

export default Modal;