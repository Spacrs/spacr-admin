import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { format, subDays } from 'date-fns';
import MetricCard from '../../components/MetricCard';
import DateFilter from '../../components/DateFilter';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';
import { useGrowthTrends } from '../../hooks/useGrowthTrends';
import { Bar, Line, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer, ComposedChart } from 'recharts';
function fmt(value) {
    if (value >= 1_000_000)
        return `$${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000)
        return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value.toFixed(0)}`;
}
// Format month label: "2025-07" → "Jul 25"
function formatMonth(dateStr) {
    const [year, month] = dateStr.split('-');
    const d = new Date(Number(year), Number(month) - 1, 1);
    return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
}
function fmtMoney(value) {
    if (value >= 1_000_000)
        return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000)
        return `$${(value / 1_000).toFixed(0)}K`;
    return `$${value}`;
}
export default function Overview() {
    const [startDate, setStartDate] = useState(subDays(new Date(), 30));
    const [endDate, setEndDate] = useState(new Date());
    const fromDate = format(startDate, 'yyyy-MM-dd');
    const toDate = format(endDate, 'yyyy-MM-dd');
    const { data, loading, error } = useDashboardMetrics(fromDate, toDate);
    const { data: trends, loading: trendsLoading } = useGrowthTrends(fromDate, toDate);
    console.log('trends', trends);
    // Prepare data with formatted month label
    const chartData = trends.map(d => ({
        ...d,
        month: formatMonth(d.date),
    }));
    const metrics = [
        { label: 'GMV', value: data ? fmt(data.GMV) : '—' },
        { label: 'Revenue', value: data ? fmt(data.revenue) : '—' },
        { label: 'Net Profit', value: data ? fmt(data.netProfit) : '—' },
        { label: 'Active Orders', value: data ? data.totalActiveOrders.toLocaleString() : '—' },
        { label: 'Completed Orders', value: data ? data.totalCompletedOrders.toLocaleString() : '—' },
        { label: 'Active Users', value: data ? data.totalActiveUsers.toLocaleString() : '—' },
        { label: 'Take Rate', value: `${data?.takeRate ?? '—'}%` },
        { label: 'Match Rate', value: data ? `${data.matchRate.toFixed(1)}%` : '—', positive: data ? data.matchRate > 50 : true },
        { label: 'Order Success Rate', value: data ? `${data.orderSuccessRate.toFixed(1)}%` : '—', positive: data ? data.orderSuccessRate > 50 : true },
    ];
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [_jsx("h1", { className: "text-xl font-semibold text-gray-900", children: "Top Metrics" }), _jsx(DateFilter, { startDate: startDate, endDate: endDate, onRangeChange: (start, end) => { setStartDate(start); setEndDate(end); } })] }), error && (_jsxs("div", { className: "bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3", children: ["Failed to load metrics: ", error] })), _jsx("div", { className: "grid grid-cols-3 md:grid-cols-5 xl:grid-cols-9 gap-3", children: metrics.map((m) => (_jsx(MetricCard, { label: m.label, value: m.value, positive: m.positive, loading: loading }, m.label))) }), _jsx("h2", { className: "text-base font-semibold text-gray-800 mb-4", children: "Growth Trends" }), _jsxs(ResponsiveContainer, { width: "50%", aspect: 2, children: [_jsx(YAxis, { yAxisId: "gmv", orientation: "left", tickFormatter: fmtMoney, tick: { fontSize: 11, fill: '#9ca3af' }, axisLine: false, tickLine: false, width: 60 }), _jsx(YAxis, { yAxisId: "small", orientation: "right", tick: { fontSize: 11, fill: '#9ca3af' }, axisLine: false, tickLine: false, width: 40 }), _jsx(Tooltip, { formatter: (value, name) => {
                            const num = Number(value);
                            if (name === 'GMV')
                                return [fmtMoney(num), 'GMV'];
                            if (name === 'revenue')
                                return [fmtMoney(num), 'Revenue'];
                            return [num, String(name)];
                        } }), _jsx(Legend, { wrapperStyle: { fontSize: '12px', paddingTop: '12px' } }), _jsx(Bar, { yAxisId: "gmv", dataKey: "GMV", name: "GMV", fill: "#8884d8", radius: [6, 6, 0, 0], barSize: 32, activeBar: { fill: '#6366f1', stroke: '#4f46e5' } }), _jsx(Line, { yAxisId: "small", type: "monotone", dataKey: "revenue", name: "Revenue", stroke: "#82ca9d", strokeWidth: 2.5, dot: { r: 4, fill: '#82ca9d', strokeWidth: 0 }, activeDot: { r: 6 } }), _jsx(Line, { yAxisId: "small", type: "monotone", dataKey: "activeUsers", name: "Active Users", stroke: "#f59e0b", strokeWidth: 2.5, dot: { r: 4, fill: '#f59e0b', strokeWidth: 0 }, activeDot: { r: 6 } }), _jsxs(ComposedChart, { data: chartData, margin: { top: 5, right: 50, left: 10, bottom: 5 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#f0f0f0" }), _jsx(XAxis, { dataKey: "month", tick: { fontSize: 12, fill: '#9ca3af' }, axisLine: false, tickLine: false }), _jsx(YAxis, { yAxisId: "left", orientation: "left", tickFormatter: fmtMoney, tick: { fontSize: 11, fill: '#9ca3af' }, axisLine: false, tickLine: false, width: 55 }), _jsx(YAxis, { yAxisId: "right", orientation: "right", tick: { fontSize: 11, fill: '#9ca3af' }, axisLine: false, tickLine: false, width: 40 }), _jsx(Tooltip, { formatter: (value, name) => {
                                    const num = Number(value);
                                    if (name === 'GMV' || name === 'Revenue')
                                        return [fmtMoney(num), name];
                                    return [num, name];
                                } }), _jsx(Legend, { wrapperStyle: { fontSize: '12px', paddingTop: '12px' } }), _jsx(Bar, { yAxisId: "left", dataKey: "GMV", name: "GMV", stackId: "a", fill: "#3b82f6", barSize: 28 }), _jsx(Bar, { yAxisId: "left", dataKey: "revenue", name: "Revenue", stackId: "a", fill: "#f59e0b", radius: [4, 4, 0, 0], barSize: 28 }), _jsx(Line, { yAxisId: "left", type: "monotone", dataKey: "GMV", name: "GMV line", stroke: "#2563eb", strokeWidth: 2.5, dot: { r: 4, fill: '#2563eb', strokeWidth: 0 }, activeDot: { r: 6 } }), _jsx(Line, { yAxisId: "left", type: "monotone", dataKey: "revenue", name: "Revenue line", stroke: "#16a34a", strokeWidth: 2.5, dot: { r: 4, fill: '#16a34a', strokeWidth: 0 }, activeDot: { r: 6 } }), _jsx(Line, { yAxisId: "right", type: "monotone", dataKey: "activeUsers", name: "Active Users", stroke: "#93c5fd", strokeWidth: 2.5, strokeDasharray: "5 5", dot: { r: 4, fill: '#93c5fd', strokeWidth: 0 }, activeDot: { r: 6 } })] })] })] }));
}
