import { useEffect, useState } from "react";
import Table from "../../components/Common/Table";
import {
  useGetUsersQuery,
  useUpdateUserInfoMutation,
} from "../../store/slices/userSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUsers, resetUsers } from "../../store/slices/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/Common/Modal/ConfirmationModal"; // Import the modal component

const columns = [
  { name: "ProfilePictureURL", Header: "Profile Image", colName: "Image" },
  { name: "FullName", Header: "Name", colName: "Default" },
  { name: "Email", Header: "Email", colName: "Default" },
  { name: "Type", Header: "Type", colName: "Default" },
  { name: "Status", Header: "Status", colName: "Status" },
  { name: "Verified", Header: "Verification Status", colName: "Status" },
  { name: "CreatedAt", Header: "CreatedAt", colName: "Date" },
  {
    name: "action",
    Header: "Action",
    colName: "KebabMenu",
    options: [
      { label: "Activate", value: "active", type: "toggle" },
      { label: "Deactivate", value: "inactive", type: "toggle" },
      { label: "View Profile", value: "", type: "button" },
    ],
  },
];

function Users() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users,isloading } = useAppSelector((state) => state.userSlice);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(""); // Search term
  const [verificationStatus, setVerificationStatus] = useState(""); // Verification filter
  const [isModalOpen, setIsModalOpen] = useState(false); // Track if modal is open
  const [userToUpdate, setUserToUpdate] = useState<any>(null); // Store the user whose status is being changed

  // Pass both filters (search and verified) to the API call
  const { data, isLoading, isError, refetch } = useGetUsersQuery({
    page: currentPage,
    verified: verificationStatus !== "" ? verificationStatus : undefined,
    search: filter !== "" ? filter : undefined,
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
    refetch()
  }, [isloading,refetch])

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-4">
        Error loading user data
      </div>
    );
  }

  const handleToggleStatus = (val: any) => {
    setUserToUpdate(val); // Set the user to update
    setIsModalOpen(true); // Open the modal
  };

  const handleConfirmToggleStatus = async () => {
    if (userToUpdate) {
      const newStatus = userToUpdate.Status === "active" ? "inactive" : "active";

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

  return (
    <div className="flex flex-col">
      {/* Filters Section */}
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        {/* Search Bar */}
        <div className="flex flex-1 max-w-lg">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Search by name or email..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)} // Update search filter state
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
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="sm:overflow-x-auto xs:overflow-x-auto">
          <Table
            data={users}
            columns={columns}
            loading={isLoading}
            totalPages={data?.pagination?.totalPages || 1}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            handleToggleStatus={handleToggleStatus}
            handleView={handleView}
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmToggleStatus}
        message={`Are you sure you want to ${userToUpdate?.Status === "active" ? "deactivate" : "activate"} this user?`}
      />
    </div>
  );
}

export default Users;

