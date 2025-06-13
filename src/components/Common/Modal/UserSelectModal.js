import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Search from "../../Common/Search";
import Button from "../../Common/Button";
const UserSelectModal = ({ users, selectedUsers, setSelectedUsers, setCurrentPage, setFilter, filter, currentPage, pagination, show, onClose, }) => {
    const handleCheckboxChange = (userId) => {
        setSelectedUsers((prev) => prev.includes(userId)
            ? prev.filter((id) => id !== userId)
            : [...prev, userId]);
    };
    // const handleSelectAll = () => {
    //   const visibleUserIDs = users.map((u) => u.UserID);
    //   const areAllVisibleSelected = visibleUserIDs.every((id) =>
    //     selectedUsers.includes(id)
    //   );
    //   if (areAllVisibleSelected) {
    //     setSelectedUsers((prev) =>
    //       prev.filter((id) => !visibleUserIDs.includes(id))
    //     );
    //   } else {
    //     setSelectedUsers((prev) =>
    //       Array.from(new Set([...prev, ...visibleUserIDs]))
    //     );
    //   }
    // };
    if (!show)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: _jsxs("div", { className: "bg-white w-full max-w-2xl p-6 rounded shadow-lg", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Select Users" }), _jsx(Search, { search: filter, onChange: (e) => {
                        setFilter(e.target.value);
                        setCurrentPage(1); // ✅ Reset page to 1 when filter changes
                    }, onReset: () => {
                        setFilter("");
                        setCurrentPage(1); // ✅ Also reset page on clear
                    } }), _jsx("div", { className: "overflow-auto max-h-64 border rounded mt-3", children: _jsxs("table", { className: "w-full text-sm table-auto", children: [_jsx("thead", { className: "bg-gray-200 sticky top-0", children: _jsxs("tr", { children: [_jsx("th", { className: "p-2 text-left w-10 font-medium text-primary", children: "Select" }), _jsx("th", { className: "p-2 text-left font-medium text-primary", children: "Email" }), _jsx("th", { className: "p-2 text-left font-medium text-primary", children: "Full Name" })] }) }), _jsx("tbody", { children: users.map((user) => (_jsxs("tr", { className: "border-t hover:bg-gray-50", children: [_jsx("td", { className: "p-2", children: _jsx("input", { type: "checkbox", checked: selectedUsers.includes(user.UserID), onChange: () => handleCheckboxChange(user.UserID), className: "accent-blue-600" }) }), _jsx("td", { className: "p-2", children: user.Email }), _jsx("td", { className: "p-2", children: user.FullName })] }, user.UserID))) })] }) }), _jsxs("div", { className: "flex justify-between items-center mt-4", children: [_jsx(Button, { text: "Previous", variant: "primary", onClick: () => setCurrentPage((p) => Math.max(p - 1, 1)), disabled: currentPage === 1 }), _jsxs("span", { className: "text-sm", children: ["Page ", currentPage, " of ", pagination.totalPages] }), _jsx(Button, { variant: "primary", text: "Next", onClick: () => setCurrentPage((p) => Math.min(p + 1, pagination.totalPages)), disabled: currentPage === pagination.totalPages })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [_jsx(Button, { text: "Cancel", variant: "secondary", onClick: onClose }), _jsx(Button, { text: "Confirm", variant: "primary", onClick: onClose })] })] }) }));
};
export default UserSelectModal;
