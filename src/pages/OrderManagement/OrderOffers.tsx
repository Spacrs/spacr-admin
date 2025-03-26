import { useEffect, useState } from "react";
import Table from "../../components/Common/Table";
import { useGetOrderOffersQuery } from "../../store/slices/orderSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setOrderOffers } from "../../store/slices/orderSlice/orderSlice";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Common/Button";
import ErrorMsg from "../../components/ErrorComponent/ErrorMsg";

const columns = [
  { name: "userProfileImage", Header: "Profile Image", colName: "Image" },
  { name: "offeredByName", Header: "Name", colName: "Default" },
  { name: "offeredByEmail", Header: "Email", colName: "Default" },
  { name: "OfferedPrice", Header: "Offered Price", colName: "Default" },
  { name: "Message", Header: "Message", colName: "Default" },
  { name: "Status", Header: "Status", colName: "Default" },
  { name: "CreatedAt", Header: "Offer Made At", colName: "Date" },
];

function OrderOffers() {
  const dispatch = useAppDispatch();
  const { orderId } = useParams();
  const offers = useAppSelector((state) => state.orderSlice.offers);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data, isLoading, isFetching, isError } = useGetOrderOffersQuery({
    page: currentPage,
    limit: itemsPerPage,
    orderId: orderId,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data) {
      dispatch(setOrderOffers(data.data));
    }
  }, [data, dispatch]);

  if (isError) {
    return <ErrorMsg errorMsg="Error in loading offers" />;
  }

  return (
    <div className="">
      <div className="flex justify-end items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
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
          data={offers}
          columns={columns}
          loading={isLoading || isFetching}
          totalPages={data?.pagination?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
}

export default OrderOffers;
