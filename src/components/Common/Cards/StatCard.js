import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import React from "react";
function StatCard({ title, value, change, changeType, }) {
    const changeColor = changeType === "up" ? "text-green-500" : "text-red-500";
    return (_jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg", children: [_jsx("h3", { className: "text-gray-500 mb-1", children: title }), _jsx("p", { className: "text-3xl font-bold", children: value }), _jsx("p", { className: changeColor, children: change })] }));
}
export default StatCard;
