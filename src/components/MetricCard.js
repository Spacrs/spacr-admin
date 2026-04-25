import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function MetricCard({ label, value, change, positive = true, loading = false, }) {
    if (loading) {
        return (_jsxs("div", { className: "bg-white rounded-xl p-4 shadow-sm border border-gray-100 h-[100px] flex flex-col justify-between animate-pulse", children: [_jsx("div", { className: "h-3 bg-gray-200 rounded w-16" }), _jsx("div", { className: "h-7 bg-gray-200 rounded w-24" })] }));
    }
    return (_jsxs("div", { className: "bg-white rounded-xl p-4 shadow-sm border border-gray-100 h-[100px] flex flex-col justify-between", children: [_jsx("p", { className: "text-sm text-gray-500 line-clamp-2 min-h-[40px]", children: label }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: value })] }));
}
