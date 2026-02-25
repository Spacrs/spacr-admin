import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../../store/slices/orderSlice/apiSlice";
const OrderDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { orderId } = useParams();
    const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);
    console.log("Order ID from URL:", orderId);
    console.log("API Response:", order);
    console.log("API Error:", error);
    const [status, setStatus] = useState("");
    useEffect(() => {
        if (order) {
            setStatus(order.Status);
        }
    }, [order]);
    const handleOnChange = (event) => {
        setStatus(event.target.value);
    };
    if (isLoading)
        return _jsx("p", { children: "Loading order details..." });
    if (error) {
        console.error("Order Details API Error:", error);
        if (error.status === 401) {
            console.log("Unauthorized! Redirecting to login...");
        }
        return (_jsxs("p", { className: "text-center text-red-500", children: ["Failed to load order details. Error: ", error.status] }));
    }
    const goToOffers = () => {
        navigate("/admin/order-offers/" + orderId);
    };
    const createdAtTs = new Date(order.CreatedAt).getTime();
    const waitTimeTs = order.WaitTime ? order.WaitTime * 1000 : null;
    const getWaitDays = (createdAt, waitTime) => {
        if (!waitTime)
            return "N.A.";
        const createdTs = new Date(createdAt).getTime();
        const waitTs = waitTime * 1000; // unix → ms
        const diffMs = waitTs - createdTs;
        if (diffMs <= 0)
            return "Expired";
        const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        return `${days} days`;
    };
    const getRemainingDays = (waitTime) => {
        if (!waitTime)
            return "N.A.";
        const now = Date.now();
        const target = waitTime * 1000;
        const diff = target - now;
        if (diff <= 0)
            return "Expired";
        return `${Math.ceil(diff / (1000 * 60 * 60 * 24))} days left`;
    };
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto bg-white shadow-xl rounded-lg", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "flex flex-col bg-gray-50 p-6 rounded-lg shadow-md", children: [_jsx("h2", { className: "text-2xl font-semibold mb-2", children: order.data.ProductName }), _jsx("p", { className: "text-gray-500 text-sm mb-4", children: order.data.Descriptions }), _jsx("a", { href: order.data.ProductUrl, target: "_blank", rel: "noopener noreferrer", className: "text-indigo-600 hover:text-indigo-800 text-sm", children: "View Product" }), _jsxs("div", { className: "mt-6 w-full", children: [_jsxs("p", { children: [_jsx("strong", { children: "Price:" }), " AED ", order.data.Price] }), _jsxs("p", { children: [_jsx("strong", { children: "Quantity:" }), " ", order.data.Quantity] }), _jsxs("p", { children: [_jsx("strong", { children: "Delivery Reward:" }), " AED ", order.data.DeliveryReward] }), _jsxs("p", { children: [_jsx("strong", { children: "Is With Box:" }), " ", order.data.IsWithBox === 1 ? "Yes" : "No"] }), _jsxs("p", { children: [_jsx("strong", { children: "Pay Up Front:" }), " ", (() => {
                                                const validStatuses = ["Accepted", "ReadyToDeliver", "Purchased", "ReceiptUpload", "InTransit", "Delivered"];
                                                const offer = order.data.OrderOffer?.find((offer) => validStatuses.includes(offer.Status));
                                                if (!offer || !("payUpFront" in offer)) {
                                                    return "NA";
                                                }
                                                return offer.payUpFront ? "Yes" : "No";
                                            })()] }), _jsxs("p", { children: [_jsx("strong", { children: "Wait time:" }), " ", order.data.WaitTime
                                                ? `${getWaitDays(order.data.CreatedAt, order.data.WaitTime)} (${getRemainingDays(order.data.WaitTime)})`
                                                : "N.A."] }), order.data.CreatedBy === "user" && (_jsx("p", { className: "text-green-500 text-2xl font-medium mt-6", children: _jsxs("strong", { onClick: goToOffers, className: "px-4 py-2 text-md font-medium bg-green-100 border border-green-600 shadow-lg hover:bg-transparent hover:shadow-xl transition duration-200 ease-in-out cursor-pointer rounded-lg", children: ["Offers:", " ", _jsx("span", { className: "text-black font-medium px-2", children: order.data.totalOfferCount })] }) }))] })] }), _jsxs("div", { className: "flex flex-col bg-gray-50 p-6 rounded-lg shadow-md", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Shipping Details" }), _jsxs("p", { children: [_jsx("strong", { children: "From Address:" }), " ", order.data.From_address] }), _jsxs("p", { children: [_jsx("strong", { children: "To Address:" }), " ", order.data.To_address] }), _jsx("div", { className: "mt-6", children: _jsxs("p", { children: [_jsx("strong", { children: "Status:" }), _jsx("span", { className: `ml-2 px-3 py-1 rounded-full text-sm font-medium 
                  ${order.data?.Status === "Pending"
                                                ? "bg-yellow-300 text-gray-800"
                                                : order.data?.Status === "Shipped"
                                                    ? "bg-blue-300 text-gray-800"
                                                    : "bg-green-300 text-gray-800"}`, children: order.data?.Status })] }) })] })] }), order.data.medias && order.data.medias.length > 0 && (_jsxs("div", { className: "mt-6 bg-gray-50 p-6 rounded-lg shadow-md", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Product Images" }), _jsx("div", { className: "flex flex-wrap gap-4 justify-center", children: order.data.medias.map((media, index) => {
                            // Adjust size based on the number of images
                            const imageSize = order.data.medias.length === 1
                                ? "w-64 h-64" // 1 Image - Large
                                : order.data.medias.length === 2
                                    ? "w-48 h-48" // 2 Images - Medium
                                    : "w-32 h-32"; // 3 or More Images - Small
                            return (_jsx("img", { src: media.url, alt: media.description || `Product Image ${index + 1}`, className: `${imageSize} object-cover rounded-lg shadow-md border` }, index));
                        }) })] })), _jsxs("div", { className: "mt-6 flex justify-between items-center text-sm text-gray-500", children: [_jsxs("p", { children: [_jsx("strong", { children: "Order ID" }), ": ", order.data.OrderID] }), _jsxs("p", { children: [_jsx("strong", { children: "Created Date" }), ":", " ", new Date(order.data.CreatedAt).toLocaleDateString()] })] })] }));
};
export default OrderDetails;
