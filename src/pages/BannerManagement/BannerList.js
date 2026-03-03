import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useGetBannersQuery } from "../../store/slices/bannerSlice/apiSlice";
import { useAppDispatch } from "../../store/hooks";
import { setProducts, } from "../../store/slices/orderSlice/orderSlice";
import { useNavigate } from "react-router-dom";
import { columns } from "../../constant/Columns";
import { ErrorMsg, Table, Button } from "../../components/Common";
import { toast, ToastContainer } from "react-toastify";
function BannerList() {
    const dispatch = useAppDispatch();
    // const { data, isLoading, isFetching, isError, refetch } = useGetScrapingIconsQuery();
    const itemsPerPage = 10;
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, isFetching, isError, refetch } = useGetBannersQuery({
        page: currentPage, limit: itemsPerPage, search: filter !== "" ? filter : undefined,
    });
    const [iconID, setDeleteId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        refetch(); // Refetch data when the component mounts
    }, [refetch]);
    useEffect(() => {
        return () => {
            dispatch(setProducts([])); // Clear products when the component unmounts
        };
    }, [dispatch]);
    if (isError) {
        return _jsx(ErrorMsg, { errorMsg: "Error loading orders" });
    }
    // const handleUpdate = (product: any) => {
    //   setSelectedOrder(product);
    //   setIsOpen(true);
    // };
    const handleToggleTrending = () => {
        setSelectedOrder((prevOrder) => ({
            ...prevOrder,
            IsTrending: !prevOrder.IsTrending,
        }));
    };
    // const handleView = (data: any) => {
    //   const productId = data.OrderID;
    //   if (data) {
    //     try {
    //       navigate(`/admin/product-details/${productId}`);
    //     } catch (error) {
    //       console.log(error, "error in handleView");
    //     }
    //   } else {
    //     console.log("No selected order to view.");
    //   }
    // };
    const onPageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const onSort = () => {
    };
    const onSearch = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };
    const handleDelete = (data) => {
        setDeleteId(data?.iconID);
        setShowConfirm(true);
    };
    const handleView = (banner) => {
        if (banner?.bannerID) {
            navigate(`/admin/banner-details/${banner.bannerID}`);
        }
        else {
            console.warn("No bannerID found for selected banner.");
        }
    };
    const handleUpdate = (data) => {
        const Id = data.bannerID;
        navigate(`/admin/edit-banner/${Id}`);
    };
    const handleConfirmDelete = async () => {
        if (!iconID)
            return;
        try {
            const access_token = localStorage.getItem("access_token");
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/admin/delete-marketplace/${iconID}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            });
            const result = await res.json();
            if (!res.ok)
                throw new Error(result.message || "Failed to delete.");
            toast.success("Marketplace deleted successfully");
            refetch();
        }
        catch (err) {
            toast.error(err.message || "Error while deleting");
        }
        finally {
            setShowConfirm(false);
            setDeleteId(null);
        }
    };
    return (_jsxs("div", { className: "", children: [_jsxs("div", { className: "flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: [_jsx(ToastContainer, {}), _jsxs("div", { className: "flex justify-between items-center w-full", children: [_jsx("div", { className: "flex flex-1 max-w-lg" }), _jsx("div", { className: "ml-4", children: _jsx(Button, { text: "Add Banner", className: "mr-2", variant: "dark", type: "button", onClick: () => navigate("/admin/add-banner") }) })] })] }), _jsx("div", { className: "flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto", children: _jsx(Table, { data: data?.data || [], columns: columns.bannerListColumn, loading: isLoading || isFetching, totalPages: data?.pagination?.totalPages || 1, currentPage: currentPage, onPageChange: onPageChange, handleView: handleView, handleUpdate: handleUpdate, itemsPerPage: itemsPerPage, onSort: onSort }) }), showConfirm && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center", children: [_jsx("p", { className: "mb-4 font-semibold text-lg", children: "Are you sure you want to delete this marketplace?" }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx(Button, { text: "Cancel", variant: "lightBlue", onClick: () => {
                                        setShowConfirm(false);
                                        setDeleteId(null);
                                    } }), _jsx(Button, { text: "Yes, Delete", variant: "danger", onClick: handleConfirmDelete })] })] }) }))] }));
}
export default BannerList;
