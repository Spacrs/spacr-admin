import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useGetOrdersQuery, useUpdateOrderTrendMutation, } from "../../store/slices/orderSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setOrders, updateOrderList, } from "../../store/slices/orderSlice/orderSlice";
import { useNavigate } from "react-router-dom";
import { columns } from "../../constant/Columns";
import { Search, ErrorMsg, Table, Button } from "../../components/Common";
function Orders() {
    const dispatch = useAppDispatch();
    const orders = useAppSelector((state) => state.orderSlice.orders);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [sortBy, setSortBy] = useState("CreatedAt");
    const [sortDirection, setSortDirection] = useState("desc");
    const [filter, setFilter] = useState(""); // Search term
    const { data, isLoading, isFetching, isError } = useGetOrdersQuery({
        page: currentPage,
        limit: itemsPerPage,
        createdBy: "user",
        sort: sortDirection,
        sortBy: sortBy,
        search: filter !== "" ? filter : undefined,
    });
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [updateOrderTrend] = useUpdateOrderTrendMutation();
    const navigate = useNavigate();
    useEffect(() => {
        if (data?.data) {
            dispatch(setOrders(data.data.map((order) => ({
                ...order,
                image: order.medias?.[0]?.url || "",
            }))));
        }
    }, [data, dispatch]);
    if (isError) {
        return _jsx(ErrorMsg, { errorMsg: "Error loading orders" });
    }
    const handleUpdate = (order) => {
        setSelectedOrder(order);
        setIsOpen(true);
    };
    const handleToggleTrending = () => {
        setSelectedOrder((prevOrder) => ({
            ...prevOrder,
            IsTrending: !prevOrder.IsTrending,
        }));
    };
    const handleUpdateOrder = async () => {
        try {
            console.log(selectedOrder.IsTrending, "selectedOrder");
            await updateOrderTrend(selectedOrder).unwrap();
            dispatch(updateOrderList(selectedOrder));
            setIsOpen(false);
        }
        catch (error) {
            console.error("Error updating order:", error);
        }
    };
    const handleView = (data) => {
        console.log("data", data);
        if (data) {
            try {
                console.log(data.OrderId, "orderId selectedorder");
                navigate(`/admin/order-details/${data.OrderID}`);
            }
            catch (error) {
                console.log(error, "error in handleView");
            }
        }
        else {
            console.log("No selected order to view.");
        }
    };
    const closeModal = () => {
        setIsOpen(false);
        setSelectedOrder(null);
    };
    const onSort = (colName, direction) => {
        setSortBy(colName);
        setSortDirection(direction);
    };
    const onSearch = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };
    console.log(orders, "orders from redux");
    return (_jsxs("div", { className: "", children: [_jsx("div", { className: "flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: _jsx("div", { className: "flex flex-1 max-w-lg", children: _jsx(Search, { search: filter, onChange: onSearch, onReset: () => setFilter("") }) }) }), _jsx("div", { className: "flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto", children: _jsx(Table, { data: orders, columns: columns.orderColumn, loading: isLoading || isFetching, totalPages: data?.pagination?.totalPages || 1, currentPage: currentPage, onPageChange: setCurrentPage, handleUpdate: handleUpdate, handleView: handleView, itemsPerPage: itemsPerPage, onSort: onSort }) }), isOpen && selectedOrder && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg w-96", children: [_jsxs("h2", { className: "text-xl font-bold text-center mb-4", children: ["Order ID: ", selectedOrder.orderId] }), _jsxs("div", { className: "flex items-center justify-between mt-4", children: [_jsx("span", { className: "font-medium", children: "Is Trending" }), _jsx("button", { className: `w-16 h-8 flex items-center rounded-full p-1 transition ${selectedOrder.IsTrending ? "bg-green-500" : "bg-gray-300"}`, onClick: handleToggleTrending, children: _jsx("div", { className: `w-6 h-6 bg-white rounded-full shadow-md transform transition ${selectedOrder.IsTrending ? "translate-x-6" : "translate-x-0"}` }) })] }), _jsxs("div", { className: "flex justify-center gap-4 mt-5", children: [_jsx(Button, { className: "px-4 py-2 bg-gray-300 rounded-md", onClick: closeModal, text: "Cancel", variant: "lightBlue" }), _jsx(Button, { className: "px-4 py-2 bg-primary text-white rounded-md", onClick: handleUpdateOrder, text: "Update", variant: "primary" })] })] }) }))] }));
}
export default Orders;
