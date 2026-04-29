import { useEffect, useState } from 'react';
import { format, subDays } from 'date-fns';
import {
  ComposedChart, Bar, Line,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
  LabelList,
} from 'recharts';
import { useGrowthTrends } from '../../hooks/useGrowthTrends';
import DateRangePicker from "../DateRangePicker";
import { useDateContext } from "../../context/DateContext";
import type { DateRange } from "react-day-picker";

// function fmtCurrency(value: number): string {
//   if (value >= 1_00_00_000) return `₹ ${(value / 1_00_00_000).toFixed(2)} Cr`;
//   if (value >= 1_00_000) return `₹ ${(value / 1_00_000).toFixed(1)} L`;
//   return `₹ ${value}`;
// }

// function fmtCurrency(value: number): string {
//   if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
//   if (value >= 1_000)     return `$${(value / 1_000).toFixed(1)}K`;
//   return `$${value}`;
// }

function fmtCurrency(value: number): string {
  if (value >= 1_000_000) {
    const v = Math.floor((value / 1_000_000) * 100) / 100;
    return `AED ${v}M`;
  }

  if (value >= 1_000) {
    const v = Math.floor((value / 1_000) * 10) / 10;
    return `AED ${v}K`;
  }

  return `AED ${value}`;
}

function fmtUsers(value: number): string {
  if (value >= 1000) return `${Math.round(value / 1000)}K`;
  return `${value}`;
}

export default function GrowthTrendChart() {
  // const [startDate, setStartDate] = useState<Date | null>(subDays(new Date(), 6));
  // const [endDate, setEndDate] = useState<Date | null>(new Date());

  const { globalRange } = useDateContext();

  const [localRange, setLocalRange] = useState<DateRange | null>(null);
  const [isLocal, setIsLocal] = useState(false);

  const startDate = isLocal ? localRange?.from : globalRange.from;
  const endDate = isLocal ? localRange?.to : globalRange.to;

  const { data, loading } = useGrowthTrends(
    startDate ? format(startDate, 'yyyy-MM-dd') : '',
    endDate ? format(endDate, 'yyyy-MM-dd') : ''
  );

  // when global range changes (e.g. from another component), reset local state
  useEffect(() => {
    setIsLocal(false);
    setLocalRange(null);
  }, [globalRange]);

  const trends = data?.growthTrends || [];

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Growth Trends</h2>

        <DateRangePicker
          value={isLocal ? localRange : globalRange}
          onChange={(range) => {
            if (range.from && range.to) {
              setLocalRange(range);
              setIsLocal(true); // switch to local
            }
          }}
        />
      </div>

      {/* Axis Titles */}
      <div className="flex justify-between text-xs font-semibold px-2">
        <span className="text-green-600">Currency (GMV & Revenue)</span>
        <span className="text-blue-600">Total Users (Count)</span>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="h-64 bg-gray-100 rounded animate-pulse" />
      ) : (
        <ResponsiveContainer width="100%" aspect={2.2}>
          <ComposedChart data={trends} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>

            <CartesianGrid stroke="#e5e7eb" vertical={false} />

            <XAxis
              dataKey="label"
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#22c55e" }}
              tickLine={false}
            />

            <YAxis
              yAxisId="left"
              tickFormatter={fmtCurrency}
              width={80} 
              axisLine={{ stroke: "#22c55e" }}
              tickLine={false}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={fmtUsers}
              axisLine={{ stroke: "#94a3b8" }}
              tickLine={false}
            />

            {/* Tooltip */}
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;

                const d = payload[0].payload;

                return (
                  <div className="bg-white border border-gray-200 rounded-lg shadow-md p-3 text-xs">
                    <p className="text-green-600">GMV: {fmtCurrency(d.GMV)}</p>
                    <p className="text-orange-500">Revenue: {fmtCurrency(d.revenue)}</p>
                    <p className="text-blue-600">Users: {d.totalUsers}</p>
                  </div>
                );
              }}
            />

            {/* <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 12 }} /> */}
            <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ fontSize: 12 }}
                formatter={(value) => <span className="text-gray-700">{value}</span>}
              />

            {/* GMV BAR */}
            {/* <Bar
              yAxisId="left"
              dataKey="GMV"
              name="GMV"
              fill="#3b82f6"
              barSize={40}
              radius={[6, 6, 0, 0]}
            > */}
              {/* <LabelList
                dataKey="GMV"
                position="top"
                formatter={(v: any) => fmtCurrency(Number(v))}
                style={{ fontSize: 12, fontWeight: 600 }}
              /> */}
            {/* </Bar> */}


            <Bar
              yAxisId="right" 
              dataKey="totalUsers"
              name="Total Users"
              fill="#3b82f6"
              barSize={40}
              radius={[6, 6, 0, 0]}
            />

            {/* Revenue LINE */}
            <Line
              yAxisId="left"
              type="linear" // monotone
              dataKey="revenue"
              name="Revenue"
              stroke="#f97316"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            

            <Line
              yAxisId="left"
              type="linear"
              dataKey="GMV"
              name="GMV"
              stroke="#16a34a"
              strokeWidth={2}
            />

            {/* Users LINE */}
            {/* <Line
              yAxisId="right"
              type="linear" // monotone
              dataKey="totalUsers"
              name="Total Users"
              stroke="#16a34a"
              strokeWidth={3}
              // dot={{ r: 5 }}
            > */}
              {/* <LabelList
                dataKey="totalUsers"
                position="top"
                formatter={(v: any) => fmtUsers(Number(v))}
                style={{ fill: "#16a34a", fontSize: 12, fontWeight: 600 }}
              /> */}
            {/* </Line> */}

          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}





/// Old code 

// import { useState } from 'react';
// import { format, subDays } from 'date-fns';
// import {
//   ComposedChart, Bar, Line,
//   XAxis, YAxis, CartesianGrid,
//   Tooltip, Legend, ResponsiveContainer,
// } from 'recharts';
// import { useGrowthTrends } from '../../hooks/useGrowthTrends';
// import DateRangePicker from "../DateRangePicker";

// function fmtMoney(value: number): string {
//   if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
//   if (value >= 1_000)     return `$${(value / 1_000).toFixed(0)}K`;
//   return `$${value}`;
// }

// export default function GrowthTrendChart() {
//   const [startDate, setStartDate] = useState<Date | null>(subDays(new Date(), 6));
//   const [endDate, setEndDate]     = useState<Date | null>(new Date());

//   const { data, loading } = useGrowthTrends(
//     startDate ? format(startDate, 'yyyy-MM-dd') : '',
//     endDate ? format(endDate, 'yyyy-MM-dd') : ''
//   );

// const trends = data?.growthTrends || [];
// const grouping = data?.grouping;

//   return (
//     // w-full md:w-1/2
//     <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4"> 

//       {/* Header */}
//       <div className="flex items-center justify-between flex-wrap gap-3">
//         <div>
//           <h2 className="text-base font-semibold text-gray-800">Growth Trends</h2>
//           <p className="text-xs text-gray-400 capitalize">
//               {grouping} view
//             </p>
//           </div>

//           <DateRangePicker
//             onChange={(range) => {
//               if (range.from && range.to) {
//                 setStartDate(range.from);
//                 setEndDate(range.to);
//               }
//             }}
//           />
//         </div>

//         {/* Loading */}
//         {loading ? (
//           <div className="h-64 bg-gray-100 rounded animate-pulse" />
//         ) : (
//           <ResponsiveContainer width="100%" aspect={2.5}>
//             <ComposedChart data={trends} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>

//               {/* <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /> */}
//               <CartesianGrid stroke="#f1f5f9" vertical={false} />

//               {/* ✅ Dynamic X Axis */}
//               <XAxis
//                 dataKey="label"
//                 tick={{ fontSize: 12, fill: '#6b7280' }}
//                 axisLine={{ stroke: "#d1d5db" }}
//                 tickLine={false}
//                 interval={grouping === "day" ? 0 : "preserveStartEnd"}
//               />

//               {/* Left axis */}
//               <YAxis
//                 yAxisId="left"
//                 tickFormatter={fmtMoney}
//                 tick={{ fontSize: 11, fill: '#6b7280' }}
//                 axisLine={{ stroke: "#d1d5db" }}
//                 tickLine={false}
//                 width={55}
//               />

//               {/* Right axis */}
//               <YAxis
//                 yAxisId="right"
//                 orientation="right"
//                 tick={{ fontSize: 11, fill: '#6b7280' }}
//                 axisLine={{ stroke: "#d1d5db" }}
//                 tickLine={false}
//                 width={40}
//               />

//               {/* 🔥 Better Tooltip */}
//               <Tooltip
//                 content={({ active, payload, label }) => {
//                   if (!active || !payload?.length) return null;

//                   const d = payload[0].payload;

//                   return (
//                     <div className="bg-white border border-gray-200 rounded-lg shadow-md p-3 text-xs">
//                       {/* <p className="font-semibold text-gray-700 mb-1">
//                         {label} ({d.date})
//                       </p> */}
//                       <p className="text-green-600">Users: {d.totalUsers}</p>

//                       <p className="text-blue-600">GMV: {fmtMoney(d.GMV)}</p>
//                       <p className="text-amber-600">Revenue: {fmtMoney(d.revenue)}</p>
//                       <p className="text-gray-600">Users: {d.totalUsers}</p>
//                     </div>
//                   );
//                 }}
//               />

//               <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />

//             {/* ✅ GMV → BAR ONLY */}
//             <Bar
//               yAxisId="left"
//               dataKey="GMV"
//               name="GMV"
//               fill="#3b82f6"
//               radius={[6, 6, 0, 0]}
//               barSize={28}
//             />

//             {/* ✅ Revenue → LINE */}
//             <Line
//               yAxisId="left"
//               type="monotone"
//               dataKey="revenue"
//               name="Revenue"
//               stroke="#f59e0b"
//               strokeWidth={3}
//               dot={{ r: 3 }}
//               activeDot={{ r: 6 }}
//             />

//             {/* ✅ Users → LINE (RIGHT AXIS) */}
//             <Line
//               yAxisId="right"
//               type="monotone"
//               dataKey="totalUsers"
//               name="Users"
//               stroke="#10b981"
//               strokeWidth={3}
//               dot={{ r: 3 }}
//               activeDot={{ r: 6 }}
//               // strokeDasharray="4 4"
//             />

//           </ComposedChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// }