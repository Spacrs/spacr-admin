import { useState, useMemo, Dispatch, SetStateAction } from "react";
import Search from "../../Common/Search";
import Button from "../../Common/Button";

type User = {
  UserID: string;
  Email: string;
  FullName: string;
};

type Props = {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    totalRecords: number;
    totalPages: number;
  };
  selectedUsers: string[];
  setSelectedUsers: Dispatch<SetStateAction<string[]>>;
  setFilter: Dispatch<SetStateAction<string>>;
  filter: string;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  show: boolean;
  onClose: () => void;
};

const UserSelectModal = ({
  users,
  selectedUsers,
  setSelectedUsers,
  setCurrentPage,
  setFilter,
  filter,
  currentPage,
  pagination,
  show,
  onClose,
}: Props) => {
  const handleCheckboxChange = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
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

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Select Users</h3>

        {/* <button
          type="button"
          className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleSelectAll}
        >
          {selectedUsers.length === users.length
            ? "Unselect All"
            : "Select All"}
        </button> */}

        {/* <Search
          search={filter}
          onChange={(e) => setFilter(e.target.value)}
          onReset={() => setFilter("")}
        /> */}

        <Search
          search={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1); // ✅ Reset page to 1 when filter changes
          }}
          onReset={() => {
            setFilter("");
            setCurrentPage(1); // ✅ Also reset page on clear
          }}
        />

        <div className="overflow-auto max-h-64 border rounded mt-3">
          <table className="w-full text-sm table-auto">
            <thead className="bg-gray-200 sticky top-0">
              <tr>
                <th className="p-2 text-left w-10 font-medium text-primary">Select</th>
                <th className="p-2 text-left font-medium text-primary">Email</th>
                <th className="p-2 text-left font-medium text-primary">Full Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.UserID} className="border-t hover:bg-gray-50">
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.UserID)}
                      onChange={() => handleCheckboxChange(user.UserID)}
                      className="accent-blue-600"
                    />
                  </td>
                  <td className="p-2">{user.Email}</td>
                  <td className="p-2">{user.FullName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <Button
            text="Previous"
            variant="primary"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          />
          <span className="text-sm">
            Page {currentPage} of {pagination.totalPages}
          </span>
          <Button
            variant="primary"
            text="Next"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, pagination.totalPages))}
            disabled={currentPage === pagination.totalPages}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button text="Cancel" variant="secondary" onClick={onClose} />
          <Button text="Confirm" variant="primary" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default UserSelectModal;
