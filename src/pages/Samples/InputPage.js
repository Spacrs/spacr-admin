import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import InputComponent from "../../components/Common/Inputes";
function InputPage() {
    const [formData, setFormData] = useState({
        text: "",
        number: "",
        color: "#000000",
        date: null,
        select: "",
        switchButton: "option1",
    });
    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    return (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-100 rounded-lg shadow-lg", children: [_jsx(InputComponent, { type: "text", name: "text", label: "Text Example", value: formData.text, onChange: (e) => handleChange("text", e.target.value) }), _jsx(InputComponent, { type: "number", name: "number", label: "Number Example", value: formData.number, onChange: (e) => handleChange("number", e.target.value) }), _jsx(InputComponent, { type: "color", name: "color", label: "Color Picker", value: formData.color, onChange: (e) => handleChange("color", e.target.value) }), _jsx(InputComponent, { type: "datePicker", name: "date", label: "Date Picker", value: formData.date, onChange: (date) => handleChange("date", date) }), _jsx(InputComponent, { type: "select", name: "select", label: "Select Menu", value: formData.select, onChange: (e) => handleChange("select", e.target.value), options: [
                    { value: "optn1", label: "Option 1" },
                    { value: "optn2", label: "Option 2" },
                ] }), _jsx(InputComponent, { type: "switchButton", name: "switchButton", label: "Switch Button", value: formData.switchButton, onChange: (value) => handleChange("switchButton", value) })] }));
}
export default InputPage;
