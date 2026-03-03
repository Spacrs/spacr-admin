import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useGetTravelListingQuery } from "../../store/slices/orderSlice/apiSlice";
import { useAppDispatch } from "../../store/hooks";
import { setProducts, } from "../../store/slices/orderSlice/orderSlice";
import { useNavigate } from "react-router-dom";
import { columns } from "../../constant/Columns";
import { Search, ErrorMsg, Table } from "../../components/Common";
import { toast, ToastContainer } from "react-toastify";
function TravelListing() {
    const dispatch = useAppDispatch();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [creating, setCreating] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortDirection, setSortDirection] = useState("desc");
    const [filter, setFilter] = useState(""); // Search term
    const itemsPerPage = 10;
    const { data, isLoading, isFetching, isError, refetch } = useGetTravelListingQuery({
        page: currentPage,
        limit: itemsPerPage,
        createdBy: "user",
        sort: sortDirection,
        sortBy: sortBy,
        search: filter !== "" ? filter : undefined,
    });
    const [payload, setPayload] = useState({
        code: "",
        FullName: "",
        contactNumber: "",
    });
    const navigate = useNavigate();
    useEffect(() => {
        refetch();
    }, [refetch]);
    useEffect(() => {
        return () => {
            dispatch(setProducts([]));
        };
    }, [dispatch]);
    if (isError) {
        return _jsx(ErrorMsg, { errorMsg: "Error loading referral codes" });
    }
    // const handleUpdate = (data: any) => {
    //   const referralCodeId = data.referralID;
    //   navigate(`/admin/edit-referral-code/${referralCodeId}`);
    // };
    const handleView = (data) => {
        const referralCodeId = data.referralID;
        if (data) {
            try {
                navigate(`/admin/referral-code-details/${referralCodeId}`);
            }
            catch (error) {
                console.log(error, "error in handleView");
            }
        }
        else {
            console.log("No selected order to view.");
        }
    };
    const onPageChange = (page) => {
        setCurrentPage(page);
    };
    const onSort = (colName, direction) => {
        setSortBy(colName);
        setSortDirection(direction);
    };
    const handleToggleStatus = async (row) => {
        const access_token = localStorage.getItem('access_token');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/admin/toggle-referral-code-status`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Status: row.Status,
                    referralID: row.referralID
                })
            });
            if (!response.ok) {
                throw new Error("Failed to update status");
            }
            toast.success("Status updated!");
            refetch();
        }
        catch (err) {
            toast.error("Failed to update status.");
            throw err;
        }
    };
    const handleClone = (data) => {
        const referralCode = data?.code;
        if (!referralCode) {
            toast.error("Referral code is missing!");
            return;
        }
        const cloneLink = `https://dashboard.spa-cr.com/assign-referral-code?referralCode=${referralCode}`;
        navigator.clipboard.writeText(cloneLink)
            .then(() => {
            toast.success("Link copied to clipboard!");
        })
            .catch(() => {
            toast.error("Failed to copy link.");
        });
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // const paginatedData = data?.data?.slice(startIndex, endIndex) || [];
    const sortedData = [...(data?.data || [])].sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        if (aVal == null)
            return 1;
        if (bVal == null)
            return -1;
        if (typeof aVal === "string" && typeof bVal === "string") {
            return sortDirection === "asc"
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        }
        return sortDirection === "asc"
            ? (aVal > bVal ? 1 : -1)
            : (aVal < bVal ? 1 : -1);
    });
    const paginatedData = sortedData.slice(startIndex, endIndex);
    const generateCode = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const length = Math.floor(Math.random() * 5) + 8; // 8 to 12
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPayload((prev) => ({ ...prev, code: result }));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPayload((prev) => ({ ...prev, [name]: value }));
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setCreating(true);
        console.log("Submitting payload:", payload);
        const codePattern = /^[A-Z0-9]{8,12}$/;
        if (!codePattern.test(payload.code)) {
            toast.error("Code must be 8–12 characters and contain only capital letters and numbers.");
            setCreating(false);
            return;
        }
        try {
            const access_token = localStorage.getItem("access_token");
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/admin/create-referral-code`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to create referral code.");
            }
            toast.success("Referral code created successfully.");
            setTimeout(() => {
                refetch();
            }, 500);
        }
        catch (error) {
            toast.error(error.message || "Something went wrong.");
        }
        finally {
            setCreating(false);
        }
        setShowModal(false);
    };
    const onSearch = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };
    return (_jsxs("div", { className: "", children: [_jsx(ToastContainer, {}), _jsx("div", { className: "flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: _jsxs("div", { className: "flex justify-between items-center w-full", children: [_jsx("div", { className: "flex flex-1 max-w-lg", children: _jsx(Search, { search: filter, onChange: onSearch, onReset: () => setFilter(""), placeholder: "Search by cities, countries, or users" }) }), _jsx("div", { className: "ml-4" })] }) }), _jsx("div", { className: "flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto", children: _jsx(Table, { data: data?.data || [], columns: columns.travelListingColumn, loading: isLoading || isFetching, totalPages: data?.totalPages || 1, currentPage: currentPage, onPageChange: setCurrentPage, handleView: handleView, itemsPerPage: itemsPerPage, onSort: onSort }) }), showModal && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg w-full max-w-lg", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Add Referral Code" }), _jsxs("form", { onSubmit: handleFormSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block font-medium mb-1", children: "Code" }), _jsx("input", { type: "text", name: "code", value: payload.code, onChange: handleInputChange, className: "w-full border border-gray-300 rounded p-2", maxLength: 12, minLength: 8, pattern: "[A-Z0-9]{8,12}", title: "Code must be 8-12 characters long and contain only uppercase letters and numbers.", required: true }), _jsx("button", { type: "button", onClick: generateCode, className: "mt-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700", children: "Generate Code" })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-medium mb-1", children: "Full Name" }), _jsx("input", { type: "text", name: "FullName", value: payload.FullName, onChange: handleInputChange, className: "w-full border border-gray-300 rounded p-2", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-medium mb-1", children: "Contact Number" }), _jsx("input", { type: "text", name: "contactNumber", value: payload.contactNumber, onChange: handleInputChange, className: "w-full border border-gray-300 rounded p-2" })] }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx("button", { type: "button", onClick: () => setShowModal(false), className: "px-4 py-2 bg-gray-300 rounded hover:bg-gray-400", children: "Cancel" }), _jsx("button", { type: "submit", className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500", children: "Submit" })] })] })] }) }))] }));
}
export default TravelListing;
