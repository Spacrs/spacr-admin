import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const DeleteModal = ({ isOpen, onClose, onConfirm, }) => {
    const [confirmationText, setConfirmationText] = useState("");
    if (!isOpen)
        return null;
    const handleInputChange = (e) => {
        setConfirmationText(e.target.value);
    };
    const handleDelete = () => {
        if (confirmationText === "Delete") {
            onConfirm();
            onClose();
        }
        else {
            alert("Please type 'Delete' to confirm.");
        }
    };
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-800 mb-4", children: "Confirm Deletion" }), _jsx("p", { className: "text-gray-600", children: "Are you sure you want to delete this template? This action cannot be undone." }), _jsx("input", { type: "text", value: confirmationText, onChange: handleInputChange, placeholder: 'Type "Delete" to confirm', className: "w-full border rounded px-2 py-1 my-4" }), _jsxs("div", { className: "flex justify-end space-x-4", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400", children: "Cancel" }), _jsx("button", { onClick: handleDelete, className: "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700", children: "Delete" })] })] }) }));
};
export default DeleteModal;
