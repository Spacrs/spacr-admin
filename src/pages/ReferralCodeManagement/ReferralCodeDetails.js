import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetReferralCodeDetailsQuery } from "../../store/slices/orderSlice/apiSlice";
const ReferralCodeDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { referralCodeID } = useParams();
    const { data: referralCodeData, isLoading, error } = useGetReferralCodeDetailsQuery(referralCodeID);
    const [status, setStatus] = useState("");
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
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto bg-white shadow-xl rounded-lg", children: [referralCodeData.data.historyRecords && referralCodeData.data.historyRecords.length > 0 && (_jsxs("div", { className: "mt-8 bg-white p-6 rounded-lg shadow-xl", children: [_jsxs("h3", { className: "text-lg font-semibold text-blue-700 mb-2", children: ["Referral Code: ", _jsx("span", { className: "font-mono", children: referralCodeData.data.historyRecords[0].code })] }), _jsx("p", { className: "text-gray-700 mb-4", children: "These users have redeemed this code:" }), _jsx("ul", { className: "list-disc pl-5 text-gray-800", children: referralCodeData.data.users.map((user, index) => (_jsxs("li", { children: [_jsx("strong", { children: user.FullName }), " (", user.Email, ")"] }, index))) })] })), _jsxs("div", { className: "mt-6 flex justify-between items-center text-sm text-gray-500", children: [_jsx("p", {}), _jsxs("p", { children: [_jsx("strong", { children: "Created Date" }), ":", " ", new Date(referralCodeData.data.historyRecords[0].CreatedAt).toLocaleDateString()] })] })] }));
};
export default ReferralCodeDetails;
