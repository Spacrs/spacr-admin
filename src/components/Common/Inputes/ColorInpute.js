import { jsx as _jsx } from "react/jsx-runtime";
function ColorInpute({ name, value, onChange, }) {
    return (_jsx("input", { type: "color", name: name, className: "w-10 h-10 border-none rounded-full cursor-pointer shadow-inner transition-all duration-300 ease-in-out", value: value, onChange: onChange }));
}
export default ColorInpute;
