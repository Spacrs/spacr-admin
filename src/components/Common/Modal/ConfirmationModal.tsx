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
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="text-center">
          <h3 className="text-lg font-semibold">{message}</h3>
          <div className="mt-6 flex justify-center gap-4">
            <Button text="Cancel" onClick={onClose} type="lightBlue" />
            <Button text="Confirm" onClick={onConfirm} type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
