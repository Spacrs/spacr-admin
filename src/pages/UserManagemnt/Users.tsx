import { useEffect, useState } from "react";
import Table from "../../components/Common/Table";
import {
  useGetUsersQuery,
  useUpdateUserInfoMutation,
} from "../../store/slices/userSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUsers } from "../../store/slices/userSlice/userSlice";
import { useNavigate } from "react-router-dom";

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
  const { users } = useAppSelector((state) => state.userSlice);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");

  // Fetch users based on currentPage and filter
  const { data, isLoading, isError, refetch } = useGetUsersQuery({
    page: currentPage,
    limit:5,
    verified: filter !== "" ? filter : undefined, // Send filter if not 'all'
  });

  const [updateUserStatus] = useUpdateUserInfoMutation();

  useEffect(() => {
    if (data?.data) {
      dispatch(getUsers(data.data));
    }
  }, [data, dispatch]);

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-4">
        Error loading user data
      </div>
    );
  }

  const handleToggleStatus = async (val: any) => {
    const newStatus = val.Status === "active" ? "inactive" : "active";

    try {
      await updateUserStatus({
        userId: val.UserID,
        status: newStatus,
      }).unwrap();
      refetch(); // Refetch users after updating status
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleView = (val: any) => {
    navigate(`/admin/users-details/${val.UserID}`);
  };

  return (
    <div className="">
      {/* Filter and Title Section */}
      {/* Table Section */}
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md">
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
  );
}

export default Users;
