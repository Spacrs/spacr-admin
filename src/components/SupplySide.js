import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { format, subDays } from "date-fns";
import DateFilter from "./DateFilter";
import KpiCard from "./KpiCard";
import { useSupplySide } from "../hooks/useSupplySide";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";
function fmt(value) {
    if (value >= 1_000_000)
        return `$${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000)
        return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value.toFixed(0)}`;
}
export default function SupplySide() {
    const [startDate, setStartDate] = useState(subDays(new Date(), 30));
    const [endDate, setEndDate] = useState(new Date());
    const { data, loading, error } = useSupplySide(startDate ? format(startDate, 'yyyy-MM-dd') : '', endDate ? format(endDate, 'yyyy-MM-dd') : '');
    console.log("data_____", data);
    const supplyGrowth = data?.charts?.supplyGrowth || [];
    const ordersTrend = data?.charts?.ordersTrend || [];
    const formatMonth = (month) => {
        const [year, m] = month.split("-");
        return `${m}/${year}`; // or make it "Jan 2026" if needed
    };
    const kpis = [
        {
            icon: "👥",
            label: "Active Travelers",
            value: data ? data.kpis.activeTravellers.toLocaleString() : "—",
        },
        {
            icon: "🧑",
            label: "New Travelers / Month",
            value: data ? data.kpis.newTravellers.toLocaleString() : "—",
        },
        {
            icon: "🛍️",
            label: "Orders Per Traveler",
            value: data ? data.kpis.ordersPerTraveller.toFixed(2) : "—",
        },
        {
            icon: "💰",
            label: "Avg Earnings / Traveler",
            value: data ? fmt(data.kpis.avgEarningsPerTraveller) : "—",
        },
        {
            icon: "💵",
            label: "Total Earnings",
            value: data ? fmt(data.kpis.totalEarningsByTravellers) : "—",
        },
        {
            icon: "🌍",
            label: "Total Travelers",
            value: data ? data.kpis.totalTravelers.toLocaleString() : "—",
        },
    ];
    return (_jsxs("div", { className: "bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-5", children: [_jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-base font-semibold text-gray-800", children: "Supply Side (Travelers)" }), _jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Showcasing supply strength" })] }), _jsx(DateFilter, { startDate: startDate, endDate: endDate, onRangeChange: (s, e) => {
                            setStartDate(s);
                            setEndDate(e);
                        } })] }), error && (_jsxs("div", { className: "bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3", children: ["Failed to load supply metrics: ", error] })), _jsxs("div", { className: "border border-gray-100 rounded-lg p-4", children: [_jsx("span", { className: "text-xs font-semibold text-white bg-blue-500 rounded px-2 py-0.5 mb-4 inline-block", children: "KPI Row" }), _jsx("div", { className: "flex flex-wrap gap-6 mt-2", children: kpis.map((k) => (_jsx(KpiCard, { icon: k.icon, label: k.label, value: k.value, loading: loading }, k.label))) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-white border border-gray-100 rounded-lg p-4", children: [_jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Supply Growth Over Time" }), _jsx(ResponsiveContainer, { width: "100%", height: 250, children: _jsxs(AreaChart, { data: supplyGrowth, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "month", tickFormatter: formatMonth }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Area, { type: "monotone", dataKey: "travelers", stroke: "#3b82f6", fill: "#93c5fd" })] }) })] }), _jsxs("div", { className: "bg-white border border-gray-100 rounded-lg p-4", children: [_jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Orders Per Traveler Trend" }), _jsx(ResponsiveContainer, { width: "100%", height: 250, children: _jsxs(LineChart, { data: ordersTrend, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "month", tickFormatter: formatMonth }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "ordersPerTraveler", stroke: "#2563eb", strokeWidth: 2, dot: { r: 3 } })] }) })] })] })] }));
}
// Replace placeholder with real chart
{
    /* <div className="border border-gray-100 rounded-lg p-4">
    <h3 className="text-sm font-medium text-gray-700 mb-3">Supply Growth Over Time</h3>
    <SupplyGrowthChart data={chartData} />
  </div> */
}
