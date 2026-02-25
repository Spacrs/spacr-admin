import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { icons } from "../../../Icons/constant";
import KebabMenu from "./KebabMenu";
import KebabMenu2 from "./KebabMenu2";
import { TbBrandAppgallery } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
const { MdOutlineEdit, AiOutlineDelete, BsCopy, BsEye, BsToggle2Off } = icons;
/**
 * Safely resolve nested paths like "User.Email" from an object.
 * Returns undefined if any key on the path is missing.
 */
const getNestedValue = (obj, path) => {
    if (!path)
        return undefined;
    return path.split(".").reduce((acc, key) => {
        if (acc === undefined || acc === null)
            return undefined;
        return acc[key];
    }, obj);
};
export const renderColumns = (column, row, actions, listType) => {
    const icon = {
        user: _jsx(FaRegUser, { className: "text-gray-400 w-10 h-10" }),
        order: _jsx(TbBrandAppgallery, { className: "text-gray-400 w-10 h-10" }),
        default: _jsx(CiImageOn, { className: "text-gray-400 w-10 h-10" }),
    };
    switch (column.colName) {
        case "Default": {
            const value = column.name ? getNestedValue(row, column.name) : undefined;
            return _jsx("p", { className: "font-medium", children: value ?? "-" });
        }
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
            const emojiU = (column.name ? getNestedValue(row, column.name) : "") || "";
            const emoji = convertEmojiCode(emojiU);
            return _jsx("p", { className: "font-medium", children: emoji });
        }
        case "Actions":
            return (_jsxs("div", { className: "flex space-x-2 items-center", children: [actions.handleUpdate && (_jsx(MdOutlineEdit, { onClick: () => actions.handleUpdate?.(row), className: "cursor-pointer text-lg font-bold text-gray-500 hover:text-primary" })), actions.handleUpdateNotification &&
                        listType === "notifications" &&
                        row.notificationType === "schedule_notification" &&
                        typeof actions.handleUpdateNotification === "function" && (_jsx(MdOutlineEdit, { onClick: () => actions.handleUpdateNotification?.(row), className: "cursor-pointer text-lg font-bold text-gray-500 hover:text-primary" })), actions.handleView && (_jsx(BsEye, { onClick: () => actions.handleView?.(row), className: "cursor-pointer text-lg font-bold text-gray-500 hover:text-primary" })), actions.handleDelete && (_jsx(AiOutlineDelete, { onClick: () => actions.handleDelete?.(row), className: "text-lg font-bold text-gray-500 hover:text-red-400" })), actions.handleClone && (_jsx(BsCopy, { onClick: () => actions.handleClone?.(row), className: "text-lg font-bold text-gray-500 hover:text-blue-400" })), actions.handleToggleStatus && (_jsx(BsToggle2Off, { onClick: () => actions.handleToggleStatus?.(row), className: "text-lg font-bold text-gray-500 hover:text-blue-400" }))] }));
        case "Status": {
            const value = column.name ? getNestedValue(row, column.name) : undefined;
            const normalized = value ? value.toString() : "";
            const greenList = [
                "active",
                "verified",
                "ACCEPTED",
                "LIVE",
                "PURCHASED",
                "COMPLETED",
                "READY_TO_RECEIVE",
                "DELIVERED",
            ].map((v) => v.toLowerCase());
            const orangeList = ["inactive", "pending", "in_transit"].map((v) => v.toLowerCase());
            const redList = ["rejected", "cancelled"].map((v) => v.toLowerCase());
            const displayText = normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase();
            return (_jsxs("div", { className: "relative flex items-center", children: [normalized && greenList.includes(normalized.toLowerCase()) && (_jsx("div", { className: "bg-green-500 text-white text-xs font-medium rounded-full p-2", children: displayText })), normalized && orangeList.includes(normalized.toLowerCase()) && (_jsx("div", { className: "bg-orange-400 text-white text-xs font-medium rounded-full p-2", children: displayText })), normalized && redList.includes(normalized.toLowerCase()) && (_jsx("div", { className: "bg-red-700 text-white text-xs font-medium rounded-full p-2", children: displayText })), normalized && normalized.toLowerCase() === "none" && (_jsx("div", { className: "bg-orange-400 text-white text-xs font-medium rounded-full p-2", children: displayText })), !normalized && _jsx("div", { className: "text-gray-400", children: "-" })] }));
        }
        case "Image": {
            const src = column.name ? getNestedValue(row, column.name) : undefined;
            return (_jsx("div", { className: "flex items-left", children: src === "" || src === null || src === undefined ? (icon[column.icon ? column.icon : "default"]) : (
                // if src is an object (e.g. { url: ... }) we attempt to handle that too
                _jsx("img", { src: typeof src === "string" ? src : (src?.url ?? ""), alt: column.name, className: "w-10 h-10 object-cover rounded-md" })) }));
        }
        case "Date": {
            const raw = column.name ? getNestedValue(row, column.name) : undefined;
            const formattedDate = raw
                ? new Date(raw).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                })
                : "N/A";
            return _jsx("div", { className: "text-gray-700 text-sm font-medium", children: formattedDate });
        }
        case "DateAndTime": {
            const raw = column.name ? getNestedValue(row, column.name) : undefined;
            const formattedDate = raw
                ? new Date(raw).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                })
                : "N/A";
            const formattedTime = raw
                ? new Date(raw).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                })
                : "N/A";
            return (_jsxs("div", { className: "text-gray-700 text-sm font-medium", children: [formattedDate, " ", formattedTime !== "N/A" && `at ${formattedTime}`] }));
        }
        case "KebabMenu":
            return _jsx(KebabMenu, { row: row, actions: actions });
        case "Boolean": {
            const val = column.name ? getNestedValue(row, column.name) : undefined;
            return (_jsxs("div", { className: "relative flex items-center", children: [val === true && (_jsx("div", { className: "bg-green-500 text-white text-xs font-medium rounded-full px-3 py-1", children: "Yes" })), val === false && (_jsx("div", { className: "bg-red-500 text-white text-xs font-medium rounded-full px-3 py-1", children: "No" })), val !== true && val !== false && _jsx("div", { className: "text-gray-400", children: "-" })] }));
        }
        case "Number": {
            const value = column.name ? getNestedValue(row, column.name) : undefined;
            return _jsx("p", { className: "font-medium", children: value !== undefined && value !== null ? value : "-" });
        }
        case "KebabMenu2":
            return _jsx(KebabMenu2, { row: row, actions: actions });
        case "DateNew": {
            // DateNew expects a unix timestamp (seconds)
            const raw = column.name ? getNestedValue(row, column.name) : undefined;
            const formattedDate = raw
                ? new Date(Number(raw) * 1000).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                })
                : "N/A";
            return _jsx("div", { className: "text-gray-700 text-sm font-medium", children: formattedDate });
        }
        case "Array": {
            const values = column.name ? getNestedValue(row, column.name) || [] : [];
            if (!Array.isArray(values)) {
                return _jsx("span", { className: "text-gray-400", children: "-" });
            }
            return (_jsx("div", { className: "flex flex-wrap gap-1", children: values.length > 0 ? (values.map((val, idx) => (_jsx("span", { className: "bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded", children: val }, idx)))) : (_jsx("span", { className: "text-gray-400 text-sm", children: "-" })) }));
        }
        //Added on 30-10-2025
        case "PaymentStatus": {
            const val = column.name ? getNestedValue(row, column.name) : undefined;
            return (_jsxs("div", { className: "relative flex items-center", children: [val === 'paid' && (_jsx("div", { className: "bg-green-500 text-white text-xs font-medium rounded-full px-3 py-1", children: "Paid" })), val === 'failed' && (_jsx("div", { className: "bg-red-500 text-white text-xs font-medium rounded-full px-3 py-1", children: "Failed" })), val === 'pending' && (_jsx("div", { className: "bg-orange-500 text-white text-xs font-medium rounded-full px-3 py-1", children: "Pending" })), val === 'processing' && (_jsx("div", { className: "bg-blue-500 text-white text-xs font-medium rounded-full px-3 py-1", children: "Processing" })), val !== 'paid' && val !== 'failed' && val !== 'pending' && val !== 'processing' && _jsx("div", { className: "text-gray-400", children: "-" })] }));
        }
        //Added on 30-10-2025
        default:
            return _jsx(_Fragment, {});
    }
};
