import { useState, useEffect } from "react";
import Table from "../../components/Common/Table";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useGetCitiesQuery } from "../../store/slices/paymentConfigSlice/apiSlice";
import {
  selectCities,
  setCities,
} from "../../store/slices/paymentConfigSlice/paymentConfigSlice";
import Button from "../../components/Common/Button";
import { Tooltip } from "@material-tailwind/react";

const columns = [
  { name: "name", Header: "Name", colName: "Default", sortable: true },
  { name: "latitude", Header: "Latitude", colName: "Default", sortable: true },
  {
    name: "longitude",
    Header: "Longitude",
    colName: "Default",
    sortable: true,
  },
  { name: "countryName", Header: "Country", colName: "Default" },
];

const CityList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const cities = useAppSelector(selectCities);
  const navigate = useNavigate();
  // Fetch country list from API
  const dispatch = useAppDispatch();

  const itemsPerPage = 10;

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const { data, isLoading, isFetching, isError } = useGetCitiesQuery({
    page: currentPage,
    limit: itemsPerPage,
    sort: sortDirection,
    sortBy: sortBy
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(setCities(data.data));
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
    navigate("/admin/add-city");
  };

  const onSort = (colName: string, direction: "asc" | "desc") => {
    setSortBy(colName);
    setSortDirection(direction);
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
              text="Add City"
              className=""
              variant="lightBlue"
              onClick={AddCity}
            />
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto">
        <Table
          data={cities}
          columns={columns}
          loading={isLoading || isFetching}
          totalPages={data?.pagination?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          handleUpdate={() => {}}
          onSort={onSort}
        />
      </div>
    </div>
  );
};

export default CityList;
