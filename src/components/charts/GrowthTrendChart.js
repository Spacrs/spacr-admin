import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { format, subDays } from 'date-fns';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
import { useGrowthTrends } from '../../hooks/useGrowthTrends';
import DateRangePicker from "../DateRangePicker";
// function fmtCurrency(value: number): string {
//   if (value >= 1_00_00_000) return `₹ ${(value / 1_00_00_000).toFixed(2)} Cr`;
//   if (value >= 1_00_000) return `₹ ${(value / 1_00_000).toFixed(1)} L`;
//   return `₹ ${value}`;
// }
// function fmtCurrency(value: number): string {
//   if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
//   if (value >= 1_000)     return `$${(value / 1_000).toFixed(1)}K`;
//   return `$${value}`;
// }
function fmtCurrency(value) {
    if (value >= 1_000_000) {
        const v = Math.floor((value / 1_000_000) * 100) / 100;
        return `$${v}M`;
    }
    if (value >= 1_000) {
        const v = Math.floor((value / 1_000) * 10) / 10;
        return `$${v}K`;
    }
    return `$${value}`;
}
function fmtUsers(value) {
    if (value >= 1000)
        return `${Math.round(value / 1000)}K`;
    return `${value}`;
}
export default function GrowthTrendChart() {
    const [startDate, setStartDate] = useState(subDays(new Date(), 6));
    const [endDate, setEndDate] = useState(new Date());
    const { data, loading } = useGrowthTrends(startDate ? format(startDate, 'yyyy-MM-dd') : '', endDate ? format(endDate, 'yyyy-MM-dd') : '');
    const trends = data?.growthTrends || [];
    return (_jsxs("div", { className: "bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-base font-semibold", children: "Growth Trends" }), _jsx(DateRangePicker, { onChange: (range) => {
                            if (range.from && range.to) {
                                setStartDate(range.from);
                                setEndDate(range.to);
                            }
                        } })] }), _jsxs("div", { className: "flex justify-between text-xs font-semibold px-2", children: [_jsx("span", { className: "text-blue-600", children: "Currency (GMV & Revenue)" }), _jsx("span", { className: "text-green-600", children: "Total Users (Count)" })] }), loading ? (_jsx("div", { className: "h-64 bg-gray-100 rounded animate-pulse" })) : (_jsx(ResponsiveContainer, { width: "100%", aspect: 2.2, children: _jsxs(ComposedChart, { data: trends, margin: { top: 20, right: 30, left: 10, bottom: 5 }, children: [_jsx(CartesianGrid, { stroke: "#e5e7eb", vertical: false }), _jsx(XAxis, { dataKey: "label", tick: { fontSize: 12 }, axisLine: { stroke: "#94a3b8" }, tickLine: false }), _jsx(YAxis, { yAxisId: "left", tickFormatter: fmtCurrency, axisLine: { stroke: "#94a3b8" }, tickLine: false }), _jsx(YAxis, { yAxisId: "right", orientation: "right", tickFormatter: fmtUsers, axisLine: { stroke: "#22c55e" }, tickLine: false }), _jsx(Tooltip, { content: ({ active, payload }) => {
                                if (!active || !payload?.length)
                                    return null;
                                const d = payload[0].payload;
                                return (_jsxs("div", { className: "bg-white border border-gray-200 rounded-lg shadow-md p-3 text-xs", children: [_jsxs("p", { className: "text-blue-600", children: ["GMV: ", fmtCurrency(d.GMV)] }), _jsxs("p", { className: "text-orange-500", children: ["Revenue: ", fmtCurrency(d.revenue)] }), _jsxs("p", { className: "text-green-600", children: ["Users: ", d.totalUsers] })] }));
                            } }), _jsx(Legend, { verticalAlign: "bottom", height: 36, wrapperStyle: { fontSize: 12 }, formatter: (value) => _jsx("span", { className: "text-gray-700", children: value }) }), _jsx(Bar, { yAxisId: "left", dataKey: "GMV", name: "GMV", fill: "#3b82f6", barSize: 40, radius: [6, 6, 0, 0] }), _jsx(Line, { yAxisId: "left", type: "linear" // monotone
                            , dataKey: "revenue", name: "Revenue", stroke: "#f97316", strokeWidth: 2, dot: { r: 4 } }), _jsx(Line, { yAxisId: "right", type: "linear" // monotone
                            , dataKey: "totalUsers", name: "Total Users", stroke: "#16a34a", strokeWidth: 3 })] }) }))] }));
}
