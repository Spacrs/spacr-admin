import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useUpdateUserVerificationMutation, useUpdateProfileVideoVerificationMutation, useUpdateUserDocumentVerificationMutation } from "../../store/slices/userSlice/apiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loading from "../../components/Common/Loader";
import { ToastContainer } from "react-toastify";
import { ConfirmationModal } from "../../components/Common";
import { useGetInvoiceDetailsQuery } from "../../store/slices/invoiceVerificationSlice/invoiceSlice";
const InvoiceDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    console.log("params______", params);
    const { data: order, isLoading, isError } = useGetInvoiceDetailsQuery(params.id);
    console.log('order', order);
    const [status, setStatus] = useState("pending");
    const [verificationvideostatus, setProfileVideoVerificationStatus] = useState("pending");
    const [updateUserVerification] = useUpdateUserVerificationMutation(); // Mutation hook to update status
    const [updateProfileVideoVerification] = useUpdateProfileVideoVerificationMutation();
    const [updateUserDocumentVerification] = useUpdateUserDocumentVerificationMutation();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    useEffect(() => {
        if (order) {
            setStatus(order.Status);
        }
    }, [order]);
    // If loading or error states
    if (isLoading)
        return (_jsx("div", { className: "text-center text-gray-500", children: _jsx(Loading, {}) }));
    if (isError)
        return (_jsx("div", { className: "text-red-500 text-center mt-4", children: "Error loading user data" }));
    // Handle status change
    const handleOnChange = async (event) => {
        //   const verificationStatus = event.target.value;
        //   // setStatus(verificationStatus); // Update the local state
        //   setStatus(data?.data.DocumentVerified); // ✅ correct field from API
        //   // Trigger the API call to update user status
        //   try {
        //     dispatch(updateIsLoading(true));
        //     const data = await updateUserDocumentVerification({
        //       userId: user.UserID,
        //       verified: verificationStatus,
        //        }).unwrap();
        //  dispatch(
        //       updateUserInUserList({ ...data.data, DocumentsVerified: verificationStatus})
        //     );
        //      await refetch();
        //     dispatch(updateIsLoading(false));
        //   } catch (error) {
        //     console.error("Error updating status:", error);
        //   }
    };
    //Added on 13-06-2025
    const handleToggleStatus = () => {
        setIsModalOpen(true); // Open the modal
    };
    const handleConfirmToggleStatus = async () => {
        //  const verificationStatus = 'verified';
        // setStatus(verificationStatus); // Update the local state
        // // Trigger the API call to update user status
        // try {
        //   dispatch(updateIsLoading(true));
        //   const data = await updateUserVerification({
        //     userId: user.UserID,
        //     verified: verificationStatus,
        //   }).unwrap();
        //   dispatch(
        //     updateUserInUserList({ ...data.data, Verified: verificationStatus })
        //   );
        //    await refetch();
        //   dispatch(updateIsLoading(false));
        //   toast.success("Profile has been verified!");
        // } catch (error) {
        //   console.error("Error updating status:", error);
        // } 
        // setIsModalOpen(false);
    };
    //Added on 13-06-2025
    // const onClick = async () => {
    //   const verificationStatus = 'verified';
    //   setStatus(verificationStatus); // Update the local state
    //   // Trigger the API call to update user status
    //   try {
    //     dispatch(updateIsLoading(true));
    //     const data = await updateUserVerification({
    //       userId: user.UserID,
    //       verified: verificationStatus,
    //     }).unwrap();
    //     dispatch(
    //       updateUserInUserList({ ...data.data, Verified: verificationStatus })
    //     );
    //      await refetch();
    //     dispatch(updateIsLoading(false));
    //     toast.success("Profile has been verified!");
    //   } catch (error) {
    //     console.error("Error updating status:", error);
    //   }
    // }
    const getWaitDays = (createdAt, waitTime) => {
        if (!waitTime)
            return "N.A.";
        const createdTs = new Date(createdAt).getTime();
        const waitTs = waitTime * 1000; // unix → ms
        const diffMs = waitTs - createdTs;
        if (diffMs <= 0)
            return "Expired";
        const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        return `${days} days`;
    };
    const getRemainingDays = (waitTime) => {
        if (!waitTime)
            return "N.A.";
        const now = Date.now();
        const target = waitTime * 1000;
        const diff = target - now;
        if (diff <= 0)
            return "Expired";
        return `${Math.ceil(diff / (1000 * 60 * 60 * 24))} days left`;
    };
    const goToOffers = () => {
        navigate("/admin/order-offers/" + params.id);
    };
    // let isDropdownDisabled = user?.Verified === 'verified';
    // let ButtonText = user?.Verified === 'verified' ? 'Verified' : 'Verify';
    // const profileImage =
    // !imageError && user?.ProfilePictureURL
    //   ? user.ProfilePictureURL
    //   : defaultProfile; 
    return (_jsxs("div", { className: "", children: [_jsx(ToastContainer, {}), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "flex flex-col bg-gray-50 p-6 rounded-lg shadow-md", children: [_jsx("h2", { className: "text-2xl font-semibold mb-2", children: order.data.ProductName }), _jsx("p", { className: "text-gray-500 text-sm mb-4", children: order.data.Descriptions }), _jsx("a", { href: order.data.ProductUrl, target: "_blank", rel: "noopener noreferrer", className: "text-indigo-600 hover:text-indigo-800 text-sm", children: "View Product" }), _jsxs("div", { className: "mt-6 w-full", children: [_jsxs("p", { children: [_jsx("strong", { children: "Created By:" }), "  ", order?.data?.User?.FullName || "Admin"] }), _jsxs("p", { children: [_jsx("strong", { children: "Phone:" }), "  ", order?.data?.User?.Phone || "N.A"] }), _jsxs("p", { children: [_jsx("strong", { children: "Price:" }), " AED ", order.data.Price] }), _jsxs("p", { children: [_jsx("strong", { children: "Quantity:" }), " ", order.data.Quantity] }), _jsxs("p", { children: [_jsx("strong", { children: "Delivery Reward:" }), " AED ", order.data.DeliveryReward] }), _jsxs("p", { children: [_jsx("strong", { children: "Is With Box:" }), " ", order.data.IsWithBox === 1 ? "Yes" : "No"] }), _jsxs("p", { children: [_jsx("strong", { children: "Pay Up Front:" }), " ", (() => {
                                                const validStatuses = ["Accepted", "ReadyToDeliver", "Purchased", "ReceiptUpload", "InTransit", "Delivered"];
                                                const offer = order.data.OrderOffer?.find((offer) => validStatuses.includes(offer.Status));
                                                if (!offer || !("payUpFront" in offer)) {
                                                    return "NA";
                                                }
                                                return offer.payUpFront ? "Yes" : "No";
                                            })()] }), _jsxs("p", { children: [_jsx("strong", { children: "Wait time:" }), " ", order.data.WaitTime
                                                ? `${getWaitDays(order.data.CreatedAt, order.data.WaitTime)} (${getRemainingDays(order.data.WaitTime)})`
                                                : "N.A."] }), order.data.CreatedBy === "user" && (_jsx("p", { className: "text-green-500 text-2xl font-medium mt-6", children: _jsxs("strong", { onClick: goToOffers, className: "px-4 py-2 text-md font-medium bg-green-100 border border-green-600 shadow-lg hover:bg-transparent hover:shadow-xl transition duration-200 ease-in-out cursor-pointer rounded-lg", children: ["Offers:", " ", _jsx("span", { className: "text-black font-medium px-2", children: order.data.totalOfferCount })] }) }))] })] }), _jsxs("div", { className: "flex flex-col bg-gray-50 p-6 rounded-lg shadow-md", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Shipping Details" }), _jsxs("p", { children: [_jsx("strong", { children: "From Address:" }), " ", order.data.From_address] }), _jsxs("p", { children: [_jsx("strong", { children: "To Address:" }), " ", order.data.To_address] }), _jsx("div", { className: "mt-6", children: _jsxs("p", { children: [_jsx("strong", { children: "Status:" }), _jsx("span", { className: `ml-2 px-3 py-1 rounded-full text-sm font-medium 
                ${order.data?.Status === "Pending"
                                                ? "bg-yellow-300 text-gray-800"
                                                : order.data?.Status === "Shipped"
                                                    ? "bg-blue-300 text-gray-800"
                                                    : "bg-green-300 text-gray-800"}`, children: order.data?.Status })] }) })] })] }), _jsxs("div", { className: "mt-6 bg-white shadow-md rounded-lg p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Identification Documents" }), _jsxs("div", { className: "max-w-sm mb-4", children: [_jsx("label", { htmlFor: "status", className: "block text-sm font-medium text-gray-700", children: _jsx("strong", { children: "Change Document Verification Status" }) }), _jsxs("select", { id: "status", value: status, onChange: handleOnChange, className: "mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", children: [_jsx("option", { value: "pending", children: "Pending" }), _jsx("option", { value: "verified", children: "Verified" }), _jsx("option", { value: "rejected", children: "Rejected" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx("div", { className: "border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition", children: _jsx("p", { className: "font-semibold mb-2", children: "Emirates ID (Front)" }) }), _jsx("div", { className: "border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition", children: _jsx("p", { className: "font-semibold mb-2", children: "Emirates ID (Back)" }) }), _jsx("div", { className: "border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition", children: _jsx("p", { className: "font-semibold mb-2", children: "Passport" }) })] })] }), modalOpen && selectedImage && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50", onClick: () => setModalOpen(false), children: _jsx("img", { src: selectedImage, alt: "Enlarged document", className: "max-w-3xl max-h-[90vh] rounded shadow-lg", onClick: (e) => e.stopPropagation() }) })), _jsx(ConfirmationModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), onConfirm: handleConfirmToggleStatus, message: `Are you sure you want to verify this user?` })] }));
};
export default InvoiceDetails;
