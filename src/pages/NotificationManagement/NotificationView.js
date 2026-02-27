import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BellIcon } from "@heroicons/react/24/outline"; // Optional: Tailwind Hero Icons
function NotificationView() {
    const { notificationId } = useParams();
    const navigate = useNavigate();
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!notificationId) {
            setError("No notification ID provided.");
            setLoading(false);
            return;
        }
        async function fetchNotification() {
            setLoading(true);
            setError(null);
            try {
                const access_token = localStorage.getItem("access_token");
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/notification/get-a-notification/${notificationId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access_token}`,
                    },
                });
                if (!res.ok)
                    throw new Error(`Error: ${res.statusText}`);
                const data = await res.json();
                setNotification({
                    notificationId: data.data.notificationId,
                    title: data.data.title,
                    message: data.data.message,
                    notificationType: data.data.notificationType,
                    CreatedAt: data.data.CreatedAt,
                });
            }
            catch (err) {
                setError(err.message || "Failed to fetch notification.");
            }
            finally {
                setLoading(false);
            }
        }
        fetchNotification();
    }, [notificationId]);
    const formattedDate = notification
        ? new Date(notification.CreatedAt).toLocaleString()
        : "";
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-screen", children: _jsx("p", { className: "text-gray-600 text-lg animate-pulse", children: "Loading..." }) }));
    }
    if (error) {
        return (_jsxs("div", { className: "max-w-xl mx-auto mt-10 p-6 bg-red-50 border border-red-200 text-red-700 rounded shadow-sm", children: [_jsxs("p", { className: "text-lg font-medium", children: ["Error: ", error] }), _jsx("button", { onClick: () => navigate(-1), className: "mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition", children: "Go Back" })] }));
    }
    if (!notification) {
        return (_jsxs("div", { className: "max-w-xl mx-auto mt-10 p-6 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded shadow-sm", children: [_jsx("p", { className: "text-lg font-medium", children: "No notification found." }), _jsx("button", { onClick: () => navigate(-1), className: "mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition", children: "Go Back" })] }));
    }
    return (_jsxs("div", { className: "max-w-3xl mx-auto p-6 mt-12 bg-white rounded-2xl shadow-lg relative", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx("button", { onClick: () => navigate(-1), className: "text-sm text-blue-500 hover:underline", children: "\u2190 Back" }), _jsxs("div", { className: "ml-auto flex items-center space-x-2", children: [_jsx(BellIcon, { className: "h-6 w-6 text-blue-500" }), _jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Notification" })] })] }), _jsxs("div", { className: "space-y-6 text-gray-800", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: "Title" }), _jsx("div", { className: "mt-1 text-lg font-semibold", children: notification.title })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: "Message" }), _jsx("p", { className: "mt-1 text-gray-700 whitespace-pre-line leading-relaxed", children: notification.message })] }), _jsxs("div", { className: "flex flex-wrap gap-6 mt-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: "Type" }), _jsx("div", { className: "mt-1 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium", children: notification.notificationType })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-500", children: "Created At" }), _jsx("p", { className: "mt-1 text-gray-600", children: formattedDate })] })] })] })] }));
}
export default NotificationView;
