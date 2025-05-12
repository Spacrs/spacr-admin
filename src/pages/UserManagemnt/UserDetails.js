import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useGetUserInfoQuery, useUpdateUserVerificationMutation, } from "../../store/slices/userSlice/apiSlice";
import { useParams } from "react-router-dom";
import { updateIsLoading, updateUserInUserList, } from "../../store/slices/userSlice/userSlice";
import { useDispatch } from "react-redux";
import Loading from "../../components/Common/Loader";
import UserDevices from "./UserDevices";
const UserDetails = () => {
    const params = useParams();
    const { data, isLoading, isError } = useGetUserInfoQuery(params.id);
    const [status, setStatus] = useState("pending");
    const [updateUserVerification] = useUpdateUserVerificationMutation(); // Mutation hook to update status
    const dispatch = useDispatch();
    useEffect(() => {
        if (data?.data) {
            setStatus(data?.data.Verified); // Initialize the dropdown with the current status of the user
        }
    }, [data]);
    // If loading or error states
    if (isLoading)
        return (_jsx("div", { className: "text-center text-gray-500", children: _jsx(Loading, {}) }));
    if (isError)
        return (_jsx("div", { className: "text-red-500 text-center mt-4", children: "Error loading user data" }));
    const user = data?.data;
    const IdentificationDocuments = user?.IdentificationDocuments || [];
    // Handle status change
    const handleOnChange = async (event) => {
        const verificationStatus = event.target.value;
        setStatus(verificationStatus); // Update the local state
        // Trigger the API call to update user status
        try {
            dispatch(updateIsLoading(true));
            const data = await updateUserVerification({
                userId: user.UserID,
                verified: verificationStatus,
            }).unwrap();
            dispatch(updateUserInUserList({ ...data.data, Verified: verificationStatus }));
            dispatch(updateIsLoading(false));
        }
        catch (error) {
            console.error("Error updating status:", error);
        }
    };
    return (_jsxs("div", { className: "", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "col-span-1 bg-white text-gray-700 shadow-lg rounded-lg p-6", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("img", { src: user?.ProfilePictureURL, alt: "Profile", className: "w-28 h-28 rounded-full border-4 border-gray shadow-lg" }), _jsx("h3", { className: "text-2xl font-semibold mt-3", children: user?.FullName }), _jsx("p", { className: "text-gray-500", children: user?.Email })] }), _jsxs("div", { className: "mt-4 space-y-2 text-gray-700", children: [_jsxs("p", { children: [_jsx("strong", { children: "Login type:" }), " ", user?.Type] }), _jsxs("p", { children: [_jsx("strong", { children: "Date of creation:" }), " ", new Date(user?.CreatedAt).toLocaleDateString()] }), _jsxs("p", { children: [_jsx("strong", { children: "Phone number:" }), " ", user?.Phone] }), _jsxs("p", { children: [_jsx("strong", { children: "Location:" }), " ", user?.Location || "N/A"] }), _jsxs("p", { children: [_jsx("strong", { children: "Birthday:" }), " ", user?.DOB] }), _jsxs("p", { children: [_jsx("strong", { children: "Status:" }), _jsx("span", { className: `ml-2 px-3 py-1 rounded-full text-sm font-medium transition-all 
                ${user?.Status === "active"
                                                    ? "bg-green-400 text-white"
                                                    : "bg-red-400 text-white"}`, children: user?.Status })] }), _jsxs("div", { className: "mt-4", children: [_jsx("label", { htmlFor: "status", className: "block text-sm font-medium text-gray-700", children: _jsx("strong", { children: "Change Verification Status" }) }), _jsxs("select", { id: "status", value: status, onChange: handleOnChange, className: "mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", children: [_jsx("option", { value: "pending", children: "Pending" }), _jsx("option", { value: "verified", children: "Verified" }), _jsx("option", { value: "rejected", children: "Rejected" })] })] })] })] }), _jsxs("div", { className: "col-span-2 flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto", children: [_jsx("h3", { className: "text-lg font-semibold mb-3", children: "Device List" }), _jsx(UserDevices, {})] })] }), _jsxs("div", { className: "mt-6 bg-white shadow-md rounded-lg p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Identification Documents" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition", children: [_jsx("p", { className: "font-semibold mb-2", children: "Emirates ID (Front)" }), _jsx("img", { src: IdentificationDocuments[0]?.EmiratesIDFrontImageURL, alt: "Emirates ID Front", className: "w-full h-40 object-cover rounded-md" })] }), _jsxs("div", { className: "border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition", children: [_jsx("p", { className: "font-semibold mb-2", children: "Emirates ID (Back)" }), _jsx("img", { src: IdentificationDocuments[0]?.EmiratesIDBackImageURL, alt: "Emirates ID Back", className: "w-full h-40 object-cover rounded-md" })] }), _jsxs("div", { className: "border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition", children: [_jsx("p", { className: "font-semibold mb-2", children: "Passport" }), _jsx("img", { src: IdentificationDocuments[0]?.PassportImageURL, alt: "Passport", className: "w-full h-40 object-cover rounded-md" })] })] })] })] }));
};
export default UserDetails;
