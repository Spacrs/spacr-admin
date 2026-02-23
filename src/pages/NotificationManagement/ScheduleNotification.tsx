import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Inputes as InputComponent, Button } from "../../components/Common";
import { toast, ToastContainer } from "react-toastify";
import { useSendNotificationMutation } from "../../store/slices/notificationSlice/apiSlice";


const ScheduleNotification = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    scheduleDate: "",
    scheduleTime: "",
  });

  const [sendNotification, { data, isLoading: isSending }] =
      useSendNotificationMutation();

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e);
    const { name, value } = e.target;
    console.log('value', value);
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent page refresh
    
    const date = formData.scheduleDate; // e.g., "2025-06-09"
    const time = formData.scheduleTime; // e.g., "18:30"

    // Combine them into a single local datetime string
    const localDateTimeStr = `${date}T${time}`; // "2025-06-09T18:30"

    // Convert to UTC datetime
    const localDate = new Date(localDateTimeStr); // local timezone assumed
    const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);

    // Format as ISO string to store in DB
    const utcISOString = utcDate.toISOString(); // e.g., "2025-06-09T13:00:00.000Z"


    const notificationPayload = {
      title: formData.title,
      body: formData.message,
      notificationType: "schedule_notification",
      // sendToAllUsers: selectedUsers.length === users.length, //Commented on 03-06-2025
      sendToAllUsers: false,
      scheduleDate: utcISOString,
      scheduleTime: formData.scheduleTime,
      userIds: ['4770e9af-433a-4a76-a63b-a6d843f1d556']
    };

    await sendNotification(notificationPayload).unwrap();
    toast.success("Notifications sent!");
    setFormData({
      title: "",
      message: "",
      scheduleDate: "",
      scheduleTime: "",
    });

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <div className="">
      <div className="flex justify-start items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        <ToastContainer />
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
            Schedule Notification
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Schedule Date and Time Input Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                {/* <InputComponent
                  type="datePicker"
                  name="scheduleDate"
                  label="Schedule Date"
                  value={formData.scheduleDate}
                  onChange={handleChange}
                  required={true}
                /> */}
               <div className="flex flex-col">
                  <label htmlFor="scheduleDate" className="block text-gray-700 font-medium mb-2">
                    Schedule Date
                  </label>
                  <input
                    type="date"
                    name="scheduleDate"
                    id="scheduleDate"
                    value={formData.scheduleDate}
                    onChange={handleChange}
                    required={true}
                    className="w-full  px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>
              <div>
                <InputComponent
                  type="timePicker"
                  name="scheduleTime"
                  label="Schedule Time"
                  value={formData.scheduleTime}
                  onChange={handleChange}
                  required={true}
                />
              </div>
            </div>

            {/* Title Input */}
            <InputComponent
              type="text"
              name="title"
              label="Title"
              placeholder="Notification Title"
              value={formData.title}
              onChange={handleChange}
              required={true}
            />

            {/* Message Textarea */}
            <InputComponent
              type="textarea"
              name="message"
              label="Description"
              value={formData.message}
              onChange={handleChange}
              required={true}
            />

            {/* Button Container for Inline Buttons */}
            <div className="flex gap-4 mt-4 w-full">
              <Button
                className="lg:w-1/5 sm:w-1/2 xs:w-1/2"
                variant="secondary"
                text="Cancel"
                onClick={() => {}}
              />

              <Button
                className="lg:w-1/5 sm:w-1/2 xs:w-1/2"
                variant="primary"
                text="Schedule Notification"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleNotification;
