import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// import React from "react";
import { Link } from "react-router-dom";
function Breadcrumb({ title = "", breadcrumb }) {
    return (_jsxs("nav", { className: "bg-gray-100 rounded-md w-full flex justify-between items-center my-5 p-4", children: [_jsx("h2", { className: "font-bold text-dark text-xl uppercase", children: breadcrumb[breadcrumb.length - 1] }), _jsx("div", { children: _jsx("ol", { className: "list-reset flex text-gray-700", children: breadcrumb.map((item, index) => {
                        const isLast = index === breadcrumb.length - 1;
                        return (_jsx("li", { className: "flex items-center", children: !isLast ? (_jsxs(_Fragment, { children: [_jsx(Link, { to: "#", className: "text-blue-600 transition duration-150 ease-in-out hover:text-blue-800 focus:text-blue-800 active:text-blue-900 dark:text-blue-400 dark:hover:text-blue-500 dark:focus:text-blue-500 dark:active:text-blue-600", children: item }), _jsx("span", { className: "mx-2 text-gray-500 dark:text-gray-400", children: "/" })] })) : (_jsx("span", { className: "text-gray-500 dark:text-gray-400", children: item })) }, index));
                    }) }) })] }));
}
export default Breadcrumb;
