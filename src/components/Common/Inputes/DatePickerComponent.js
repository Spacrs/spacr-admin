import { jsx as _jsx } from "react/jsx-runtime";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/DatePickerComponent.css";
const DatePickerComponent = ({ selectedDate, onChange, label, name, value, required = false, }) => {
    return (_jsx("div", { className: "flex flex-col space-y-2", children: _jsx(DatePicker, { selected: selectedDate, onChange: (e) => {
                onChange({
                    target: {
                        name: name,
                        value: e,
                    },
                });
            }, name: name, className: "custom-date-picker", placeholderText: "Select Date", dateFormat: "dd/MM/yyyy", value: value, popperClassName: "custom-calendar", required: required }) }));
};
export default DatePickerComponent;
