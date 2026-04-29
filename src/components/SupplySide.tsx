import { useEffect, useState } from "react";
import { format, subDays } from "date-fns";
import DateFilter from "./DateFilter";
import KpiCard from "./KpiCard";
import { useSupplySide } from "../hooks/useSupplySide";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DateRangePicker from "./DateRangePicker";
import { useDateContext } from "../context/DateContext";
import type { DateRange } from "react-day-picker";

function fmt(value: number): string {
  if (value >= 1_000_000) return `AED ${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `AED ${(value / 1_000).toFixed(1)}K`;
  return `AED ${value.toFixed(0)}`;
}

export default function SupplySide() {
  const to = new Date();
  const from = new Date(); 
  from.setDate(to.getDate() - 6);

  const { globalRange } = useDateContext();

  const [localRange, setLocalRange] = useState<DateRange | null>(null);
  const [isLocal, setIsLocal] = useState(false);
  
  // const [startDate, setStartDate] = useState<Date | null>(from  || globalRange.from); // subDays(new Date(), 30)
  // const [endDate, setEndDate] = useState<Date | null>(to || globalRange.to);  // new Date()

  const startDate = isLocal ? localRange?.from : globalRange.from;
  const endDate = isLocal ? localRange?.to : globalRange.to;

  const { data, loading, error } = useSupplySide(
    startDate ? format(startDate, 'yyyy-MM-dd') : '',
    endDate ? format(endDate, 'yyyy-MM-dd') : ''
  );

  const supplyGrowth = data?.charts?.supplyGrowth || [];
  const ordersTrend = data?.charts?.ordersTrend || [];

  const formatMonth = (month: string) => {
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

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-base font-semibold text-gray-800">
            Supply Side (Travelers)
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Showcasing supply strength
          </p>
        </div>
        {/* <DateFilter
          startDate={startDate}
          endDate={endDate}
          onRangeChange={(s, e) => {
            setStartDate(s);
            setEndDate(e);
          }}
        /> */}

        <DateRangePicker
          // value={localRange || globalRange}
          // onChange={(range) => {
          //   console.log('range', range.from, range.to)
          //   if (range.from && range.to) {
          //     // setStartDate(range.from);
          //     // setEndDate(range.to);
          //     setLocalRange(range);
          //   }
          // }} 

          value={isLocal ? localRange : globalRange}
          onChange={(range) => {
            if (range.from && range.to) {
              setLocalRange(range);
              setIsLocal(true);
            }
          }}
        /> 
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          Failed to load supply metrics: {error}
        </div>
      )}

      {/* KPI Row */}
      <div className="border border-gray-100 rounded-lg p-4">
        <span className="text-xs font-semibold text-white bg-blue-500 rounded px-2 py-0.5 mb-4 inline-block">
          KPI Row
        </span>
        <div className="flex flex-wrap gap-6 mt-2">
          {kpis.map((k) => (
            <KpiCard
              key={k.label}
              icon={k.icon}
              label={k.label}
              value={k.value}
              loading={loading}
            />
          ))}
        </div>
      </div>

      {/* Charts placeholder — ready for when API adds chart data */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
        {/* <div className="border border-dashed border-gray-200 rounded-lg p-4 flex items-center justify-center h-48 text-gray-400 text-sm"> */}
        {/* <div className="bg-white border border-gray-100 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Supply Growth Over Time
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={supplyGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickFormatter={formatMonth} />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="travelers"
                stroke="#3b82f6"
                fill="#93c5fd"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div> */}
        {/* </div> */}
        {/* <div className="border border-dashed border-gray-200 rounded-lg p-4 flex items-center justify-center h-48 text-gray-400 text-sm"> */}
        {/* <div className="bg-white border border-gray-100 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Orders Per Traveler Trend
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ordersTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickFormatter={formatMonth} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="ordersPerTraveler"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div> */}
        {/* </div> */}
      {/* </div> */}
    </div>
  );
}

// Replace placeholder with real chart
{
  /* <div className="border border-gray-100 rounded-lg p-4">
  <h3 className="text-sm font-medium text-gray-700 mb-3">Supply Growth Over Time</h3>
  <SupplyGrowthChart data={chartData} />
</div> */
}
