import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetReferralCodeDetailsQuery } from "../../store/slices/orderSlice/apiSlice";
const ReferralCodeDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { referralCodeID } = useParams();
    const { data: order, isLoading, error } = useGetReferralCodeDetailsQuery(referralCodeID);
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
        return _jsx("p", { children: "Loading Referral Code details..." });
    if (error) {
        console.error("Order Details API Error:", error);
        if (error.status === 401) {
            console.log("Unauthorized! Redirecting to login...");
        }
        return (_jsxs("p", { className: "text-center text-red-500", children: ["Failed to load Referral Code details. Error: ", error.status] }));
    }
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto bg-white shadow-xl rounded-lg", children: [_jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: _jsxs("div", { className: "flex flex-col bg-gray-50 p-6 rounded-lg shadow-md", children: [_jsx("h2", { className: "text-2xl font-semibold mb-2", children: order.data.ProductName }), _jsx("p", { className: "text-gray-500 text-sm mb-4", children: order.data.Descriptions }), _jsx("a", { href: order.data.ProductUrl, target: "_blank", rel: "noopener noreferrer", className: "text-indigo-600 hover:text-indigo-800 text-sm", children: "View Product" }), _jsx("div", { className: "mt-6 w-full", children: _jsxs("p", { children: [_jsx("strong", { children: "Price:" }), " $", order.data.Price] }) })] }) }), order.data.medias && order.data.medias.length > 0 && (_jsxs("div", { className: "mt-6 bg-gray-50 p-6 rounded-lg shadow-md", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Product Images" }), _jsx("div", { className: "flex flex-wrap gap-4 justify-center", children: order.data.medias.map((media, index) => {
                            // Adjust size based on the number of images
                            const imageSize = order.data.medias.length === 1
                                ? "w-64 h-64" // 1 Image - Large
                                : order.data.medias.length === 2
                                    ? "w-48 h-48" // 2 Images - Medium
                                    : "w-32 h-32"; // 3 or More Images - Small
                            return (_jsx("img", { src: media.url, alt: media.description || `Product Image ${index + 1}`, className: `${imageSize} object-cover rounded-lg shadow-md border` }, index));
                        }) })] })), _jsxs("div", { className: "mt-6 flex justify-between items-center text-sm text-gray-500", children: [_jsxs("p", { children: [_jsx("strong", { children: "Order ID" }), ": ", order.data.OrderID] }), _jsxs("p", { children: [_jsx("strong", { children: "Created Date" }), ":", " ", new Date(order.data.CreatedAt).toLocaleDateString()] })] })] }));
};
export default ReferralCodeDetails;
