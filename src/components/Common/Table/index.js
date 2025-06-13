import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import Loading from "../Loader/index";
import Pagination from "./Pagination";
import { renderColumns } from "./renderColumns"; // Adjust the path as necessary
function Table({ data, columns, loading, totalPages, currentPage, itemsPerPage = 10, onPageChange, handleClone, handleDelete, handleUpdate, handleUpdateNotification, handleToggleStatus, handleView, onSort, listType }) {
    const actions = {
        handleDelete,
        handleUpdate,
        handleUpdateNotification,
        handleClone,
        handleToggleStatus,
        handleView,
    };
    const [sortConfig, setSortConfig] = useState(null);
    const handleSortClick = (colName) => {
        let direction = "asc";
        if (sortConfig?.colName === colName && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ colName, direction });
        onSort?.(colName, direction);
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex flex-col overflow-x-auto sm:-mx-6 lg:-mx-8", children: _jsx("div", { className: "inline-block min-w-full py-2 sm:px-6 lg:px-8", children: _jsx("div", { className: "overflow-x-scroll border border-gray-200 rounded-lg", children: _jsxs("table", { className: "min-w-full text-left text-sm font-light text-surface dark:text-white", children: [_jsx("thead", { className: "bg-primary text-white text-xs font-semibold tracking-wider", children: _jsxs("tr", { children: [_jsx("th", { scope: "col", className: "px-6 py-4 whitespace-nowrap", children: "SNo" }), columns.map((column, key) => (_jsx("th", { scope: "col", className: "px-6 py-4 whitespace-nowrap cursor-pointer select-none", onClick: () => column.sortable &&
                                                    column.name &&
                                                    handleSortClick(column.name), children: _jsxs("div", { className: "flex items-center gap-1", children: [column.Header, column.sortable && (_jsx("span", { className: "text-white", children: sortConfig?.colName === column.name
                                                                ? sortConfig?.direction === "asc"
                                                                    ? "▲"
                                                                    : "▼"
                                                                : "↕" }))] }) }, key)))] }) }), _jsxs("tbody", { className: "text-gray-700", children: [loading && (_jsx("tr", { children: _jsx("td", { colSpan: columns.length + 1, className: "px-6 py-4", children: _jsx(Loading, {}) }) })), !loading && data.length > 0
                                            // ? data.map((row: any, key: number) => (
                                            //     <tr
                                            //       key={key}
                                            //       className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-200"
                                            //     >
                                            //       {/* Calculate and display SNo */}
                                            //       <td className="px-6 py-4 whitespace-nowrap">
                                            //         {(currentPage - 1) * itemsPerPage + key + 1}
                                            //       </td>
                                            //       {columns.map((column: IColumns, colKey: number) => (
                                            //         <td
                                            //           key={colKey}
                                            //           className="px-6 py-4 whitespace-nowrap"
                                            //         >
                                            //           {renderColumns(column, row, actions)}
                                            //         </td>
                                            //       ))}
                                            //     </tr>
                                            //   ))
                                            ? data.map((row, key) => {
                                                console.log("Debug row:", {
                                                    listType,
                                                    rowType: row.notificationType,
                                                    hasUpdate: typeof actions.handleUpdateNotification === "function",
                                                });
                                                return (_jsxs("tr", { className: "bg-white border-b transition duration-300 ease-in-out hover:bg-gray-200", children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: (currentPage - 1) * itemsPerPage + key + 1 }), columns.map((column, colKey) => (_jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: renderColumns(column, row, actions, listType) }, colKey)))] }, key));
                                            })
                                            : !loading && (_jsx("tr", { children: _jsx("td", { colSpan: columns.length + 1, className: "px-6 py-4 text-center", children: "No data available" }) }))] })] }) }) }) }), totalPages > 1 && (_jsx(Pagination, { currentPage: currentPage, totalPages: totalPages, onPageChange: onPageChange }))] }));
}
export default Table;
