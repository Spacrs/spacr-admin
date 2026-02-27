import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Common/Button";
import InputComponent from "../../components/Common/Inputes";
import { toast, ToastContainer } from "react-toastify";
const AddReferralCode = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [creating, setCreating] = useState(false);
    const [payload, setPayload] = useState({
        code: "",
        FullName: "",
        contactNumber: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayload((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            const access_token = localStorage.getItem("access_token");
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/admin/create-referral-code`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to create referral code.");
            }
            toast.success("Referral code created successfully.");
            setTimeout(() => {
                navigate("/admin/referral-code-list");
            }, 1000);
        }
        catch (error) {
            toast.error(error.message || "Something went wrong.");
        }
        finally {
            setCreating(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(ToastContainer, {}), _jsx("div", { className: "flex justify-end items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: _jsx(Button, { text: "Back", variant: "lightBlue", onClick: () => navigate(-1) }) }), _jsx("div", { className: "p-8 bg-gray-50 shadow-md rounded-lg", children: _jsxs("form", { onSubmit: handleSubmit, className: "max-w-4xl mx-auto bg-white p-6 shadow rounded-lg space-y-6", children: [_jsxs("div", { className: "flex flex-col gap-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [_jsx("div", { className: "w-full md:w-1/2", children: _jsx(InputComponent, { type: "text", name: "code", label: "Code", value: payload.code, onChange: handleChange, required: true }) }), _jsx("div", { className: "w-full md:w-1/2", children: _jsx(InputComponent, { type: "text", name: "FullName", label: "Full Name", value: payload.FullName, onChange: handleChange, required: true }) })] }), _jsx("div", { children: _jsx(InputComponent, { type: "text", name: "contactNumber", label: "Contact Number", value: payload.contactNumber, onChange: handleChange }) })] }), _jsx("div", { className: "text-right", children: _jsx(Button, { text: creating ? "Submitting…" : "Submit", variant: "primary", type: "submit", disabled: creating }) })] }) })] }));
};
export default AddReferralCode;
