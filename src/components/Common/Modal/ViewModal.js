import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ViewModal = ({ isOpen, onClose, handleAction, children, title = "", }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 overflow-hidden transform transition-all duration-300 scale-100 animate-slideUp", children: [_jsxs("div", { className: "w-full flex justify-between items-center px-6 py-4 bg-gray-100 border-b", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-800", children: title }), _jsx("button", { onClick: onClose, className: "text-gray-600 hover:text-gray-900", children: "\u2715" })] }), _jsx("div", { className: "px-6 py-2 overflow-scroll", children: children }), _jsxs("div", { className: "flex items-center justify-end px-6 py-2 bg-gray-100 border-t space-x-4", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400", children: "Cancel" }), handleAction && (_jsx("button", { onClick: handleAction, className: "bg-[#3f9997] text-white py-2 px-4 rounded-md hover:bg-[#36908c] focus:outline-none focus:bg-[#36908c]", children: "Save Changes" }))] })] }) }));
};
export default ViewModal;
