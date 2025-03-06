import { useEffect, useState } from "react";
import Table from "../../components/Common/Table";
import { useGetOrdersQuery, useUpdateOrderTrendMutation } from "../../store/slices/orderSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setOrders, updateOrderList } from "../../store/slices/orderSlice/orderSlice";
import { useNavigate } from "react-router-dom";
const columns = [
  { name: "ProductName", Header: "Product Name", colName: "Default" },
//   { name: "Descriptions", Header: "Descriptions", colName: "Default" },
{ name: "Price", Header: "Price", colName: "Default" },
{ name: "DeliveryReward", Header: "Delivery Reward", colName: "Default" },
{ name: "Quantity", Header: "Quantity", colName: "Default" },
{ name: "IsWithBox", Header: "Is With Box", colName: "Boolean" },

  { name: "Status", Header: "Status", colName: "Status" },
  { name: "IsTrending", Header: "Is Trending", colName: "Boolean" }, // New Column
  { name: "CreatedAt", Header: "Created At", colName: "Date" },
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
  const { data, isLoading, isError } = useGetOrdersQuery();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [updateOrderTrend] = useUpdateOrderTrendMutation();

  const navigate = useNavigate()

  useEffect(() => {
    if (data?.data) {
      dispatch(setOrders(data.data));
    }
  }, [data, dispatch]);

  if (isError) {
    return <div className="text-red-500 text-center mt-4">Error loading orders</div>;
  }

  const handleUpdate = (order: any) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrder((prevOrder: any) => ({
      ...prevOrder,
      status: e.target.value,
    }));
  };

  const handleToggleTrending = () => {
    setSelectedOrder((prevOrder: any) => ({
      ...prevOrder,
      IsTrending: !prevOrder.IsTrending,
    }));
  };

  const handleUpdateOrder = async () => {
    try {
        console.log(selectedOrder.IsTrending,"selectedOrder")
      await updateOrderTrend(selectedOrder).unwrap();
      dispatch(updateOrderList(selectedOrder));
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleView = (data:any) => {
    console.log("data", data)
    if (data) {
      try {
        console.log(data.OrderId, "orderId selectedorder");
        navigate(`/admin/order-details/${data.OrderID}`)
      } catch (error) {
        console.log(error, "error in handleView");
      }
    } else {
      console.log("No selected order to view.");
    }  
    
  }

  const closeModal = () => {
    setIsOpen(false);
    setSelectedOrder(null);
  };

  console.log(orders,"orders")

  return (
    <div className="">
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md">
        <Table
          data={orders}
          columns={columns}
          loading={isLoading}
          totalPages={data?.pagination?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          handleUpdate={handleUpdate}
          handleView={handleView}
        />
      </div>

      {isOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-center mb-4">
              Order ID: {selectedOrder.orderId}
            </h2>

            {/* Status Selection */}
            {/* <div className="flex flex-col mb-3">
              <label className="font-medium mb-1">Status</label>
              <select
                value={selectedOrder.status}
                onChange={handleStatusChange}
                className="p-2 border rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div> */}

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
              <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={closeModal}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-md" onClick={handleUpdateOrder}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
