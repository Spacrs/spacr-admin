import { useEffect, useState } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetReferralCodeDetailsQuery } from "../../store/slices/orderSlice/apiSlice";

const ReferralCodeDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { referralCodeID } = useParams();
  const { data: order, isLoading, error } = useGetReferralCodeDetailsQuery(referralCodeID!);

  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (order) {
      setStatus(order.Status);
    }
  }, [order]);

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
              <strong>Price:</strong> ${order.data.Price}
            </p>
            
          </div>
        </div>

        
      </div>
      




      {/* ✅ Product Images Section with Dynamic Sizing */}
      {order.data.medias && order.data.medias.length > 0 && (
        <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Product Images</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {order.data.medias.map((media: any, index: number) => {
              // Adjust size based on the number of images
              const imageSize =
                order.data.medias.length === 1
                  ? "w-64 h-64" // 1 Image - Large
                  : order.data.medias.length === 2
                  ? "w-48 h-48" // 2 Images - Medium
                  : "w-32 h-32"; // 3 or More Images - Small

              return (
                <img
                  key={index}
                  src={media.url} // ✅ Ensure correct property for image URL
                  alt={media.description || `Product Image ${index + 1}`}
                  className={`${imageSize} object-cover rounded-lg shadow-md border`}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Footer - Order Metadata */}
      <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
        <p>
          <strong>Order ID</strong>: {order.data.OrderID}
        </p>
        <p>
          <strong>Created Date</strong>:{" "}
          {new Date(order.data.CreatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ReferralCodeDetails;
