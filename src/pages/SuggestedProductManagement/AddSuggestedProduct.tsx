import { useState } from "react";
import Button from "../../components/Common/Button";
import { useNavigate } from "react-router-dom";

const AddSuggestedProduct = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  

  const navigate = useNavigate();

  

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevent page refresh
    console.log("Scheduled Notification Sent:", {
      title,
      message,
      scheduleDate,
      scheduleTime,
    });

    // Clear form fields after submission
    setTitle("");
    setMessage("");
    setScheduleDate("");
    setScheduleTime("");
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
            Add Product
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Schedule Date and Time Input Fields */}
            

            {/* Title Input */}
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="title"
              >
                Product Name
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

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

            <div className="flex gap-4 mb-6">
              <div className="w-1/2">
                {/* Schedule Date Label and Input */}
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="scheduleDate"
                >
                  Product URL
                </label>
                <input
                  type="text"
                  id="scheduleDate"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  required
                />
              </div>

              <div className="w-1/2">
                {/* Schedule Time Label and Input */}
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="scheduleTime"
                >
                  Price
                </label>
                <input
                  type="text"
                  id="scheduleTime"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Message Textarea */}
            

            {/* Button Container for Inline Buttons */}
            <div className="flex gap-4 mt-4 w-full">
              {/* <Button
                className="lg:w-1/5 sm:w-1/2 xs:w-1/2"
                type="secondary"
                text="Cancel"
                onClick={() => {}}
              /> */}

            

              <Button
                className="lg:w-1/5 sm:w-1/2 xs:w-1/2"
                variant="primary"
                onClick={() => {}}
                text="Submit"
              />
            </div>
          </form>
        </div>
      </div>

              

    </div>
  );
};

export default AddSuggestedProduct;
