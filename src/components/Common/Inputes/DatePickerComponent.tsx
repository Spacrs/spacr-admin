import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/DatePickerComponent.css";

interface DatePickerComponentProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  label: string;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  selectedDate,
  onChange,
  label,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        className="custom-date-picker"
        placeholderText="Select Date"
        dateFormat="dd/MM/yyyy"
        popperClassName="custom-calendar"
      />
    </div>
  );
};

export default DatePickerComponent;
