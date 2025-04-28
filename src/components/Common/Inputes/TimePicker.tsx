import React from "react";

interface TimePickerProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const TimePicker: React.FC<TimePickerProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
}) => {
  return (
    <input
      type="time"
      id={name}
      name={name}
      className="w-full  px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default TimePicker;
