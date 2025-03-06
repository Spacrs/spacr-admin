import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const params = useParams();

  // Mock order data based on the provided structure
  const order = {
    OrderID: "6d08fbc6-649e-4d0e-971c-f8e4bb33077e",
    ProductName: "Wireless Headphones",
    Descriptions: "High-quality wireless headphones with noise cancellation.",
    ProductUrl: "https://example.com/wireless-headphones",
    Price: 79,
    DeliveryReward: 5,
    Quantity: 2,
    IsWithBox: 1,
    EstimatedDeliveryDate: "2025-03-10",
    Status: "Pending",
    From_address: "123 Main St, Los Angeles, CA",
    To_address: "456 Elm St, New York, NY",
    IsDeleted: 0,
    CreatedAt: "2025-03-03 12:44:49.468",
    UpdatedAt: "2025-03-03 12:44:49.468",
    IsTrending: 0
  };

  const [status, setStatus] = useState<string>(order.Status);

  // Handle status change
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value); // Update the local state
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow-xl rounded-lg">
      {/* Order Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Product Details */}
        <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">{order.ProductName}</h2>
          <p className="text-gray-500 text-sm mb-4">{order.Descriptions}</p>
          <a href={order.ProductUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 text-sm">
            View Product
          </a>

          <div className="mt-6 w-full">
            <p><strong>Price:</strong> ${order.Price}</p>
            <p><strong>Quantity:</strong> {order.Quantity}</p>
            <p><strong>Delivery Reward:</strong> ${order.DeliveryReward}</p>
            <p><strong>Is With Box:</strong> {order.IsWithBox === 1 ? "Yes" : "No"}</p>
            <p><strong>Estimated Delivery Date:</strong> {new Date(order.EstimatedDeliveryDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Right Side - Address and Status */}
        <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Shipping Details</h3>
          <p><strong>From Address:</strong> {order.From_address}</p>
          <p><strong>To Address:</strong> {order.To_address}</p>

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

      {/* Footer - Order Metadata */}
      <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
        <p><strong>Order ID</strong>: {order.OrderID}</p>
        <p><strong>Created Date</strong>: {new Date(order.CreatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
