import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useGetUserInfoQuery, useUpdateUserVerificationMutation, useUpdateProfileVideoVerificationMutation, useUpdateUserDocumentVerificationMutation } from "../../store/slices/userSlice/apiSlice";
import { useParams } from "react-router-dom";
import { updateIsLoading, updateUserInUserList, } from "../../store/slices/userSlice/userSlice";
import { useDispatch } from "react-redux";
import Loading from "../../components/Common/Loader";
import UserDevices from "./UserDevices";
// import { Button } from "@material-tailwind/react";
import Button from '../../components/Common/Button';
import { toast, ToastContainer } from "react-toastify";
import { ConfirmationModal } from "../../components/Common";
const UserDetails = () => {
    const params = useParams();
    const { data, isLoading, isError, refetch } = useGetUserInfoQuery(params.id);
    const [status, setStatus] = useState("pending");
    const [verificationvideostatus, setProfileVideoVerificationStatus] = useState("pending");
    const [updateUserVerification] = useUpdateUserVerificationMutation(); // Mutation hook to update status
    const [updateProfileVideoVerification] = useUpdateProfileVideoVerificationMutation();
    const [updateUserDocumentVerification] = useUpdateUserDocumentVerificationMutation();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (data?.data) {
            // setStatus(data?.data.Verified); // Initialize the dropdown with the current status of the user
            setStatus(data?.data.DocumentsVerified); // ✅ correct field from API
            setProfileVideoVerificationStatus(data.data.ProfileVideoVerified);
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
        // setStatus(verificationStatus); // Update the local state
        setStatus(data?.data.DocumentVerified); // ✅ correct field from API
        // Trigger the API call to update user status
        try {
            dispatch(updateIsLoading(true));
            const data = await updateUserDocumentVerification({
                userId: user.UserID,
                verified: verificationStatus,
            }).unwrap();
            dispatch(updateUserInUserList({ ...data.data, DocumentsVerified: verificationStatus }));
            await refetch();
            dispatch(updateIsLoading(false));
        }
        catch (error) {
            console.error("Error updating status:", error);
        }
    };
    const handleOnChangeVideo = async (event) => {
        const verificationStatus = event.target.value;
        setProfileVideoVerificationStatus(verificationStatus); // Update the local state
        // Trigger the API call to update user status
        try {
            dispatch(updateIsLoading(true));
            const data = await updateProfileVideoVerification({
                userId: user.UserID,
                ProfileVideoVerified: verificationStatus,
            }).unwrap();
            dispatch(updateUserInUserList({ ...data.data, ProfileVideoVerified: verificationStatus }));
            await refetch();
            dispatch(updateIsLoading(false));
        }
        catch (error) {
            console.error("Error updating status:", error);
        }
    };
    //Added on 13-06-2025
    const handleToggleStatus = () => {
        setIsModalOpen(true); // Open the modal
    };
    const handleConfirmToggleStatus = async () => {
        const verificationStatus = 'verified';
        setStatus(verificationStatus); // Update the local state
        // Trigger the API call to update user status
        try {
            dispatch(updateIsLoading(true));
            const data = await updateUserVerification({
                userId: user.UserID,
                verified: verificationStatus,
            }).unwrap();
            dispatch(updateUserInUserList({ ...data.data, Verified: verificationStatus }));
            await refetch();
            dispatch(updateIsLoading(false));
            toast.success("Profile has been verified!");
        }
        catch (error) {
            console.error("Error updating status:", error);
        }
        setIsModalOpen(false);
    };
    //Added on 13-06-2025
    const onClick = async () => {
        const verificationStatus = 'verified';
        setStatus(verificationStatus); // Update the local state
        // Trigger the API call to update user status
        try {
            dispatch(updateIsLoading(true));
            const data = await updateUserVerification({
                userId: user.UserID,
                verified: verificationStatus,
            }).unwrap();
            dispatch(updateUserInUserList({ ...data.data, Verified: verificationStatus }));
            await refetch();
            dispatch(updateIsLoading(false));
            toast.success("Profile has been verified!");
        }
        catch (error) {
            console.error("Error updating status:", error);
        }
    };
    let isDropdownDisabled = user.Verified === 'verified' ? true : false;
    let ButtonText = user.Verified === 'verified' ? 'Verified' : 'Verify';
    return (_jsxs("div", { className: "", children: [_jsx(ToastContainer, {}), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "col-span-1 bg-white text-gray-700 shadow-lg rounded-lg p-6", children: [_jsxs("div", { className: "flex flex-col items-center", children: [user?.ProfilePictureURL ? (_jsx("img", { src: user.ProfilePictureURL, alt: "Profile", className: "w-28 h-28 rounded-full border-4 border-gray shadow-lg object-cover", onError: (e) => {
                                            e.currentTarget.onerror = null; // Prevent infinite loop
                                            e.currentTarget.src = ""; // Set src to empty to trigger fallback
                                            e.currentTarget.style.display = "none"; // Hide broken image
                                            const fallback = document.getElementById("profile-fallback");
                                            if (fallback)
                                                fallback.style.display = "flex";
                                        } })) : null, _jsx("div", { id: "profile-fallback", style: { display: !user?.ProfilePictureURL ? "flex" : "none" }, className: "w-28 h-28 rounded-full border-4 border-gray bg-gray-100 text-gray-500 shadow-lg flex items-center justify-center text-sm text-center px-2", children: "No profile image" }), _jsx("h3", { className: "text-2xl font-semibold mt-3", children: user?.FullName }), _jsx("p", { className: "text-gray-500", children: user?.Email })] }), _jsxs("div", { className: "mt-4 space-y-2 text-gray-700", children: [_jsxs("p", { children: [_jsx("strong", { children: "Login type:" }), " ", user?.Type] }), _jsxs("p", { children: [_jsx("strong", { children: "Date of creation:" }), " ", new Date(user?.CreatedAt).toLocaleDateString()] }), _jsxs("p", { children: [_jsx("strong", { children: "Phone number:" }), " ", user?.Phone] }), _jsxs("p", { children: [_jsx("strong", { children: "Location:" }), " ", user?.Location || "N/A"] }), _jsxs("p", { children: [_jsx("strong", { children: "Birthday:" }), " ", user?.DOB] }), _jsxs("p", { children: [_jsx("strong", { children: "Status:" }), _jsx("span", { className: `ml-2 px-3 py-1 rounded-full text-sm font-medium transition-all 
                ${user?.Status === "active"
                                                    ? "bg-green-400 text-white"
                                                    : "bg-red-400 text-white"}`, children: user?.Status })] })] })] }), _jsxs("div", { className: "col-span-2 flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto", children: [_jsx("h3", { className: "text-lg font-semibold mb-3", children: "Device List" }), _jsx(UserDevices, {})] })] }), _jsxs("div", { className: "mt-6 bg-white shadow-md rounded-lg p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Identification Documents" }), _jsxs("div", { className: "max-w-sm mb-4", children: [_jsx("label", { htmlFor: "status", className: "block text-sm font-medium text-gray-700", children: _jsx("strong", { children: "Change Document Verification Status" }) }), _jsxs("select", { id: "status", value: status, onChange: handleOnChange, className: "mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", disabled: isDropdownDisabled, children: [isDropdownDisabled && _jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "pending", children: "Pending" }), _jsx("option", { value: "verified", children: "Verified" }), _jsx("option", { value: "rejected", children: "Rejected" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition", children: [_jsx("p", { className: "font-semibold mb-2", children: "Emirates ID (Front)" }), IdentificationDocuments[0]?.EmiratesIDFrontImageURL ? (_jsx("img", { src: IdentificationDocuments[0]?.EmiratesIDFrontImageURL, alt: "Emirates ID Front", className: "w-full h-40 object-cover rounded-md", onClick: () => {
                                            setSelectedImage(IdentificationDocuments[0]?.EmiratesIDFrontImageURL);
                                            setModalOpen(true);
                                        } })) : (_jsx("div", { className: "w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md", children: "No image provided" }))] }), _jsxs("div", { className: "border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition", children: [_jsx("p", { className: "font-semibold mb-2", children: "Emirates ID (Back)" }), IdentificationDocuments[0]?.EmiratesIDBackImageURL ? (_jsx("img", { src: IdentificationDocuments[0]?.EmiratesIDBackImageURL, alt: "Emirates ID Back", className: "w-full h-40 object-cover rounded-md", onClick: () => {
                                            setSelectedImage(IdentificationDocuments[0]?.EmiratesIDBackImageURL);
                                            setModalOpen(true);
                                        } })) : (_jsx("div", { className: "w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md", children: "No image provided" }))] }), _jsxs("div", { className: "border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition", children: [_jsx("p", { className: "font-semibold mb-2", children: "Passport" }), IdentificationDocuments[0]?.PassportImageURL ? (_jsx("img", { src: IdentificationDocuments[0]?.PassportImageURL, alt: "Passport", className: "w-full h-40 object-cover rounded-md", onClick: () => {
                                            setSelectedImage(IdentificationDocuments[0]?.PassportImageURL);
                                            setModalOpen(true);
                                        } })) : (_jsx("div", { className: "w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md", children: "No image provided" }))] })] })] }), _jsxs("div", { className: "mt-6 bg-white shadow-md rounded-lg p-6 w-full", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Profile Video Verification" }), _jsxs("div", { className: "max-w-sm mb-4", children: [_jsx("label", { htmlFor: "videoStatus", className: "block text-sm font-medium text-gray-700 mb-1", children: "Change Profile Video Verification Status" }), _jsxs("select", { id: "videoStatus", value: verificationvideostatus, onChange: handleOnChangeVideo, className: "block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", disabled: isDropdownDisabled, children: [isDropdownDisabled && _jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "pending", children: "Pending" }), _jsx("option", { value: "verified", children: "Verified" }), _jsx("option", { value: "rejected", children: "Rejected" })] })] }), user?.VideoVerification?.url ? (_jsx("div", { className: "w-full overflow-hidden rounded-lg shadow", children: _jsx("video", { src: user.VideoVerification.url, controls: true, className: "w-full max-h-[500px] object-contain rounded-lg", children: "Your browser does not support the video tag." }) })) : (_jsx("p", { className: "text-gray-500 italic", children: "No video uploaded." }))] }), _jsx("div", { className: "mt-6 bg-white shadow-md rounded-lg p-6 w-full flex justify-center", children: _jsx(Button, { text: ButtonText, type: "button", onClick: handleToggleStatus, variant: "primary", disabled: isDropdownDisabled }) }), modalOpen && selectedImage && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50", onClick: () => setModalOpen(false), children: _jsx("img", { src: selectedImage, alt: "Enlarged document", className: "max-w-3xl max-h-[90vh] rounded shadow-lg", onClick: (e) => e.stopPropagation() }) })), _jsx(ConfirmationModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), onConfirm: handleConfirmToggleStatus, message: `Are you sure you want to verify this user?` })] }));
};
export default UserDetails;
