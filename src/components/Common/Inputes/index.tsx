import React from "react";
import ColorInpute from "./ColorInpute";
import TextInpute from "./TextInpute";
import NumberInpute from "./NumberInpute";
import SelectComponent from "./SelectInput";
import SwitchButton from "./SwitchButton";
import DatePickerComponent from "./DatePickerComponent";
import TextArea from "./TextArea";

interface InputComponentProps {
  type:
    | "color"
    | "text"
    | "textarea"
    | "number"
    | "select"
    | "switchButton"
    | "datePicker";
  name: string;
  value: any;
  label: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | any
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
      case "textarea":
        return <TextArea name={name} value={value} onChange={onChange} />;
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
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
            ]}
            value={value}
            onChange={onChange}
          />
        );

      case "datePicker":
        return (
          <DatePickerComponent
            selectedDate={value}
            onChange={onChange}
            label={label}
          />
        );

      default:
        return <p className="text-red-300 font-bold">Invalid type</p>;
    }
  };

  return (
    <>
      {label && (
        <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
          {label}
        </label>
      )}
      {renderInput()}
    </>
  );
}

export default InputComponent;
