import { useState } from "react";
import { format, subDays } from "date-fns";
import MetricCard from "./MetricCard";
import DateFilter from "./DateFilter";
import { useDashboardMetrics } from "../hooks/useDashboardMetrics";

function fmt(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

export default function TopMetrics() {
  // const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 30));
  // const [endDate, setEndDate] = useState<Date>(new Date());

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // const { data, loading, error } = useDashboardMetrics(
  //   format(startDate, "yyyy-MM-dd"),
  //   format(endDate, "yyyy-MM-dd"),
  // );

  const { data, loading, error } = useDashboardMetrics(
    startDate ? format(startDate, "yyyy-MM-dd") : "",
    endDate ? format(endDate, "yyyy-MM-dd") : ""
  );

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

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
      {/* Header + Date Filter */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-base font-semibold text-gray-800">Top Metrics</h2>
        <DateFilter
          startDate={startDate}
          endDate={endDate}
          onRangeChange={(s, e) => {
            setStartDate(s);
            setEndDate(e);
          }}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          Failed to load metrics: {error}
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-9 gap-3">
        {metrics.map((m) => (
          <MetricCard
            key={m.label}
            label={m.label}
            value={m.value}
            positive={m.positive}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
}
