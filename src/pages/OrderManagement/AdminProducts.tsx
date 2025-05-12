import { useEffect, useState } from "react";
import {
  useGetOrdersQuery,
  useUpdateOrderTrendMutation,
} from "../../store/slices/orderSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setProducts,
  updateProductList,
} from "../../store/slices/orderSlice/orderSlice";
import { useNavigate } from "react-router-dom";
import { ProductData } from "../../types/ProductData.types";
import { columns } from "../../constant/Columns";
import { Search, ErrorMsg, Table, Button } from "../../components/Common";

function AdminOrders() {
  const dispatch = useAppDispatch();
  const products: ProductData[] = useAppSelector(
    (state) => state.orderSlice.products
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortBy, setSortBy] = useState("CreatedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filter, setFilter] = useState(""); // Search term

  const { data, isLoading, isFetching, isError, refetch } = useGetOrdersQuery({
    page: currentPage,
    limit: itemsPerPage,
    createdBy: "admin",
    sort: sortDirection,
    sortBy: sortBy,
    search: filter !== "" ? filter : undefined,
  });

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [updateOrderTrend] = useUpdateOrderTrendMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data) {
      dispatch(
        setProducts(
          data.data.map((product: ProductData) => ({
            ...product,
            image: product.medias?.[0]?.url || "",
          }))
        )
      );
    }
  }, [data, dispatch]);

  useEffect(() => {
    refetch(); // Refetch data when the component mounts
  }, [refetch]);

  useEffect(() => {
    return () => {
      dispatch(setProducts([])); // Clear products when the component unmounts
    };
  }, [dispatch]);

  if (isError) {
    return <ErrorMsg errorMsg="Error loading orders" />;
  }

  // const handleUpdate = (product: any) => {
  //   setSelectedOrder(product);
  //   setIsOpen(true);
  // };
  const handleUpdate = (data: any) => {
    const productId = data.OrderID;
    navigate(`/admin/edit-suggested-product/${productId}`);
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
      dispatch(updateProductList(selectedOrder));
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleView = (data: any) => {
    const productId = data.OrderID;
    if (data) {
      try {
        navigate(`/admin/product-details/${productId}`);
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

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    refetch(); // Refetch data when the page changes
  };

  const onSort = (colName: string, direction: "asc" | "desc") => {
    setSortBy(colName);
    setSortDirection(direction);
    refetch();
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
    setCurrentPage(1);
  }

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        {/* Search Bar */}
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-1 max-w-lg">
            <Search
              search={filter}
              onChange={onSearch}
              placeholder="Search by name..."
              onReset={() => setFilter("")}
            />
          </div>
          
          <div className="ml-4">
            <Button
              text="Add Product"
              className="mr-2"
              variant="dark"
              type="button"
              onClick={() => navigate("/admin/add-suggested-product")}
            />
            <Button
              text="Rearrange"
              className="mr-2"
              variant="dark"
              type="button"
              onClick={() => navigate("/admin/rearrage-suggested-product-list")}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto">
        <Table
          data={products}
          columns={columns.productColumn}
          loading={isLoading || isFetching}
          totalPages={data?.pagination?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={onPageChange}
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
    </div>
  );
}

export default AdminOrders;
