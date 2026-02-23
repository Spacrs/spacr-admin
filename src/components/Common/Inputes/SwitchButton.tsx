import React from "react";

interface SwitchButtonProps {
  options: { label: string; value: string }[]; // Array of options
  value: string; // Currently selected value
  onChange: (value: string) => void; // Function to handle change
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  options = [],
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-200 p-1 rounded-full shadow-inner">
      {options.map((option, index) => (
        <button
          key={index}
          className={`text-sm font-semibold px-4 py-1 rounded-full transition-all duration-300 
            ${
              option.value === value
                ? "bg-primary text-white shadow-md"
                : "text-gray-700 hover:bg-gray-300"
            }
          `}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SwitchButton;
