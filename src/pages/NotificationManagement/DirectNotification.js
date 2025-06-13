import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../store/slices/userSlice/apiSlice";
import { useSendNotificationMutation } from "../../store/slices/notificationSlice/apiSlice";
import { Inputes as InputComponent, Button, UserSelectModal, } from "../../components/Common";
import { toast, ToastContainer } from "react-toastify";
const DirectNotification = () => {
    const [formData, setFormData] = useState({
        title: "",
        message: "",
    });
    const [filter, setFilter] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [sendToAll, setSendToAll] = useState(false); //Added on 03-06-2025
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();
    const { data: userData, isLoading: isUserLoading, isFetching, isError, refetch, } = useGetUsersQuery({
        sort: "desc",
        sortBy: "CreatedAt",
        search: filter !== "" ? filter : undefined,
        page: currentPage,
        limit: itemsPerPage,
    });
    useEffect(() => {
        refetch();
    }, [filter, currentPage, refetch]);
    //Added on 03-06-2025
    useEffect(() => {
        if (userData?.data) {
            setAllUsers((prev) => {
                const existingIds = new Set(prev.map((u) => u.UserID));
                const newOnes = userData.data.filter(u => !existingIds.has(u.UserID));
                return [...prev, ...newOnes];
            });
        }
    }, [userData]);
    //Added on 03-06-2025
    const [sendNotification, { data, isLoading: isSending }] = useSendNotificationMutation();
    const users = userData?.data?.map(({ UserID, Email, FullName }) => ({
        UserID,
        Email,
        FullName,
    })) || [];
    const handleSubmit = async (e) => {
        e.preventDefault();
        const notificationPayload = {
            title: formData.title,
            body: formData.message,
            notificationType: "send_notification",
            // sendToAllUsers: selectedUsers.length === users.length, //Commented on 03-06-2025
            sendToAllUsers: sendToAll,
            // ...(selectedUsers.length < users.length ? { userIds: selectedUsers } : {}), //Commented on 03-06-2025
            ...(!sendToAll && selectedUsers.length > 0 ? { userIds: selectedUsers } : {}),
        };
        await sendNotification(notificationPayload).unwrap();
        toast.success("Notifications sent!");
        setFormData({ title: "", message: "" });
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (_jsxs("div", { className: "", children: [_jsxs("div", { className: "flex justify-end items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: [_jsx(ToastContainer, {}), _jsx("div", { className: "ml-4 flex justify-end", children: _jsx(Button, { text: "Back", className: "mr-2", variant: "lightBlue", onClick: () => navigate("/admin/notification-list") }) })] }), _jsx("div", { className: "flex justify-center items-center p-20 bg-gray-50", children: _jsxs("div", { className: "w-full max-w-7xl bg-white p-6 shadow-lg rounded-lg", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-6 text-center", children: "Send Notification" }), _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-5", children: [_jsx("div", { className: "mb-4", children: _jsxs("label", { className: "inline-flex items-center", children: [_jsx("input", { type: "checkbox", className: "form-checkbox h-5 w-5 text-primary", checked: sendToAll, onChange: (e) => {
                                                    setSendToAll(e.target.checked);
                                                    // Optionally clear selected users if "send to all" is checked
                                                    if (e.target.checked) {
                                                        setSelectedUsers([]);
                                                    }
                                                } }), _jsx("span", { className: "ml-2 text-gray-700 font-medium", children: "Send to all users" })] }) }), !sendToAll && (_jsx(Button, { text: "Select Users", className: "w-40", variant: "transparent", onClick: () => setShowModal(true) })), _jsx("div", { children: _jsx(InputComponent, { type: "text", placeholder: "Notification Title", name: "title", label: "Title", value: formData.title, onChange: handleChange, required: true }) }), _jsx("div", { children: _jsx(InputComponent, { label: "Description", name: "message", value: formData.message, onChange: handleChange, type: "textarea", required: true }) }), selectedUsers.length > 0 && (_jsxs("div", { className: "mt-4", children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "Selected Users" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: selectedUsers.map((userId) => {
                                                const fullUser = allUsers.find((user) => user.UserID === userId);
                                                const displayUser = fullUser || {
                                                    UserID: userId,
                                                    Email: "User from another page",
                                                    FullName: userId,
                                                };
                                                return (_jsx("div", { className: "flex items-center p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition", children: _jsxs("div", { className: "flex-grow", children: [_jsx("p", { className: "text-sm font-medium text-gray-800", children: displayUser.FullName }), _jsx("p", { className: "text-sm text-gray-600", children: displayUser.Email })] }) }, userId));
                                            }) })] })), _jsx("div", { className: "flex gap-4 mt-4 w-full", children: _jsx(Button, { className: "lg:w-1/5 sm:w-1/2 xs:w-1/2 bg-primary text-white py-3 rounded-md hover:bg-primary transition", text: "Send Notification", variant: "secondary", type: "submit", disabled: isSending }) })] })] }) }), _jsx(UserSelectModal, { users: users, selectedUsers: selectedUsers, setSelectedUsers: setSelectedUsers, setCurrentPage: setCurrentPage, currentPage: currentPage, show: showModal, onClose: () => setShowModal(false), setFilter: setFilter, filter: filter, pagination: {
                    page: userData?.pagination?.page || 1,
                    limit: userData?.pagination?.limit || 10,
                    totalRecords: userData?.pagination?.totalRecords || 0,
                    totalPages: userData?.pagination?.totalPages || 1,
                } })] }));
};
export default DirectNotification;
