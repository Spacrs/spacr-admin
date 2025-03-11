import { useState } from "react";
import Button from "../../components/Common/Button";

const ScheduleNotification = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [scheduleDate, setScheduleDate] = useState("");
    const [scheduleTime, setScheduleTime] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault(); // Prevent page refresh
        console.log("Scheduled Notification Sent:", { title, message, scheduleDate, scheduleTime });

        // Clear form fields after submission
        setTitle("");
        setMessage("");
        setScheduleDate("");
        setScheduleTime("");
    };

    return (
        <div className="flex justify-center items-center p-20 bg-gray-50">
            <div className="w-full max-w-7xl bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Schedule Notification
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Schedule Date and Time Input Fields */}
                    <div className="flex gap-4 mb-6">
                        <div className="w-1/2">
                            {/* Schedule Date Label and Input */}
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="scheduleDate">
                                Schedule Date
                            </label>
                            <input
                                type="date"
                                id="scheduleDate"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                                value={scheduleDate}
                                onChange={(e) => setScheduleDate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="w-1/2">
                            {/* Schedule Time Label and Input */}
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="scheduleTime">
                                Schedule Time
                            </label>
                            <input
                                type="time"
                                id="scheduleTime"
                                className="w-full px-4 py-3 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                                value={scheduleTime}
                                onChange={(e) => setScheduleTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Title Input */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
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
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
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

                    {/* Button Container for Inline Buttons */}
                    <div className="flex gap-4 mt-4 w-full">
                        
                        <Button
                            className="lg:w-1/5 sm:w-1/2 xs:w-1/2"
                          type="secondary"
                            text="Cancel"
                            onClick={()=>{}}

                        />
                        
                        <Button
                            className="lg:w-1/5 sm:w-1/2 xs:w-1/2"
                            type="primary"
                            onClick={()=>{}}
                            text="Schedule Notification"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScheduleNotification;
