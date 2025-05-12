import { jsx as _jsx } from "react/jsx-runtime";
const TimePicker = ({ label, name, value, onChange, required = false, }) => {
    return (_jsx("input", { type: "time", id: name, name: name, className: "w-full  px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900", value: value, onChange: onChange, required: required }));
};
export default TimePicker;
