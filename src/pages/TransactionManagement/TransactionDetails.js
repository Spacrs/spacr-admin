import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTransactionDetailsQuery } from "../../store/slices/orderSlice/apiSlice";
const TransactionDetails = () => {
    const { transactionId } = useParams();
    const { data: transaction, isLoading, error } = useGetTransactionDetailsQuery(transactionId);
    const [status, setStatus] = useState("");
    useEffect(() => {
        if (transaction?.data) {
            setStatus(transaction.data.TransactionStatus);
        }
    }, [transaction]);
    const handleOnChange = (event) => {
        setStatus(event.target.value);
    };
    if (isLoading)
        return _jsx("p", { className: "text-center mt-10", children: "Loading transaction details..." });
    if (error)
        return _jsx("p", { className: "text-center text-red-500 mt-10", children: "Failed to load transaction." });
    const t = transaction.data;
    return (_jsxs("div", { className: "p-6 max-w-5xl mx-auto bg-white shadow-xl rounded-lg space-y-6", children: [_jsxs("div", { className: "bg-gray-50 p-6 rounded-lg shadow-md", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Transaction Summary" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx("div", { children: _jsxs("p", { children: [_jsx("strong", { children: "Type:" }), " ", t.TransactionType] }) }), _jsx("div", { children: _jsxs("p", { children: [_jsx("strong", { children: "Status:" }), " ", _jsx("span", { className: `px-3 py-1 rounded-full text-sm font-medium ${t.TransactionStatus === "pending"
                                                ? "bg-yellow-200 text-yellow-800"
                                                : t.TransactionStatus === "completed"
                                                    ? "bg-green-200 text-green-800"
                                                    : "bg-gray-200 text-gray-800"}`, children: t.TransactionStatus })] }) }), _jsx("div", { children: _jsxs("p", { children: [_jsx("strong", { children: "Payment Intent ID:" }), " ", t.PaymentIntentID] }) })] })] }), _jsxs("div", { className: "bg-gray-50 p-6 rounded-lg shadow-md", children: [_jsx("h3", { className: "text-xl font-semibold mb-4", children: "Amount Details (AED)" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("p", { children: [_jsx("strong", { children: "Planned Base Total:" }), " ", parseFloat(t.plannedBaseAedTotal).toFixed(2)] }), _jsxs("p", { children: [_jsx("strong", { children: "Platform Fee:" }), " ", parseFloat(t.plannedPlatformFeeAed).toFixed(2)] }), _jsxs("p", { children: [_jsx("strong", { children: "Service Fee:" }), " ", parseFloat(t.plannedServiceFeeAed).toFixed(2)] }), _jsxs("p", { children: [_jsx("strong", { children: "Shopper Uplift:" }), " ", parseFloat(t.plannedShopperUpliftAed).toFixed(2)] }), _jsxs("p", { children: [_jsx("strong", { children: "FX Base Rate:" }), " ", parseFloat(t.fxBaseRate).toFixed(4)] }), _jsxs("p", { children: [_jsx("strong", { children: "FX Effective Rate:" }), " ", parseFloat(t.fxEffectiveRate).toFixed(4)] }), _jsxs("p", { children: [_jsx("strong", { children: "FX Markup Amount (Shopper):" }), " ", parseFloat(t.fxMarkupAmountShopper).toFixed(2)] })] })] }), _jsxs("div", { className: "bg-gray-50 p-6 rounded-lg shadow-md", children: [_jsx("h3", { className: "text-xl font-semibold mb-2", children: "Description" }), _jsx("p", { className: "text-gray-700", children: t.Descriptions })] }), _jsx("div", { className: "bg-gray-50 p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2", children: _jsxs("p", { children: [_jsx("strong", { children: "Created At:" }), " ", new Date(t.CreatedAt).toLocaleString()] }) })] }));
};
export default TransactionDetails;
