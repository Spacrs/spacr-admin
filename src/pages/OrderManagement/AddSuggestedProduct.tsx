import { useState } from "react";
import Button from "../../components/Common/Button";
import { useNavigate } from "react-router-dom";

//Added on 18-04-2025
import { useRef } from "react";
import { Plus } from "lucide-react";
import SelectComponent from "../../components/Common/Inputes/SelectInput";
//Added on 18-04-2025

const AddSuggestedProduct = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const [isSuggested, setIsSuggested] = useState(false);

  const fileInputRef = useRef(null); //Added on 18-04-2025

  const navigate = useNavigate();

  const options: string[] = [];
  

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
            type="lightBlue"
            onClick={() => navigate("/admin/suggested-product-list")}
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

            <div className="flex gap-4 mb-6">
              <div className="w-1/2">
                {/* Schedule Date Label and Input */}
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="scheduleDate"
                >
                  From City
                </label>
                <SelectComponent
                  options={options} // Now it's a valid array
                  className="mr-2"
                  value="one" // Provide a default value
                  onChange={(e) => console.log(e.target.value)}
                  name=""
                />
              </div>

              <div className="w-1/2">
                {/* Schedule Time Label and Input */}
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="scheduleTime"
                >
                  To City
                </label>
                <SelectComponent
                  options={options} // Now it's a valid array
                  className="mr-2"
                  value="one" // Provide a default value
                  onChange={(e) => console.log(e.target.value)}
                  name=""
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Is Suggested?
              </label>

              <div
                onClick={() => setIsSuggested(!isSuggested)}
                className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                  isSuggested ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                    isSuggested ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
            </div>

            {/* Message Textarea */}
            
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="title"
              >
                Product Image
              </label>
              <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-40 border bg-gray-100 border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer hover:border-blue-500"
                >
                  <Plus className="text-gray-500" size={32} />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      console.log("Selected file:", file);
                      // Handle file state if needed
                    }
                  }}
                />
              </div>

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
                type="primary"
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
