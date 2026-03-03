import React, { useRef, useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Common/Button";
import InputComponent from "../../components/Common/Inputes";
import { toast, ToastContainer } from "react-toastify";
import Inputes from "../../components/Common/Inputes";
import {
  setCountryOptions,
  selectCounyOptions,
} from "../../store/slices/paymentConfigSlice/paymentConfigSlice";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import {
  useGetPaymentConfigsQuery,
} from "../../store/slices/paymentConfigSlice/apiSlice";
import ImageCropper from "../../components/Common/Cropper/ImageCropper"; //Added on 09-07-2025

type BodyPayload = {
  title: string;
  url: string;
  image: File | null;
  selectedCountry: string;
};

const EditScrapingIcon: React.FC = () => {
  const { Id } = useParams();  // get ID from URL param
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  // const countryOptions = useAppSelector(selectCounyOptions);
  const [countryOptions, setCountryOptions] = useState<{ label: string; value: string }[]>([]);
  

  const [payload, setPayload] = useState<BodyPayload>({
    title: "",
    url: "",
    image: null,
    selectedCountry: ""
  });
  const [previewImage, setPreviewImage] = useState<string>("");

  const { data, isLoading } = useGetPaymentConfigsQuery({
    isPagination: false,
  });

  const [showCropper, setShowCropper] = useState(false); //Added on 09-07-2025
  const [imageToCrop, setImageToCrop] = useState<string | null>(null); //Added on 09-07-2025

  // Fetch existing icon data by ID on mount
  useEffect(() => {
    if (!Id) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/admin/get-scraping-icon/${Id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then(res => res.json())
      .then(result => {
        console.log("ress", result);
        if (result.success && result.data) {
          const icon = result.data;
          setPayload({
            title: icon.title || "",
            url: icon.url || "",
            image: null, // No file here, user can upload new if needed
            selectedCountry: icon.countryID || "",
          });
          // Set preview image URL if exists
          if (icon.imagepath) setPreviewImage(icon.imagepath);
        } else {
          toast.error("Failed to load icon data.");
        }
      })
      .catch((error) => {
        toast.error("Failed to load icon data.");
        alert("Failed to load icon data." + error.message)
      });
  }, [Id]);

  // Set countries options in store
  // useEffect(() => {
  //   if (data?.data) {
  //     dispatch(setCountryOptions(data.data));
  //   }
  // }, [data, dispatch]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/country`);
        const result = await res.json();
        console.log("Fetched countries:", result.data);
        if (res.ok && Array.isArray(result.data)) {
          const validCountries = result.data.filter(c => c?.id != null && c?.name);
  
          const countryOptions = validCountries.map((c: any) => ({
            label: c.name,
            value: c.id.toString(),
          }));
  
          // dispatch(setCountryOptions(countryOptions));
          setCountryOptions(countryOptions);
        } else {
          toast.error(result.message || "Failed to load countries.");
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to load countries.");
      }
    };
  
    fetchCountries();
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setPreviewImage(URL.createObjectURL(file));
  //     setPayload((prev) => ({
  //       ...prev,
  //       image: file,
  //     }));
  //   }
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageToCrop(reader.result as string);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  const handleRemoveImage = () => {
    setPreviewImage("");
    setPayload((prev) => ({ ...prev, image: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("url", payload.url);
      formData.append("country", payload.selectedCountry);
      if (payload.image) {
        formData.append("image", payload.image);
      }

      const access_token = localStorage.getItem('access_token');

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/admin/edit-scraping-icon/${Id}`, {
        method: "PUT",
        body: formData,
        headers: {
          "Authorization": `Bearer ${access_token}`,
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update icon.");
      }

      toast.success("Marketplace updated successfully.");
      setTimeout(() => {
        navigate("/admin/scrap-logo-list");
      }, 1000);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setCreating(false);
    }
  };

  const [creating, setCreating] = useState(false);

  const handleCropDone = (blob: Blob) => {
    const croppedFile = new File([blob], "cropped.jpg", { type: "image/jpeg" });
    setPayload((prev) => ({ ...prev, image: croppedFile }));
    setPreviewImage(URL.createObjectURL(croppedFile));
    setShowCropper(false);
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
          <div className="flex flex-col gap-6">
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

          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <Inputes
                  label="Country Name"
                  options={countryOptions}
                  type="select"
                  name="selectedCountry"
                  value={payload.selectedCountry}
                  onChange={handleChange}
                  required={true}
                />
              </div>
            </div>
          </div>

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
              <div
                className="mt-2 text-red-500 cursor-pointer"
                onClick={handleRemoveImage}
              >
                Remove Image
              </div>
            )}
          </div>

          <div className="text-right">
            <Button
              text={creating ? "Updating…" : "Update"}
              variant="primary"
              type="submit"
              disabled={creating}
            />
          </div>
        </form>
      </div>
      {showCropper && imageToCrop && (
        <ImageCropper
          imageSrc={imageToCrop}
          onCropDone={handleCropDone}
          onClose={() => setShowCropper(false)}
        />
      )}
    </div>
  );
};

export default EditScrapingIcon;
