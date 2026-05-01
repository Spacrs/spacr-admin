import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function KpiCard({ icon, label, value, loading = false, }) {
    if (loading) {
        return (_jsxs("div", { className: "flex-1 min-w-[140px] animate-pulse", children: [_jsx("div", { className: "h-3 bg-gray-200 rounded w-24 mb-3" }), _jsx("div", { className: "h-8 bg-gray-200 rounded w-20" })] }));
    }
    return (_jsxs("div", { className: "flex-1 min-w-[140px] flex flex-col", style: { minHeight: 64 }, children: [_jsxs("div", { className: "flex items-start gap-2 text-gray-500 text-sm flex-1", children: [_jsx("span", { style: { fontSize: 16, lineHeight: '20px', flexShrink: 0 }, children: icon }), _jsx("span", { className: "leading-tight", children: label })] }), _jsx("p", { className: "text-xl font-bold text-gray-900 mt-1 break-words", children: value })] }));
}
