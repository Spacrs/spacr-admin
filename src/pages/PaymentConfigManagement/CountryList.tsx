import { useState, useEffect } from "react";
import Table from "../../components/Common/Table";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useGetPaymentConfigsQuery } from "../../store/slices/paymentConfigSlice/apiSlice";
import {
  selectCountries,
  setCountries,
} from "../../store/slices/paymentConfigSlice/paymentConfigSlice";
import Button from "../../components/Common/Button/Button";
import { Tooltip } from "@material-tailwind/react";

const columns = [
  { name: "name", Header: "Name", colName: "Default" },
  { name: "providers", Header: "Providers", colName: "Default" },
  { name: "createdAt", Header: "Created Date", colName: "Date" },
];

const CountryList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const countries = useAppSelector(selectCountries);
  const navigate = useNavigate();
  // Fetch country list from API
  const dispatch = useAppDispatch();

  const { data, isLoading, isError, refetch } = useGetPaymentConfigsQuery({
    page: currentPage,
    limit: 5,
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(setCountries(data.data));
    }
  }, [data, dispatch]);

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-4">
        Error loading payment config data
      </div>
    );
  }

  const AddCountry = () => {
    navigate("/admin/add-country");
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        {/* Search Bar */}
        <div className="flex flex-1 max-w-lg"></div>

        {/* Verification Status Filter */}
        <div className="ml-4">
          <Tooltip content="Material Tailwind">
            <Button
              text="Add Country"
              className=""
              type="lightBlue"
              onClick={AddCountry}
            />
          </Tooltip>
        </div>
      </div>

      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md">
        <Table
          data={countries}
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
