import { useState } from "react";
import Button from "../../components/Common/Button";

const DirectNotification = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault(); // Prevent page refresh
        console.log("Notification Sent:", { title, message });

        // Clear form fields after submission
        setTitle("");
        setMessage("");
    };

    return (
        <div className="flex justify-center items-center p-20 bg-gray-50">
            <div className="w-full max-w-7xl bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Send Notification
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

                    <Button
                        className="w-1/5 bg-primary text-white py-3 rounded-md hover:bg-primary transition"
                        text="Send Notification"
                    />
                </form>
            </div>
        </div>
    );
};

export default DirectNotification;
