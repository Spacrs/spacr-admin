import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import KpiCard from "./KpiCard";
import { useSupplySide } from "../hooks/useSupplySide";
import DateRangePicker from "./DateRangePicker";
import { useDateContext } from "../context/DateContext";
function fmt(value) {
    if (value >= 1_000_000)
        return `AED ${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000)
        return `AED ${(value / 1_000).toFixed(1)}K`;
    return `AED ${value.toFixed(0)}`;
}
export default function SupplySide() {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - 6);
    const { globalRange } = useDateContext();
    const [localRange, setLocalRange] = useState(null);
    const [isLocal, setIsLocal] = useState(false);
    // const [startDate, setStartDate] = useState<Date | null>(from  || globalRange.from); // subDays(new Date(), 30)
    // const [endDate, setEndDate] = useState<Date | null>(to || globalRange.to);  // new Date()
    const startDate = isLocal ? localRange?.from : globalRange.from;
    const endDate = isLocal ? localRange?.to : globalRange.to;
    const { data, loading, error } = useSupplySide(startDate ? format(startDate, 'yyyy-MM-dd') : '', endDate ? format(endDate, 'yyyy-MM-dd') : '');
    const supplyGrowth = data?.charts?.supplyGrowth || [];
    const ordersTrend = data?.charts?.ordersTrend || [];
    const formatMonth = (month) => {
        const [year, m] = month.split("-");
        return `${m}/${year}`; // or make it "Jan 2026" if needed
    };
    // Whenever global range changes (e.g. from another component), reset local state
    useEffect(() => {
        setIsLocal(false);
        setLocalRange(null);
    }, [globalRange]);
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
    return (_jsxs("div", { className: "bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-5", children: [_jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-base font-semibold text-gray-800", children: "Supply Side (Travelers)" }), _jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Showcasing supply strength" })] }), _jsx(DateRangePicker
                    // value={localRange || globalRange}
                    // onChange={(range) => {
                    //   console.log('range', range.from, range.to)
                    //   if (range.from && range.to) {
                    //     // setStartDate(range.from);
                    //     // setEndDate(range.to);
                    //     setLocalRange(range);
                    //   }
                    // }} 
                    , { 
                        // value={localRange || globalRange}
                        // onChange={(range) => {
                        //   console.log('range', range.from, range.to)
                        //   if (range.from && range.to) {
                        //     // setStartDate(range.from);
                        //     // setEndDate(range.to);
                        //     setLocalRange(range);
                        //   }
                        // }} 
                        value: isLocal ? localRange : globalRange, onChange: (range) => {
                            if (range.from && range.to) {
                                setLocalRange(range);
                                setIsLocal(true);
                            }
                        } })] }), error && (_jsxs("div", { className: "bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3", children: ["Failed to load supply metrics: ", error] })), _jsxs("div", { className: "border border-gray-100 rounded-lg p-4", children: [_jsx("span", { className: "text-xs font-semibold text-white bg-blue-500 rounded px-2 py-0.5 mb-4 inline-block", children: "KPI Row" }), _jsx("div", { className: "flex flex-wrap gap-6 mt-2", children: kpis.map((k) => (_jsx(KpiCard, { icon: k.icon, label: k.label, value: k.value, loading: loading }, k.label))) })] })] }));
}
// Replace placeholder with real chart
{
    /* <div className="border border-gray-100 rounded-lg p-4">
    <h3 className="text-sm font-medium text-gray-700 mb-3">Supply Growth Over Time</h3>
    <SupplyGrowthChart data={chartData} />
  </div> */
}
