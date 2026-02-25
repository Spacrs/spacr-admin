import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetWithdrawalDetailsQuery,
  useUpdateWithdrawalStatusMutation,
} from "../../store/slices/orderSlice/apiSlice";

const Modal: React.FC<{
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}> = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg p-6 z-10">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
};

const WithdrawalDetails = () => {
  const { withdrawalId } = useParams();
  const { data: withdrawal, isLoading, error } = useGetWithdrawalDetailsQuery(withdrawalId!);

  const [updateStatus, { isLoading: updating }] = useUpdateWithdrawalStatusMutation();

  const [localStatus, setLocalStatus] = useState<string>("");

  const [modalOpen, setModalOpen] = useState<null | "paid" | "failed">(null);
  const [reason, setReason] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (withdrawal?.data) {
      setLocalStatus(withdrawal.data.withdrawal.Status);
    }
  }, [withdrawal]);

  if (isLoading) return <p className="text-center mt-10">Loading transaction details...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Failed to load transaction.</p>;
  const t = withdrawal.data;

  const openPaidConfirm = () => setModalOpen("paid");
  const openFailedConfirm = () => setModalOpen("failed");
  const closeModal = () => {
    setModalOpen(null);
    setReason("");
  };

  const performUpdate = async (newStatus: string, reasonPayload?: string) => {
    if (!withdrawalId) return;
    try {
      setLocalStatus(newStatus);

      await updateStatus({
        withdrawalId,
        status: newStatus,
        ...(reasonPayload ? { reason: reasonPayload } : {}),
      }).unwrap();

      closeModal();
    } catch (err) {
      setLocalStatus(t.withdrawal.Status);
      alert("Failed to update status. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-xl rounded-lg space-y-6">
       
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
      >
        ← Go Back
      </button> 
      {/* Top action buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 p-4 rounded-lg shadow">
        <h1 className="text-2xl font-semibold">Withdrawal Details</h1>

        <div className="flex items-center gap-3">
          {/* Mark as Processing */}
          {localStatus === "pending" && (
            <button
              onClick={() => performUpdate("processing")}
              disabled={updating}
              className="bg-blue-600 disabled:opacity-60 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Mark as Processing
            </button>
          )}

          {/* Mark as Paid */}
          <button
            onClick={openPaidConfirm}
            disabled={updating || localStatus !== "processing"}
            className={`px-4 py-2 rounded-lg transition text-white ${
              localStatus === "processing"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Mark as Paid
          </button>

          {/* Mark as Failed */}
          <button
            onClick={openFailedConfirm}
            disabled={updating || ((localStatus as string) !== "processing" && (localStatus as string) !== "paid") || (localStatus as string) === "failed"}

            className={`px-4 py-2 rounded-lg transition text-white ${
              (localStatus === "processing" || localStatus === "paid")
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-400 cursor-not-allowed"
            } disabled:opacity-60`}
          >
            Mark as Failed
          </button>
        </div>
      </div>

      {/* Modal: Paid */}
      {modalOpen === "paid" && (
        <Modal title="Confirm: Mark as Paid" onClose={closeModal}>
          <p className="mb-4">
            Are you sure you want to mark this withdrawal as <strong>Paid</strong>?
          </p>
          <div className="flex justify-end gap-3">
            <button onClick={closeModal} className="px-4 py-2 rounded border">
              Cancel
            </button>
            <button
              onClick={() => performUpdate("paid")}
              disabled={updating}
              className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-60"
            >
              {updating ? "Updating..." : "Confirm"}
            </button>
          </div>
        </Modal>
      )}

      {/* Modal: Failed */}
      {modalOpen === "failed" && (
        <Modal title="Mark as Failed" onClose={closeModal}>
          <label className="block text-sm font-medium mb-2">Reason (Required)</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="w-full p-3 rounded border mb-4"
            placeholder="Describe why the withdrawal failed..."
          />
          {reason.length > 0 && reason.length < 10 && (
            <p className="text-red-500 text-sm mb-2">
              Reason must be at least 10 characters long.
            </p>
          )}
          {reason.length >= 10 && (
            <p className="text-green-600 text-sm mb-4">Looks good!</p>
          )}

          <div className="flex justify-end gap-3">
            <button onClick={closeModal} className="px-4 py-2 rounded border">
              Cancel
            </button>
            <button
              onClick={() => {
                if (!reason.trim()) {
                  alert("Please enter a reason for failure.");
                  return;
                }
                performUpdate("failed", reason.trim());
              }}
              disabled={updating || reason.trim().length < 10}
              className={`px-4 py-2 rounded text-white transition ${
                reason.trim().length < 10
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              } disabled:opacity-60`}
            >
              {updating ? "Updating..." : "Submit"}
            </button>
          </div>
        </Modal>
      )}

      {/* Transaction summary */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Transaction Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p>
              <strong>User Name:</strong> {t.bankAccount.ownerName}
            </p>
          </div>
          <div>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  localStatus === "pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : localStatus === "processing"
                    ? "bg-blue-200 text-blue-800"
                    : localStatus === "paid"
                    ? "bg-green-200 text-green-800"
                    : localStatus === "failed"
                    ? "bg-red-200 text-red-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {localStatus}
              </span>
            </p>
          </div>
          <div>
            <p>
              <strong>Amount:</strong> {t.withdrawal.Amount}
            </p>
          </div>
        </div>
      </div>

      {/* Bank details and timestamps */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Bank Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p>
            <strong>Bank Name:</strong> {t.bankAccount.bankName}
          </p>
          <p>
            <strong>Account Number:</strong> {t.bankAccount.accountNumber}
          </p>
          <p>
            <strong>IBAN:</strong> {t.bankAccount.iBan}
          </p>
          <p>
            <strong>Swift Code:</strong> {t.bankAccount.swiftCode}
          </p>
          <p>
            <strong>IFSC:</strong> {t.bankAccount.ifsc}
          </p>
          <p>
            <strong>Account Status:</strong> {t.bankAccount.BankAccountStatus}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(t.withdrawal.CreatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default WithdrawalDetails;

