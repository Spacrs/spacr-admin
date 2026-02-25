import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetWithdrawalDetailsQuery, useUpdateWithdrawalStatusMutation, } from "../../store/slices/orderSlice/apiSlice";
const Modal = ({ title, children, onClose }) => {
    return (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [_jsx("div", { className: "absolute inset-0 bg-black/40", onClick: onClose }), _jsxs("div", { className: "relative bg-white rounded-lg shadow-xl w-full max-w-lg p-6 z-10", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: title }), children] })] }));
};
const WithdrawalDetails = () => {
    const { withdrawalId } = useParams();
    const { data: withdrawal, isLoading, error } = useGetWithdrawalDetailsQuery(withdrawalId);
    const [updateStatus, { isLoading: updating }] = useUpdateWithdrawalStatusMutation();
    const [localStatus, setLocalStatus] = useState("");
    const [modalOpen, setModalOpen] = useState(null);
    const [reason, setReason] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (withdrawal?.data) {
            setLocalStatus(withdrawal.data.withdrawal.Status);
        }
    }, [withdrawal]);
    if (isLoading)
        return _jsx("p", { className: "text-center mt-10", children: "Loading transaction details..." });
    if (error)
        return _jsx("p", { className: "text-center text-red-500 mt-10", children: "Failed to load transaction." });
    const t = withdrawal.data;
    const openPaidConfirm = () => setModalOpen("paid");
    const openFailedConfirm = () => setModalOpen("failed");
    const closeModal = () => {
        setModalOpen(null);
        setReason("");
    };
    const performUpdate = async (newStatus, reasonPayload) => {
        if (!withdrawalId)
            return;
        try {
            setLocalStatus(newStatus);
            await updateStatus({
                withdrawalId,
                status: newStatus,
                ...(reasonPayload ? { reason: reasonPayload } : {}),
            }).unwrap();
            closeModal();
        }
        catch (err) {
            setLocalStatus(t.withdrawal.Status);
            alert("Failed to update status. Please try again.");
            console.error(err);
        }
    };
    return (_jsxs("div", { className: "p-6 max-w-5xl mx-auto bg-white shadow-xl rounded-lg space-y-6", children: [_jsx("button", { onClick: () => navigate(-1), className: "flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium", children: "\u2190 Go Back" }), _jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 p-4 rounded-lg shadow", children: [_jsx("h1", { className: "text-2xl font-semibold", children: "Withdrawal Details" }), _jsxs("div", { className: "flex items-center gap-3", children: [localStatus === "pending" && (_jsx("button", { onClick: () => performUpdate("processing"), disabled: updating, className: "bg-blue-600 disabled:opacity-60 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition", children: "Mark as Processing" })), _jsx("button", { onClick: openPaidConfirm, disabled: updating || localStatus !== "processing", className: `px-4 py-2 rounded-lg transition text-white ${localStatus === "processing"
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-gray-400 cursor-not-allowed"}`, children: "Mark as Paid" }), _jsx("button", { onClick: openFailedConfirm, disabled: updating || (localStatus !== "processing" && localStatus !== "paid") || localStatus === "failed", className: `px-4 py-2 rounded-lg transition text-white ${(localStatus === "processing" || localStatus === "paid")
                                    ? "bg-red-600 hover:bg-red-700"
                                    : "bg-gray-400 cursor-not-allowed"} disabled:opacity-60`, children: "Mark as Failed" })] })] }), modalOpen === "paid" && (_jsxs(Modal, { title: "Confirm: Mark as Paid", onClose: closeModal, children: [_jsxs("p", { className: "mb-4", children: ["Are you sure you want to mark this withdrawal as ", _jsx("strong", { children: "Paid" }), "?"] }), _jsxs("div", { className: "flex justify-end gap-3", children: [_jsx("button", { onClick: closeModal, className: "px-4 py-2 rounded border", children: "Cancel" }), _jsx("button", { onClick: () => performUpdate("paid"), disabled: updating, className: "px-4 py-2 rounded bg-green-600 text-white disabled:opacity-60", children: updating ? "Updating..." : "Confirm" })] })] })), modalOpen === "failed" && (_jsxs(Modal, { title: "Mark as Failed", onClose: closeModal, children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Reason (Required)" }), _jsx("textarea", { value: reason, onChange: (e) => setReason(e.target.value), rows: 4, className: "w-full p-3 rounded border mb-4", placeholder: "Describe why the withdrawal failed..." }), reason.length > 0 && reason.length < 10 && (_jsx("p", { className: "text-red-500 text-sm mb-2", children: "Reason must be at least 10 characters long." })), reason.length >= 10 && (_jsx("p", { className: "text-green-600 text-sm mb-4", children: "Looks good!" })), _jsxs("div", { className: "flex justify-end gap-3", children: [_jsx("button", { onClick: closeModal, className: "px-4 py-2 rounded border", children: "Cancel" }), _jsx("button", { onClick: () => {
                                    if (!reason.trim()) {
                                        alert("Please enter a reason for failure.");
                                        return;
                                    }
                                    performUpdate("failed", reason.trim());
                                }, disabled: updating || reason.trim().length < 10, className: `px-4 py-2 rounded text-white transition ${reason.trim().length < 10
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-red-600 hover:bg-red-700"} disabled:opacity-60`, children: updating ? "Updating..." : "Submit" })] })] })), _jsxs("div", { className: "bg-gray-50 p-6 rounded-lg shadow-md", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Transaction Summary" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx("div", { children: _jsxs("p", { children: [_jsx("strong", { children: "User Name:" }), " ", t.bankAccount.ownerName] }) }), _jsx("div", { children: _jsxs("p", { children: [_jsx("strong", { children: "Status:" }), " ", _jsx("span", { className: `px-3 py-1 rounded-full text-sm font-medium ${localStatus === "pending"
                                                ? "bg-yellow-200 text-yellow-800"
                                                : localStatus === "processing"
                                                    ? "bg-blue-200 text-blue-800"
                                                    : localStatus === "paid"
                                                        ? "bg-green-200 text-green-800"
                                                        : localStatus === "failed"
                                                            ? "bg-red-200 text-red-800"
                                                            : "bg-gray-200 text-gray-800"}`, children: localStatus })] }) }), _jsx("div", { children: _jsxs("p", { children: [_jsx("strong", { children: "Amount:" }), " ", t.withdrawal.Amount] }) })] })] }), _jsxs("div", { className: "bg-gray-50 p-6 rounded-lg shadow-md", children: [_jsx("h3", { className: "text-xl font-semibold mb-4", children: "Bank Details" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("p", { children: [_jsx("strong", { children: "Bank Name:" }), " ", t.bankAccount.bankName] }), _jsxs("p", { children: [_jsx("strong", { children: "Account Number:" }), " ", t.bankAccount.accountNumber] }), _jsxs("p", { children: [_jsx("strong", { children: "IBAN:" }), " ", t.bankAccount.iBan] }), _jsxs("p", { children: [_jsx("strong", { children: "Swift Code:" }), " ", t.bankAccount.swiftCode] }), _jsxs("p", { children: [_jsx("strong", { children: "IFSC:" }), " ", t.bankAccount.ifsc] }), _jsxs("p", { children: [_jsx("strong", { children: "Account Status:" }), " ", t.bankAccount.BankAccountStatus] })] })] }), _jsx("div", { className: "bg-gray-50 p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2", children: _jsxs("p", { children: [_jsx("strong", { children: "Created At:" }), " ", new Date(t.withdrawal.CreatedAt).toLocaleString()] }) })] }));
};
export default WithdrawalDetails;
