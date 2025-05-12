import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useGetPaymentConfigsQuery, useUpdatePaymentConfigMutation, } from "../../store/slices/paymentConfigSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPaymentConfigs, updatePaymentConfigInList, } from "../../store/slices/paymentConfigSlice/paymentConfigSlice";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@material-tailwind/react";
import { columns } from "../../constant/Columns";
import { Search, Table, Button } from "../../components/Common";
function PaymentConfig() {
    const dispatch = useAppDispatch();
    const { paymentConfigs } = useAppSelector((state) => state.paymentConfigSlice);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortDirection, setSortDirection] = useState("desc");
    const [filter, setFilter] = useState(""); // Search term
    const { data, isLoading, isFetching, isError } = useGetPaymentConfigsQuery({
        page: currentPage,
        limit: itemsPerPage,
        sort: sortDirection,
        sortBy: sortBy,
        search: filter !== "" ? filter : undefined,
        isPagination: true
    });
    const [selectedConfig, setSelectedConfig] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [updatePaymentConfig] = useUpdatePaymentConfigMutation(); // ✅ Call the hook at the top level
    const navigate = useNavigate();
    useEffect(() => {
        if (data?.data) {
            dispatch(setPaymentConfigs(data.data));
        }
    }, [data, dispatch]);
    if (isError) {
        return (_jsx("div", { className: "text-red-500 text-center mt-4", children: "Error loading payment config data" }));
    }
    // Open modal and set selected row data
    const handleUpdate = (config) => {
        navigate(`/admin/edit-payment-config-country/${config.Id}`);
    };
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setSelectedConfig((prevConfig) => ({
            ...prevConfig,
            [name]: checked,
        }));
    };
    const handleUpdateConfig = async () => {
        try {
            const updatedConfig = await updatePaymentConfig(selectedConfig).unwrap();
            dispatch(updatePaymentConfigInList(updatedConfig.data)); // ✅ Update Redux store
            setIsOpen(false);
        }
        catch (error) {
            console.error("Error updating payment config:", error);
        }
    };
    // Close modal
    const closeModal = () => {
        setIsOpen(false);
        setSelectedConfig(null);
    };
    // Add country button handler
    const AddCountry = () => {
        navigate("/admin/add-payment-config-country");
    };
    const onSort = (colName, direction) => {
        setSortBy(colName);
        setSortDirection(direction);
    };
    const onSearch = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };
    return (_jsxs("div", { className: "", children: [_jsxs("div", { className: "flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: [_jsx("div", { className: "flex flex-1 max-w-lg", children: _jsx(Search, { search: filter, onChange: onSearch, onReset: () => setFilter("") }) }), _jsx("div", { className: "ml-4", children: _jsx(Tooltip, { content: "Material Tailwind", children: _jsx(Button, { text: "Add Country", className: "", variant: "lightBlue", onClick: AddCountry }) }) })] }), _jsx("div", { className: "flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto", children: _jsx(Table, { data: paymentConfigs, columns: columns.paymentConfig, loading: isLoading || isFetching, totalPages: data?.pagination?.totalPages || 1, currentPage: currentPage, onPageChange: setCurrentPage, handleUpdate: handleUpdate, itemsPerPage: itemsPerPage, onSort: onSort }) }), isOpen && selectedConfig && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg w-96", children: [_jsx("h2", { className: "text-xl font-bold text-center mb-4", children: selectedConfig.shortName }), _jsxs("div", { className: "flex justify-between", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("label", { className: "font-medium", children: "Wallet" }), _jsx("input", { type: "checkbox", checked: selectedConfig.wallet, onChange: handleCheckboxChange, name: "wallet", className: "h-4 w-4" })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("label", { className: "font-medium", children: "COD" }), _jsx("input", { type: "checkbox", checked: selectedConfig.COD, onChange: handleCheckboxChange, name: "COD", className: "h-4 w-4" })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("label", { className: "font-medium", children: "Stripe" }), _jsx("input", { type: "checkbox", checked: selectedConfig.stripe, onChange: handleCheckboxChange, name: "stripe", className: "h-4 w-4" })] })] }), _jsxs("div", { className: "flex justify-center gap-4 mt-5", children: [_jsx(Button, { onClick: closeModal, text: "Cancel", variant: "lightBlue" }), _jsx(Button, { onClick: handleUpdateConfig, text: "Update", variant: "primary" })] })] }) }))] }));
}
export default PaymentConfig;
