import { jsx as _jsx } from "react/jsx-runtime";
const SwitchButton = ({ options = [], value, onChange, }) => {
    return (_jsx("div", { className: "flex items-center space-x-2 bg-gray-200 p-1 rounded-full shadow-inner", children: options.map((option, index) => (_jsx("button", { className: `text-sm font-semibold px-4 py-1 rounded-full transition-all duration-300 
            ${option.value === value
                ? "bg-primary text-white shadow-md"
                : "text-gray-700 hover:bg-gray-300"}
          `, onClick: () => onChange(option.value), children: option.label }, index))) }));
};
export default SwitchButton;
