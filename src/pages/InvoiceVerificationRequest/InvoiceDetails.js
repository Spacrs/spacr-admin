import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useUpdateUserVerificationMutation, useUpdateProfileVideoVerificationMutation, useUpdateUserDocumentVerificationMutation, } from "../../store/slices/userSlice/apiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { updateIsLoading, } from "../../store/slices/userSlice/userSlice";
import { useDispatch } from "react-redux";
import Loading from "../../components/Common/Loader";
import { toast, ToastContainer } from "react-toastify";
import { ConfirmationModal } from "../../components/Common";
import { useGetInvoiceDetailsQuery, useUpdateInvoiceVerificationStatusMutation } from "../../store/slices/invoiceVerificationSlice/invoiceSlice";
const InvoiceDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [updateInvoiceVerificationStatus] = useUpdateInvoiceVerificationStatusMutation();
    const { data: order, isLoading, isError, } = useGetInvoiceDetailsQuery(params.id);
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
        const verificationStatus = event.target.value;
        if (!verificationStatus)
            return;
        try {
            setStatus(verificationStatus);
            dispatch(updateIsLoading(true));
            const OrderOfferID = order?.data?.OrderOffer?.[0]?.OrderOfferID;
            const response = await updateInvoiceVerificationStatus({
                orderId: params.id,
                status: verificationStatus,
                OrderOfferID,
            }).unwrap();
            toast.success(`Invoice status updated to ${verificationStatus}`);
        }
        catch (error) {
            console.error("Error updating invoice status:", error);
            toast.error(error?.data?.message || "Failed to update status");
        }
        finally {
            dispatch(updateIsLoading(false));
        }
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
    const invoices = order?.data?.orderInvoice || [];
    // let isDropdownDisabled = user?.Verified === 'verified';
    // let ButtonText = user?.Verified === 'verified' ? 'Verified' : 'Verify';
    // const profileImage =
    // !imageError && user?.ProfilePictureURL
    //   ? user.ProfilePictureURL
    //   : defaultProfile;
    return (_jsxs("div", { className: "", children: [_jsx(ToastContainer, {}), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "flex flex-col bg-gray-50 p-6 rounded-lg shadow-md", children: [_jsx("h2", { className: "text-2xl font-semibold mb-2", children: order.data.ProductName }), _jsx("p", { className: "text-gray-500 text-sm mb-4", children: order.data.Descriptions }), _jsx("a", { href: order.data.ProductUrl, target: "_blank", rel: "noopener noreferrer", className: "text-indigo-600 hover:text-indigo-800 text-sm", children: "View Product" }), _jsxs("div", { className: "mt-6 w-full", children: [_jsxs("p", { children: [_jsx("strong", { children: "Created By:" }), " ", order?.data?.User?.FullName || "Admin"] }), _jsxs("p", { children: [_jsx("strong", { children: "Phone:" }), " ", order?.data?.User?.Phone || "N.A"] }), _jsxs("p", { children: [_jsx("strong", { children: "Price:" }), " AED ", order.data.Price] }), _jsxs("p", { children: [_jsx("strong", { children: "Quantity:" }), " ", order.data.Quantity] })] })] }), _jsxs("div", { className: "flex flex-col bg-gray-50 p-6 rounded-lg shadow-md", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Shipping Details" }), _jsxs("p", { children: [_jsx("strong", { children: "From Address:" }), " ", order.data.From_address] }), _jsxs("p", { children: [_jsx("strong", { children: "To Address:" }), " ", order.data.To_address] })] })] }), _jsxs("div", { className: "mt-6 bg-white shadow-md rounded-lg p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Order Invoice Verification" }), _jsxs("div", { className: "max-w-sm mb-4", children: [_jsx("label", { htmlFor: "status", className: "block text-sm font-medium text-gray-700", children: _jsx("strong", { children: "Change Invoice Verification Status" }) }), _jsxs("select", { id: "status", value: status, onChange: handleOnChange, className: "mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "approved", children: "Approved" }), _jsx("option", { value: "rejected", children: "Rejected" })] })] }), invoices?.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: invoices.map((invoice, index) => {
                            const fileUrl = invoice.url;
                            const isPdf = fileUrl?.toLowerCase().endsWith(".pdf");
                            return (_jsxs("div", { className: "border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition", children: [_jsxs("p", { className: "font-semibold mb-3", children: ["Invoice ", index + 1] }), isPdf ? (_jsxs("div", { className: "flex flex-col items-center justify-center h-52 bg-gray-100 rounded-md", children: [_jsx("div", { className: "text-6xl mb-3", children: "\uD83D\uDCC4" }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "PDF Document" }), _jsx("a", { href: fileUrl, target: "_blank", rel: "noopener noreferrer", className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition", children: "View PDF" })] })) : (
                                    /* IMAGE VIEW */
                                    _jsx("img", { src: fileUrl, alt: `Invoice ${index + 1}`, className: "w-full h-52 object-cover rounded-md cursor-pointer", onClick: () => {
                                            setSelectedImage(fileUrl);
                                            setModalOpen(true);
                                        } }))] }, invoice.Id));
                        }) })) : (_jsx("div", { className: "w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md", children: "No invoice uploaded" }))] }), modalOpen && selectedImage && (_jsxs("div", { className: "fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4", onClick: () => setModalOpen(false), children: [_jsx("button", { className: "absolute top-5 right-5 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-lg hover:bg-red-500 hover:text-white transition", onClick: () => setModalOpen(false), children: "\u00D7" }), _jsx("img", { src: selectedImage, alt: "Enlarged document", className: "w-[80vw] h-[80vh] object-contain rounded-xl shadow-2xl", onClick: (e) => e.stopPropagation() })] })), _jsx(ConfirmationModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), onConfirm: handleConfirmToggleStatus, message: `Are you sure you want to verify this user?` })] }));
};
export default InvoiceDetails;
