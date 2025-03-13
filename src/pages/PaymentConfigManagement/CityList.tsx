import { useState, useEffect } from "react";
import Table from "../../components/Common/Table";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    useGetPaymentConfigsQuery,
    useUpdatePaymentConfigMutation,
  } from "../../store/slices/paymentConfigSlice/apiSlice";
  import {
    setPaymentConfigs,
    updatePaymentConfigInList,
  } from "../../store/slices/paymentConfigSlice/paymentConfigSlice";
import Button from "../../components/Common/Button";
import { Tooltip } from "@material-tailwind/react";

  const columns = [
    
    { name: "name", Header: "Name", colName: "Default"},
    { name: "latitude", Header: "Latitude", colName: "Default" },
    { name: "longitude", Header: "Longitude", colName: "Default" },
    { name: "countryId", Header: "Country", colName: "Default" },

  ];

const CityList = () => {
  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedConfig, setSelectedConfig] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [updatePaymentConfig] = useUpdatePaymentConfigMutation();
  const navigate = useNavigate();

  // Fetch country list from API
  const dispatch = useAppDispatch();
  const { paymentConfigs } = useAppSelector(
    (state) => state.paymentConfigSlice
  );
  const { data, isLoading, isError,refetch } = useGetPaymentConfigsQuery({
    page: currentPage,
    limit:5
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(setPaymentConfigs(data.data));
    }
  }, [data, dispatch]);

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-4">
        Error loading payment config data
      </div>
    );
  }

  const AddCity = () => {
    navigate('/admin/add-city');
  }

  return (

    <div className="">
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        {/* Search Bar */}
        <div className="flex flex-1 max-w-lg">
          
        </div>

        {/* Verification Status Filter */}
        <div className="ml-4">
          <Tooltip content="Material Tailwind">
            <Button 
              text="Add City"
              className=""
              type="lightBlue"
              onClick={AddCity}
            />
          </Tooltip>
          
        </div>
      </div>
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md">
        <Table
          data={cities}
          columns={columns}
          loading={isLoading}
          totalPages={data?.pagination?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          handleUpdate={() => {}}
        />
      </div>
    </div>
  );
};

export default CityList;
