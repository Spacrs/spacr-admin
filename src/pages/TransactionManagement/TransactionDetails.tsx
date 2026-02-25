import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetTransactionDetailsQuery } from "../../store/slices/orderSlice/apiSlice";

const TransactionDetails = () => {
  const { transactionId } = useParams();
  const { data: transaction, isLoading, error } = useGetTransactionDetailsQuery(transactionId!);

  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (transaction?.data) {
      setStatus(transaction.data.TransactionStatus);
    }
  }, [transaction]);

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  if (isLoading) return <p className="text-center mt-10">Loading transaction details...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Failed to load transaction.</p>;

  const t = transaction.data;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-xl rounded-lg space-y-6">
      {/* Transaction Summary */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Transaction Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p><strong>Type:</strong> {t.TransactionType}</p>
          </div>
          <div>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  t.TransactionStatus === "pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : t.TransactionStatus === "completed"
                    ? "bg-green-200 text-green-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {t.TransactionStatus}
              </span>
            </p>
          </div>
          <div>
            <p><strong>Payment Intent ID:</strong> {t.PaymentIntentID}</p>
          </div>
        </div>
      </div>

      {/* Amount Details */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Amount Details (AED)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p><strong>Planned Base Total:</strong> {parseFloat(t.plannedBaseAedTotal).toFixed(2)}</p>
          <p><strong>Platform Fee:</strong> {parseFloat(t.plannedPlatformFeeAed).toFixed(2)}</p>
          <p><strong>Service Fee:</strong> {parseFloat(t.plannedServiceFeeAed).toFixed(2)}</p>
          <p><strong>Shopper Uplift:</strong> {parseFloat(t.plannedShopperUpliftAed).toFixed(2)}</p>
          <p><strong>FX Base Rate:</strong> {parseFloat(t.fxBaseRate).toFixed(4)}</p>
          <p><strong>FX Effective Rate:</strong> {parseFloat(t.fxEffectiveRate).toFixed(4)}</p>
          <p><strong>FX Markup Amount (Shopper):</strong> {parseFloat(t.fxMarkupAmountShopper).toFixed(2)}</p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Description</h3>
        <p className="text-gray-700">{t.Descriptions}</p>
      </div>

      {/* Metadata */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <p><strong>Created At:</strong> {new Date(t.CreatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default TransactionDetails;
