import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import ColorInpute from "./ColorInpute";
import TextInpute from "./TextInpute";
import NumberInpute from "./NumberInpute";
import SelectComponent from "./SelectInput";
import SwitchButton from "./SwitchButton";
import DatePickerComponent from "./DatePickerComponent";
import TextArea from "./TextArea";
import TimePicker from "./TimePicker"; // Import the TimePicker component
function InputComponent({ type, name, value, onChange, label, defaultValue, min, max, options = [], required = false, placeholder = "", }) {
    const renderInput = () => {
        switch (type) {
            case "color":
                return _jsx(ColorInpute, { name: name, value: value, onChange: onChange });
            case "text":
                return (_jsx(TextInpute, { name: name, value: value, onChange: onChange, required: required, placeholder: placeholder }));
            case "textarea":
                return (_jsx(TextArea, { name: name, value: value, onChange: onChange, required: required }));
            case "number":
                return (_jsx(NumberInpute, { name: name, value: value, onChange: onChange, defaultValue: defaultValue, min: min, max: max, required: required }));
            case "select":
                return (_jsx(SelectComponent, { name: name, value: value, onChange: onChange, options: options, required: required }));
            case "switchButton":
                return (_jsx(SwitchButton, { options: [
                        { label: "Option 1", value: "option1" },
                        { label: "Option 2", value: "option2" },
                    ], value: value, onChange: onChange }));
            case "datePicker":
                return (_jsx(DatePickerComponent, { selectedDate: value, onChange: onChange, label: "", value: value, name: name, required: required }));
            case "timePicker": // Add timePicker case
                return (_jsx(TimePicker, { label: label, name: name, value: value, onChange: onChange, required: required }));
            default:
                return _jsx("p", { className: "text-red-300 font-bold", children: "Invalid type" });
        }
    };
    return (_jsxs(_Fragment, { children: [label && (_jsx("label", { className: "block text-gray-700 font-medium mb-2", htmlFor: name, children: label })), renderInput()] }));
}
export default InputComponent;
