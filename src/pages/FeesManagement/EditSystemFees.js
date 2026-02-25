import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/FeesManagement/EditSystemFees.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../../components/Common";
import { useUpdateFeeMutation, useGetFeesQuery } from "../../store/slices/feesSlice/apiSlice";
export default function EditSystemFees() {
    const navigate = useNavigate();
    // Fetch the singleton fee
    const { data: feeDetail, isFetching, refetch } = useGetFeesQuery({ page: 1, limit: 1 });
    const [updateFee] = useUpdateFeeMutation();
    // Start with null to distinguish "not loaded yet"
    const [formData, setFormData] = useState(null);
    useEffect(() => {
        refetch();
    }, []);
    // Populate form when data arrives
    useEffect(() => {
        if (feeDetail) {
            setFormData(feeDetail.data[0]);
        }
    }, [feeDetail]);
    const handleChange = (e) => {
        if (!formData)
            return;
        const value = Number(e.target.value);
        if (value < 0)
            return;
        setFormData({
            ...formData,
            [e.target.name]: Number(e.target.value),
        });
    };
    const handleSubmit = async () => {
        if (!formData)
            return;
        try {
            const payload = {
                BuyerProtectionFees: Number(formData.BuyerProtectionFees),
                PaymentFees: Number(formData.PaymentFees),
                PlatformFees: Number(formData.PlatformFees),
                PayoutFees: Number(formData.PayoutFees),
            };
            // await updateFee(formData).unwrap();
            await updateFee(payload).unwrap();
            toast.success("Fee updated successfully!");
            navigate("/admin/get-system-fees");
        }
        catch (err) {
            toast.error("Failed to update fee");
        }
    };
    if (isFetching || !formData) {
        return (_jsx("div", { className: "flex justify-center items-center min-h-screen", children: "Loading fee..." }));
    }
    return (_jsxs("div", { className: "flex justify-center items-start min-h-screen bg-gray-100 p-8 pt-20", children: [_jsx(ToastContainer, {}), _jsxs("div", { className: "bg-white rounded-xl shadow-md w-full max-w-lg p-6", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-center", children: "Edit System Fee" }), _jsxs("div", { className: "grid grid-cols-1 gap-4", children: [["BuyerProtectionFees", "PlatformFees"].map((field) => (_jsxs("label", { className: "flex flex-col", children: [_jsxs("span", { className: "font-semibold mb-1", children: [field.replace(/([A-Z])/g, " $1").trim(), " (In %)"] }), _jsx("input", { type: "number", name: field, step: "0.01", min: "0", value: formData[field], onChange: handleChange, className: "p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" })] }, field))), _jsxs("div", { className: "flex justify-between mt-6", children: [_jsx(Button, { text: "Update Fee", variant: "dark", onClick: handleSubmit }), _jsx(Button, { text: "Cancel", variant: "lightBlue", onClick: () => navigate("/admin/get-system-fees") })] })] })] })] }));
}
