import { useState } from 'react';
import { format, subDays } from 'date-fns';
import MetricCard from '../../components/MetricCard';
import DateFilter from '../../components/DateFilter';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';
import { useGrowthTrends } from '../../hooks/useGrowthTrends';
import GrowthTrendChart from '../../components/charts/GrowthTrendChart';
import { Bar, Line, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer, ComposedChart } from 'recharts';


function fmt(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

// Format month label: "2025-07" → "Jul 25"
function formatMonth(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
}

function fmtMoney(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000)     return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}


export default function Overview() {
  const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 30));
  const [endDate, setEndDate] = useState<Date>(new Date());

  const fromDate = format(startDate, 'yyyy-MM-dd');
  const toDate = format(endDate, 'yyyy-MM-dd');

  const { data, loading, error } = useDashboardMetrics(fromDate, toDate);
  const { data: trends, loading: trendsLoading } = useGrowthTrends(fromDate, toDate);
  console.log('trends', trends)

  // Prepare data with formatted month label
  const chartData = trends.map(d => ({
    ...d,
    month: formatMonth(d.date),
  }));


  const metrics = [
    { label: 'GMV',                value: data ? fmt(data.GMV) : '—' },
    { label: 'Revenue',            value: data ? fmt(data.revenue) : '—' },
    { label: 'Net Profit',         value: data ? fmt(data.netProfit) : '—' },
    { label: 'Active Orders',      value: data ? data.totalActiveOrders.toLocaleString() : '—' },
    { label: 'Completed Orders',   value: data ? data.totalCompletedOrders.toLocaleString() : '—' },
    { label: 'Active Users',       value: data ? data.totalActiveUsers.toLocaleString() : '—' },
    { label: 'Take Rate',          value: `${data?.takeRate ?? '—'}%` },
    { label: 'Match Rate',         value: data ? `${data.matchRate.toFixed(1)}%` : '—', positive: data ? data.matchRate > 50 : true },
    { label: 'Order Success Rate', value: data ? `${data.orderSuccessRate.toFixed(1)}%` : '—', positive: data ? data.orderSuccessRate > 50 : true },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* Header + Date Filter */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl font-semibold text-gray-900">Top Metrics</h1>
        <DateFilter
          startDate={startDate}
          endDate={endDate}
          onRangeChange={(start, end) => { setStartDate(start); setEndDate(end); }}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          Failed to load metrics: {error}
        </div>
      )}

      {/* Metric Cards — single row on large screens, wraps on smaller */}
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

      {/* Growth Trends Chart — same date filter, auto refetches */}
      {/* <GrowthTrendChart data={trends} loading={trendsLoading} /> */}


     {/* Inside your return JSX — replace the BarChart block: */}
    {/* <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"> */}
    <h2 className="text-base font-semibold text-gray-800 mb-4">Growth Trends</h2>

    <ResponsiveContainer width="50%" aspect={2}>
        {/* <ComposedChart data={chartData} margin={{ top: 5, right: 50, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

        <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
        />

        {/* Left axis — GMV (large values) */}
        <YAxis
            yAxisId="gmv"
            orientation="left"
            tickFormatter={fmtMoney}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            width={60}
        />

        {/* Right axis — activeUsers + revenue (small values) */}
        <YAxis
            yAxisId="small"
            orientation="right"
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            width={40}
        />

        <Tooltip
            formatter={(value, name) => {
                const num = Number(value);
                if (name === 'GMV')     return [fmtMoney(num), 'GMV'];
                if (name === 'revenue') return [fmtMoney(num), 'Revenue'];
                return [num, String(name)];
            }}
        />
        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />

        {/* GMV — Bar on left axis */}
        <Bar
            yAxisId="gmv"
            dataKey="GMV"
            name="GMV"
            fill="#8884d8"
            radius={[6, 6, 0, 0]}
            barSize={32}
            activeBar={{ fill: '#6366f1', stroke: '#4f46e5' }}
        />

        {/* Revenue — Line on right axis */}
        <Line
            yAxisId="small"
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke="#82ca9d"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#82ca9d', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
        />

        {/* Active Users — Line on right axis */}
        <Line
            yAxisId="small"
            type="monotone"
            dataKey="activeUsers"
            name="Active Users"
            stroke="#f59e0b"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#f59e0b', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
        />

        {/* </ComposedChart> */} 

<ComposedChart data={chartData} margin={{ top: 5, right: 50, left: 10, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

  <XAxis
    dataKey="month"
    tick={{ fontSize: 12, fill: '#9ca3af' }}
    axisLine={false}
    tickLine={false}
  />

  {/* Left axis — GMV + Revenue (large values) */}
  <YAxis
    yAxisId="left"
    orientation="left"
    tickFormatter={fmtMoney}
    tick={{ fontSize: 11, fill: '#9ca3af' }}
    axisLine={false}
    tickLine={false}
    width={55}
  />

  {/* Right axis — Active Users (small count values) */}
  <YAxis
    yAxisId="right"
    orientation="right"
    tick={{ fontSize: 11, fill: '#9ca3af' }}
    axisLine={false}
    tickLine={false}
    width={40}
  />

  <Tooltip formatter={(value, name) => {
    const num = Number(value);
    if (name === 'GMV' || name === 'Revenue') return [fmtMoney(num), name];
    return [num, name];
  }} />
  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />

  {/* Stacked Bars */}
  <Bar yAxisId="left" dataKey="GMV"     name="GMV"     stackId="a" fill="#3b82f6" barSize={28} />
  <Bar yAxisId="left" dataKey="revenue" name="Revenue" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={28} />

  {/* GMV Line — dark blue */}
  <Line
    yAxisId="left"
    type="monotone"
    dataKey="GMV"
    name="GMV line"
    stroke="#2563eb"
    strokeWidth={2.5}
    dot={{ r: 4, fill: '#2563eb', strokeWidth: 0 }}
    activeDot={{ r: 6 }}
  />

  {/* Revenue Line — green */}
  <Line
    yAxisId="left"
    type="monotone"
    dataKey="revenue"
    name="Revenue line"
    stroke="#16a34a"
    strokeWidth={2.5}
    dot={{ r: 4, fill: '#16a34a', strokeWidth: 0 }}
    activeDot={{ r: 6 }}
  />

  {/* Active Users Line — light blue, right axis */}
  <Line
    yAxisId="right"
    type="monotone"
    dataKey="activeUsers"
    name="Active Users"
    stroke="#93c5fd"
    strokeWidth={2.5}
    strokeDasharray="5 5"
    dot={{ r: 4, fill: '#93c5fd', strokeWidth: 0 }}
    activeDot={{ r: 6 }}
  />

    </ComposedChart>
    </ResponsiveContainer>
    {/* </div> */}



    </div>
  );
}