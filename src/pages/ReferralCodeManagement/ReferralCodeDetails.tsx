import { useEffect, useState } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetReferralCodeDetailsQuery } from "../../store/slices/orderSlice/apiSlice";
import { columns } from "../../constant/Columns";
import { Search, ErrorMsg, Table, Button } from "../../components/Common";

const ReferralCodeDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { referralCodeID } = useParams();
  const { data: referralCodeData, isFetching, isLoading, error, refetch } = useGetReferralCodeDetailsQuery(referralCodeID!);

  const [status, setStatus] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    refetch(); // Refetch data when the page changes
  };
const handleUpdate = () => {

}

const handleView = () => {

}

const onSort = () => {

}

const itemsPerPage = 10;
const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = referralCodeData.data.users.slice(startIndex, endIndex) || [];

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow-xl rounded-lg">
      {/* Order Details Card */}
      
      {/* <h3 className="text-lg font-semibold text-sky-900 mb-2">
        Referral Code: <span className="font-mono">{referralCodeData.data.referralCode}</span>
      </h3> */}
      <strong className="px-4 py-2 text-md font-medium bg-green-100 border border-green-600 shadow-lg hover:bg-transparent hover:shadow-xl transition duration-200 ease-in-out cursor-pointer rounded-lg">
      Referral Code: <span className="text-black font-medium px-2">{referralCodeData.data.referralCode}</span>
      </strong>
      
        <div className="mt-8 bg-white p-6 rounded-lg shadow-xl">
          
          <p className="text-gray-700 mb-4">These users have redeemed this code:</p>
          
          {/* <ul className="list-disc pl-5 text-gray-800">
            {referralCodeData.data.users.map((user: any, index: number) => (
              <li key={index}>
                <strong>{user.FullName}</strong> ({user.Email})
              </li>
            ))}
          </ul> */}
          <Table
          data={paginatedData}
          columns={columns.referralCodeDetails}
          loading={isLoading || isFetching}
          // totalPages={referralCodeData.data.users?.pagination?.totalPages || 1}
          totalPages={Math.ceil((referralCodeData.data.users?.length || 0) / itemsPerPage)}
          currentPage={currentPage}
          onPageChange={onPageChange}
          handleUpdate={handleUpdate}
          handleView={handleView}
          itemsPerPage={itemsPerPage}
          onSort={onSort}
        />
        </div>
      

      {/* Footer - Order Metadata */}
      <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
        
      </div>
    </div>
  );
};

export default ReferralCodeDetails;
