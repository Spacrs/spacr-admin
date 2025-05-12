import { jsx as _jsx } from "react/jsx-runtime";
function NumberInpute({ name, value, onChange, defaultValue = 16, min, max, required = false, }) {
    return (_jsx("input", { type: "number", name: name, ...(max !== undefined && { max }), ...(min !== undefined && { min }), defaultValue: defaultValue, step: "0.01", className: "w-full px-4 py-3 border border-gray-300 rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-900", value: value, onChange: onChange, required: required }));
}
export default NumberInpute;
