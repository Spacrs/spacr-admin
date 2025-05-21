import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useGetReferralCodesQuery } from "../../store/slices/orderSlice/apiSlice";
import { useAppDispatch } from "../../store/hooks";
import { setProducts, } from "../../store/slices/orderSlice/orderSlice";
import { useNavigate } from "react-router-dom";
import { columns } from "../../constant/Columns";
import { ErrorMsg, Table, Button } from "../../components/Common";
function ReferralCodeList() {
    const dispatch = useAppDispatch();
    const { data, isLoading, isFetching, isError, refetch } = useGetReferralCodesQuery();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
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
    const handleUpdate = (data) => {
        const productId = data.OrderID;
        navigate(`/admin/edit-suggested-product/${productId}`);
    };
    const handleToggleTrending = () => {
        setSelectedOrder((prevOrder) => ({
            ...prevOrder,
            IsTrending: !prevOrder.IsTrending,
        }));
    };
    const handleView = (data) => {
        const referralCodeId = data.referralID;
        if (data) {
            try {
                navigate(`/admin/referral-code-details/${referralCodeId}`);
            }
            catch (error) {
                console.log(error, "error in handleView");
            }
        }
        else {
            console.log("No selected order to view.");
        }
    };
    const onPageChange = (page) => {
        setCurrentPage(page);
    };
    const onSort = () => {
    };
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data?.data?.slice(startIndex, endIndex) || [];
    return (_jsxs("div", { className: "", children: [_jsx("div", { className: "flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: _jsxs("div", { className: "flex justify-between items-center w-full", children: [_jsx("div", { className: "ml-4" }), _jsx("div", { className: "ml-4", children: _jsx(Button, { text: "Add Referral Code", className: "mr-2", variant: "dark", type: "button", onClick: () => navigate("/admin/add-referral-code") }) })] }) }), _jsx("div", { className: "flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto", children: _jsx(Table, { data: paginatedData, columns: columns.referralCodeColumn, loading: isLoading || isFetching, totalPages: Math.ceil((data?.data?.length || 0) / itemsPerPage), currentPage: currentPage, onPageChange: onPageChange, handleUpdate: handleUpdate, handleView: handleView, itemsPerPage: itemsPerPage, onSort: onSort }) })] }));
}
export default ReferralCodeList;
