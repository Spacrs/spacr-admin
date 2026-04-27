import { useState } from 'react';
import { format, subDays } from 'date-fns';
import {
  BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import DateFilter from './DateFilter';
import { useTopCorridors } from '../hooks/useTopCorridors';

function fmt(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000)     return `${(value / 1_000).toFixed(1)}K`;
  return `${value.toFixed(0)}`;
}

function fmtWithCurrency(value: number): string {
  if (value >= 1_000_000) return `AED ${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000)     return `AED ${(value / 1_000).toFixed(1)}K`;
  return `AED ${value.toFixed(0)}`;
}

// Shorten long corridor names for chart label
function shortLabel(corridor: string): string {
  return corridor.length > 22 ? corridor.slice(0, 20) + '…' : corridor;
}

const BAR_COLORS = [
  '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a',
];

export default function TopCorridors() {
//   const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 30));
//   const [endDate, setEndDate]     = useState<Date>(new Date());

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate]     = useState<Date | null>(null);

  const fromDate = startDate ? format(startDate, 'yyyy-MM-dd') : '';
  const toDate   = endDate   ? format(endDate,   'yyyy-MM-dd') : '';

//   const { data, loading, error } = useTopCorridors(
//     format(startDate, 'yyyy-MM-dd'),
//     format(endDate,   'yyyy-MM-dd')
//   );
  const { data, loading, error } = useTopCorridors(fromDate, toDate);


  // Top 10 by GMV for chart, top 10 for table
  const top10 = data.slice(0, 10);

  const chartData = top10.map(c => ({
    name:    shortLabel(c.corridor),
    fullName: c.corridor,
    GMV:     c.totalGMV,
    Revenue: c.totalRevenue,
  }));

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-base font-semibold text-gray-800">Top Corridors</h2>
        {/* <DateFilter
          startDate={startDate}
          endDate={endDate}
          onRangeChange={(s, e) => { setStartDate(s); setEndDate(e); }}
        /> */}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          Failed to load corridors: {error}
        </div>
      )}

      {loading ? (
        <div className="h-64 bg-gray-100 rounded animate-pulse" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left — Horizontal Bar Chart (GMV by Corridor) */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-3">GMV by Corridor</p>
            {/* <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
                barSize={14}
              >
                <XAxis
                  type="number"
                  tickFormatter={fmt}
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="fullName"
                  tick={{ fontSize: 11, fill: '#4b5563' }}
                  axisLine={false}
                  tickLine={false}
                  width={150}
                />
                <Tooltip
                  formatter={(value, name) => [fmt(Number(value)), name]}
                  labelFormatter={(label, payload) =>
                    payload?.[0]?.payload?.fullName ?? label
                  }
                />
                <Bar dataKey="GMV" radius={[0, 6, 6, 0]}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer> */}
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                barCategoryGap={12} // spacing between bars
              >
                <XAxis
                  type="number"
                  tickFormatter={fmtWithCurrency}
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  type="category"
                  dataKey="fullName"
                  tick={{ fontSize: 12, fill: '#374151' }}
                  axisLine={false}
                  tickLine={false}
                  width={160}
                />

                <Tooltip
                  formatter={(value, name) => [fmtWithCurrency(Number(value)), name]}
                  labelFormatter={(label, payload) =>
                    payload?.[0]?.payload?.fullName ?? label
                  }
                />

                <Bar
                  dataKey="GMV"
                  barSize={20} // 🔥 thicker bars (increase from 14 → 20)
                  radius={[0, 0, 0, 0]} // ❌ remove rounded corners
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Right — Table */}
          <div className="overflow-auto">
            <p className="text-sm font-medium text-gray-600 mb-3">Detailed breakdown</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                  <th className="pb-2 font-medium">Corridor</th>
                  <th className="pb-2 font-medium text-right">Orders</th>
                  <th className="pb-2 font-medium text-right">GMV (AED)</th>
                  <th className="pb-2 font-medium text-right">Revenue (AED)</th>
                  <th className="pb-2 font-medium text-right">AOV (AED)</th>
                  <th className="pb-2 font-medium text-right">Avg Earnings (AED)</th>
                </tr>
              </thead>
              <tbody>
                {top10.map((c, i) => (
                  <tr
                    key={c.corridor}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-2.5 pr-3 text-gray-700 max-w-[160px] truncate">
                      <span
                        className="inline-block w-2 h-2 rounded-full mr-2"
                        style={{ background: BAR_COLORS[i % BAR_COLORS.length] }}
                      />
                      {c.corridor}
                    </td>
                    <td className="py-2.5 text-right text-gray-600">{c.totalOrders}</td>
                    <td className="py-2.5 text-right text-gray-600">{fmt(c.totalGMV)}</td>
                    <td className="py-2.5 text-right text-gray-600">{fmt(c.totalRevenue)}</td>
                    <td className="py-2.5 text-right text-gray-600">{fmt(c.AOV)}</td>
                    <td className="py-2.5 text-right text-gray-600">{fmt(c.avgEarningsPerTraveller)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}
    </div>
  );
}