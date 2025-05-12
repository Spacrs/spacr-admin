import { jsx as _jsx } from "react/jsx-runtime";
function TextInpute({ name, value, onChange, required = false, placeholder = "" }) {
    return (_jsx("input", { type: "text", name: name, className: "w-full px-4 py-3 border border-gray-300 rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-900", value: value, onChange: onChange, required: required, placeholder: placeholder }));
}
export default TextInpute;
