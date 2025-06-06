import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useGetConfigFeesQuery, useUpdateConfigFeesApiMutation, } from "../../store/slices/spacrConfigSlice/apiSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateSpacrConfig } from "../../store/slices/spacrConfigSlice/spacrConfigSlice";
import { Loader as Loading, Button } from "../../components/Common";
import { toast, ToastContainer } from "react-toastify";
const SpacrConfig = () => {
    const dispatch = useAppDispatch();
    const spacrConfigSlice = useAppSelector((state) => state.spacrConfigSlice);
    const [fees, setFees] = useState(""); // Added missing state
    const { data: config, isLoading } = useGetConfigFeesQuery();
    const [updateConfigFeesApi] = useUpdateConfigFeesApiMutation();
    useEffect(() => {
        if (config?.data?.CustomFees) {
            setFees(config.data.CustomFees);
        }
    }, [config]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (fees === "")
            return; // Prevent submitting empty value
        try {
            await updateConfigFeesApi({ CustomFees: fees }).unwrap();
            dispatch(updateSpacrConfig({ CustomFees: fees }));
            toast.success("Fees updated successfully!");
        }
        catch (error) {
            console.error("Failed to update fees", error);
            toast.error("Failed to update fees. Please try again.");
        }
    };
    return (_jsxs("div", { className: "flex justify-center items-center flex-col bg-gray-50 rounded-lg", children: [_jsx(ToastContainer, {}), isLoading ? (_jsx("div", { className: "text-center text-gray-500 mt-2", children: _jsx(Loading, {}) })) : (_jsxs("div", { className: "w-full max-w-7xl p-6", children: [_jsx("h2", { className: "text-3xl font-semibold text-gray-800 mb-6 text-center", children: "Spacr Configuration" }), _jsxs("div", { className: "border-b pb-4 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-700", children: "General Settings" }), _jsx("p", { className: "text-sm text-gray-500", children: "Manage system configurations." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", htmlFor: "fees", children: "Fees" }), _jsx("input", { type: "number", id: "fees", min: 0, className: "w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900", placeholder: "Enter Fees", value: fees, onChange: (e) => {
                                            const value = e.target.value;
                                            setFees(value === "" ? "" : Number(value));
                                        }, required: true })] }), _jsx(Button, { className: "lg:w-1/5 sm:w-1/2 xs:w-1/2 bg-primary text-white py-3 rounded-md hover:bg-primary transition", text: "Update", variant: "secondary", onClick: handleSubmit })] })] }))] }));
};
export default SpacrConfig;
