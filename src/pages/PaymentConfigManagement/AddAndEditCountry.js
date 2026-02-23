import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAddPaymentConfigMutation, useGetPaymentConfigByIdQuery, useUpdatePaymentConfigMutation, } from "../../store/slices/paymentConfigSlice/apiSlice";
import { addPaymentConfigToList, selectIsEditPaymentConfig, setIsEditCountry, } from "../../store/slices/paymentConfigSlice/paymentConfigSlice";
import Inputes from "../../components/Common/Inputes";
import { Button, Loader } from "../../components/Common";
import { toast, ToastContainer } from "react-toastify";
const AddAndUpdateCountry = () => {
    const dispatch = useDispatch();
    const [addPaymentConfig] = useAddPaymentConfigMutation();
    const navigate = useNavigate();
    const { countryId } = useParams();
    const isEditPaymentConfig = useSelector(selectIsEditPaymentConfig);
    const { data: paymentConfig, isLoading, refetch: refetchPaymentConfig, } = useGetPaymentConfigByIdQuery(countryId);
    const [updatePaymentConfig] = useUpdatePaymentConfigMutation(); // ✅ Call the hook at the top level
    const [formData, setFormData] = useState({
        name: "",
        // providers: "",
        shortName: "",
        wallet: false,
        COD: false,
        stripe: false,
        destination: false,
        departure: false,
    });
    // Populate payload from fetched data
    useEffect(() => {
        if (paymentConfig?.data) {
            setFormData((prev) => ({
                ...prev,
                name: paymentConfig.data.name,
                // providers: paymentConfig.data.providers,
                shortName: paymentConfig.data.shortName,
                wallet: paymentConfig.data.wallet,
                COD: paymentConfig.data.COD,
                stripe: paymentConfig.data.stripe,
                destination: paymentConfig.data.destination,
                departure: paymentConfig.data.departure,
            }));
        }
    }, [paymentConfig]);
    useEffect(() => {
        if (countryId) {
            refetchPaymentConfig();
        }
        return () => {
            setFormData({
                name: "",
                // providers: "",
                shortName: "",
                wallet: false,
                COD: false,
                stripe: false,
                destination: false,
                departure: false,
            });
        };
    }, [countryId]);
    useEffect(() => {
        if (countryId) {
            dispatch(setIsEditCountry({ isEditPaymentConfig: true }));
        }
        return () => {
            dispatch(setIsEditCountry({ isEditPaymentConfig: false }));
        };
    }, [countryId]);
    const [successMessage, setSuccessMessage] = useState(null);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    //Commented on 16-05-2025
    // const handleSubmit = async (e: React.FormEvent) => {
    //   e.preventDefault();
    //   try {
    //     if (isEditPaymentConfig) {
    //       const val = {
    //         countryId: countryId,
    //         data: {
    //           ...formData,
    //         },
    //       };
    //       const updatedConfig = await updatePaymentConfig({
    //         ...val,
    //       }).unwrap();
    //       dispatch(addPaymentConfigToList(updatedConfig.data)); // ✅ Update Redux store
    //       toast.success("Country updated successfully");
    //       setSuccessMessage("Country updated successfully!");
    //       setTimeout(() => setSuccessMessage(null), 3000);
    //     } else {
    //       const response = await addPaymentConfig(formData).unwrap();
    //       dispatch(addPaymentConfigToList(response));
    //       toast.success("Country added successfully");
    //       setSuccessMessage("Country added successfully!");
    //       setTimeout(() => setSuccessMessage(null), 3000);
    //     }
    //     setFormData({
    //       name: "",
    //       shortName: "",
    //       wallet: false,
    //       COD: false,
    //       stripe: false,
    //       destination: false,
    //       departure: false,
    //     });
    //     // navigate('/admin/payment-config');
    //   } catch (error) {
    //     // console.error("Failed to add:", error);
    //     toast.error("Failed to add");
    //   }
    // };
    //Commented on 16-05-2025
    //Added on 16-05-2025
    const handleSubmit = async (e) => {
        e.preventDefault();
        // ✅ Basic validation
        if (!formData.name.trim() || !formData.shortName.trim()) {
            toast.error("Please fill in all required fields.");
            return;
        }
        try {
            if (isEditPaymentConfig) {
                const val = {
                    countryId: countryId,
                    data: {
                        ...formData,
                    },
                };
                const updatedConfig = await updatePaymentConfig(val).unwrap();
                dispatch(addPaymentConfigToList(updatedConfig.data));
                toast.success("Country updated successfully");
                setSuccessMessage("Country updated successfully!");
                setTimeout(() => {
                    navigate('/admin/payment-config');
                }, 3000);
            }
            else {
                const response = await addPaymentConfig(formData).unwrap();
                dispatch(addPaymentConfigToList(response));
                toast.success("Country added successfully");
                setSuccessMessage("Country added successfully!");
                setTimeout(() => {
                    navigate('/admin/payment-config');
                }, 3000);
            }
            // ✅ Reset form
            setFormData({
                name: "",
                shortName: "",
                wallet: false,
                COD: false,
                stripe: false,
                destination: false,
                departure: false,
            });
            setTimeout(() => setSuccessMessage(null), 3000);
        }
        catch (error) {
            toast.error("Failed to add country. Please try again.");
        }
    };
    //Added on 16-05-2025
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-end items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: [_jsx(ToastContainer, {}), _jsx("div", { className: "ml-4 flex justify-end items-center ", children: _jsx(Button, { text: "Back", variant: "lightBlue", onClick: () => navigate(-1) }) })] }), _jsxs("div", { className: "flex flex-col  justify-center items-center p-20 bg-gray-100 rounded-lg", children: [isEditPaymentConfig && isLoading ? _jsx(Loader, {}) : null, !isLoading && (_jsxs("div", { className: "w-full max-w-7xl bg-white p-6 shadow-lg rounded-lg", children: [successMessage && (_jsx("div", { className: "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4", children: successMessage })), _jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-6 text-start", children: "Country Information" }), _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-5", children: [_jsx("div", { className: "flex gap-4", children: ["name", "shortName"].map((field) => (_jsx("div", { className: "w-1/3", children: _jsx(Inputes, { label: field.charAt(0).toUpperCase() + field.slice(1), type: "text", name: field, value: formData[field], onChange: handleChange }) }, field))) }), _jsxs("div", { children: [_jsx("strong", { className: "block text-gray-700 font-medium mb-2", children: "Payment Options" }), _jsx("div", { className: "grid grid-cols-3 gap-6", children: ["wallet", "COD", "stripe"].map((option) => (_jsxs("label", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", name: option, checked: formData[option], onChange: handleChange, className: "w-5 h-5 mr-2" }), _jsx("span", { className: "text-gray-700 font-medium", children: option.toUpperCase() })] }, option))) })] }), _jsxs("div", { children: [_jsx("strong", { className: "block text-gray-700 font-medium mb-2", children: "Travel Options" }), _jsx("div", { className: "grid grid-cols-3 gap-6", children: ["destination", "departure"].map((option) => (_jsxs("label", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", name: option, checked: formData[option], onChange: handleChange, className: "w-5 h-5 mr-2" }), _jsx("span", { className: "text-gray-700 font-medium", children: option.charAt(0).toUpperCase() + option.slice(1) })] }, option))) })] }), _jsx("div", { className: "flex gap-4 mt-4 w-full", children: _jsxs("button", { type: "submit", className: "w-1/5 px-4 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800", children: [isEditPaymentConfig ? "Edit" : "Add", " Country"] }) })] })] }))] })] }));
};
export default AddAndUpdateCountry;
