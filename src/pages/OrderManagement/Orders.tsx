import { useEffect, useState } from "react";
import Table from "../../components/Common/Table";
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
import Button from "../../components/Common/Button";
import ErrorMsg from "../../components/ErrorComponent/ErrorMsg";
import Search from "../../components/Common/Search/index";

const columns = [
  {
    name: "ProductName",
    Header: "Product Name",
    colName: "Default",
    sortable: true,
  },
  { name: "Price", Header: "Price", colName: "Default", sortable: true },
  {
    name: "DeliveryReward",
    Header: "Delivery Reward",
    colName: "Default",
    sortable: true,
  },
  { name: "Quantity", Header: "Quantity", colName: "Default", sortable: true },
  { name: "IsWithBox", Header: "Is With Box", colName: "Boolean" },

  { name: "Status", Header: "Status", colName: "Status" },
  // { name: "IsTrending", Header: "Is Trending", colName: "Boolean" },
  { name: "CreatedAt", Header: "Created At", colName: "Date", sortable: true },
  {
    name: "action",
    Header: "Actions",
    colName: "Actions",
    Actions: ["UPDATE", "VIEW"],
  },
];

function Orders() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orderSlice.orders);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [sortBy, setSortBy] = useState("CreatedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const { data, isLoading, isFetching, isError } = useGetOrdersQuery({
    page: currentPage,
    limit: itemsPerPage,
    createdBy: "user",
    sort: sortDirection,
    sortBy: sortBy,
  });

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [updateOrderTrend] = useUpdateOrderTrendMutation();

  const [filter, setFilter] = useState(""); // Search term

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data) {
      dispatch(setOrders(data.data));
    }
  }, [data, dispatch]);

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

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        {/* Search Bar */}
        <div className="flex flex-1 max-w-lg">
          <Search
            search={filter}
            onChange={(e) => setFilter(e.target.value)}
            onReset={() => setFilter("")}
          />
        </div>

        {/* Verification Status Filter */}
        <div className="ml-4"></div>
      </div>

      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto">
        <Table
          // data={orders}
          data={orders.filter((order: any) =>
            order.ProductName?.toLowerCase().includes(filter.toLowerCase())
          )}
          columns={columns}
          loading={isLoading || isFetching}
          totalPages={data?.pagination?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          handleUpdate={handleUpdate}
          handleView={handleView}
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
                type="lightBlue"
              />

              <Button
                className="px-4 py-2 bg-primary text-white rounded-md"
                onClick={handleUpdateOrder}
                text="Update"
                type="primary"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
