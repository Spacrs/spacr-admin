import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { format } from "date-fns";
import MetricCard from "./MetricCard";
import { useDashboardMetrics } from "../hooks/useDashboardMetrics";
import DateRangePicker from "./DateRangePicker";
// function fmt(value: number): string {
//   if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
//   if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
//   return `$${value.toFixed(0)}`;
// }
function fmt(value) {
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
export default function TopMetrics() {
    // const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 30));
    // const [endDate, setEndDate] = useState<Date>(new Date());
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - 6);
    const [startDate, setStartDate] = useState(from);
    const [endDate, setEndDate] = useState(to);
    const { data, loading, error } = useDashboardMetrics(startDate ? format(startDate, "yyyy-MM-dd") : "", endDate ? format(endDate, "yyyy-MM-dd") : "");
    const [date, setDate] = useState({
        from: new Date(2026, 3, 14),
        to: new Date(2026, 3, 20),
    });
    const metrics = [
        { label: "GMV", value: data ? fmt(data.GMV) : "—" },
        { label: "Revenue", value: data ? fmt(data.revenue) : "—" },
        { label: "Net Profit", value: data ? fmt(data.netProfit) : "—" },
        {
            label: "Active Orders",
            value: data ? data.totalActiveOrders.toLocaleString() : "—",
        },
        {
            label: "Completed Orders",
            value: data ? data.totalCompletedOrders.toLocaleString() : "—",
        },
        {
            label: "Active Users",
            value: data ? data.totalActiveUsers.toLocaleString() : "—",
        },
        { label: "Take Rate", value: `${data?.takeRate ?? "—"}%` },
        {
            label: "Match Rate",
            value: data ? `${data.matchRate.toFixed(1)}%` : "—",
            positive: data ? data.matchRate > 50 : true,
        },
        {
            label: "Order Success Rate",
            value: data ? `${data.orderSuccessRate.toFixed(1)}%` : "—",
            positive: data ? data.orderSuccessRate > 50 : true,
        },
    ];
    return (_jsxs("div", { className: "bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [_jsx("h2", { className: "text-base font-semibold text-gray-800", children: "Top Metrics" }), _jsx(DateRangePicker, { onChange: (range) => {
                            console.log('range', range.from, range.to);
                            if (range.from && range.to) {
                                setStartDate(range.from);
                                setEndDate(range.to);
                            }
                        } })] }), error && (_jsxs("div", { className: "bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3", children: ["Failed to load metrics: ", error] })), _jsx("div", { className: "grid grid-cols-3 md:grid-cols-5 xl:grid-cols-9 gap-3", children: metrics.map((m) => (_jsx(MetricCard, { label: m.label, value: m.value, positive: m.positive, loading: loading }, m.label))) })] }));
}
