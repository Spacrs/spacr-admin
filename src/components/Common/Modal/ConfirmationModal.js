import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Button from "../Button";
const ConfirmationModal = ({ isOpen, onClose, onConfirm, message, }) => {
    if (!isOpen)
        return null;
    return (_jsxs("div", { className: "relative z-10", "aria-labelledby": "modal-title", role: "dialog", "aria-modal": "true", children: [_jsx("div", { className: "fixed inset-0 bg-gray-500/75 transition-opacity", "aria-hidden": "true" }), _jsx("div", { className: "fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50", children: _jsx("div", { className: "relative transform overflow-hidden bg-white p-6 rounded-lg shadow-xl w-80 transition-all", children: _jsxs("div", { className: "text-center mx-auto shrink-0", children: [_jsx("h3", { className: "text-lg font-semibold", children: message }), _jsxs("div", { className: "mt-6 flex justify-center gap-4", children: [_jsx(Button, { text: "Cancel", onClick: onClose, variant: "lightBlue" }), _jsx(Button, { text: "Confirm", onClick: onConfirm, variant: "primary" })] })] }) }) })] }));
};
export default ConfirmationModal;
