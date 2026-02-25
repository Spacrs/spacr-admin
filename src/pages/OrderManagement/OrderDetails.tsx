  import { useEffect, useState } from "react";
  import React from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import { useGetOrderDetailsQuery } from "../../store/slices/orderSlice/apiSlice";

  const OrderDetails = () => {
    const params = useParams();
    const navigate = useNavigate();

    const { orderId } = useParams();
    const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId!);

    console.log("Order ID from URL:", orderId);
    console.log("API Response:", order);
    console.log("API Error:", error);

    const [status, setStatus] = useState<string>("");

    useEffect(() => {
      if (order) {
        setStatus(order.Status);
      }
    }, [order]);

    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setStatus(event.target.value);
    };

    if (isLoading) return <p>Loading order details...</p>;
    if (error) {
      console.error("Order Details API Error:", error);
      if (error.status === 401) {
        console.log("Unauthorized! Redirecting to login...");
      }
      return (
        <p className="text-center text-red-500">
          Failed to load order details. Error: {error.status}
        </p>
      );
    }

    const goToOffers = () => {
      navigate("/admin/order-offers/" + orderId);
    };

    const createdAtTs = new Date(order.CreatedAt).getTime();
    const waitTimeTs = order.WaitTime ? order.WaitTime * 1000 : null;


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
        {/* "LIVE",
    "ACCEPTED",
    "PURCHASED",
    "IN_TRANSIT",
    "READY_TO_RECEIVE",
    "COMPLETED",
    "CANCELLED", */}

        {/* {order.data.medias && order.data.medias.length > 0 && (
          <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Product Images</h3>
            <div className="flex flex-wrap gap-4">
              {order.data.medias.map((media: any, index: number) => (
                <img
                  key={index}
                  src={media.url}
                  alt={media.description || `Product Image ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-lg shadow-md border"
                />
              ))}
            </div>
          </div>
        )} */}

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

  export default OrderDetails;
