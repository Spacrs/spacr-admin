import React from "react";
import { icons } from "../../../Icons/constant";
const { RxCross1, FiSearch } = icons;

interface SearchInputProps {
  search: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
}

const Index: React.FC<SearchInputProps> = ({
  search,
  placeholder = "Search by name or email...",
  onChange,
  onReset,
}) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="text-gray-500" />
      </div>
      <input
        type="text"
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={search}
        onChange={onChange}
      />
      {search && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={onReset}
        >
          <RxCross1 className="text-gray-500 hover:text-red-500" />
        </button>
      )}
    </div>
  );
};

export default Index;
