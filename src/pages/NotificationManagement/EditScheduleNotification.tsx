import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Inputes as InputComponent, Button } from "../../components/Common";
import { toast, ToastContainer } from "react-toastify";

const EditScheduleNotification = () => {
  const [formData, setFormData] = useState({
    notificationId: "",
    title: "",
    message: "",
    scheduleDate: "",
    scheduleTime: "",
  });

  type Notification = {
    notificationId: string;
    title: string;
    message: string;
    notificationType?: string;
    CreatedAt?: string;
  };


  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { notificationId } = useParams();

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

  useEffect(() => {
      if (!notificationId) {
        setError("No notification ID provided.");
        setLoading(false);
        return;
      }
  
      async function fetchNotification() {
        setLoading(true);
        setError(null);
  
        try {
          // Replace URL with your actual API endpoint
          let access_token = localStorage.getItem('access_token');
          const res = await fetch(`https://api-v2.spa-cr.com/api/v2/notification/get-a-notification/${notificationId}`, {
            method: "GET",
            headers: {
              "Content-Type": 'application/json',
              "Authorization": `Bearer ${access_token}`
            }
          });
          if (!res.ok) throw new Error(`Error: ${res.statusText}`);
  
          const data = await res.json();
  
          console.log('dataaaaaa', data);
  
          // Assume API returns data with these fields
          setNotification({
            notificationId: data.data.notificationId,
            title: data.data.title,
            message: data.data.message,
            notificationType: data.data.notificationType,
            CreatedAt: data.data.CreatedAt,
          });

          setFormData((prev) => ({
            ...prev,
            notificationId: data.data.notificationId,
            title: data.data.title || "",
            message: data.data.message || "",
            scheduleDate: data.data.scheduleDate ? data.data.scheduleDate.split("T")[0] : "",
            scheduleTime: data.data.scheduleTime ? data.data.scheduleTime.slice(0, 5) : "",
        }));


        } catch (err: any) {
          setError(err.message || "Failed to fetch notification.");
        } finally {
          setLoading(false);
        }
      }
  
      fetchNotification();
    }, [notificationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!notificationId) {
        toast.error("Notification ID is missing.");
        return;
    }

    try {
        let access_token = localStorage.getItem('access_token');

        const res = await fetch(
        `https://api-v2.spa-cr.com/api/v2/notification/update-scheduled-notification/${notificationId}`,
        {
            method: "PUT",  // or POST if your API expects
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`,
            },
            body: JSON.stringify({
            title: formData.title,
            message: formData.message,
            scheduleDate: formData.scheduleDate,
            scheduleTime: formData.scheduleTime,
            // Include notificationId if API requires it in body; else just URL param is fine
            }),
        }
        );

        if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update notification.");
        }

        const data = await res.json();
        toast.success("Notification updated successfully!");
        // Redirect after successful update
        navigate("/admin/notification-list");

    } catch (error: any) {
        toast.error(error.message || "Something went wrong.");
    }
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
              {/* <Button
                className="lg:w-1/5 sm:w-1/2 xs:w-1/2"
                variant="secondary"
                text="Cancel"
                onClick={() => {}}
              /> */}

              <Button
                className="lg:w-1/5 sm:w-1/2 xs:w-1/2"
                variant="primary"
                text="Update"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditScheduleNotification;
