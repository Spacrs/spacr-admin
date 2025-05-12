import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import SelectComponent from "../../components/Common/Inputes/SelectInput";
import { useGetNotificationsQuery } from "../../store/slices/notificationSlice/apiSlice";
import { useEffect, useState } from "react";
import { Search, Table, Button, } from "../../components/Common";
const columns = [
    { name: "title", Header: "Title", colName: "Default", sortable: true },
    { name: "message", Header: "Message", colName: "Default", sortable: true },
    {
        name: "scheduleDate",
        Header: "Schedule Date",
        colName: "Date",
        sortable: true,
    },
    {
        name: "scheduleTime",
        Header: "Schedule Time",
        colName: "Default",
        sortable: true,
    },
    {
        name: "notificationType",
        Header: "Type",
        colName: "Default",
        sortable: true,
    },
    { name: "status", Header: "Status", colName: "Default", sortable: true },
    {
        name: "CreatedAt",
        Header: "Created At",
        colName: "DateAndTime",
        sortable: true,
    },
    {
        name: "UpdatedAt",
        Header: "Updated At",
        colName: "DateAndTime",
        sortable: true,
    },
    {
        name: "action",
        Header: "Actions",
        colName: "Actions",
        Actions: ["UPDATE", "VIEW"],
    },
];
const options = [
    { value: "", label: "Select Notification Type" },
    { value: "upcoming", label: "Upcoming Notifications" },
    { value: "all", label: "All Notifications" },
];
function NotificationList() {
    const navigate = useNavigate();
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [notificationData, setNotificationData] = useState([]);
    const [filter, setFilter] = useState(""); // Search term
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortDirection, setSortDirection] = useState("desc");
    const { data, isLoading: isNotificationLoading, isFetching, isError, refetch, } = useGetNotificationsQuery({
        page: currentPage,
        limit: itemsPerPage,
        search: filter !== "" ? filter : undefined,
        sort: sortDirection,
        sortBy: sortBy,
    });
    useEffect(() => {
        refetch();
    }, [isNotificationLoading, refetch]);
    useEffect(() => {
        if (data?.data) {
            setNotificationData(data.data);
        }
    }, [data]);
    const handleUpdate = () => { };
    const handleView = () => { };
    const onSort = (colName, direction) => {
        setSortBy(colName);
        setSortDirection(direction);
    };
    const onSearch = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };
    return (_jsxs("div", { className: "", children: [_jsxs("div", { className: "flex flex-col mb-4 p-4 space-y-2 bg-gray-100 shadow-md rounded-lg", children: [_jsx("div", { className: "flex flex-1 max-w-lg", children: _jsx(Search, { search: filter, onChange: onSearch, onReset: () => setFilter("") }) }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("div", { className: "flex flex-1 max-w-lg", children: _jsx(SelectComponent, { options: options, className: "mr-2", value: "one" // Provide a default value
                                    , onChange: (e) => console.log(e.target.value), name: "" }) }), _jsxs("div", { className: "ml-4", children: [_jsx(Button, { text: "Send Notification", className: "mr-2", variant: "primary", onClick: () => navigate("/admin/send-notification") }), _jsx(Button, { text: "Schedule Notification", className: "mr-2", variant: "dark", onClick: () => navigate("/admin/schedule-notification") })] })] })] }), _jsx("div", { className: "flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto", children: _jsx(Table, { data: notificationData, columns: columns, loading: isNotificationLoading || isFetching, totalPages: data?.pagination?.totalPages || 1, currentPage: currentPage, onPageChange: setCurrentPage, handleUpdate: handleUpdate, handleView: handleView, itemsPerPage: 1, onSort: onSort }) })] }));
}
export default NotificationList;
