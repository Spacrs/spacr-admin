import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Inputes as InputComponent, Button } from "../../components/Common";
import { toast, ToastContainer } from "react-toastify";

const ScheduleNotification = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    scheduleDate: "",
    scheduleTime: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevent page refresh
    console.log("Scheduled Notification Sent:", formData);
    toast.success("Notification scheduled!"); 
    // Clear form fields after submission
    setFormData({
      title: "",
      message: "",
      scheduleDate: "",
      scheduleTime: "",
    });
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
                <InputComponent
                  type="datePicker"
                  name="scheduleDate"
                  label="Schedule Date"
                  value={formData.scheduleDate}
                  onChange={handleChange}
                  required={true}
                />
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
