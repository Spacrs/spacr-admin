import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { columns } from "../../constant/Columns";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Search, ErrorMsg, Table, Button } from "../../components/Common";
import { useDeleteAdSpentMutation, useGetAdSpentListQuery, } from "../../store/slices/adSpentSlice/adSpentApi";
const CACList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [deleteId, setDeleteId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteCAC, { isLoading: isDeleting }] = useDeleteAdSpentMutation();
    const itemsPerPage = 10;
    const navigate = useNavigate();
    // Fetch CAC API
    // const fetchCACList = async () => {
    //   try {
    //     setLoading(true);
    //     setIsError(false);
    //     // "http://localhost:8000/api/v5/admin/cac"
    //     const res = await fetch(`${API.ADMIN.Ad_SPEND}?page=${currentPage}&limit=${itemsPerPage}&search=${filter}`, {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    //       },
    //     });
    //     const result = await res.json();
    //     console.log("CAC API Response:", result);
    //     if (res.ok && result.success) {
    //       const formattedData = (result.data || []).map((item: any) => {
    //         if (!item.Month) return item;
    //         const [year, month] = item.Month.split("-");
    //         const date = new Date(Number(year), Number(month) - 1);
    //         return {
    //           ...item,
    //           Month: date.toLocaleString("en-US", {
    //             month: "long",
    //             year: "numeric",
    //           }), // March 2026
    //         };
    //       });
    //       setCacData(formattedData);
    //       setTotalPages(result.pagination?.totalPages || 1);
    //     } else {
    //       setIsError(true);
    //       console.error(result.message || "Failed to fetch CAC data");
    //     }
    //   } catch (error: any) {
    //     setIsError(true);
    //     console.error(error.message || "Error fetching CAC data");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // useEffect(() => {
    //   fetchCACList();
    // }, [currentPage, filter]);
    const { data, isLoading, isError } = useGetAdSpentListQuery({
        page: currentPage,
        limit: itemsPerPage,
        search: filter,
    });
    const cacData = data?.data || [];
    const totalPages = data?.pagination?.totalPages || 1;
    if (isError) {
        return _jsx(ErrorMsg, { errorMsg: "Error loading CAC data" });
    }
    const onPageChange = (page) => {
        setCurrentPage(page);
    };
    const onSearch = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };
    const handleUpdate = (data) => {
        const cacId = data?.CACID;
        navigate(`/admin/edit-ad-spent/${cacId}`);
    };
    const handleDelete = (data) => {
        setDeleteId(data?.CACID);
        setShowConfirm(true);
    };
    // Optional delete API
    const handleConfirmDelete = async () => {
        if (!deleteId)
            return;
        try {
            await deleteCAC(deleteId).unwrap();
            toast.success("Ad Spent deleted successfully");
        }
        catch (err) {
            toast.error(err?.data?.message || "Error while deleting");
        }
        finally {
            setShowConfirm(false);
            setDeleteId(null);
        }
    };
    return (_jsxs("div", { children: [_jsx(ToastContainer, {}), _jsxs("div", { className: "flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: [_jsx("div", { className: "flex flex-1 max-w-lg", children: _jsx(Search, { search: filter, onChange: onSearch, placeholder: "Search by month...", onReset: () => setFilter("") }) }), _jsx("button", { className: "ml-4 bg-black text-white px-4 py-2 rounded", onClick: () => navigate("/admin/add-ad-spent"), children: "Add Ad Spent" })] }), _jsx("div", { className: "p-4 bg-gray-100 rounded-lg shadow-md", children: _jsx(Table, { data: cacData, columns: columns.cacColumn, loading: isLoading, totalPages: totalPages, currentPage: currentPage, onPageChange: onPageChange, itemsPerPage: itemsPerPage, handleUpdate: handleUpdate, handleDelete: handleDelete }) }), showConfirm && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center", children: [_jsx("p", { className: "mb-4 font-semibold text-lg", children: "Are you sure you want to delete this Ad Spent entry?" }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx(Button, { text: "Cancel", variant: "lightBlue", onClick: () => {
                                        setShowConfirm(false);
                                        setDeleteId(null);
                                    } }), _jsx(Button, { text: "Yes, Delete", variant: "danger", onClick: handleConfirmDelete })] })] }) }))] }));
};
export default CACList;
