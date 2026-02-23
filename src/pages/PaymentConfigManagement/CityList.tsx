import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useGetCitiesQuery } from "../../store/slices/paymentConfigSlice/apiSlice";
import {
  selectCities,
  setCities,
} from "../../store/slices/paymentConfigSlice/paymentConfigSlice";
import { Tooltip } from "@material-tailwind/react";
import { columns } from "../../constant/Columns";
import { Search, Table, Button } from "../../components/Common";
import { useLocation } from "react-router-dom"; //Added on 04-06-2025
import { toast, ToastContainer } from "react-toastify";
import ConfirmationModal from "../../components/Common/Modal/ConfirmationModal";

const CityList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const cities = useAppSelector(selectCities);
  const navigate = useNavigate();
  // Fetch country list from API
  const dispatch = useAppDispatch();

  const itemsPerPage = 10;

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filter, setFilter] = useState(""); // Search term
  const [isDeleteModalOpen, setIsOpenDeleteModal] = useState(false);
  const [configToDelete, setConfigToDelete] = useState<any>(null);

  const { data, isLoading, isFetching, isError, refetch } = useGetCitiesQuery({
    page: currentPage,
    limit: itemsPerPage,
    sort: sortDirection,
    sortBy: sortBy,
    search: filter !== "" ? filter : undefined,
  });

  //Added on 04-06-2025
  const location = useLocation();

  useEffect(() => {
    if (location.state?.triggerRefetch) {
      refetch();
    }
  }, [location.state, refetch]);
  //Added on 04-06-2025

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

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleUpdate = (config: any) => {
    navigate(`/admin/edit-city/${config.Id}`);
  };

  // const handleDelete = async (row: any) => {
  //   try {
  //     const Id  = row.Id;
  //     const access_token = localStorage.getItem('access_token');
  //     const response = await fetch(`https://api-v2.spa-cr.com/api/v2/city/${Id}`, {
  //       method: "DELETE",
  //       headers:{
  //         "Content-Type": "application/json",
  //         'Authorization': `Bearer ${access_token}`
  //       }
  //     });
  //     toast.success("City deleted successfully");
  //     setTimeout(() => {
  //       refetch();
  //     }, 3000);
  //   } catch (error) {
  //     toast.error("City could not be deleted");
  //     return error;
      
  //   }
  // }

  const handleDelete = (row: any) => {
    setConfigToDelete(row);
    setIsOpenDeleteModal(true);
  };

  const confirmDelete = async () => {
      if (!configToDelete) return;
      try {
        const { Id } = configToDelete;
        const access_token = localStorage.getItem('access_token');
        const response = await fetch(`https://api-v2.spa-cr.com/api/v2/city/${Id}`, {
          method: "DELETE",
          headers:{
            "Content-Type": "application/json",
            'Authorization': `Bearer ${access_token}`
          }
        });
        toast.success("City deleted successfully");
        setTimeout(() => {
          refetch();
        }, 3000);
      } catch (error) {
        toast.error("City could not be deleted");
      } finally {
        setIsOpenDeleteModal(false);
        setConfigToDelete(null);
      }
    };

  return (
    <div className="">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        {/* Search Bar */}
        <div className="flex flex-1 max-w-lg">
          <Search
            search={filter}
            onChange={onSearch}
            onReset={() => setFilter("")}
            placeholder="Search by name"
          />
        </div>

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
          columns={columns.city}
          loading={isLoading || isFetching}
          totalPages={data?.pagination?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          handleUpdate={handleUpdate}
          handleDelete = {handleDelete}
          onSort={onSort}
        />
      </div>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsOpenDeleteModal(false);
          setConfigToDelete(null);
        }}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete ${configToDelete?.name}?`}
      />
    </div>
  );
};

export default CityList;
