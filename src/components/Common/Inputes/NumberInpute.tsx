import React from "react";

function NumberInpute({
  name,
  value,
  onChange,
  defaultValue = 16,
  min = 0,
  max,
  required = false,
}: {
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string | number;
  min?: number | string;
  max?: number | string;
  required?: boolean;
}) {
  return (
    <input
      type="number"
      name={name}
      {...(max !== undefined && { max })}
      min={min}
      defaultValue={defaultValue}
      step="0.01"
      className="w-full px-4 py-3 border border-gray-300 rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-900"
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}

export default NumberInpute;
