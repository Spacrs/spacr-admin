import React from "react";
import "./css/SelectComponent.css";

interface SelectComponentProps {
  name: string;
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  name,
  options,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className="relative w-full">
      <select
        name={name}
        className={`w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-700 shadow-sm transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#131f5c] hover:border-[#131f5c] ${className}`}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-gray-800">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
