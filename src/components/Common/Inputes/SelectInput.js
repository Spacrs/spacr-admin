import { jsx as _jsx } from "react/jsx-runtime";
import "./css/SelectComponent.css";
const SelectComponent = ({ name, options, value, onChange, className = "", required = false, }) => {
    return (_jsx("select", { name: name, className: `block w-full px-3 py-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${className}`, value: value, onChange: onChange, required: required, children: options.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value))) }));
};
export default SelectComponent;
