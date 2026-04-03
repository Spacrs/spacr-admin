import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useGetUsersQuery, useUpdateUserInfoMutation, } from "../../store/slices/userSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUsers, resetUsers } from "../../store/slices/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
import { columns } from "../../constant/Columns";
import { Search, ErrorMsg, ConfirmationModal, Table, } from "../../components/Common";
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
    const [userToUpdate, setUserToUpdate] = useState(null); // Store the user whose status is being changed
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortDirection, setSortDirection] = useState("desc");
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
        return _jsx(ErrorMsg, { errorMsg: "Error loading user data" });
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
    const handleToggleStatus = (val) => {
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
            }
            catch (error) {
                console.error("Error updating status:", error);
            }
        }
        setIsModalOpen(false); // Close the modal after confirmation
    };
    const handleView = (val) => {
        navigate(`/admin/users-details/${val.UserID}`);
    };
    const onSort = (colName, direction) => {
        setSortBy(colName);
        setSortDirection(direction);
    };
    const onSearch = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };
    // added on 03-04-2026 (RP)
    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
        setCurrentPage(1);
    };
    const handleToDateChange = (e) => {
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
            if (appliedFromDate)
                params.append("fromDate", appliedFromDate);
            if (appliedToDate)
                params.append("toDate", appliedToDate);
            if (verificationStatus)
                params.append("verified", verificationStatus);
            if (filter)
                params.append("search", filter);
            const response = await fetch(`${API.ADMIN.EXPORT_USERS}?${params.toString()}`, 
            // "http://localhost:8000/api/v5/admin/export-users?" + params.toString(),
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "users.xlsx";
            a.click();
            window.URL.revokeObjectURL(url);
        }
        catch (error) {
            console.error("Export failed", error);
        }
    };
    return (_jsxs("div", { className: "flex flex-col", children: [_jsxs("div", { className: "flex flex-wrap justify-between items-center gap-4 mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: [_jsx("div", { className: "flex flex-1 max-w-lg", children: _jsx(Search, { search: filter, onChange: onSearch, onReset: () => setFilter("") }) }), _jsx("input", { type: "date", value: fromDate, onChange: handleFromDateChange, className: "px-3 py-2 border border-gray-300 rounded-md" }), _jsx("input", { type: "date", value: toDate, onChange: handleToDateChange, className: "px-3 py-2 border border-gray-300 rounded-md" }), _jsxs("select", { className: "px-4 py-2 border border-gray-300 rounded-md", value: verificationStatus, onChange: (e) => {
                            setVerificationStatus(e.target.value);
                            setCurrentPage(1);
                        }, children: [_jsx("option", { value: "", children: "All Users" }), _jsx("option", { value: "verified", children: "Verified" }), _jsx("option", { value: "pending", children: "Pending" }), _jsx("option", { value: "rejected", children: "Rejected" }), _jsx("option", { value: "none", children: "None" })] }), _jsx("button", { onClick: handleApplyFilters, className: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600", children: "Apply Filter" }), _jsx("button", { onClick: handleResetFilters, className: "px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600", children: "Reset Filters" }), _jsx("button", { onClick: handleExport, className: "px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600", children: "Export Excel" })] }), _jsx("div", { className: "flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto", children: _jsx(Table, { data: users, columns: columns.user, loading: isLoading || isFetching, totalPages: data?.pagination?.totalPages || 1, currentPage: currentPage, onPageChange: setCurrentPage, handleToggleStatus: handleToggleStatus, handleView: handleView, itemsPerPage: itemsPerPage, onSort: onSort }) }), _jsx(ConfirmationModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), onConfirm: handleConfirmToggleStatus, message: `Are you sure you want to ${userToUpdate?.Status === "active" ? "deactivate" : "activate"} this user?` })] }));
};
export default Users;
