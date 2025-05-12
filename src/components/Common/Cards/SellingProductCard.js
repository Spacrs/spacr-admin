import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import React from "react";
import Donutchart from "../Chart/Donutchart";
function SellingProductCard() {
    return (_jsxs("div", { className: "bg-[#3f9997] p-6 rounded-lg shadow-lg text-white", children: [_jsx("h3", { className: "mb-1", children: "Selling Product" }), _jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("p", { className: "text-4xl font-bold", children: "2,609" }), _jsx("button", { className: "px-4 py-2 bg-black text-white rounded-md", children: "This Month" })] }), _jsx("div", { className: " bg-gray-100 rounded-lg", children: _jsx(Donutchart, {}) }), _jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-lg", children: "Visitor growth" }), _jsx("p", { className: "text-sm", children: "\u25BC 12% Compare to 27K last month" }), _jsxs("div", { className: "mt-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("p", { children: "Class A" }), _jsx("p", { children: "13,028 / 15,000" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("p", { children: "Class B" }), _jsx("p", { children: "11,912 / 15,000" })] })] })] })] }));
}
export default SellingProductCard;
