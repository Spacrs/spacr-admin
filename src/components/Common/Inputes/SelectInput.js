import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./css/SelectComponent.css";
const SelectComponent = ({ name, options, value, onChange, className = "", required = false, isDisabled = false }) => {
    return (_jsxs("select", { name: name, className: `block w-full px-3 py-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${className}`, value: value, onChange: onChange, required: required, disabled: isDisabled, children: [_jsx("option", { value: "", children: "Select" }), options.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value)))] }));
};
export default SelectComponent;
