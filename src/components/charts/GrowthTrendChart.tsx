import { useState } from 'react';
import { format, subDays } from 'date-fns';
import {
  ComposedChart, Bar, Line,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import DateFilter from '../DateFilter';
import { useGrowthTrends } from '../../hooks/useGrowthTrends';

function fmtMoney(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000)     return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

function formatMonth(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
}

export default function GrowthTrendChart() {
  const [startDate, setStartDate] = useState<Date | null>(subDays(new Date(), 365));
  const [endDate, setEndDate]     = useState<Date | null>(new Date());

  const { data: trends, loading } = useGrowthTrends(
    startDate ? format(startDate, 'yyyy-MM-dd') : '',
    endDate ? format(endDate, 'yyyy-MM-dd') : ''
  );

  const chartData = trends.map(d => ({
    ...d,
    month: formatMonth(d.date),
  }));

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">

      {/* Header + Date Filter */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-base font-semibold text-gray-800">Growth Trends</h2>
        <DateFilter
          startDate={startDate}
          endDate={endDate}
          onRangeChange={(s, e) => { setStartDate(s ); setEndDate(e); }}
        />
      </div>

      {/* Loading skeleton */}
      {loading ? (
        <div className="h-64 bg-gray-100 rounded animate-pulse" />
      ) : (
        <ResponsiveContainer width="100%" aspect={2.5}>
          <ComposedChart data={chartData} margin={{ top: 5, right: 50, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
            />

            {/* Left axis — GMV + Revenue */}
            <YAxis
              yAxisId="left"
              orientation="left"
              tickFormatter={fmtMoney}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              width={55}
            />

            {/* Right axis — Active Users */}
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              width={40}
            />

            <Tooltip
              formatter={(value, name) => {
                const num = Number(value);
                if (name === 'GMV' || name === 'Revenue') return [fmtMoney(num), name];
                return [num, String(name)];
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />

            {/* Stacked Bars */}
            <Bar yAxisId="left" dataKey="GMV"     name="GMV"     stackId="a" fill="#3b82f6" barSize={28} />
            <Bar yAxisId="left" dataKey="revenue" name="Revenue" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={28} />

            {/* Lines */}
            <Line yAxisId="left"  type="monotone" dataKey="GMV"         name="GMV trend"    stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3, fill: '#2563eb',  strokeWidth: 0 }} activeDot={{ r: 6 }} />
            <Line yAxisId="left"  type="monotone" dataKey="revenue"     name="Revenue"      stroke="#16a34a" strokeWidth={2.5} dot={{ r: 3, fill: '#16a34a',  strokeWidth: 0 }} activeDot={{ r: 6 }} />
            <Line yAxisId="right" type="monotone" dataKey="activeUsers" name="Active Users" stroke="#93c5fd" strokeWidth={2.5} dot={{ r: 3, fill: '#93c5fd',  strokeWidth: 0 }} activeDot={{ r: 6 }} strokeDasharray="5 5" />

          </ComposedChart>
        </ResponsiveContainer>
      )}

    </div>
  );
}