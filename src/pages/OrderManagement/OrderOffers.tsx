import { useEffect, useState } from "react";
import Table from "../../components/Common/Table";
import {
    useGetOrderOffersQuery,
  useUpdateOrderTrendMutation,
} from "../../store/slices/orderSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setOrderOffers
} from "../../store/slices/orderSlice/orderSlice";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Common/Button";

const columns = [
  { name: "CustomFees", Header: "Custom Fees", colName: "Default" },
  //   { name: "Descriptions", Header: "Descriptions", colName: "Default" },
  { name: "Message", Header: "Message", colName: "Default" },
  { name: "OfferedPrice", Header: "Offered Price", colName: "Default" },

  { name: "Status", Header: "Status", colName: "Default" },
  { name: "CreatedAt", Header: "Created At", colName: "Date" },
  {
    name: "action",
    Header: "Actions",
    colName: "Actions",
    Actions: ["UPDATE", "VIEW"],
  },
];

function OrderOffers() {
  const dispatch = useAppDispatch();
  const { orderId } = useParams();
  const orders = useAppSelector((state) => state.orderSlice.orders);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { data, isLoading, isError } = useGetOrderOffersQuery(orderId);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  console.log("orderiidd", orderId)

  useEffect(() => {
    if (data?.data) {
      dispatch(setOrderOffers(data.data));
    }
  }, [data, dispatch]);

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-4">Error loading orders</div>
    );
  }

  const handleUpdate = (order: any) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  return (
    <div className="">
        <div className="flex justify-start items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
                {/* Search Bar */}
                {/* <div className="flex flex-1 max-w-lg"></div> */}

                {/* Verification Status Filter */}
                <div className="ml-4">
                
                    <Button
                        text="Back"
                        className="mr-2"
                        type="lightBlue"
                        onClick={() => navigate("/admin/order-details/" + orderId)}
                    />
          
                </div>
            </div>
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto">
        <Table
          data={orders}
          columns={columns}
          loading={isLoading}
          totalPages={data?.pagination?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={() => {}}
          handleUpdate={() => {}}
          handleView={() => {}}
          itemsPerPage={itemsPerPage}
        />
      </div>

      
    </div>
  );
}

export default OrderOffers;
