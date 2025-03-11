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

  const columns = [
    
    { name: "name", Header: "Name", colName: "Default"},
    { name: "providers", Header: "Providers", colName: "Default" },
    { name: "createdAt", Header: "Created Date", colName: "Date" },
    
  ];

const CountryList = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch country list from API
  const dispatch = useAppDispatch();
  const { paymentConfigs } = useAppSelector(
    (state) => state.paymentConfigSlice
  );
  const { data, isLoading, isError,refetch } = useGetPaymentConfigsQuery({
    page: currentPage,
    limit:5
  });

  const [selectedConfig, setSelectedConfig] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [updatePaymentConfig] = useUpdatePaymentConfigMutation(); // ✅ Call the hook at the top level
  const navigate = useNavigate();

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

//   const columns = [
//     { name: "shortName", Header: "Name", colName: "Default" },
//     { name: "providers", Header: "Providers", colName: "Default" },
//     { name: "createdAt", Header: "Created At", colName: "Date" },
//     {
//       name: "action",
//       Header: "Actions",
//       colName: "Actions",
//       Actions: ["UPDATE"],
//     },
//   ];

  return (
    <div className="">
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md">
        <Table
          data={paymentConfigs}
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

export default CountryList;
