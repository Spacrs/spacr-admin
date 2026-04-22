import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { format, subDays } from 'date-fns';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
import { useGrowthTrends } from '../../hooks/useGrowthTrends';
import DateRangePicker from "../DateRangePicker";
function fmtMoney(value) {
    if (value >= 1_000_000)
        return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000)
        return `$${(value / 1_000).toFixed(0)}K`;
    return `$${value}`;
}
export default function GrowthTrendChart() {
    const [startDate, setStartDate] = useState(subDays(new Date(), 6));
    const [endDate, setEndDate] = useState(new Date());
    const { data, loading } = useGrowthTrends(startDate ? format(startDate, 'yyyy-MM-dd') : '', endDate ? format(endDate, 'yyyy-MM-dd') : '');
    const trends = data?.growthTrends || [];
    const grouping = data?.grouping;
    return (
    // w-full md:w-1/2
    _jsxs("div", { className: "bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-base font-semibold text-gray-800", children: "Growth Trends" }), _jsxs("p", { className: "text-xs text-gray-400 capitalize", children: [grouping, " view"] })] }), _jsx(DateRangePicker, { onChange: (range) => {
                            if (range.from && range.to) {
                                setStartDate(range.from);
                                setEndDate(range.to);
                            }
                        } })] }), loading ? (_jsx("div", { className: "h-64 bg-gray-100 rounded animate-pulse" })) : (_jsx(ResponsiveContainer, { width: "100%", aspect: 2.5, children: _jsxs(ComposedChart, { data: trends, margin: { top: 10, right: 30, left: 10, bottom: 5 }, children: [_jsx(CartesianGrid, { stroke: "#f1f5f9", vertical: false }), _jsx(XAxis, { dataKey: "label", tick: { fontSize: 12, fill: '#6b7280' }, axisLine: { stroke: "#d1d5db" }, tickLine: false, interval: grouping === "day" ? 0 : "preserveStartEnd" }), _jsx(YAxis, { yAxisId: "left", tickFormatter: fmtMoney, tick: { fontSize: 11, fill: '#6b7280' }, axisLine: { stroke: "#d1d5db" }, tickLine: false, width: 55 }), _jsx(YAxis, { yAxisId: "right", orientation: "right", tick: { fontSize: 11, fill: '#6b7280' }, axisLine: { stroke: "#d1d5db" }, tickLine: false, width: 40 }), _jsx(Tooltip, { content: ({ active, payload, label }) => {
                                if (!active || !payload?.length)
                                    return null;
                                const d = payload[0].payload;
                                return (_jsxs("div", { className: "bg-white border border-gray-200 rounded-lg shadow-md p-3 text-xs", children: [_jsxs("p", { className: "text-green-600", children: ["Users: ", d.totalUsers] }), _jsxs("p", { className: "text-blue-600", children: ["GMV: ", fmtMoney(d.GMV)] }), _jsxs("p", { className: "text-amber-600", children: ["Revenue: ", fmtMoney(d.revenue)] }), _jsxs("p", { className: "text-gray-600", children: ["Users: ", d.totalUsers] })] }));
                            } }), _jsx(Legend, { wrapperStyle: { fontSize: '12px', paddingTop: '10px' } }), _jsx(Bar, { yAxisId: "left", dataKey: "GMV", name: "GMV", fill: "#3b82f6", radius: [6, 6, 0, 0], barSize: 28 }), _jsx(Line, { yAxisId: "left", type: "monotone", dataKey: "revenue", name: "Revenue", stroke: "#f59e0b", strokeWidth: 3, dot: { r: 3 }, activeDot: { r: 6 } }), _jsx(Line, { yAxisId: "right", type: "monotone", dataKey: "totalUsers", name: "Users", stroke: "#10b981", strokeWidth: 3, dot: { r: 3 }, activeDot: { r: 6 } })] }) }))] }));
}
