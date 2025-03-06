import { useEffect, useState } from "react";
import { useGetUserInfoQuery, useUpdateUserVerificationMutation } from "../../store/slices/userSlice/apiSlice";
import { useParams } from "react-router-dom";
import {updateIsLoading, updateUserInUserList} from '../../store/slices/userSlice/userSlice'
import { useDispatch } from "react-redux";
import Loading from "../../components/Common/Loader";

const UserDetails = () => {
  const params = useParams();
  const { data, isLoading, isError } = useGetUserInfoQuery(params.id);

  const [status, setStatus] = useState<string>("pending");
  const [updateUserVerification] = useUpdateUserVerificationMutation(); // Mutation hook to update status
  const dispatch = useDispatch()
  useEffect(() => {
    if (data?.data) {
      setStatus(data?.data.Verified); // Initialize the dropdown with the current status of the user
    }
  }, [data]);

  // If loading or error states
  if (isLoading) return <div className="text-center text-gray-500"><Loading/></div>;
  if (isError) return <div className="text-red-500 text-center mt-4">Error loading user data</div>;

  const user = data?.data;
  const IdentificationDocuments = user?.IdentificationDocuments || [];

  // Handle status change
  const handleOnChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const verificationStatus = event.target.value;
    setStatus(verificationStatus); // Update the local state

    // Trigger the API call to update user status
    try {
      dispatch(updateIsLoading(true));
      const data = await updateUserVerification({
        userId: user.UserID,
        verified: verificationStatus,
      }).unwrap();
      dispatch(updateUserInUserList({ ...data.data,  Verified: verificationStatus}));
      dispatch(updateIsLoading(false));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side - Enhanced User Card */}
        <div className="col-span-1 bg-white text-gray-700 shadow-lg rounded-lg p-6">
          <div className="flex flex-col items-center">
            <img
              src={user?.ProfilePictureURL}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-gray shadow-lg"
            />
            <h3 className="text-2xl font-semibold mt-3">{user?.FullName}</h3>
            <p className="text-gray-500">{user?.Email}</p>
          </div>
          <div className="mt-4 space-y-2 text-gray-700">
            <p><strong>Login type:</strong> {user?.Type}</p>
            <p><strong>Date of creation:</strong> {new Date(user?.CreatedAt).toLocaleDateString()}</p>
            <p><strong>Phone number:</strong> {user?.Phone}</p>
            <p><strong>Location:</strong> {user?.Location || "N/A"}</p>
            <p><strong>Birthday:</strong> {user?.DOB}</p>
            <p>
              <strong>Status:</strong>
              <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium transition-all 
                ${user?.Status === "active" ? "bg-green-400 text-white" : "bg-red-400 text-white"}`}>
                {user?.Status}
              </span>
            </p>

            <div className="mt-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              <strong>Change Verification Status</strong>
              </label>
              <select
                id="status"
                value={status} 
                onChange={handleOnChange} // Trigger on change to update status
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Side - Device List */}
        <div className="col-span-2 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Device List</h3>
          {user?.devices?.length > 0 ? (
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Device Name</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {user.devices.map((device: any, index: any) => (
                  <tr key={index} className="border hover:bg-gray-100 transition">
                    <td className="border p-2">{device.name}</td>
                    <td className="border p-2">{device.status}</td>
                    <td className="border p-2">{device.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No devices found.</p>
          )}
        </div>
      </div>

      {/* Identification Documents */}
      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Identification Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Emirates ID Front */}
          <div className="border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition">
            <p className="font-semibold mb-2">Emirates ID (Front)</p>
            <img
              src={IdentificationDocuments[0]?.EmiratesIDFrontImageURL}
              alt="Emirates ID Front"
              className="w-full h-40 object-cover rounded-md"
            />
          </div>

          {/* Emirates ID Back */}
          <div className="border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition">
            <p className="font-semibold mb-2">Emirates ID (Back)</p>
            <img
              src={IdentificationDocuments[0]?.EmiratesIDBackImageURL}
              alt="Emirates ID Back"
              className="w-full h-40 object-cover rounded-md"
            />
          </div>

          {/* Passport */}
          <div className="border p-4 rounded-lg text-center shadow-md hover:shadow-lg transition">
            <p className="font-semibold mb-2">Passport</p>
            <img
              src={IdentificationDocuments[0]?.PassportImageURL}
              alt="Passport"
              className="w-full h-40 object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
