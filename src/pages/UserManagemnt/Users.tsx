import { useEffect, useState } from "react";
import {
  useGetUsersQuery,
  useUpdateUserInfoMutation,
} from "../../store/slices/userSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUsers, resetUsers } from "../../store/slices/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
import { columns } from "../../constant/Columns";
import {
  Search,
  ErrorMsg,
  ConfirmationModal,
  Table,
} from "../../components/Common";

const Users = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, isloading } = useAppSelector((state) => state.userSlice);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(""); // Search term
  const [verificationStatus, setVerificationStatus] = useState(""); // Verification filter
  const [isModalOpen, setIsModalOpen] = useState(false); // Track if modal is open
  const [userToUpdate, setUserToUpdate] = useState<any>(null); // Store the user whose status is being changed

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Pass both filters (search and verified) to the API call
  const { data, isLoading, isFetching, isError, refetch } = useGetUsersQuery({
    page: currentPage,
    limit: itemsPerPage,
    verified: verificationStatus !== "" ? verificationStatus : undefined,
    search: filter !== "" ? filter : undefined,
    sort: sortDirection,
    sortBy: sortBy,
  });

  const [updateUserStatus] = useUpdateUserInfoMutation();

  useEffect(() => {
    if (data?.data) {
      dispatch(setUsers(data.data));
    }
    return () => {
      dispatch(resetUsers({ users: [] }));
    };
  }, [data, dispatch]);

  useEffect(() => {
    refetch();
  }, [isloading, refetch]);

  if (isError) {
    return <ErrorMsg errorMsg="Error loading user data" />;
  }

  const handleToggleStatus = (val: any) => {
    setUserToUpdate(val); // Set the user to update
    setIsModalOpen(true); // Open the modal
  };

  const handleConfirmToggleStatus = async () => {
    if (userToUpdate) {
      const newStatus =
        userToUpdate.Status === "active" ? "inactive" : "active";

      try {
        await updateUserStatus({
          userId: userToUpdate.UserID,
          status: newStatus,
        }).unwrap();
        refetch(); // Refetch users after updating status
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
    setIsModalOpen(false); // Close the modal after confirmation
  };

  const handleView = (val: any) => {
    navigate(`/admin/users-details/${val.UserID}`);
  };

  const onSort = (colName: string, direction: "asc" | "desc") => {
    setSortBy(colName);
    setSortDirection(direction);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col">
      {/* Filters Section */}
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        {/* Search Bar */}
        <div className="flex flex-1 max-w-lg">
          <Search
            search={filter}
            onChange={onSearch}
            onReset={() => setFilter("")}
          />
        </div>

        {/* Verification Status Filter */}
        <div className="ml-4">
          <select
            className="px-4 py-2 border border-gray-300 rounded-md"
            value={verificationStatus}
            onChange={(e) => setVerificationStatus(e.target.value)} // Update verification status filter
          >
            <option value="">All Users</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto">
        <Table
          data={users}
          columns={columns.user}
          loading={isLoading || isFetching}
          totalPages={data?.pagination?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          handleToggleStatus={handleToggleStatus}
          handleView={handleView}
          itemsPerPage={itemsPerPage}
          onSort={onSort}
        />
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmToggleStatus}
        message={`Are you sure you want to ${
          userToUpdate?.Status === "active" ? "deactivate" : "activate"
        } this user?`}
      />
    </div>
  );
};

export default Users;
