import React from "react";

function TextInpute({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="text"
      name={name}
      className="w-full px-4 py-3 border border-gray-300 rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-900"
      value={value}
      onChange={onChange}
    />
  );
}

export default TextInpute;
