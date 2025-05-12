import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaExclamationTriangle } from "react-icons/fa";
const ErrorMsg = ({ errorMsg }) => {
    return (_jsx("div", { className: "flex flex-col items-center justify-center h-screen bg-gray-100 rounded-lg", children: _jsxs("div", { className: "bg-white shadow-lg rounded-lg p-6 max-w-sm text-center border border-red-400", children: [_jsx(FaExclamationTriangle, { className: "text-red-500 text-5xl mb-4" }), _jsx("h2", { className: "text-xl font-semibold text-red-600", children: "Oops! Something went wrong." }), _jsx("p", { className: "text-gray-700 mt-2", children: errorMsg })] }) }));
};
export default ErrorMsg;
