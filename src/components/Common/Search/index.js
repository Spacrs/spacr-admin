import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { icons } from "../../../Icons/constant";
const { RxCross1, FiSearch } = icons;
const Index = ({ search, placeholder = "Search by name or email...", onChange, onReset, }) => {
    return (_jsxs("div", { className: "relative w-full", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FiSearch, { className: "text-gray-500" }) }), _jsx("input", { type: "text", className: "w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: placeholder, value: search, onChange: onChange }), search && (_jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: onReset, children: _jsx(RxCross1, { className: "text-gray-500 hover:text-red-500" }) }))] }));
};
export default Index;
