import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetReferralCodeDetailsQuery } from "../../store/slices/orderSlice/apiSlice";
import { columns } from "../../constant/Columns";
import { Table } from "../../components/Common";
const ReferralCodeDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { referralCodeID } = useParams();
    const { data: referralCodeData, isFetching, isLoading, error, refetch } = useGetReferralCodeDetailsQuery(referralCodeID);
    const [status, setStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        if (referralCodeData) {
            setStatus(referralCodeData.Status);
        }
    }, [referralCodeData]);
    const handleOnChange = (event) => {
        setStatus(event.target.value);
    };
    if (isLoading)
        return _jsx("p", { children: "Loading Referral Code details..." });
    if (error) {
        console.error("Order Details API Error:", error);
        if (error.status === 401) {
            console.log("Unauthorized! Redirecting to login...");
        }
        return (_jsxs("p", { className: "text-center text-red-500", children: ["Failed to load Referral Code details. Error: ", error.status] }));
    }
    const onPageChange = (page) => {
        setCurrentPage(page);
        refetch(); // Refetch data when the page changes
    };
    const handleUpdate = () => {
    };
    const handleView = () => {
    };
    const onSort = () => {
    };
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = referralCodeData.data.users.slice(startIndex, endIndex) || [];
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto bg-white shadow-xl rounded-lg", children: [_jsxs("strong", { className: "px-4 py-2 text-md font-medium bg-green-100 border border-green-600 shadow-lg hover:bg-transparent hover:shadow-xl transition duration-200 ease-in-out cursor-pointer rounded-lg", children: ["Referral Code: ", _jsx("span", { className: "text-black font-medium px-2", children: referralCodeData.data.referralCode })] }), _jsxs("div", { className: "mt-8 bg-white p-6 rounded-lg shadow-xl", children: [_jsx("p", { className: "text-gray-700 mb-4", children: "These users have redeemed this code:" }), _jsx(Table, { data: paginatedData, columns: columns.referralCodeDetails, loading: isLoading || isFetching, 
                        // totalPages={referralCodeData.data.users?.pagination?.totalPages || 1}
                        totalPages: Math.ceil((referralCodeData.data.users?.length || 0) / itemsPerPage), currentPage: currentPage, onPageChange: onPageChange, handleUpdate: handleUpdate, handleView: handleView, itemsPerPage: itemsPerPage, onSort: onSort })] }), _jsx("div", { className: "mt-6 flex justify-between items-center text-sm text-gray-500" })] }));
};
export default ReferralCodeDetails;
