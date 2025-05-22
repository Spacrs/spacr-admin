import { useEffect, useState } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetReferralCodeDetailsQuery } from "../../store/slices/orderSlice/apiSlice";

const ReferralCodeDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { referralCodeID } = useParams();
  const { data: referralCodeData, isLoading, error } = useGetReferralCodeDetailsQuery(referralCodeID!);

  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (referralCodeData) {
      setStatus(referralCodeData.Status);
    }
  }, [referralCodeData]);

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  if (isLoading) return <p>Loading Referral Code details...</p>;
  if (error) {
    console.error("Order Details API Error:", error);
    if (error.status === 401) {
      console.log("Unauthorized! Redirecting to login...");
    }
    return (
      <p className="text-center text-red-500">
        Failed to load Referral Code details. Error: {error.status}
      </p>
    );
  }


  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow-xl rounded-lg">
      {/* Order Details Card */}
      
      
      {referralCodeData.data.historyRecords && referralCodeData.data.historyRecords.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-xl">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            Referral Code: <span className="font-mono">{referralCodeData.data.historyRecords[0].code}</span>
          </h3>
          <p className="text-gray-700 mb-4">These users have redeemed this code:</p>
          
          <ul className="list-disc pl-5 text-gray-800">
            {referralCodeData.data.users.map((user: any, index: number) => (
              <li key={index}>
                <strong>{user.FullName}</strong> ({user.Email})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer - Order Metadata */}
      <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
        <p>
          
        </p>
        <p>
          <strong>Created Date</strong>:{" "}
          {new Date(referralCodeData.data.historyRecords[0].CreatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ReferralCodeDetails;
