import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function MetricCard({ label, value, change, positive = true, loading = false, }) {
    if (loading) {
        return (_jsxs("div", { className: "bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse", children: [_jsx("div", { className: "h-3 bg-gray-200 rounded w-16 mb-3" }), _jsx("div", { className: "h-7 bg-gray-200 rounded w-24 mb-2" }), _jsx("div", { className: "h-3 bg-gray-200 rounded w-12" })] }));
    }
    return (_jsxs("div", { className: "bg-white rounded-xl p-4 shadow-sm border border-gray-100", children: [_jsx("p", { className: "text-sm text-gray-500", children: label }), _jsx("p", { className: "text-2xl font-bold text-gray-900 mt-1", children: value })] }));
}
