import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { format } from 'date-fns';
export default function DateFilter({ startDate, endDate, onRangeChange }) {
    return (_jsxs("div", { className: "flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200 text-sm", children: [_jsx("input", { type: "date", value: format(startDate, 'yyyy-MM-dd'), onChange: (e) => onRangeChange(new Date(e.target.value), endDate), className: "outline-none text-gray-700" }), _jsx("span", { className: "text-gray-400", children: "\u2192" }), _jsx("input", { type: "date", value: format(endDate, 'yyyy-MM-dd'), onChange: (e) => onRangeChange(startDate, new Date(e.target.value)), className: "outline-none text-gray-700" })] }));
}
