import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function KpiCard({ icon, label, value, loading = false, }) {
    if (loading) {
        return (_jsxs("div", { className: "flex-1 min-w-[140px] animate-pulse", children: [_jsx("div", { className: "h-3 bg-gray-200 rounded w-24 mb-3" }), _jsx("div", { className: "h-8 bg-gray-200 rounded w-20" })] }));
    }
    return (_jsxs("div", { className: "flex-shrink-0 min-w-[160px]", children: [_jsxs("div", { className: "flex items-center gap-2 text-gray-500 text-sm mb-1 whitespace-nowrap", children: [_jsx("span", { style: { fontSize: 16 }, children: icon }), _jsx("span", { children: label })] }), _jsx("p", { className: "text-xl font-bold text-gray-900 whitespace-nowrap", children: value })] }));
}
