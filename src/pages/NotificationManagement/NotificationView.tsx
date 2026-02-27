import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BellIcon } from "@heroicons/react/24/outline"; // Optional: Tailwind Hero Icons

interface Notification {
  notificationId: string;
  title: string;
  message: string;
  notificationType: string;
  CreatedAt: string;
}

function NotificationView() {
  const { notificationId } = useParams();
  const navigate = useNavigate();

  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        const access_token = localStorage.getItem("access_token");
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v2/notification/get-a-notification/${notificationId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);

        const data = await res.json();
        setNotification({
          notificationId: data.data.notificationId,
          title: data.data.title,
          message: data.data.message,
          notificationType: data.data.notificationType,
          CreatedAt: data.data.CreatedAt,
        });
      } catch (err: any) {
        setError(err.message || "Failed to fetch notification.");
      } finally {
        setLoading(false);
      }
    }

    fetchNotification();
  }, [notificationId]);

  const formattedDate = notification
    ? new Date(notification.CreatedAt).toLocaleString()
    : "";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-red-50 border border-red-200 text-red-700 rounded shadow-sm">
        <p className="text-lg font-medium">Error: {error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!notification) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded shadow-sm">
        <p className="text-lg font-medium">No notification found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-12 bg-white rounded-2xl shadow-lg relative">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-500 hover:underline"
        >
          ← Back
        </button>
        <div className="ml-auto flex items-center space-x-2">
          <BellIcon className="h-6 w-6 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">Notification</h2>
        </div>
      </div>

      <div className="space-y-6 text-gray-800">
        <div>
          <label className="text-sm font-medium text-gray-500">Title</label>
          <div className="mt-1 text-lg font-semibold">{notification.title}</div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">Message</label>
          <p className="mt-1 text-gray-700 whitespace-pre-line leading-relaxed">
            {notification.message}
          </p>
        </div>

        <div className="flex flex-wrap gap-6 mt-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Type</label>
            <div className="mt-1 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {notification.notificationType}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Created At</label>
            <p className="mt-1 text-gray-600">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationView;
