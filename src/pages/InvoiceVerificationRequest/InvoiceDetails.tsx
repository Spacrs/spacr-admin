import { useEffect, useState } from "react";
import {
  useGetUserInfoQuery,
  useUpdateUserVerificationMutation,
  useUpdateProfileVideoVerificationMutation,
  useUpdateUserDocumentVerificationMutation,
} from "../../store/slices/userSlice/apiSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateIsLoading,
  updateUserInUserList,
} from "../../store/slices/userSlice/userSlice";
import { useDispatch } from "react-redux";
import Loading from "../../components/Common/Loader";
// import UserDevices from "./UserDevices";
// import { Button } from "@material-tailwind/react";
import Button from "../../components/Common/Button";
import { toast, ToastContainer } from "react-toastify";
import { ConfirmationModal } from "../../components/Common";
import defaultProfile from "../../assets/images/default-profile.png";
import { useGetOrderDetailsQuery } from "../../store/slices/orderSlice/apiSlice";
import { useGetInvoiceDetailsQuery, useUpdateInvoiceVerificationStatusMutation } from "../../store/slices/invoiceVerificationSlice/invoiceSlice";

const InvoiceDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [updateInvoiceVerificationStatus] = useUpdateInvoiceVerificationStatusMutation();

  const {
    data: order,
    isLoading,
    isError,
  } = useGetInvoiceDetailsQuery(params.id!);

  const [status, setStatus] = useState<string>("pending");
  const [verificationvideostatus, setProfileVideoVerificationStatus] =
    useState<string>("pending");
  const [updateUserVerification] = useUpdateUserVerificationMutation(); // Mutation hook to update status
  const [updateProfileVideoVerification] =
    useUpdateProfileVideoVerificationMutation();
  const [updateUserDocumentVerification] =
    useUpdateUserDocumentVerificationMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (order) {
      setStatus(order.Status);
    }
  }, [order]);

  // If loading or error states
  if (isLoading)
    return (
      <div className="text-center text-gray-500">
        <Loading />
      </div>
    );
  if (isError)
    return (
      <div className="text-red-500 text-center mt-4">
        Error loading user data
      </div>
    );

  // Handle status change
  const handleOnChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const verificationStatus = event.target.value;

    if (!verificationStatus) return;

    try {
      setStatus(verificationStatus);

      dispatch(updateIsLoading(true));
      const OrderOfferID =  order?.data?.OrderOffer?.[0]?.OrderOfferID;

      const response = await updateInvoiceVerificationStatus({
        orderId: params.id,
        status: verificationStatus,
        OrderOfferID,
      }).unwrap();

      toast.success(
        `Invoice status updated to ${verificationStatus}`
      );
    } catch (error: any) {
      console.error("Error updating invoice status:", error);

      toast.error(
        error?.data?.message || "Failed to update status"
      );
    } finally {
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

  const getWaitDays = (createdAt: string, waitTime: number | null) => {
    if (!waitTime) return "N.A.";

    const createdTs = new Date(createdAt).getTime();
    const waitTs = waitTime * 1000; // unix → ms

    const diffMs = waitTs - createdTs;

    if (diffMs <= 0) return "Expired";

    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return `${days} days`;
  };

  const getRemainingDays = (waitTime: number | null) => {
    if (!waitTime) return "N.A.";

    const now = Date.now();
    const target = waitTime * 1000;

    const diff = target - now;
    if (diff <= 0) return "Expired";

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
  return (
    <div className="">
      <ToastContainer />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Product Details */}
        <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">
            {order.data.ProductName}
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            {order.data.Descriptions}
          </p>
          <a
            href={order.data.ProductUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            View Product
          </a>

          <div className="mt-6 w-full">
            <p>
              <strong>Created By:</strong>{" "}
              {order?.data?.User?.FullName || "Admin"}
            </p>
            <p>
              <strong>Phone:</strong> {order?.data?.User?.Phone || "N.A"}
            </p>
            <p>
              <strong>Price:</strong> AED {order.data.Price}
            </p>
            <p>
              <strong>Quantity:</strong> {order.data.Quantity}
            </p>
            {/* <p>
              <strong>Delivery Reward:</strong> AED {order.data.DeliveryReward}
            </p>
            <p>
              <strong>Is With Box:</strong>{" "}
              {order.data.IsWithBox === 1 ? "Yes" : "No"}
            </p> */}
            {/* <p>
              <strong>Estimated Delivery Date:</strong>{" "}
              {new Date(order.data.EstimatedDeliveryDate).toLocaleDateString()}
            </p> */}
            {/* <p>
              <strong>Pay Up Front:</strong>{" "}
              {(() => {
                const validStatuses = [
                  "Accepted",
                  "ReadyToDeliver",
                  "Purchased",
                  "ReceiptUpload",
                  "InTransit",
                  "Delivered",
                ];

                const offer = order.data.OrderOffer?.find((offer: any) =>
                  validStatuses.includes(offer.Status),
                );

                if (!offer || !("payUpFront" in offer)) {
                  return "NA";
                }

                return offer.payUpFront ? "Yes" : "No";
              })()}
            </p> */}

            {/* <p>
              <strong>Wait time:</strong>{" "}
              {order.data.WaitTime
                ? `${getWaitDays(order.data.CreatedAt, order.data.WaitTime)} (${getRemainingDays(order.data.WaitTime)})`
                : "N.A."}
            </p> */}

            {/* {order.data.CreatedBy === "user" && (
              <p className="text-green-500 text-2xl font-medium mt-6">
                <strong
                  onClick={goToOffers}
                  className="px-4 py-2 text-md font-medium bg-green-100 border border-green-600 shadow-lg hover:bg-transparent hover:shadow-xl transition duration-200 ease-in-out cursor-pointer rounded-lg"
                >
                  Offers:{" "}
                  <span className="text-black font-medium px-2">
                    {order.data.totalOfferCount}
                  </span>
                </strong>
              </p>
            )} */}
          </div>
        </div>

        {/* Right Side - Address and Status */}
        <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Shipping Details</h3>
          <p>
            <strong>From Address:</strong> {order.data.From_address}
          </p>
          <p>
            <strong>To Address:</strong> {order.data.To_address}
          </p>

          {/* <div className="mt-6">
            <p>
              <strong>Status:</strong>
              <span
                className={`ml-2 px-3 py-1 rounded-full text-sm font-medium 
                ${
                  order.data?.Status === "Pending"
                    ? "bg-yellow-300 text-gray-800"
                    : order.data?.Status === "Shipped"
                      ? "bg-blue-300 text-gray-800"
                      : "bg-green-300 text-gray-800"
                }`}
              >
                {order.data?.Status}
              </span>
            </p>
          </div> */}
        </div>
      </div>

      {/* Order Invoice Verification */}
      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          Order Invoice Verification
        </h3>

        <div className="max-w-sm mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            <strong>Change Invoice Verification Status</strong>
          </label>
          <select
            id="status"
            value={status}
            onChange={handleOnChange} // Trigger on change to update status
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            // disabled={isDropdownDisabled}
          >
            {/* {isDropdownDisabled && <option value="">Select</option>} */}
            <option value="">Select</option>
            {/* <option value="pending">Pending</option> */}
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Dynamic Invoices Mapping Layout Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {invoices.length > 0 ? (
              invoices.map((invoice: any, idx: number) => (
                <div 
                  key={invoice.mediaId || idx} 
                  className="border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition flex flex-col justify-between"
                >
                  <p className="font-semibold mb-2 text-sm text-gray-700">
                    {invoice.Type ? invoice.Type.replace('_', ' ') : `Invoice Document #${idx + 1}`}
                  </p>
                  {invoice.url ? (
                    <div className="relative group cursor-pointer overflow-hidden rounded-md">
                      <img
                        src={invoice.url}
                        alt={invoice.Name || "Invoice media document"}
                        className="w-full h-40 object-cover rounded-md group-hover:scale-105 transition duration-200"
                        onClick={() => {
                          setSelectedImage(invoice.url);
                          setModalOpen(true);
                        }}
                      />
                      <div 
                        className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-200"
                        onClick={() => {
                          setSelectedImage(invoice.url);
                          setModalOpen(true);
                        }}
                      >
                        <span className="bg-white text-gray-800 text-xs px-2 py-1 rounded shadow font-medium">
                          Click to Zoom
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md text-sm">
                      No image URL path provided
                    </div>
                  )}
                  <div className="mt-2 text-[11px] text-gray-400 truncate">
                    Uploaded: {new Date(invoice.CreatedAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full border border-dashed border-gray-300 p-8 rounded-lg text-center text-gray-500">
                No matching invoice documents found for this order record.
              </div>
            )}
          </div> */}

        {/* Invoice Files */}
        {invoices?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {invoices.map((invoice: any, index: number) => {
              const fileUrl = invoice.url;
              const isPdf = fileUrl?.toLowerCase().endsWith(".pdf");

              return (
                <div
                  key={invoice.Id}
                  className="border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition"
                >
                  <p className="font-semibold mb-3">Invoice {index + 1}</p>

                  {/* PDF VIEW */}
                  {isPdf ? (
                    <div className="flex flex-col items-center justify-center h-52 bg-gray-100 rounded-md">
                      {/* PDF Icon */}
                      <div className="text-6xl mb-3">📄</div>

                      <p className="text-sm text-gray-600 mb-3">PDF Document</p>

                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        View PDF
                      </a>
                    </div>
                  ) : (
                    /* IMAGE VIEW */
                    <img
                      src={fileUrl}
                      alt={`Invoice ${index + 1}`}
                      className="w-full h-52 object-cover rounded-md cursor-pointer"
                      onClick={() => {
                        setSelectedImage(fileUrl);
                        setModalOpen(true);
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md">
            No invoice uploaded
          </div>
        )}
      </div>

      {modalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setModalOpen(false)}
        >
          {/* Close Button */}
          <button
            className="absolute top-5 right-5 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-lg hover:bg-red-500 hover:text-white transition"
            onClick={() => setModalOpen(false)}
          >
            ×
          </button>

          {/* Image */}
          <img
            src={selectedImage}
            alt="Enlarged document"
            className="w-[80vw] h-[80vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmToggleStatus}
        message={`Are you sure you want to verify this user?`}
      />
    </div>
  );
};

export default InvoiceDetails;
