import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Inputes as InputComponent, Button } from "../../components/Common";
import { toast, ToastContainer } from "react-toastify";
const EditScheduleNotification = () => {
    const [formData, setFormData] = useState({
        notificationId: "",
        title: "",
        message: "",
        scheduleDate: "",
        scheduleTime: "",
    });
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { notificationId } = useParams();
    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
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
                // Replace URL with your actual API endpoint
                let access_token = localStorage.getItem('access_token');
                const res = await fetch(`https://api-v2.spa-cr.com/api/v2/notification/get-a-notification/${notificationId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${access_token}`
                    }
                });
                if (!res.ok)
                    throw new Error(`Error: ${res.statusText}`);
                const data = await res.json();
                console.log('dataaaaaa', data);
                // Assume API returns data with these fields
                setNotification({
                    notificationId: data.data.notificationId,
                    title: data.data.title,
                    message: data.data.message,
                    notificationType: data.data.notificationType,
                    CreatedAt: data.data.CreatedAt,
                });
                setFormData((prev) => ({
                    ...prev,
                    notificationId: data.data.notificationId,
                    title: data.data.title || "",
                    message: data.data.message || "",
                    scheduleDate: data.data.scheduleDate ? data.data.scheduleDate.split("T")[0] : "",
                    scheduleTime: data.data.scheduleTime ? data.data.scheduleTime.slice(0, 5) : "",
                }));
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!notificationId) {
            toast.error("Notification ID is missing.");
            return;
        }
        try {
            let access_token = localStorage.getItem('access_token');
            const res = await fetch(`https://api-v2.spa-cr.com/api/v2/notification/update-scheduled-notification/${notificationId}`, {
                method: "PUT", // or POST if your API expects
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`,
                },
                body: JSON.stringify({
                    title: formData.title,
                    message: formData.message,
                    scheduleDate: formData.scheduleDate,
                    scheduleTime: formData.scheduleTime,
                    // Include notificationId if API requires it in body; else just URL param is fine
                }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to update notification.");
            }
            const data = await res.json();
            toast.success("Notification updated successfully!");
            // Redirect after successful update
            navigate("/admin/notification-list");
        }
        catch (error) {
            toast.error(error.message || "Something went wrong.");
        }
    };
    return (_jsxs("div", { className: "", children: [_jsxs("div", { className: "flex justify-start items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: [_jsx(ToastContainer, {}), _jsx("div", { className: "ml-4", children: _jsx(Button, { text: "Back", className: "mr-2", variant: "lightBlue", onClick: () => navigate("/admin/notification-list") }) })] }), _jsx("div", { className: "flex justify-center items-center p-20 bg-gray-50", children: _jsxs("div", { className: "w-full max-w-7xl bg-white p-6 shadow-lg rounded-lg", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-6 text-center", children: "Schedule Notification" }), _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-5", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx("div", { children: _jsx(InputComponent, { type: "datePicker", name: "scheduleDate", label: "Schedule Date", value: formData.scheduleDate, onChange: handleChange, required: true }) }), _jsx("div", { children: _jsx(InputComponent, { type: "timePicker", name: "scheduleTime", label: "Schedule Time", value: formData.scheduleTime, onChange: handleChange, required: true }) })] }), _jsx(InputComponent, { type: "text", name: "title", label: "Title", placeholder: "Notification Title", value: formData.title, onChange: handleChange, required: true }), _jsx(InputComponent, { type: "textarea", name: "message", label: "Description", value: formData.message, onChange: handleChange, required: true }), _jsx("div", { className: "flex gap-4 mt-4 w-full", children: _jsx(Button, { className: "lg:w-1/5 sm:w-1/2 xs:w-1/2", variant: "primary", text: "Update", type: "submit" }) })] })] }) })] }));
};
export default EditScheduleNotification;
