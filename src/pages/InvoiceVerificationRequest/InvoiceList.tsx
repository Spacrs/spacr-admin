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
import { useGetInvoiceListQuery } from "../../store/slices/invoiceVerificationSlice/invoiceSlice";

function InvoiceList() {
  const dispatch = useAppDispatch();
  const orders: ProductData[] = useAppSelector(
    (state) => state.orderSlice.orders
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [sortBy, setSortBy] = useState("CreatedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filter, setFilter] = useState(""); // Search term
  const [orderStatus, setOrderStatus] = useState(""); // Order status filter
  // const [previewInvoiceUrl, setPreviewInvoiceUrl] = useState<string | null>(null);

  const { data, isLoading, isFetching, isError, refetch } = useGetInvoiceListQuery({
    page: currentPage,
    limit: itemsPerPage,
    createdBy: "user",
    sort: sortDirection,
    sortBy: sortBy,
    search: filter !== "" ? filter : undefined,
    status: orderStatus || undefined,
  });
  console.log("invoice Data", data);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [updateOrderTrend] = useUpdateOrderTrendMutation();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<ProductData | null>(null);
  const [invoiceList, setInvoiceList] = useState<ProductData[]>([]);


  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data) {
      // dispatch(
        setInvoiceList(
          data.data.map((order: ProductData) => ({
            ...order,
            image: order.orderImages?.[0]?.url || "",
            ProductName:
            order.ProductName?.length > 40
              ? `${order.ProductName.slice(0, 40)}...`
              : order.ProductName,
            invoice: order.receiptMedia?.[0]?.url || "",
          }))
        )
      // );
    }
  }, [data]);


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
    console.log("data___", data);
    if (data) {
      try {
        console.log(data.OrderId, "orderId selectedorder");
        navigate(`/admin/invoice-details/${data.OrderID}`);
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

  const handleConfirmDelete = {

  }




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
      </div>

      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto">
        <Table
          data={invoiceList}
          columns={columns.invoiceListColumn}
          loading={isLoading || isFetching}
          totalPages={data?.pagination?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          // handleUpdate={handleUpdate} // 06-03-2026
          handleView={handleView}
          // handleDelete={handleDelete}
          itemsPerPage={itemsPerPage}
          onSort={onSort}
          // handleUpdateNotification={(row) => setPreviewInvoiceUrl(row.invoice)}
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
                // onClick={handleConfirmDelete}
                text="Confirm Delete"
                variant="danger"
              />
            </div>
          </div>
        </div>
      )}


      {/* Invoice Image Preview Modal */}
      {/* {previewInvoiceUrl && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 animate-fade-in">
          <div className="relative bg-white p-4 rounded-lg shadow-2xl max-w-2xl w-full mx-4 flex flex-col items-center">
            <button 
              onClick={() => setPreviewInvoiceUrl(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold transition-all"
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 w-full border-b pb-2">Invoice Preview</h3>
            <div className="w-full flex justify-center items-center overflow-hidden bg-gray-50 rounded border p-2">
              {previewInvoiceUrl ? (
                <img 
                  src={previewInvoiceUrl} 
                  alt="Invoice Document" 
                  className="max-h-[70vh] object-contain rounded"
                />
              ) : (
                <p className="text-gray-400 p-6">No image available for this invoice.</p>
              )}
            </div>
          </div>
        </div>
      )} */}

    </div>
  );
}

export default InvoiceList;
