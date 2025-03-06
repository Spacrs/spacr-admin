import React from "react";
import ColorInpute from "./ColorInpute";
import TextInpute from "./TextInpute";
import NumberInpute from "./NumberInpute";
import SelectComponent from "./SelectInput";
import SwitchButton from "./SwitchButton";

interface InputComponentProps {
  type: string;
  name: string;
  value: any;
  label: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  defaultValue?: any;
  min?: number;
  max?: number;
  options?: { value: string | number; label: string }[]; // For select type
}

function InputComponent({
  type,
  name,
  value,
  onChange,
  label,
  defaultValue,
  min,
  max,
  options = [],
}: InputComponentProps) {
  const renderInput = () => {
    switch (type) {
      case "color":
        return <ColorInpute name={name} value={value} onChange={onChange} />;
      case "text":
        return <TextInpute name={name} value={value} onChange={onChange} />;
      case "number":
        return (
          <NumberInpute
            name={name}
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}
            min={min}
            max={max}
          />
        );
      case "select":
        return (
          <SelectComponent
            name={name}
            value={value}
            onChange={onChange}
            options={options}
          />
        );
      case "switchButton":
        return (
          <SwitchButton
            options={options || []}
            value={value}
            onChange={onChange}
          />
        );

      default:
        return <p className="text-red-300 font-bold">Invalid type</p>;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
      <label className="text-sm font-semibold text-gray-700">{label}:</label>
      {renderInput()}
    </div>
  );
}

export default InputComponent;
