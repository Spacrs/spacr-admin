import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useGetUsersQuery, useUpdateUserInfoMutation, } from "../../store/slices/userSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUsers, resetUsers } from "../../store/slices/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
import { columns } from "../../constant/Columns";
import { Search, ErrorMsg, ConfirmationModal, Table, } from "../../components/Common";
const Users = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { users, isloading } = useAppSelector((state) => state.userSlice);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState(""); // Search term
    const [verificationStatus, setVerificationStatus] = useState(""); // Verification filter
    const [isModalOpen, setIsModalOpen] = useState(false); // Track if modal is open
    const [userToUpdate, setUserToUpdate] = useState(null); // Store the user whose status is being changed
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortDirection, setSortDirection] = useState("desc");
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
        return _jsx(ErrorMsg, { errorMsg: "Error loading user data" });
    }
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
    return (_jsxs("div", { className: "flex flex-col", children: [_jsxs("div", { className: "flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: [_jsx("div", { className: "flex flex-1 max-w-lg", children: _jsx(Search, { search: filter, onChange: onSearch, onReset: () => setFilter("") }) }), _jsx("div", { className: "ml-4", children: _jsxs("select", { className: "px-4 py-2 border border-gray-300 rounded-md", value: verificationStatus, onChange: (e) => setVerificationStatus(e.target.value), children: [_jsx("option", { value: "", children: "All Users" }), _jsx("option", { value: "verified", children: "Verified" }), _jsx("option", { value: "pending", children: "Pending" }), _jsx("option", { value: "rejected", children: "Rejected" }), _jsx("option", { value: "none", children: "None" })] }) })] }), _jsx("div", { className: "flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto", children: _jsx(Table, { data: users, columns: columns.user, loading: isLoading || isFetching, totalPages: data?.pagination?.totalPages || 1, currentPage: currentPage, onPageChange: setCurrentPage, handleToggleStatus: handleToggleStatus, handleView: handleView, itemsPerPage: itemsPerPage, onSort: onSort }) }), _jsx(ConfirmationModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), onConfirm: handleConfirmToggleStatus, message: `Are you sure you want to ${userToUpdate?.Status === "active" ? "deactivate" : "activate"} this user?` })] }));
};
export default Users;
