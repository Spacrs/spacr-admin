import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Common/Button";
import InputComponent from "../../components/Common/Inputes";
import { toast, ToastContainer } from "react-toastify";
const AddScrapingIcon = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [creating, setCreating] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [payload, setPayload] = useState({
        title: "",
        url: "",
        image: null,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayload((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setPayload((prev) => ({
                ...prev,
                image: file,
            }));
        }
    };
    const handleRemoveImage = () => {
        setPayload((prev) => ({ ...prev, image: null }));
        setPreviewImage("");
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            const formData = new FormData();
            formData.append("title", payload.title);
            formData.append("url", payload.url);
            if (payload.image) {
                formData.append("image", payload.image);
            }
            const access_token = localStorage.getItem('access_token');
            const response = await fetch("https://api-v2.spa-cr.com/api/v2/admin/add-scraping-icon", {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                }
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to create icon.");
            }
            toast.success("Scraping icon created successfully.");
            setTimeout(() => {
                navigate("/admin/scrap-logo-list");
            }, 1000);
        }
        catch (error) {
            toast.error(error.message || "Something went wrong.");
        }
        finally {
            setCreating(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen", children: [_jsxs("div", { className: "flex justify-end items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: [_jsx(ToastContainer, {}), _jsx(Button, { text: "Back", variant: "lightBlue", onClick: () => navigate(-1) })] }), _jsx("div", { className: "p-8 bg-gray-50 shadow-md rounded-lg", children: _jsxs("form", { onSubmit: handleSubmit, className: "max-w-4xl mx-auto bg-white p-6 shadow rounded-lg space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(InputComponent, { type: "text", name: "title", label: "Title", value: payload.title, onChange: handleChange, required: true }), _jsx(InputComponent, { type: "text", name: "url", label: "Product URL", value: payload.url, onChange: handleChange, required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: "Product Image" }), _jsx("div", { onClick: () => fileInputRef.current?.click(), className: "h-40 border-dashed border-2 border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-blue-500", children: previewImage ? (_jsx("img", { src: previewImage, alt: "Preview", className: "h-full object-contain" })) : (_jsx(LuPlus, { size: 32, className: "text-gray-400" })) }), _jsx("input", { type: "file", ref: fileInputRef, className: "hidden", accept: "image/*", onChange: handleFileChange }), previewImage && (_jsx("div", { className: "mt-2 text-red-500 cursor-pointer", onClick: handleRemoveImage, children: "Remove Image" }))] }), _jsx("div", { className: "text-right", children: _jsx(Button, { text: creating ? "Submitting…" : "Submit", variant: "primary", type: "submit", disabled: creating }) })] }) })] }));
};
export default AddScrapingIcon;
