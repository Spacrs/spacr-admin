import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Inputes as InputComponent, Button } from "../../components/Common";
import { toast, ToastContainer } from "react-toastify";
const ScheduleNotification = () => {
    const [formData, setFormData] = useState({
        title: "",
        message: "",
        scheduleDate: "",
        scheduleTime: "",
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh
        console.log("Scheduled Notification Sent:", formData);
        toast.success("Notification scheduled!");
        // Clear form fields after submission
        setFormData({
            title: "",
            message: "",
            scheduleDate: "",
            scheduleTime: "",
        });
    };
    return (_jsxs("div", { className: "", children: [_jsxs("div", { className: "flex justify-start items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: [_jsx(ToastContainer, {}), _jsx("div", { className: "ml-4", children: _jsx(Button, { text: "Back", className: "mr-2", variant: "lightBlue", onClick: () => navigate("/admin/notification-list") }) })] }), _jsx("div", { className: "flex justify-center items-center p-20 bg-gray-50", children: _jsxs("div", { className: "w-full max-w-7xl bg-white p-6 shadow-lg rounded-lg", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-6 text-center", children: "Schedule Notification" }), _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-5", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx("div", { children: _jsx(InputComponent, { type: "datePicker", name: "scheduleDate", label: "Schedule Date", value: formData.scheduleDate, onChange: handleChange, required: true }) }), _jsx("div", { children: _jsx(InputComponent, { type: "timePicker", name: "scheduleTime", label: "Schedule Time", value: formData.scheduleTime, onChange: handleChange, required: true }) })] }), _jsx(InputComponent, { type: "text", name: "title", label: "Title", placeholder: "Notification Title", value: formData.title, onChange: handleChange, required: true }), _jsx(InputComponent, { type: "textarea", name: "message", label: "Description", value: formData.message, onChange: handleChange, required: true }), _jsxs("div", { className: "flex gap-4 mt-4 w-full", children: [_jsx(Button, { className: "lg:w-1/5 sm:w-1/2 xs:w-1/2", variant: "secondary", text: "Cancel", onClick: () => { } }), _jsx(Button, { className: "lg:w-1/5 sm:w-1/2 xs:w-1/2", variant: "primary", text: "Schedule Notification", type: "submit" })] })] })] }) })] }));
};
export default ScheduleNotification;
