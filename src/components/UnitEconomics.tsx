import { useState } from 'react';
import { format, subDays } from 'date-fns';
import {
  BarChart, Bar, XAxis, YAxis,
  Tooltip, Cell, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import DateFilter from './DateFilter';
import { useUnitEconomics } from '../hooks/useUnitEconomics';
import DateRangePicker from "./DateRangePicker";

function fmt(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000)     return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(2)}`;
}

// Build waterfall data from unit economics
function buildWaterfall(revenue: number, costPerOrder: number) {
  const deliveryCost   = -(costPerOrder * 0.6);
  const incentives     = -(costPerOrder * 0.25);
  const otherCosts     = -(costPerOrder * 0.15);
  const contribution   = revenue + deliveryCost + incentives + otherCosts;

  const items = [
    { name: 'Revenue',       value: revenue,      raw: revenue },
    { name: 'Delivery Cost', value: deliveryCost,  raw: deliveryCost },
    { name: 'Incentives',    value: incentives,    raw: incentives },
    { name: 'Other Costs',   value: otherCosts,    raw: otherCosts },
    { name: 'Contribution',  value: contribution,  raw: contribution },
  ];

  // Calculate invisible base for waterfall effect
  let running = 0;
  return items.map(item => {
    const base = item.value >= 0 ? running : running + item.value;
    running   += item.value;
    return { ...item, base, display: Math.abs(item.value) };
  });
}

// Donut / Radial for LTV/CAC ratio
function RatioGauge({ ratio }: { ratio: number }) {
  const size       = 120;
  const stroke     = 10;
  const r          = (size - stroke) / 2;
  const circ       = 2 * Math.PI * r;
  const maxRatio   = 10;
  const pct        = Math.min(ratio / maxRatio, 1);
  const dashOffset = circ * (1 - pct);
  const color      = ratio >= 3 ? '#22c55e' : ratio >= 1 ? '#f59e0b' : '#ef4444';

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size}>
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#e5e7eb" strokeWidth={stroke}
        />
        {/* Progress */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
        <text
          x={size / 2} y={size / 2 + 6}
          textAnchor="middle" fontSize={18}
          fontWeight="bold" fill={color}
        >
          {ratio > 0 ? `${ratio.toFixed(2)}x` : '0.00x'}
        </text>
      </svg>
      <p className="text-xs text-gray-400">LTV / CAC Ratio</p>
    </div>
  );
}

export default function UnitEconomics() {
  // const [startDate, setStartDate] = useState<Date | null>(subDays(new Date(), 30));
  // const [endDate, setEndDate]     = useState<Date | null>(new Date());

  const to = new Date();
  const from = new Date(); 
  from.setDate(to.getDate() - 6);

  const [startDate, setStartDate] = useState<Date | null>(from);
  const [endDate, setEndDate] = useState<Date | null>(to);

  const { data, loading, error } = useUnitEconomics(
    startDate ? format(startDate, 'yyyy-MM-dd') : '',
    endDate ? format(endDate, 'yyyy-MM-dd') : ''
  );

  const ue = data?.unitEconomic;
  const ce = data?.customerEconomic;

  const waterfallData = ue
    ? buildWaterfall(ue.revenuePerOrder, ue.costPerOrder)
    : [];

  const waterfallColors: Record<string, string> = {
    Revenue:       '#22c55e',
    'Delivery Cost': '#f97316',
    Incentives:    '#eab308',
    'Other Costs': '#ef4444',
    Contribution:  '#22c55e',
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-base font-semibold text-gray-800">Unit Economics</h2>
        {/* <DateFilter
          startDate={startDate}
          endDate={endDate}
          onRangeChange={(s, e) => { setStartDate(s); setEndDate(e); }}
        /> */}

        <DateRangePicker onChange={(range) => {
          console.log('range', range.from, range.to)
          if (range.from && range.to) {
            setStartDate(range.from);
            setEndDate(range.to);
          }
        }} /> 
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          Failed to load unit economics: {error}
        </div>
      )}

      {loading ? (
        <div className="h-64 bg-gray-100 rounded animate-pulse" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT — Per Order Economics + Waterfall */}
          <div className="space-y-4">

            {/* Per Order KPIs */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Per Order Economics</p>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'AOV',               value: fmt(ue?.AOV ?? 0) },
                  { label: 'Take Rate',          value: `${ue?.takeRate ?? 0}%` },
                  { label: 'Revenue per Order',  value: fmt(ue?.revenuePerOrder ?? 0) },
                  { label: 'Cost per Order',     value: fmt(ue?.costPerOrder ?? 0) },
                ].map(item => (
                  <div key={item.label} className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                    <p className="text-base font-bold text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gauges (moved here) */}
            <div className="flex gap-6 justify-center pt-2">
              <RatioGauge ratio={ce?.ltvToCacShopper ?? 0} />
              <RatioGauge ratio={ce?.ltvToCacTraveler ?? 0} />
            </div>

            {/* Waterfall Chart */}
            {/* <div>
              <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Cost Breakdown</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={waterfallData} margin={{ top: 5, right: 10, left: 0, bottom: 20 }}>
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                    width={35}
                  />
                  <ReferenceLine y={0} stroke="#e5e7eb" />
                  <Tooltip
                    formatter={(_, __, props) => [
                      fmt(props.payload.raw),
                      props.payload.name,
                    ]}
                  />
                  <Bar dataKey="base" stackId="a" fill="transparent" />
                  <Bar dataKey="display" stackId="a" radius={[4, 4, 0, 0]}>
                    {waterfallData.map((entry, i) => (
                      <Cell key={i} fill={waterfallColors[entry.name] ?? '#3b82f6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div> */}
          </div>

          {/* RIGHT — Customer Economics + Gauge */}
          <div className="space-y-4">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Customer Economics</p>

            {/* Metrics rows */}
            <div className="space-y-1">
              {[
                  { label: 'CAC (Shopper)', value: fmt(ce?.CACShopper ?? 0) },
                  { label: 'CAC (Traveler)', value: fmt(ce?.CACTraveler ?? 0) },

                  { label: 'LTV (Shopper)', value: fmt(ce?.LTVShopper ?? 0) },
                  { label: 'LTV (Traveler)', value: fmt(ce?.LTVTraveler ?? 0) },

                  {
                    label: 'LTV/CAC (Shopper)',
                    value: ce?.ltvToCacShopper
                      ? `${ce.ltvToCacShopper.toFixed(2)}x`
                      : '0.00x',
                  },
                  {
                    label: 'LTV/CAC (Traveler)',
                    value: ce?.ltvToCacTraveler
                      ? `${ce.ltvToCacTraveler.toFixed(2)}x`
                      : '0.00x',
                  },

                  { label: 'Total Users', value: (ce?.totalUsers ?? 0).toLocaleString() },
                ].map(item => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-1.5 border-b border-gray-100"
                >
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>

            {/* LTV/CAC Gauge */}
            {/* <div className="flex justify-center pt-4">
              <RatioGauge ratio={ce?.ltvToCac ?? 0} />
            </div> */}
            {/* <div className="flex gap-6 justify-center">
              <RatioGauge ratio={ce?.ltvToCacShopper ?? 0} />
              <RatioGauge ratio={ce?.ltvToCacTraveler ?? 0} />
            </div> */}
          </div>

        </div>
      )}
    </div>
  );
}