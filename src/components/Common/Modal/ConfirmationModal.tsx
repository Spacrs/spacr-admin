// components/Common/ConfirmationModal.tsx
import React from "react";
import Button from "../Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="relative transform overflow-hidden bg-white p-6 rounded-lg shadow-xl w-80 transition-all">
          <div className="text-center mx-auto shrink-0">
            <h3 className="text-lg font-semibold">{message}</h3>
            <div className="mt-6 flex justify-center gap-4">
              <Button text="Cancel" onClick={onClose} variant="lightBlue" />
              <Button text="Confirm" onClick={onConfirm} variant="primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
