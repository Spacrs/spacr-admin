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
import Inputes from "../../components/Common/Inputes";
import {
  setCountryOptions,
  selectCounyOptions,
  selectIsEditCity,
  setIsEditCity,
  setUserCountryOptions
} from "../../store/slices/paymentConfigSlice/paymentConfigSlice";
import Select from "react-select";


type User = {
  UserID: string;
  Email: string;
  FullName: string;
  selectedCountry: string;
};

const DirectNotification = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    selectedCountries: [] as string[],
  });
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sendToAll, setSendToAll] = useState(false); //Added on 03-06-2025
  const [allUsers, setAllUsers] = useState<User[]>([]);
  // const [countryOptions, setCountryOptions] = useState<{ label: string; value: string }[]>([]); //Added on 22-07-2025
  const [excludedCountries, setExcludedCountries] = useState<string[]>([]);
  const [countryOptions, setUserCountryOptions] = useState<{ label: string; value: string }[]>([]); //Added on 22-07-2025

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
    countryToExclude: formData.selectedCountries,
  });

  useEffect(() => {
    refetch();
  }, [filter, currentPage, refetch, formData.selectedCountries]);

  //Added on 03-06-2025
  useEffect(() => {
    if (userData?.data) {
      setAllUsers((prev) => {
        const existingIds = new Set(prev.map((u) => u.UserID));
        const newOnes = userData.data.filter(u => !existingIds.has(u.UserID));
        return [...prev, ...newOnes];
      });
    }
  }, [userData]);
  //Added on 03-06-2025

  //Added on 22-07-2025
    useEffect(() => {
      const fetchCountries = async () => {
        try {
          const res = await fetch("https://api-v2.spa-cr.com/api/v2/country/get-users-countries");
          const data = await res.json();
          const validCountries = data?.data || [];
          const mapped = validCountries.map((c: any) => ({
            label: c.name,
            value: c.id.toString(),
          }));
          setUserCountryOptions(mapped);
        } catch (error) {
          console.error("Failed to fetch country list", error);
        }
      };

      fetchCountries();
    }, []);
//Added on 22-07-2025

  const [sendNotification, { data, isLoading: isSending }] =
    useSendNotificationMutation();

  // const users: User[] =
  //   userData?.data?.map(({ UserID, Email, FullName }: User) => ({
  //     UserID,
  //     Email,
  //     FullName,
  //   })) || [];
  const users: User[] =
  userData?.data?.map(({ UserID, Email, FullName, MainCountryId }: any) => ({
    UserID,
    Email,
    FullName,
    selectedCountry: MainCountryId?.toString() || "", // 👈 Include this
  })) || [];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const notificationPayload = {
      title: formData.title,
      body: formData.message,
      notificationType: "send_notification",
      // sendToAllUsers: selectedUsers.length === users.length, //Commented on 03-06-2025
      sendToAllUsers: sendToAll,
      // ...(selectedUsers.length < users.length ? { userIds: selectedUsers } : {}), //Commented on 03-06-2025
      ...(!sendToAll && selectedUsers.length > 0 ? { userIds: selectedUsers } : {}),
      ...(formData.selectedCountries.length > 0 ? { excludedCountries: formData.selectedCountries } : {}),
    };

    console.log("Notification payload 1", notificationPayload);

    await sendNotification(notificationPayload).unwrap();
    toast.success("Notifications sent!");
    setFormData({ title: "", message: "", selectedCountries: [] });

    setTimeout(() => {
      window.location.reload();
    }, 3000);
     
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

  console.log("Filtering out countries:", formData.selectedCountries);
  console.log("All users:", users);
  console.log("Selected country IDs to filter out:", formData.selectedCountries);

  const selectedCountryIDs = formData.selectedCountries;
  const filteredUsers = allUsers.filter(
    (user) =>
      !selectedCountryIDs.includes(user.selectedCountry) || user.selectedCountry === ""
  );
  
  const isCountrySelected = formData.selectedCountries.length > 0;

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

            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-primary"
                  checked={sendToAll}
                  disabled={isCountrySelected}
                  onChange={(e) => {
                    setSendToAll(e.target.checked);
                    // Optionally clear selected users if "send to all" is checked
                    if (e.target.checked) {
                      setSelectedUsers([]);
                    }
                  }}
                />
                <span className="ml-2 text-gray-700 font-medium">Send to all users</span>
              </label>
            </div>

            <div className="w-full">
            <label className="block text-gray-700 font-medium mb-1">Select Country (For all users)</label>
            <Select
              isMulti
              name="selectedCountries"
              options={countryOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select countries to include users"
              value={countryOptions.filter(option => formData.selectedCountries.includes(option.value))}
              onChange={(selectedOptions) => {
                const values = selectedOptions.map((option) => option.value);
                setFormData((prev) => ({
                  ...prev,
                  selectedCountries: values,
                }));
              }}
            />
          </div>



            {!sendToAll && (
              <Button
                text="Select Users"
                className="w-40"
                variant="transparent"
                disabled={isCountrySelected}
                onClick={() => setShowModal(true)}
              />
            )}
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

            {/* {selectedUsers.length > 0 &&
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
              )} */}

              {selectedUsers.length > 0 && (
                <div className="mt-4">
                  <label className="block text-gray-700 font-medium mb-2">Selected Users</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {selectedUsers.map((userId: string) => {
                      const fullUser = allUsers.find((user) => user.UserID === userId);

                      const displayUser = fullUser || {
                        UserID: userId,
                        Email: "User from another page",
                        FullName: userId,
                      };

                      return (
                        <div
                          key={userId}
                          className="flex items-center p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition"
                        >
                          <div className="flex-grow">
                            <p className="text-sm font-medium text-gray-800">{displayUser.FullName}</p>
                            <p className="text-sm text-gray-600">{displayUser.Email}</p>
                          </div>
                        </div>
                      );
                    })}
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
        // users={users}
        users={
          users
        }


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
