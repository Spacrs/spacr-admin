import React from "react";

interface SwitchButtonProps {
  options: { label: string; value: string }[]; // Array of options
  value: string; // Currently selected value
  onChange: (value: string) => void; // Function to handle change
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  options=[],
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      {options.map((option, index) => (
        <button
          key={index}
          className={`text-sm font-semibold text-gray-700 px-2 py-1 rounded ${
            option.value === value ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SwitchButton;
