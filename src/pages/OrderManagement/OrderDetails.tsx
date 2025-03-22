import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../../store/slices/orderSlice/apiSlice";

const OrderDetails = () => {
  const params = useParams();

  // Mock order data based on the provided structure
  // const order = {
  //   OrderID: "6d08fbc6-649e-4d0e-971c-f8e4bb33077e",
  //   ProductName: "Wireless Headphones",
  //   Descriptions: "High-quality wireless headphones with noise cancellation.",
  //   ProductUrl: "https://example.com/wireless-headphones",
  //   Price: 79,
  //   DeliveryReward: 5,
  //   Quantity: 2,
  //   IsWithBox: 1,
  //   EstimatedDeliveryDate: "2025-03-10",
  //   Status: "Pending",
  //   From_address: "123 Main St, Los Angeles, CA",
  //   To_address: "456 Elm St, New York, NY",
  //   IsDeleted: 0,
  //   CreatedAt: "2025-03-03 12:44:49.468",
  //   UpdatedAt: "2025-03-03 12:44:49.468",
  //   IsTrending: 0
  // };

  const { orderId } = useParams(); // Get order ID from URL params
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId!); 

  console.log("Order ID from URL:", orderId);
  console.log("API Response:", order);
  console.log("API Error:", error);

  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (order) {
      setStatus(order.Status); // Set initial status when order loads
    }
  }, [order]);

  // Handle status change
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value); // Update the local state
  };

  if (isLoading) return <p>Loading order details...</p>;
  if (error) {
    console.error("Order Details API Error:", error);
    if (error.status === 401) {
      console.log("Unauthorized! Redirecting to login...");
      // Perform logout logic if needed
    }
    return <p className="text-center text-red-500">Failed to load order details. Error: {error.status}</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow-xl rounded-lg">
      {/* Order Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Product Details */}
        <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">{order.data.ProductName}</h2>
          <p className="text-gray-500 text-sm mb-4">{order.data.Descriptions}</p>
          <a href={order.data.ProductUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 text-sm">
            View Product
          </a>

          <div className="mt-6 w-full">
            <p><strong>Price:</strong> ${order.data.Price}</p>
            <p><strong>Quantity:</strong> {order.data.Quantity}</p>
            <p><strong>Delivery Reward:</strong> ${order.data.DeliveryReward}</p>
            <p><strong>Is With Box:</strong> {order.data.IsWithBox === 1 ? "Yes" : "No"}</p>
            <p><strong>Estimated Delivery Date:</strong> {new Date(order.data.EstimatedDeliveryDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Right Side - Address and Status */}
        <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Shipping Details</h3>
          <p><strong>From Address:</strong> {order.data.From_address}</p>
          <p><strong>To Address:</strong> {order.data.To_address}</p>

          <div className="mt-6">
            <p><strong>Status:</strong>
              <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium 
                ${status === "Pending" ? "bg-yellow-300 text-gray-800" : 
                  status === "Shipped" ? "bg-blue-300 text-gray-800" : 
                  "bg-green-300 text-gray-800"}`}>
                {status}
              </span>
            </p>

            <div className="mt-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Update Order Status</label>
              <select
                id="status"
                value={status}
                onChange={handleOnChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      
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
          order.data.medias.length === 1 ? "w-64 h-64" : // 1 Image - Large
          order.data.medias.length === 2 ? "w-48 h-48" : // 2 Images - Medium
          "w-32 h-32"; // 3 or More Images - Small

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
        <p><strong>Order ID</strong>: {order.data.OrderID}</p>
        <p><strong>Created Date</strong>: {new Date(order.data.CreatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
