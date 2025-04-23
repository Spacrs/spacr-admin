import { useState, useEffect } from "react";
import Button from "../../components/Common/Button";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../store/slices/userSlice/apiSlice";
import Search from "../../components/Common/Search/index";
import { useSendNotificationMutation } from "../../store/slices/notificationSlice/apiSlice";

const DirectNotification = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  // const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const {
    data: userData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetUsersQuery({
    sort: "desc",
    sortBy: "CreatedAt",
    search: filter !== "" ? filter : undefined,
  });

  const [sendNotification, { data, isLoading: isSending }] =
    useSendNotificationMutation();

  // {
  //   page: currentPage,
  //   limit: itemsPerPage,
  //   verified: verificationStatus !== "" ? verificationStatus : undefined,
  //   search: filter !== "" ? filter : undefined,
  //   sort: sortDirection,
  //   sortBy: sortBy,
  // }

  //   { id: "user1", name: "John Doe" },
  //   { id: "user2", name: "Jane Smith" },
  //   { id: "user3", name: "Alice Johnson" },
  //   { id: "user4", name: "Bob Williams" },
  //   { id: "user5", name: "Charlie Brown" },
  //   { id: "user6", name: "Emily Davis" },
  //   { id: "user7", name: "Frank Miller" },
  //   { id: "user8", name: "Grace Lee" },
  //   { id: "user9", name: "Henry Wilson" },
  //   { id: "user10", name: "Isabella Moore" },
  //   { id: "user11", name: "Jack Taylor" },
  //   { id: "user12", name: "Katie Anderson" },
  //   { id: "user13", name: "Liam Thomas" },
  //   { id: "user14", name: "Mia Martin" },
  //   { id: "user15", name: "Noah White" },
  //   { id: "user16", name: "Olivia Harris" },
  //   { id: "user17", name: "Paul Clark" },
  //   { id: "user18", name: "Queenie Lewis" },
  //   { id: "user19", name: "Ryan Hall" },
  //   { id: "user20", name: "Sophia Allen" },
  // ];

  const users =
    userData?.data && Array.isArray(userData?.data)
      ? userData?.data.map(
          ({ UserID, Email }: { UserID: string; Email: string }) => ({
            value: UserID,
            label: Email,
          })
        )
      : [];

  const handleCheckboxChange = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Notification Sent:", { title, message });
    const notificationPayload = {
      title,
      body: message,
      notificationType: "send_notification",
      sendToAllUsers: selectedUsers.length === users.length,
      ...(selectedUsers.length < users.length
        ? { userIds: selectedUsers }
        : {}),
    };

    await sendNotification(notificationPayload).unwrap();

    setTitle("");
    setMessage("");
  };

  return (
    <div className="">
      <div className="flex justify-start items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        {/* Search Bar */}
        {/* <div className="flex flex-1 max-w-lg"></div> */}

        {/* Verification Status Filter */}
        <div className="ml-4">
          <Button
            text="Back"
            className="mr-2"
            variant="lightBlue"
            onClick={() => navigate("/admin/notification-list")}
          />
        </div>
      </div>
      <div className="flex justify-center items-center p-20 bg-gray-50">
        <div className="w-full max-w-7xl bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Send Notification
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Title Input */}
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder="Notification Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="message"
              >
                Description
              </label>
              <textarea
                id="message"
                className="w-full px-4 py-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder=""
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              />
            </div>
            <div className="flex gap-4 mt-4 w-full">
              <Button
                text="Select Users"
                className="w-40"
                variant="transparent"
                onClick={() => setShowModal(true)}
              />

              <Button
                className="lg:w-1/5 sm:w-1/2 xs:w-1/2 bg-primary text-white py-3 rounded-md hover:bg-primary transition"
                text="Send Notification"
                variant="secondary"
                onClick={() => {}}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Select Users</h3>
            <button
              type="button"
              className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => {
                if (selectedUsers.length === users.length) {
                  setSelectedUsers([]); // Unselect all
                } else {
                  setSelectedUsers(
                    users.map((u: { value: string; label: string }) => u.value)
                  ); // Select all
                }
              }}
            >
              {selectedUsers.length === users.length
                ? "Unselect All"
                : "Select All"}
            </button>
            <div className="mb-4">
              <Search
                search={filter}
                onChange={(e) => setFilter(e.target.value)}
                onReset={() => setFilter("")}
              />
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {users.map((user: { value: string; label: string }) => (
                <label key={user.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={user.value}
                    checked={selectedUsers.includes(user.value)}
                    onChange={() => handleCheckboxChange(user.value)}
                    className="accent-blue-600"
                  />
                  <span>{user.label}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                text="Cancel"
                className="bg-gray-300 text-black"
                variant="secondary"
                onClick={() => setShowModal(false)}
              />
              <Button
                text="Confirm"
                className="bg-blue-600 text-white"
                variant="secondary"
                onClick={() => setShowModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectNotification;
