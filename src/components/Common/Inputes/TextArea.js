import { jsx as _jsx } from "react/jsx-runtime";
function TextArea({ name, value, onChange, rows = 4, required = false, }) {
    return (_jsx("textarea", { name: name, className: "w-full px-4 py-3 border border-gray-300 rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-900", value: value, onChange: onChange, rows: rows, required: required }));
}
export default TextArea;
