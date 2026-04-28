import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, } from 'recharts';
import { useTopCorridors } from '../hooks/useTopCorridors';
function fmt(value) {
    if (value >= 1_000_000)
        return `${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000)
        return `${(value / 1_000).toFixed(1)}K`;
    return `${value.toFixed(0)}`;
}
function fmtWithCurrency(value) {
    if (value >= 1_000_000)
        return `AED ${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000)
        return `AED ${(value / 1_000).toFixed(1)}K`;
    return `AED ${value.toFixed(0)}`;
}
// Shorten long corridor names for chart label
function shortLabel(corridor) {
    return corridor.length > 22 ? corridor.slice(0, 20) + '…' : corridor;
}
const BAR_COLORS = [
    '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a',
];
export default function TopCorridors() {
    //   const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 30));
    //   const [endDate, setEndDate]     = useState<Date>(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const fromDate = startDate ? format(startDate, 'yyyy-MM-dd') : '';
    const toDate = endDate ? format(endDate, 'yyyy-MM-dd') : '';
    //   const { data, loading, error } = useTopCorridors(
    //     format(startDate, 'yyyy-MM-dd'),
    //     format(endDate,   'yyyy-MM-dd')
    //   );
    const { data, loading, error } = useTopCorridors(fromDate, toDate);
    // Top 10 by GMV for chart, top 10 for table
    const top10 = data.slice(0, 10);
    const chartData = top10.map(c => ({
        name: shortLabel(c.corridor),
        fullName: c.corridor,
        GMV: c.totalGMV,
        Revenue: c.totalRevenue,
    }));
    return (_jsxs("div", { className: "bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-5", children: [_jsx("div", { className: "flex items-center justify-between flex-wrap gap-3", children: _jsx("h2", { className: "text-base font-semibold text-gray-800", children: "Top Corridors" }) }), error && (_jsxs("div", { className: "bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3", children: ["Failed to load corridors: ", error] })), loading ? (_jsx("div", { className: "h-64 bg-gray-100 rounded animate-pulse" })) : (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-3", children: "GMV by Corridor" }), _jsx(ResponsiveContainer, { width: "100%", height: 320, children: _jsxs(BarChart, { data: chartData, layout: "vertical", margin: { top: 5, right: 20, left: 0, bottom: 5 }, barCategoryGap: 12, children: [_jsx(XAxis, { type: "number", tickFormatter: fmtWithCurrency, tick: { fontSize: 11, fill: '#9ca3af' }, axisLine: false, tickLine: false }), _jsx(YAxis, { type: "category", dataKey: "fullName", tick: { fontSize: 12, fill: '#374151' }, axisLine: false, tickLine: false, width: 160 }), _jsx(Tooltip, { formatter: (value, name) => [fmtWithCurrency(Number(value)), name], labelFormatter: (label, payload) => payload?.[0]?.payload?.fullName ?? label }), _jsx(Bar, { dataKey: "GMV", barSize: 20, radius: [0, 0, 0, 0], children: chartData.map((_, i) => (_jsx(Cell, { fill: BAR_COLORS[i % BAR_COLORS.length] }, i))) })] }) })] }), _jsxs("div", { className: "overflow-auto", children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-3", children: "Detailed breakdown" }), _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-left text-xs text-gray-400 border-b border-gray-100", children: [_jsx("th", { className: "pb-2 font-medium", children: "Corridor" }), _jsx("th", { className: "pb-2 font-medium text-right", children: "Orders" }), _jsx("th", { className: "pb-2 font-medium text-right", children: "GMV (AED)" }), _jsx("th", { className: "pb-2 font-medium text-right", children: "Revenue (AED)" }), _jsx("th", { className: "pb-2 font-medium text-right", children: "AOV (AED)" }), _jsx("th", { className: "pb-2 font-medium text-right", children: "Avg Earnings (AED)" })] }) }), _jsx("tbody", { children: top10.map((c, i) => (_jsxs("tr", { className: "border-b border-gray-50 hover:bg-gray-50 transition-colors", children: [_jsxs("td", { className: "py-2.5 pr-3 text-gray-700 max-w-[160px] truncate", children: [_jsx("span", { className: "inline-block w-2 h-2 rounded-full mr-2", style: { background: BAR_COLORS[i % BAR_COLORS.length] } }), c.corridor] }), _jsx("td", { className: "py-2.5 text-right text-gray-600", children: c.totalOrders }), _jsx("td", { className: "py-2.5 text-right text-gray-600", children: fmt(c.totalGMV) }), _jsx("td", { className: "py-2.5 text-right text-gray-600", children: fmt(c.totalRevenue) }), _jsx("td", { className: "py-2.5 text-right text-gray-600", children: fmt(c.AOV) }), _jsx("td", { className: "py-2.5 text-right text-gray-600", children: fmt(c.avgEarningsPerTraveller) })] }, c.corridor))) })] })] })] }))] }));
}
