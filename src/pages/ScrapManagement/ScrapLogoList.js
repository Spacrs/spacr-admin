import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useGetScrapingIconsQuery } from "../../store/slices/orderSlice/apiSlice";
import { useAppDispatch } from "../../store/hooks";
import { setProducts, } from "../../store/slices/orderSlice/orderSlice";
import { useNavigate } from "react-router-dom";
import { columns } from "../../constant/Columns";
import { ErrorMsg, Table, Button } from "../../components/Common";
function ScrapLogoList() {
    const dispatch = useAppDispatch();
    const { data, isLoading, isFetching, isError, refetch } = useGetScrapingIconsQuery();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
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
        const productId = data.OrderID;
        if (data) {
            try {
                navigate(`/admin/product-details/${productId}`);
            }
            catch (error) {
                console.log(error, "error in handleView");
            }
        }
        else {
            console.log("No selected order to view.");
        }
    };
    const onPageChange = () => {
    };
    const onSort = () => {
    };
    const itemsPerPage = 10;
    return (_jsxs("div", { className: "", children: [_jsx("div", { className: "flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: _jsxs("div", { className: "flex justify-between items-center w-full", children: [_jsx("div", { className: "ml-4" }), _jsx("div", { className: "ml-4", children: _jsx(Button, { text: "Add Icon", className: "mr-2", variant: "dark", type: "button", onClick: () => navigate("/admin/add-scraping-icon") }) })] }) }), _jsx("div", { className: "flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto", children: _jsx(Table, { data: data?.data || [], columns: columns.scrapingIconsColumn, loading: isLoading || isFetching, totalPages: data?.pagination?.totalPages || 1, currentPage: 1, onPageChange: onPageChange, handleUpdate: handleUpdate, handleView: handleView, itemsPerPage: itemsPerPage, onSort: onSort }) })] }));
}
export default ScrapLogoList;
