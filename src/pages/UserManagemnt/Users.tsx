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
import { useLocation } from "react-router-dom";
import API from "../../constants/apiEndpoints";

const Users = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { users, isloading } = useAppSelector((state) => state.userSlice);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(""); // Search term
  const [verificationStatus, setVerificationStatus] = useState(""); // Verification filter
  const [isModalOpen, setIsModalOpen] = useState(false); // Track if modal is open
  const [userToUpdate, setUserToUpdate] = useState<any>(null); // Store the user whose status is being changed

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  // applied states (used in API)
  const [appliedFromDate, setAppliedFromDate] = useState("");
  const [appliedToDate, setAppliedToDate] = useState("");

  // Pass both filters (search and verified) to the API call
  const { data, isLoading, isFetching, isError, refetch } = useGetUsersQuery({
    page: currentPage,
    limit: itemsPerPage,
    verified: verificationStatus !== "" ? verificationStatus : undefined,
    search: filter !== "" ? filter : undefined,
    sort: sortDirection,
    sortBy: sortBy,
    fromDate: appliedFromDate || undefined,
    toDate: appliedToDate || undefined,
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

  // added on 03-04-2026 (RP)
  useEffect(() => {
  const params = new URLSearchParams(location.search);

  const from = params.get("fromDate");
  const to = params.get("toDate");

  if (from && to) {
    setFromDate(from);
    setToDate(to);
    console.log("Applying date filters from URL:", { from, to });

    // Apply directly
    setAppliedFromDate(from);
    setAppliedToDate(to);
  }
  }, [location.search]);

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

  // added on 03-04-2026 (RP)
  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value);
    setCurrentPage(1);
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilter("");
    setVerificationStatus("");
    setFromDate("");
    setToDate("");
    setAppliedFromDate("");
    setAppliedToDate("");
    setCurrentPage(1);
  };

  const handleApplyFilters = () => {
    setAppliedFromDate(fromDate);
    setAppliedToDate(toDate);
    setCurrentPage(1);
  };

  const handleExport = async () => {
  try {
    const params = new URLSearchParams();

    if (appliedFromDate) params.append("fromDate", appliedFromDate);
    if (appliedToDate) params.append("toDate", appliedToDate);
    if (verificationStatus) params.append("verified", verificationStatus);
    if (filter) params.append("search", filter);

    const response = await fetch(
      `${API.ADMIN.EXPORT_USERS}?${params.toString()}`,
      // "http://localhost:8000/api/v5/admin/export-users?" + params.toString(),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Export failed", error);
  }
  };

  return (
    <div className="flex flex-col">
      {/* Filters Section */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        {/* Search Bar */}
        <div className="flex flex-1 max-w-lg">
          <Search
            search={filter}
            onChange={onSearch}
            onReset={() => setFilter("")}
          />
        </div>

        {/* added on 03-04-2026 (RP) */}
        {/* From Date */}
        <input
          type="date"
          value={fromDate}
          onChange={handleFromDateChange}
          className="px-3 py-2 border border-gray-300 rounded-md"
        />

        {/* To Date */}
        <input
          type="date"
          value={toDate}
          onChange={handleToDateChange}
          className="px-3 py-2 border border-gray-300 rounded-md"
        />

        {/* Verification Status Filter */}
        <select
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={verificationStatus}
          onChange={(e) => {
            setVerificationStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Users</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
          <option value="none">None</option>
        </select>
        {/* added on 03-04-2026 (RP) */}
        {/* Apply Button */}
        <button
          onClick={handleApplyFilters}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Apply Filter
        </button>

        {/* Reset Button */}
        <button
          onClick={handleResetFilters}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Reset Filters
        </button>

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Export Excel
        </button>

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
