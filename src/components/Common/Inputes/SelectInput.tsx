import React from "react";
import "./css/SelectComponent.css";

interface SelectComponentProps {
  name: string;
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  required?: boolean;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  name,
  options,
  value,
  onChange,
  className = "",
  required = false,
}) => {
  return (
    <select
      name={name}
      className={`block w-full px-3 py-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${className}`}
      value={value}
      onChange={onChange}
      required={required}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
          </option>
        ))}
      </select>
  );
};

export default SelectComponent;
