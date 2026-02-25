import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { columns } from "../../constant/Columns";
import { Table, Button } from "../../components/Common";
import { useGetFeesQuery, useDeleteFeeMutation, } from "../../store/slices/feesSlice/apiSlice";
export default function FeesListPage() {
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const { data, isLoading, isFetching, refetch } = useGetFeesQuery({
        page: 1,
        limit: 10,
    });
    const [deleteFee] = useDeleteFeeMutation();
    useEffect(() => {
        refetch();
    }, []);
    const handleUpdate = (row) => {
        navigate(`/admin/edit-system-fees`);
    };
    const handleDelete = (id) => {
        setDeleteId(id);
        setShowConfirm(true);
    };
    const handleConfirmDelete = async () => {
        if (deleteId) {
            await deleteFee(deleteId);
            setDeleteId(null);
            setShowConfirm(false);
        }
    };
    return (_jsxs("div", { className: "", children: [_jsxs("div", { className: "flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: [_jsx(ToastContainer, {}), _jsxs("div", { className: "flex justify-between items-center w-full", children: [_jsx("div", { className: "flex flex-1 max-w-lg" }), _jsx("div", { className: "ml-4", children: _jsx(Button, { text: "Add Fee", className: "mr-2", variant: "dark", type: "button", onClick: () => navigate("/admin/add-system-fees"), disabled: !!(data?.data && data.data.length > 0) }) })] })] }), _jsx("div", { className: "flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto", children: _jsx(Table, { data: data?.data || [], columns: columns.systemFees, loading: isLoading || isFetching, totalPages: data?.pagination?.totalPages || 1, currentPage: 1, onPageChange: () => { }, handleUpdate: handleUpdate, itemsPerPage: 10 }) }), showConfirm && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center", children: [_jsx("p", { className: "mb-4 font-semibold text-lg", children: "Are you sure you want to delete this fee?" }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx(Button, { text: "Cancel", variant: "lightBlue", onClick: () => {
                                        setShowConfirm(false);
                                        setDeleteId(null);
                                    } }), _jsx(Button, { text: "Yes, Delete", variant: "danger", onClick: handleConfirmDelete })] })] }) }))] }));
}
