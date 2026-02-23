import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/DatePickerComponent.css";

interface DatePickerComponentProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  label: string;
  required?: boolean;
  name?: string;
  value?: string;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  selectedDate,
  onChange,
  label,
  name,
  value,
  required = false,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <DatePicker
        selected={selectedDate}
        onChange={(e) => {
          onChange({
            target: {
              name: name,
              value: e,
            },
          } as any);
        }}
        name={name}
        className="custom-date-picker"
        placeholderText="Select Date"
        dateFormat="dd/MM/yyyy"
        value={value}
        popperClassName="custom-calendar"
        required={required}
      />
    </div>
  );
};

export default DatePickerComponent;
