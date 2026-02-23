import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

interface ErrorProps {
  errorMsg: string;
}

const ErrorMsg: React.FC<ErrorProps> = ({ errorMsg }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 rounded-lg">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm text-center border border-red-400">
        <FaExclamationTriangle className="text-red-500 text-5xl mb-4" />
        <h2 className="text-xl font-semibold text-red-600">Oops! Something went wrong.</h2>
        <p className="text-gray-700 mt-2">{errorMsg}</p>
      </div>
    </div>
  );
};

export default ErrorMsg;
