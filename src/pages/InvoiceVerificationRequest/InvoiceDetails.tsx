import { useEffect, useState } from "react";
import {
  useGetUserInfoQuery,
  useUpdateUserVerificationMutation,
  useUpdateProfileVideoVerificationMutation,
  useUpdateUserDocumentVerificationMutation
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
import Button from '../../components/Common/Button';
import { toast, ToastContainer } from "react-toastify";
import {
  ConfirmationModal
} from "../../components/Common";
import defaultProfile from '../../assets/images/default-profile.png';
import { useGetOrderDetailsQuery } from "../../store/slices/orderSlice/apiSlice";
import { useGetInvoiceDetailsQuery } from "../../store/slices/invoiceVerificationSlice/invoiceSlice";



const InvoiceDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  console.log("params______", params);
  const { data: order, isLoading, isError } = useGetInvoiceDetailsQuery(params.id!);
  console.log('order', order);
  

  const [status, setStatus] = useState<string>("pending");
  const [verificationvideostatus, setProfileVideoVerificationStatus] = useState<string>("pending");
  const [updateUserVerification] = useUpdateUserVerificationMutation(); // Mutation hook to update status
  const [updateProfileVideoVerification] = useUpdateProfileVideoVerificationMutation();
  const [updateUserDocumentVerification] = useUpdateUserDocumentVerificationMutation();
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
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
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
  }
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
              <strong>Created By:</strong>  {order?.data?.User?.FullName || "Admin"}
            </p>
            <p>
              <strong>Phone:</strong>  {order?.data?.User?.Phone || "N.A"}
            </p>
            <p>
              <strong>Price:</strong> AED {order.data.Price}
            </p>
            <p>
              <strong>Quantity:</strong> {order.data.Quantity}
            </p>  
            <p>
              <strong>Delivery Reward:</strong> AED {order.data.DeliveryReward}
            </p>
            <p>
              <strong>Is With Box:</strong>{" "}
              {order.data.IsWithBox === 1 ? "Yes" : "No"}
            </p>
            {/* <p>
              <strong>Estimated Delivery Date:</strong>{" "}
              {new Date(order.data.EstimatedDeliveryDate).toLocaleDateString()}
            </p> */}
            <p>
              <strong>Pay Up Front:</strong>{" "}
              {(() => {
                const validStatuses = ["Accepted", "ReadyToDeliver", "Purchased", "ReceiptUpload", "InTransit", "Delivered"];

                const offer = order.data.OrderOffer?.find(
                  (offer: any) => validStatuses.includes(offer.Status)
                );

                if (!offer || !("payUpFront" in offer)) {
                  return "NA";
                }

                return offer.payUpFront ? "Yes" : "No";
              })()}
            </p>

            <p>
              <strong>Wait time:</strong>{" "}
              {order.data.WaitTime
                ? `${getWaitDays(order.data.CreatedAt, order.data.WaitTime)} (${getRemainingDays(order.data.WaitTime)})`
                : "N.A."}
            </p>
            
            {order.data.CreatedBy === "user" && (
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
            )}
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

          <div className="mt-6">
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
          </div>
        </div>
      </div>

      {/* Identification Documents */}
      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Identification Documents</h3>

        <div className="max-w-sm mb-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>Change Document Verification Status</strong>
              </label>
              <select
                id="status"
                value={status}
                onChange={handleOnChange} // Trigger on change to update status
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                // disabled={isDropdownDisabled}
              >
                {/* {isDropdownDisabled && <option value="">Select</option>} */}
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Emirates ID Front */}
          <div className="border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition">
            <p className="font-semibold mb-2">Emirates ID (Front)</p>
            {/* {IdentificationDocuments[0]?.EmiratesIDFrontImageURL ? (
              <img
                src={IdentificationDocuments[0]?.EmiratesIDFrontImageURL}
                alt="Emirates ID Front"
                className="w-full h-40 object-cover rounded-md"
                onClick={() => {
                  setSelectedImage(IdentificationDocuments[0]?.EmiratesIDFrontImageURL);
                  setModalOpen(true);
                }}
              />
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md">
                No image provided
              </div>
            )} */}

          </div>

          {/* Emirates ID Back */}
          <div className="border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition">
            <p className="font-semibold mb-2">Emirates ID (Back)</p>

            {/* {IdentificationDocuments[0]?.EmiratesIDBackImageURL ? (
              <img
                src={IdentificationDocuments[0]?.EmiratesIDBackImageURL}
                alt="Emirates ID Back"
                className="w-full h-40 object-cover rounded-md"
                onClick={() => {
                  setSelectedImage(IdentificationDocuments[0]?.EmiratesIDBackImageURL);
                  setModalOpen(true);
                }}
              /> */}
            {/* ) : (
              <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md">
                No image provided
              </div>
            )} */}

          </div>

          {/* Passport */}
          <div className="border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition">
            <p className="font-semibold mb-2">Passport</p>
            {/* <img
              src={IdentificationDocuments[0]?.PassportImageURL}
              alt="Passport"
              className="w-full h-40 object-cover rounded-md"
              onClick={() => {
                setSelectedImage(IdentificationDocuments[0]?.PassportImageURL);
                setModalOpen(true);
              }}
            /> */}
            {/* {IdentificationDocuments[0]?.PassportImageURL ? (
              <img
                src={IdentificationDocuments[0]?.PassportImageURL}
                alt="Passport"
                className="w-full h-40 object-cover rounded-md"
                onClick={() => {
                  setSelectedImage(IdentificationDocuments[0]?.PassportImageURL);
                  setModalOpen(true);
                }}
              />
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md">
                No image provided
              </div>
            )} */}

          </div>
        </div>
      </div>

      {modalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <img
            src={selectedImage}
            alt="Enlarged document"
            className="max-w-3xl max-h-[90vh] rounded shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
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
