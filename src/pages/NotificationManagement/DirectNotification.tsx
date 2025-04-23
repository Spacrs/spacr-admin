import { useState, useEffect } from "react";
import Button from "../../components/Common/Button";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../store/slices/userSlice/apiSlice";
import Search from "../../components/Common/Search/index";
import { useSendNotificationMutation } from "../../store/slices/notificationSlice/apiSlice";
import UserSelectModal from "../../components/Common/Modal/UserSelectModal";
type User = {
  UserID: string;
  Email: string;
  FullName: string;
};
const DirectNotification = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();

  const {
    data: userData,
    isLoading: isUserLoading,
    isFetching,
    isError,
    refetch,
  } = useGetUsersQuery({
    sort: "desc",
    sortBy: "CreatedAt",
    search: filter !== "" ? filter : undefined,
    page: currentPage,
    limit: itemsPerPage,
  });

  console.log(userData, "userData");

  useEffect(() => {
    console.log(currentPage, "currentPage");
    refetch();
  }, [filter, currentPage, refetch]);

  const [sendNotification, { data, isLoading: isSending }] =
    useSendNotificationMutation();

  const users: User[] =
    userData?.data?.map(({ UserID, Email, FullName }: User) => ({
      UserID,
      Email,
      FullName,
    })) || [];
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
      <div className="flex justify-end items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        {/* Verification Status Filter */}
        <div className="ml-4 flex justify-end">
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
            <Button
              text="Select Users"
              className="w-40"
              variant="transparent"
              onClick={() => setShowModal(true)}
            />
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
                className="lg:w-1/5 sm:w-1/2 xs:w-1/2 bg-primary text-white py-3 rounded-md hover:bg-primary transition"
                text="Send Notification"
                variant="secondary"
                onClick={() => {}}
                type="submit"
                disabled={isSending}
              />
            </div>
          </form>
        </div>
      </div>
      {/* Modal */}
      <UserSelectModal
        users={users}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        show={showModal}
        onClose={() => setShowModal(false)}
        setFilter={setFilter}
        filter={filter}
        pagination={{
          page: userData?.pagination?.page || 1,
          limit: userData?.pagination?.limit || 10,
          totalRecords: userData?.pagination?.totalRecords || 0,
          totalPages: userData?.pagination?.totalPages || 1,
        }}
      />
    </div>
  );
};

export default DirectNotification;
