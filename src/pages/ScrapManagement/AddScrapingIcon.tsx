import React, { useRef, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Common/Button";
import InputComponent from "../../components/Common/Inputes";
import { toast, ToastContainer } from "react-toastify";
import ImageGallery from "../../components/Common/ImageGallery/Index";

type BodyPayload = {
  title: string;
  url: string;
  image: File | null;
};

const AddScrapingIcon: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [creating, setCreating] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [payload, setPayload] = useState<BodyPayload>({
    title: "",
    url: "",
    image: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setPayload((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleRemoveImage = () => {
    setPayload((prev) => ({ ...prev, image: null }));
    setPreviewImage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("url", payload.url);
      if (payload.image) {
        formData.append("image", payload.image);
      }

      const access_token = localStorage.getItem('access_token');

      const response = await fetch("https://api-v2.spa-cr.com/api/v2/admin/add-scraping-icon", {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": `Bearer ${access_token}`,
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create icon.");
      }

      toast.success("Scraping icon created successfully.");
      setTimeout(() => {
        navigate("/admin/scrap-logo-list");
      }, 1000);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-end items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        <ToastContainer />
        <Button
          text="Back"
          variant="lightBlue"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="p-8 bg-gray-50 shadow-md rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white p-6 shadow rounded-lg space-y-6"
        >
          {/* URL and Title */}
          <div className="flex flex-col gap-6">
            {/* Row 1: Code and Full Name */}
            <div className="flex flex-col md:flex-row gap-4">

              <div className="w-full md:w-1/2">

                <InputComponent
                  type="text"
                  name="title"
                  label="Title"
                  value={payload.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full md:w-1/2">
                <InputComponent
                  type="text"
                  name="url"
                  label="URL"
                  value={payload.url}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>
          </div>
          

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium">Image</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="h-40 border-dashed border-2 border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-blue-500"
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-full object-contain"
                />
              ) : (
                <LuPlus size={32} className="text-gray-400" />
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            {previewImage && (
              <div className="mt-2 text-red-500 cursor-pointer" onClick={handleRemoveImage}>
                Remove Image
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="text-right">
            <Button
              text={creating ? "Submitting…" : "Submit"}
              variant="primary"
              type="submit"
              disabled={creating}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScrapingIcon;
