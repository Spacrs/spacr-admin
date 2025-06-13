import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import SelectComponent from "../../components/Common/Inputes/SelectInput";
import { useGetNotificationsQuery } from "../../store/slices/notificationSlice/apiSlice";
import { useEffect, useState } from "react";
import { Search, Table, Button, } from "../../components/Common";
import { columns } from "../../constant/Columns";
const options = [
    { value: "", label: "Select Notification Type" },
    { value: "schedule_notification", label: "Upcoming Notifications" },
    { value: "", label: "All Notifications" },
];
function NotificationList() {
    const navigate = useNavigate();
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    // const [notificationData, setNotificationData] = useState([]);
    const [notificationData, setNotificationData] = useState([]);
    const [filter, setFilter] = useState(""); // Search term
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortDirection, setSortDirection] = useState("desc");
    const [notificationType, setNotificationType] = useState("");
    const { data, isLoading: isNotificationLoading, isFetching, isError, refetch, } = useGetNotificationsQuery({
        page: currentPage,
        limit: itemsPerPage,
        search: filter !== "" ? filter : undefined,
        sort: sortDirection,
        sortBy: sortBy,
        type: notificationType !== "" ? notificationType : undefined,
    });
    useEffect(() => {
        refetch();
    }, [isNotificationLoading, refetch]);
    useEffect(() => {
        if (data?.data) {
            setNotificationData(data.data);
        }
    }, [data]);
    const handleUpdateNotification = (data) => {
        const notificationId = data.notificationId;
        if (data) {
            try {
                navigate(`/admin/edit-schedule-notification/${notificationId}`);
            }
            catch (error) {
                console.log(error, "error in handleUpdateNotification");
            }
        }
        else {
            console.log("No selected notification to edit.");
        }
    };
    const handleView = (data) => {
        const notificationId = data.notificationId;
        if (data) {
            try {
                navigate(`/admin/view-notification/${notificationId}`);
            }
            catch (error) {
                console.log(error, "error in handleView");
            }
        }
        else {
            console.log("No selected notification to view.");
        }
    };
    const onSort = (colName, direction) => {
        setSortBy(colName);
        setSortDirection(direction);
    };
    const onSearch = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };
    const trimmedNotificationData = notificationData.map((item) => ({
        ...item,
        title: item.title.length > 40 ? item.title.slice(0, 40) + "..." : item.title,
        message: item.message.length > 40 ? item.message.slice(0, 40) + "..." : item.message,
    }));
    return (_jsxs("div", { className: "", children: [_jsxs("div", { className: "flex flex-col mb-4 p-4 space-y-2 bg-gray-100 shadow-md rounded-lg", children: [_jsx("div", { className: "flex flex-1 max-w-lg", children: _jsx(Search, { search: filter, onChange: onSearch, onReset: () => setFilter(""), placeholder: "Search by title or message" }) }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("div", { className: "flex flex-1 max-w-lg", children: _jsx(SelectComponent, { options: options, className: "mr-2", value: notificationType, onChange: (e) => {
                                        setNotificationType(e.target.value);
                                        setCurrentPage(1); // Reset to page 1 on filter change
                                    }, name: "" }) }), _jsxs("div", { className: "ml-4", children: [_jsx(Button, { text: "Send Notification", className: "mr-2", variant: "primary", onClick: () => navigate("/admin/send-notification") }), _jsx(Button, { text: "Schedule Notification", className: "mr-2", variant: "dark", onClick: () => navigate("/admin/schedule-notification") })] })] })] }), _jsx("div", { className: "flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto", children: _jsx(Table, { data: trimmedNotificationData, columns: columns.notificationListColumn, loading: isNotificationLoading || isFetching, totalPages: data?.pagination?.totalPages || 1, currentPage: currentPage, onPageChange: setCurrentPage, handleUpdateNotification: handleUpdateNotification, handleView: handleView, itemsPerPage: 1, onSort: onSort, listType: "notifications" }) })] }));
}
export default NotificationList;
