import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { format } from 'date-fns';
function formatDate(date) {
    return date ? format(date, "yyyy-MM-dd") : "";
}
export default function DateFilter({ startDate, endDate, onRangeChange }) {
    return (_jsxs("div", { className: "flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200 text-sm", children: [_jsx("input", { type: "date", value: formatDate(startDate), onChange: (e) => onRangeChange(new Date(e.target.value), endDate), className: "outline-none text-gray-700" }), _jsx("span", { className: "text-gray-400", children: "\u2192" }), _jsx("input", { type: "date", value: formatDate(endDate), onChange: (e) => onRangeChange(startDate, new Date(e.target.value)), className: "outline-none text-gray-700" })] }));
}
