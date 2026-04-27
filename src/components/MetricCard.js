import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function MetricCard({ label, value, change, positive = true, loading = false, isCurrency = false }) {
    if (loading) {
        return (_jsxs("div", { className: "bg-white rounded-xl p-4 shadow-sm border border-gray-100 h-[100px] flex flex-col justify-between animate-pulse", children: [_jsx("div", { className: "h-3 bg-gray-200 rounded w-16" }), _jsx("div", { className: "h-7 bg-gray-200 rounded w-24" })] }));
    }
    return (_jsxs("div", { className: "bg-white rounded-xl p-4 shadow-sm border border-gray-100 h-[100px] flex flex-col justify-between", children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsx("p", { className: "text-sm text-gray-500 leading-tight line-clamp-2", children: label }), isCurrency && (_jsx("span", { className: "text-[11px] font-medium text-blue-600 shrink-0", children: "AED" }))] }), _jsx("p", { className: "text-xl font-bold text-gray-900", children: value })] }));
}
