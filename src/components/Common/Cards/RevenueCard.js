import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import React from "react";
import BarChart from "../Chart/BarChart";
// const data = {
//   labels: ["Dec 22", "Jan 23", "Feb 23", "Mar 23", "Apr 23"],
//   datasets: [
//     {
//       label: "Income",
//       backgroundColor: "#4CAF50",
//       data: [65000, 76500, 30000, 50000, 90000],
//     },
//     {
//       label: "Spend",
//       backgroundColor: "#FFC107",
//       data: [35000, 20000, 40000, 30000, 50000],
//     },
//   ],
// };
function RevenueCard() {
    return (_jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg col-span-2", children: [_jsx("h3", { className: "text-gray-500 mb-1", children: "Monthly Recurring Revenue" }), _jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-3xl font-bold", children: "$156,098.1" }), _jsx("p", { className: "text-green-500", children: "\u25B2 4.1% vs $303.3K last year" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-3xl font-bold", children: "$80,112.02" }), _jsx("p", { className: "text-green-500", children: "\u25B2 2% vs $77,000.02 last year" })] })] }), _jsx(BarChart, {})] }));
}
export default RevenueCard;
