import { useEffect, useState } from "react";
import {
  useGetOrdersQuery,
  useUpdateOrderTrendMutation,
} from "../../store/slices/orderSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setOrders,
  updateOrderList,
} from "../../store/slices/orderSlice/orderSlice";
import { useNavigate } from "react-router-dom";
import { ProductData } from "../../types/ProductData.types";
import { columns } from "../../constant/Columns";
import { Search, ErrorMsg, Table, Button } from "../../components/Common";
import { toast, ToastContainer } from "react-toastify";
import API from "../.././constants/apiEndpoints";

function Orders() {
  const dispatch = useAppDispatch();
  const orders: ProductData[] = useAppSelector(
    (state) => state.orderSlice.orders
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [sortBy, setSortBy] = useState("CreatedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filter, setFilter] = useState(""); // Search term
  // added on 07-04-2026 (RP)
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  // applied states (API call ke liye)
  const [appliedFromDate, setAppliedFromDate] = useState("");
  const [appliedToDate, setAppliedToDate] = useState("");
  const [orderStatus, setOrderStatus] = useState(""); // Order status filter

  const { data, isLoading, isFetching, isError, refetch } = useGetOrdersQuery({
    page: currentPage,
    limit: itemsPerPage,
    createdBy: "user",
    sort: sortDirection,
    sortBy: sortBy,
    search: filter !== "" ? filter : undefined,
    // added on 07-04-2026 (RP)
    fromDate: appliedFromDate || undefined,
    toDate: appliedToDate || undefined,
    status: orderStatus || undefined,
  });

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [updateOrderTrend] = useUpdateOrderTrendMutation();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<ProductData | null>(null);


  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data) {
      dispatch(
        setOrders(
          data.data.map((order: ProductData) => ({
            ...order,
            image: order.medias?.[0]?.url || "",
            //Added on 26-05-2025
            ProductName:
            order.ProductName?.length > 40
              ? `${order.ProductName.slice(0, 40)}...`
              : order.ProductName,
            //Added on 26-05-2025  
          }))
        )
      );
    }
  }, [data, dispatch]);

  // added on 07-04-2026 (RP)
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const from = params.get("fromDate");
    const to = params.get("toDate");

    if (from && to) {
      setFromDate(from);
      setToDate(to);

      // Apply directly
      setAppliedFromDate(from);
      setAppliedToDate(to);
    }

    const status = params.get("status");
    if (status) {
      setOrderStatus(status);
      console.log("Applying order status filter from URL:", status);
    }
  }, [location.search]);

  if (isError) {
    return <ErrorMsg errorMsg="Error loading orders" />;
  }

  const handleUpdate = (order: any) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const handleToggleTrending = () => {
    setSelectedOrder((prevOrder: any) => ({
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
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleView = (data: any) => {
    console.log("data", data);
    if (data) {
      try {
        console.log(data.OrderId, "orderId selectedorder");
        navigate(`/admin/order-details/${data.OrderID}`);
      } catch (error) {
        console.log(error, "error in handleView");
      }
    } else {
      console.log("No selected order to view.");
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedOrder(null);
  };

  const onSort = (colName: string, direction: "asc" | "desc") => {
    setSortBy(colName);
    setSortDirection(direction);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = (order: ProductData) => {
    setOrderToDelete(order);
    setDeleteConfirmOpen(true);
  };


  console.log(orders, "orders from redux");

  const handleConfirmDelete = async () => {
  if (!orderToDelete) return;
  console.log(orderToDelete, "orderToDelete");

  try {
    const access_token = localStorage.getItem('access_token');
    console.log('tokken', access_token);
    const res = await fetch(`${API.ADMIN.DELETE_ORDER_FROM_ADMIN}/${orderToDelete.OrderID}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      }  
    });

    const result = await res.json();

    if (res.ok) {
      toast.success("Order deleted successfully!");
      await refetch();
      setDeleteConfirmOpen(false);
      setOrderToDelete(null);
    } else {
      toast.error(result.message || "This order could not be deleted!");
    }
    await refetch();

    setDeleteConfirmOpen(false);
    setOrderToDelete(null);
  } catch (err) {
    console.error("Failed to delete:", err);
  }
  };

  // added on 07-04-2026 (RP)
  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value);
    setCurrentPage(1);
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
    setCurrentPage(1);
  };

  const handleApplyFilters = () => {
    setAppliedFromDate(fromDate);
    setAppliedToDate(toDate);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilter("");
    setFromDate("");
    setToDate("");
    setAppliedFromDate("");
    setAppliedToDate("");
    setCurrentPage(1);
    setOrderStatus("");
  };

  const handleExport = async () => {
    try {
      const params = new URLSearchParams();

      if (appliedFromDate) params.append("fromDate", appliedFromDate);
      if (appliedToDate) params.append("toDate", appliedToDate);
      if (orderStatus) params.append("status", orderStatus);
      if (filter) params.append("search", filter);

      const response = await fetch(
        `${API.ADMIN.EXPORT_ORDERS}?${params.toString()}`,
        // "http://localhost:8000/api/v5/admin/export-orders?" + params.toString(),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "orders.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed", error);
    }
  };


  return (
    <div className="flex flex-col">
      <ToastContainer />

      <div className="flex flex-wrap justify-between items-center gap-4 mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        
        {/* Search */}
        <div className="flex flex-1 max-w-lg">
          <Search
            search={filter}
            onChange={onSearch}
            onReset={() => setFilter("")}
            placeholder="Search by name..."
          />
        </div>

        {/* added 07-04-2026 (RP) */}
        {/* From Date */}
        <input
          type="date"
          value={fromDate}
          onChange={handleFromDateChange}
          className="px-3 py-2 border border-gray-300 rounded-md"
        />

        {/* To Date */}
        <input
          type="date"
          value={toDate}
          onChange={handleToDateChange}
          className="px-3 py-2 border border-gray-300 rounded-md"
        />

        {/* Order status filter */}
        { <select
          value={orderStatus}
          onChange={(e) => setOrderStatus(e.target.value)} 
          className="px-4 py-2 border border-gray-300 rounded-md"
        >    
          <option value="">All Orders</option>
          <option value="LIVE">Live</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="PURCHASED">Purchased</option>
          <option value="READY_TO_RECEIVE">Ready to Receive</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="DELIVERED">Delivered</option>
        </select> } 

        {/* Apply */}
        <button
          onClick={handleApplyFilters}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Apply Filter
        </button>

        {/* Reset */}
        <button
          onClick={handleResetFilters}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Reset Filters
        </button>

        {/* Export */}
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Export Excel
        </button>

      </div>

      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto">
        <Table
          data={orders}
          columns={columns.orderColumn}
          loading={isLoading || isFetching}
          totalPages={data?.pagination?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          // handleUpdate={handleUpdate} // 06-03-2026
          handleView={handleView}
          handleDelete={handleDelete}
          itemsPerPage={itemsPerPage}
          onSort={onSort}
        />
      </div>

      {isOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-center mb-4">
              Order ID: {selectedOrder.orderId}
            </h2>
            {/* Toggle IsTrending */}
            <div className="flex items-center justify-between mt-4">
              <span className="font-medium">Is Trending</span>
              <button
                className={`w-16 h-8 flex items-center rounded-full p-1 transition ${
                  selectedOrder.IsTrending ? "bg-green-500" : "bg-gray-300"
                }`}
                onClick={handleToggleTrending}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${
                    selectedOrder.IsTrending ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex justify-center gap-4 mt-5">
              <Button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={closeModal}
                text="Cancel"
                variant="lightBlue"
              />

              <Button
                className="px-4 py-2 bg-primary text-white rounded-md"
                onClick={handleUpdateOrder}
                text="Update"
                variant="primary"
              />
            </div>
          </div>
        </div>
      )}

      {deleteConfirmOpen && orderToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-center mb-4">
              Are you sure you want to delete this order?
            </h2>

            <div className="flex justify-center gap-4 mt-5">
              <Button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => {
                  setDeleteConfirmOpen(false);
                  setOrderToDelete(null);
                }}
                text="Cancel"
                variant="lightBlue"
              />

              <Button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={handleConfirmDelete}
                text="Confirm Delete"
                variant="danger"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Orders;
