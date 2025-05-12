import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ToggleSwitch = ({ label, isChecked, onToggle }) => {
    return (_jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: label }), _jsx("div", { onClick: onToggle, className: `relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isChecked ? "bg-green-600" : "bg-gray-300"}`, children: _jsx("div", { className: `bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isChecked ? "translate-x-6" : "translate-x-0"}` }) })] }));
};
export default ToggleSwitch;
