import { useEffect, useState } from "react";
import {
  useGetScrapingIconsQuery
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

function ScrapLogoList() {
  const dispatch = useAppDispatch();

  const { data, isLoading, isFetching, isError, refetch } = useGetScrapingIconsQuery();

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
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

  const onPageChange = () => {

  }

  const onSort = () => {

  }

  const itemsPerPage = 10;


  return (
    <div className="">
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        {/* Search Bar */}
        <div className="flex justify-between items-center w-full">
        <div className="ml-4"></div>
          
          <div className="ml-4">
            <Button
              text="Add Icon"
              className="mr-2"
              variant="dark"
              type="button"
              onClick={() => navigate("/admin/add-scraping-icon")}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto">
        <Table
          data={data?.data || []}
          columns={columns.scrapingIconsColumn}
          loading={isLoading || isFetching}
          totalPages={data?.pagination?.totalPages || 1}
          currentPage={1}
          onPageChange={onPageChange}
          handleUpdate={handleUpdate}
          handleView={handleView}
          itemsPerPage={itemsPerPage}
          onSort={onSort}
        />
      </div>

      
    </div>
  );
}

export default ScrapLogoList;
