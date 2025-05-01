import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../store/slices/userSlice/apiSlice";
import { useSendNotificationMutation } from "../../store/slices/notificationSlice/apiSlice";
import {
  Inputes as InputComponent,
  Button,
  UserSelectModal,
} from "../../components/Common";

import { toast, ToastContainer } from "react-toastify";

type User = {
  UserID: string;
  Email: string;
  FullName: string;
};

const DirectNotification = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });
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

  useEffect(() => {
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
    const notificationPayload = {
      title: formData.title,
      body: formData.message,
      notificationType: "send_notification",
      sendToAllUsers: selectedUsers.length === users.length,
      ...(selectedUsers.length < users.length
        ? { userIds: selectedUsers }
        : {}),
    };

    await sendNotification(notificationPayload).unwrap();
    toast.success("Notifications sent!");
    setFormData({ title: "", message: "" });
     
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="">
      <div className="flex justify-end items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        <ToastContainer />
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
            <Button
              text="Select Users"
              className="w-40"
              variant="transparent"
              onClick={() => setShowModal(true)}
            />
            <div>
              <InputComponent
                type="text"
                placeholder="Notification Title"
                name="title"
                label="Title"
                value={formData.title}
                onChange={handleChange}
                required={true}
              />
            </div>

            <div>
              <InputComponent
                label="Description"
                name="message"
                value={formData.message}
                onChange={handleChange}
                type="textarea"
                required={true}
              />
            </div>

            {selectedUsers.length > 0 &&
              selectedUsers.length !== users.length && (
                <div className="mt-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Selected Users
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {users
                      .filter((user) => selectedUsers.includes(user.UserID))
                      .map((user) => (
                        <div
                          key={user.UserID}
                          className="flex items-center p-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition"
                        >
                          <div className="flex-grow">
                            <p className="text-sm font-medium text-gray-800">
                              {user.FullName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {user.Email}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

            <div className="flex gap-4 mt-4 w-full">
              <Button
                className="lg:w-1/5 sm:w-1/2 xs:w-1/2 bg-primary text-white py-3 rounded-md hover:bg-primary transition"
                text="Send Notification"
                variant="secondary"
                type="submit"
                disabled={isSending}
              />
            </div>
          </form>
        </div>
      </div>
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
