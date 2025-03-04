import { useEffect, useState } from "react";
import { useGetUserInfoQuery } from "../../store/slices/userSlice/apiSlice";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const params = useParams();
  const { data, isLoading, isError } = useGetUserInfoQuery(params.id);

  if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
  if (isError) return <div className="text-red-500 text-center mt-4">Error loading user data</div>;

  const user = data?.data;
  const IdentificationDocuments = user?.IdentificationDocuments || [];

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-6">
        {/* Left Side - User Card */}
        <div className="col-span-1 bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col items-center">
            <img
              src={user?.ProfilePictureURL}
              alt="Profile"
              className="w-24 h-24 rounded-full border"
            />
            <h3 className="text-xl font-semibold mt-3">{user?.FullName}</h3>
            <p className="text-gray-600">{user?.Email}</p>
          </div>
          <div className="mt-4">
            <p><strong>Login type:</strong> {user?.Type}</p>
            <p><strong>Date of creation:</strong> {new Date(user?.CreatedAt).toLocaleDateString()}</p>
            <p><strong>Phone number:</strong> {user?.Phone}</p>
            <p><strong>Location:</strong> {user?.Location || "N/A"}</p>
            <p><strong>Birthday:</strong> {user?.DOB}</p>
            <p><strong>Status:</strong> 
              <span className={`ml-2 px-2 py-1 rounded ${user?.Status === "active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                {user?.Status}
              </span>
            </p>
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
                {user.devices.map((device, index) => (
                  <tr key={index} className="border">
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
        <div className="grid grid-cols-3 gap-6">
          {/* Emirates ID Front */}
          <div className="border p-4 rounded-lg text-center">
            <p className="font-semibold mb-2">Emirates ID (Front)</p>
            <img src={IdentificationDocuments[0]?.EmiratesIDFrontImageURL} alt="Emirates ID Front" className="w-full h-40 object-cover rounded-md" />
          </div>

          {/* Emirates ID Back */}
          <div className="border p-4 rounded-lg text-center">
            <p className="font-semibold mb-2">Emirates ID (Back)</p>
            <img src={IdentificationDocuments[0]?.EmiratesIDBackImageURL} alt="Emirates ID Back" className="w-full h-40 object-cover rounded-md" />
          </div>

          {/* Passport */}
          <div className="border p-4 rounded-lg text-center">
            <p className="font-semibold mb-2">Passport</p>
            <img src={IdentificationDocuments[0]?.PassportImageURL} alt="Passport" className="w-full h-40 object-cover rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
