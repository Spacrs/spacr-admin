import { useEffect, useState } from "react";
import {
  useGetUserInfoQuery,
  useUpdateUserVerificationMutation,
  useUpdateProfileVideoVerificationMutation,
  useUpdateUserDocumentVerificationMutation
} from "../../store/slices/userSlice/apiSlice";
import { useParams } from "react-router-dom";
import {
  updateIsLoading,
  updateUserInUserList,
} from "../../store/slices/userSlice/userSlice";
import { useDispatch } from "react-redux";
import Loading from "../../components/Common/Loader";
import UserDevices from "./UserDevices";
// import { Button } from "@material-tailwind/react";
import Button from '../../components/Common/Button';
import { toast, ToastContainer } from "react-toastify";
import {
  ConfirmationModal
} from "../../components/Common";


const UserDetails = () => {
  const params = useParams();
  const { data, isLoading, isError, refetch } = useGetUserInfoQuery(params.id);

  const [status, setStatus] = useState<string>("pending");
  const [verificationvideostatus, setProfileVideoVerificationStatus] = useState<string>("pending");
  const [updateUserVerification] = useUpdateUserVerificationMutation(); // Mutation hook to update status
  const [updateProfileVideoVerification] = useUpdateProfileVideoVerificationMutation();
  const [updateUserDocumentVerification] = useUpdateUserDocumentVerificationMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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

  const user = data?.data;
  const IdentificationDocuments = user?.IdentificationDocuments || [];

  // Handle status change
  const handleOnChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
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
      dispatch(
        updateUserInUserList({ ...data.data, DocumentsVerified: verificationStatus})
      );
       await refetch();
      dispatch(updateIsLoading(false));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleOnChangeVideo = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const verificationStatus = event.target.value;
    setProfileVideoVerificationStatus(verificationStatus); // Update the local state

    // Trigger the API call to update user status
    try {
      dispatch(updateIsLoading(true));
      const data = await updateProfileVideoVerification({
        userId: user.UserID,
        ProfileVideoVerified: verificationStatus,
      }).unwrap();
      dispatch(
        updateUserInUserList({ ...data.data, ProfileVideoVerified: verificationStatus })
      );
       await refetch();
      dispatch(updateIsLoading(false));
    } catch (error) {
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
      dispatch(
        updateUserInUserList({ ...data.data, Verified: verificationStatus })
      );
       await refetch();
      dispatch(updateIsLoading(false));

      toast.success("Profile has been verified!");
    } catch (error) {
      console.error("Error updating status:", error);
    } 
    setIsModalOpen(false);
  }
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
      dispatch(
        updateUserInUserList({ ...data.data, Verified: verificationStatus })
      );
       await refetch();
      dispatch(updateIsLoading(false));

      toast.success("Profile has been verified!");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }



  let isDropdownDisabled = user.Verified === 'verified' ? true : false;
  let ButtonText = user.Verified === 'verified' ? 'Verified' : 'Verify';
  return (
    <div className="">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side - Enhanced User Card */}
        <div className="col-span-1 bg-white text-gray-700 shadow-lg rounded-lg p-6">
          <div className="flex flex-col items-center">
            {/* <img
              src={user?.ProfilePictureURL}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-gray shadow-lg"
            /> */}
            {user?.ProfilePictureURL ? (
              <img
                src={user.ProfilePictureURL}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-gray shadow-lg object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null; // Prevent infinite loop
                  e.currentTarget.src = ""; // Set src to empty to trigger fallback
                  e.currentTarget.style.display = "none"; // Hide broken image
                  const fallback = document.getElementById("profile-fallback");
                  if (fallback) fallback.style.display = "flex";
                }}
              />
            ) : null}

            <div
              id="profile-fallback"
              style={{ display: !user?.ProfilePictureURL ? "flex" : "none" }}
              className="w-28 h-28 rounded-full border-4 border-gray bg-gray-100 text-gray-500 shadow-lg flex items-center justify-center text-sm text-center px-2"
            >
              No profile image
            </div>

            <h3 className="text-2xl font-semibold mt-3">{user?.FullName}</h3>
            <p className="text-gray-500">{user?.Email}</p>
          </div>
          <div className="mt-4 space-y-2 text-gray-700">
            <p>
              <strong>Login type:</strong> {user?.Type}
            </p>
            <p>
              <strong>Date of creation:</strong>{" "}
              {new Date(user?.CreatedAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Phone number:</strong> {user?.Phone}
            </p>
            <p>
              <strong>Location:</strong> {user?.MainCountry.name || "N/A"}
            </p>
            <p>
              <strong>Status:</strong>
              <span
                className={`ml-2 px-3 py-1 rounded-full text-sm font-medium transition-all 
                ${
                  user?.Status === "active"
                    ? "bg-green-400 text-white"
                    : "bg-red-400 text-white"
                }`}
              >
                {user?.Status}
              </span>
            </p>

            
          </div>
        </div>

        {/* Right Side - Device List */}
        <div className="col-span-2 flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto">
        <h3 className="text-lg font-semibold mb-3">Device List</h3>
          <UserDevices />
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
                disabled={isDropdownDisabled}
              >
                {isDropdownDisabled && <option value="">Select</option>}
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Emirates ID Front */}
          <div className="border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition">
            <p className="font-semibold mb-2">Emirates ID (Front)</p>
            {/* <img
              src={IdentificationDocuments[0]?.EmiratesIDFrontImageURL}
              alt="Emirates ID Front"
              className="w-full h-40 object-cover rounded-md"
              onClick={() => {
                setSelectedImage(IdentificationDocuments[0]?.EmiratesIDFrontImageURL);
                setModalOpen(true);
              }}
            /> */}
            {IdentificationDocuments[0]?.EmiratesIDFrontImageURL ? (
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
            )}

          </div>

          {/* Emirates ID Back */}
          <div className="border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition">
            <p className="font-semibold mb-2">Emirates ID (Back)</p>
            {/* <img
              src={IdentificationDocuments[0]?.EmiratesIDBackImageURL}
              alt="Emirates ID Back"
              className="w-full h-40 object-cover rounded-md"
              onClick={() => {
                setSelectedImage(IdentificationDocuments[0]?.EmiratesIDBackImageURL);
                setModalOpen(true);
              }}
            /> */}
            {IdentificationDocuments[0]?.EmiratesIDBackImageURL ? (
              <img
                src={IdentificationDocuments[0]?.EmiratesIDBackImageURL}
                alt="Emirates ID Back"
                className="w-full h-40 object-cover rounded-md"
                onClick={() => {
                  setSelectedImage(IdentificationDocuments[0]?.EmiratesIDBackImageURL);
                  setModalOpen(true);
                }}
              />
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md">
                No image provided
              </div>
            )}

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
            {IdentificationDocuments[0]?.PassportImageURL ? (
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
            )}

          </div>
        </div>
      </div>

            {/* Video Verification Section */}
      <div className="mt-6 bg-white shadow-md rounded-lg p-6 w-full">
        <h3 className="text-lg font-semibold mb-4">Profile Video Verification</h3>

        {/* Verification Dropdown */}
        <div className="max-w-sm mb-4">
          <label
            htmlFor="videoStatus"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Change Profile Video Verification Status
          </label>
          <select
            id="videoStatus"
            value={verificationvideostatus}
            onChange={handleOnChangeVideo}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            disabled={isDropdownDisabled}
          >
            {isDropdownDisabled && <option value="">Select</option>}
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Video Player */}
        {user?.VideoVerification?.url ? (
          <div className="w-full overflow-hidden rounded-lg shadow">
            <video
              src={user.VideoVerification.url}
              controls
              className="w-full max-h-[500px] object-contain rounded-lg"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <p className="text-gray-500 italic">No video uploaded.</p>
        )}

      </div>

      <div className="mt-6 bg-white shadow-md rounded-lg p-6 w-full flex justify-center">
        <Button text={ButtonText} type="button" onClick={handleToggleStatus} variant="primary" disabled={isDropdownDisabled} />
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

export default UserDetails;
