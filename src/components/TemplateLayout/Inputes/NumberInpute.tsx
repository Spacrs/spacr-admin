import React from "react";

function NumberInpute({
  name,
  value,
  onChange,
  defaultValue = 16,
  min = 0,
  max = 100,
}: {
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string | number;
  min?: number | string;
  max?: number | string;
}) {
  return (
    <input
      type="number"
      name={name}
      max={max}
      min={min}
      defaultValue={defaultValue}
      className="w-16 px-2 py-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      value={value}
      onChange={onChange}
    />
  );
}

export default NumberInpute;
