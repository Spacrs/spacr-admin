import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/FeesManagement/SystemFeesForm.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../../components/Common";
import { useCreateFeeMutation, useUpdateFeeMutation, useGetFeeDetailsQuery, } from "../../store/slices/feesSlice/apiSlice";
export default function SystemFeesFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);
    const { data: feeDetail } = useGetFeeDetailsQuery(Number(id), { skip: !isEdit });
    const [formData, setFormData] = useState({
        BuyerProtectionFees: 0,
        // PaymentFees: 0,
        PlatformFees: 0,
        // PayoutFees: 0,
    });
    const [createFee] = useCreateFeeMutation();
    const [updateFee] = useUpdateFeeMutation();
    useEffect(() => {
        if (feeDetail)
            setFormData(feeDetail);
    }, [feeDetail]);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: Number(e.target.value),
        });
    };
    const handleSubmit = async () => {
        try {
            if (isEdit) {
                await updateFee(formData).unwrap();
                toast.success("Fee updated successfully!");
            }
            else {
                await createFee(formData).unwrap();
                toast.success("Fee created successfully!");
            }
            navigate("/admin/get-system-fees");
        }
        catch (err) {
            toast.error("Failed to save fee");
        }
    };
    return (_jsxs("div", { className: "flex justify-center items-start min-h-screen bg-gray-100 p-8 pt-20", children: [_jsx(ToastContainer, {}), _jsxs("div", { className: "bg-white rounded-xl shadow-md w-full max-w-lg p-6", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-center", children: isEdit ? "Edit System Fee" : "Add System Fee" }), _jsxs("div", { className: "grid grid-cols-1 gap-4", children: [_jsxs("label", { className: "flex flex-col", children: [_jsx("span", { className: "font-semibold mb-1", children: "Buyer Protection Fees (In %)" }), _jsx("input", { type: "number", name: "BuyerProtectionFees", step: "0.01", value: formData.BuyerProtectionFees, onChange: handleChange, className: "p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" })] }), _jsxs("label", { className: "flex flex-col", children: [_jsx("span", { className: "font-semibold mb-1", children: "Platform Fees (In %)" }), _jsx("input", { type: "number", name: "PlatformFees", step: "0.01", value: formData.PlatformFees, onChange: handleChange, className: "p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" })] }), _jsxs("div", { className: "flex justify-between mt-6", children: [_jsx(Button, { text: isEdit ? "Update Fee" : "Create Fee", variant: "dark", onClick: handleSubmit }), _jsx(Button, { text: "Cancel", variant: "lightBlue", onClick: () => navigate("/system-fees") })] })] })] })] }));
}
