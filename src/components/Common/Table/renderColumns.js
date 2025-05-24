import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { icons } from "../../../Icons/constant";
import KebabMenu from "./KebabMenu";
import KebabMenu2 from "./KebabMenu2";
import { TbBrandAppgallery } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
const { MdOutlineEdit, AiOutlineDelete, BsCopy, BsEye, BsToggle2Off } = icons;
export const renderColumns = (column, row, actions) => {
    const icon = {
        user: _jsx(FaRegUser, { className: "text-gray-400 w-10 h-10" }),
        order: _jsx(TbBrandAppgallery, { className: "text-gray-400 w-10 h-10" }),
        default: _jsx(CiImageOn, { className: "text-gray-400 w-10 h-10" }),
    };
    switch (column.colName) {
        case "Default":
            return (_jsx("p", { className: "font-medium", children: column.name ? (row[column.name] ? row[column.name] : "-") : "" }));
        case "Emogi": {
            const convertEmojiCode = (emojiU) => {
                if (!emojiU)
                    return "-";
                try {
                    return emojiU
                        .split(" ")
                        .map((code) => `&#x${code.replace("U+", "").toLowerCase()};`)
                        .join(" ");
                }
                catch (error) {
                    console.error("Error converting emoji:", error);
                    return "-";
                }
            };
            const emojiU = row[column.name] || ""; // Get the emoji code from the row data
            const emoji = convertEmojiCode(emojiU); // Convert it to the actual emoji
            return _jsx("p", { className: "font-medium", children: emoji });
        }
        case "Actions":
            return (_jsxs("div", { className: "flex space-x-2 items-center", children: [actions.handleUpdate && (_jsx(MdOutlineEdit, { onClick: () => actions.handleUpdate?.(row), className: "cursor-pointer text-lg font-bold text-gray-500 hover:text-primary" })), actions.handleView && (_jsx(BsEye, { onClick: () => actions.handleView?.(row), className: "cursor-pointer text-lg font-bold text-gray-500 hover:text-primary" })), actions.handleDelete && (_jsx(AiOutlineDelete, { onClick: () => actions.handleDelete?.(row), className: "text-lg font-bold text-gray-500 hover:text-red-400" })), actions.handleClone && (_jsx(BsCopy, { onClick: () => actions.handleClone?.(row), className: "text-lg font-bold text-gray-500 hover:text-blue-400" })), actions.handleToggleStatus && (_jsx(BsToggle2Off, { onClick: () => actions.handleToggleStatus?.(row), className: "text-lg font-bold text-gray-500 hover:text-blue-400" }))] }));
        case "Status":
            return (_jsxs("div", { className: "relative flex items-center", children: [column.name &&
                        [
                            "active",
                            "verified",
                            "ACCEPTED",
                            "LIVE",
                            "PURCHASED",
                            "COMPLETED",
                            "READY_TO_RECEIVE",
                            "DELIVERED"
                        ].includes(row[column.name]) && (_jsx("div", { className: "bg-green-500 text-white text-xs font-medium rounded-full p-2 ", children: row[column.name]?.charAt(0).toUpperCase() +
                            row[column.name]?.slice(1).toLowerCase() })), column.name &&
                        ["inactive", "Pending", "pending", "IN_TRANSIT"].includes(row[column.name]) && (_jsx("div", { className: " bg-orange-400 text-white text-xs font-medium rounded-full p-2", children: row[column.name]?.charAt(0).toUpperCase() +
                            row[column.name]?.slice(1).toLowerCase() })), column.name &&
                        ["Rejected", "rejected", "CANCELLED"].includes(row[column.name]) && (_jsx("div", { className: " bg-red-700 text-white text-xs font-medium rounded-full p-2", children: row[column.name]?.charAt(0).toUpperCase() +
                            row[column.name]?.slice(1).toLowerCase() })), column.name && ["none"].includes(row[column.name]) && (_jsx("div", { className: " bg-orange-400 text-white text-xs font-medium rounded-full p-2", children: row[column.name]?.charAt(0).toUpperCase() +
                            row[column.name]?.slice(1).toLowerCase() }))] }));
        case "Image": {
            return (
            // <div className="flex items-center justify-center">
            _jsx("div", { className: "flex items-left", children: row[column.name] === "" || row[column.name] === null ? (icon[column.icon ? column.icon : "default"]) : (_jsx("img", { src: row[column.name], alt: column.name, className: "w-10 h-10 object-cover rounded-md" })) }));
        }
        case "Date": {
            const formattedDate = row[column.name]
                ? new Date(row[column.name]).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                })
                : "N/A";
            return (_jsx("div", { className: "text-gray-700 text-sm font-medium", children: formattedDate }));
        }
        case "DateAndTime": {
            const formattedDate = row[column.name]
                ? new Date(row[column.name]).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                })
                : "N/A";
            const formattedTime = row[column.name]
                ? new Date(row[column.name]).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                })
                : "N/A";
            return (_jsxs("div", { className: "text-gray-700 text-sm font-medium", children: [formattedDate, " ", formattedTime !== "N/A" && `at ${formattedTime}`] }));
        }
        case "KebabMenu":
            return _jsx(KebabMenu, { row: row, actions: actions });
        case "Boolean":
            return (_jsxs("div", { className: "relative flex items-center", children: [column.name && row[column.name] === true && (_jsx("div", { className: "bg-green-500 text-white text-xs font-medium rounded-full px-3 py-1", children: "Yes" })), column.name && row[column.name] === false && (_jsx("div", { className: "bg-red-500 text-white text-xs font-medium rounded-full px-3 py-1", children: "No" }))] }));
        //Added on 24-05-2025
        case "Number":
            return (_jsx("p", { className: "font-medium", children: column.name ? (row[column.name] !== undefined && row[column.name] !== null ? row[column.name] : "-") : "" }));
        case "KebabMenu2":
            return _jsx(KebabMenu2, { row: row, actions: actions });
        //Added on 24-05-2025  
        default:
            return _jsx(_Fragment, {});
    }
};
