import { jsx as _jsx } from "react/jsx-runtime";
const Button = ({ className = "", text, onClick = () => { }, variant, type = "button", disabled = false, }) => {
    const baseStyles = `px-4 py-2 rounded-md focus:outline-none transition disabled:bg-gray-200 disabled:text-gray-700`;
    const typeStyles = {
        primary: "bg-primary text-white",
        secondary: "bg-gray-600 text-white",
        danger: "bg-red-600 text-white",
        warning: "bg-yellow-500 text-black",
        dark: "bg-gray-900 text-white",
        light: "bg-gray-200 text-black",
        lightBlue: "bg-lightBlue text-primary border-solid border-2 border-sky-700",
        transparent: "bg-white text-primary border-solid border-2 border-sky-700",
    };
    return (_jsx("button", { className: `${baseStyles} ${typeStyles[variant]} ${className}`, onClick: onClick, type: type, disabled: disabled, children: text }));
};
export default Button;
