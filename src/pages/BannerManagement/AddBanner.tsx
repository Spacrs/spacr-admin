import React, { useRef, useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Common/Button";
import InputComponent from "../../components/Common/Inputes";
import { toast, ToastContainer } from "react-toastify";
import ImageGallery from "../../components/Common/ImageGallery/Index";
import Inputes from "../../components/Common/Inputes";
import {
  setCountryOptions,
  selectCounyOptions,
  selectIsEditCity,
  setIsEditCity,
} from "../../store/slices/paymentConfigSlice/paymentConfigSlice";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import {
  useGetPaymentConfigsQuery,
} from "../../store/slices/paymentConfigSlice/apiSlice";
import ImageCropper from "../../components/Common/Cropper/ImageCropper"; //Added on 09-07-2025
import Select from "react-select";

type BodyPayload = {
  url: string;
  image: File | null;
  selectedCountry: string[];
  isGlobal: boolean;
  storeIds: string[];
};
const AddBanner: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [showCropper, setShowCropper] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [isGlobal, setIsGlobal] = useState(false);
  const [hideGlobalOption, setHideGlobalOption] = useState(false);

  //Added on 11-08-2025
  const [linkType, setLinkType] = useState<"store" | "url">("url"); // default URL
  const [storeOptions, setStoreOptions] = useState<{ label: string; value: string }[]>([]);
  const [loadingStores, setLoadingStores] = useState<boolean>(true);

  // Fetch Stores from API
  const fetchStores = async () => {
    setLoadingStores(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v2/order/get-scraping-icons`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const result = await res.json();

      console.log(`Raw API Result:`, result);

      if (Array.isArray(result.data)) {
        const mapped = result.data.map((store: any) => ({
          label: store.title,
          value: store.Id,
          imagepath: store.imagepath,
          countryName: store.countryName,
        }));
        setStoreOptions(mapped);
      } else {
        console.warn("Unexpected API response structure", result);
        setStoreOptions([]);
      }
    } catch (err) {
      console.error("Error fetching stores:", err);
      setStoreOptions([]);
    }
    setLoadingStores(false);
  };

  useEffect(() => {
    fetchStores();
  }, []);
  //Added on 11-08-2025

  const [payload, setPayload] = useState<BodyPayload>({
    url: "",
    image: null,
    selectedCountry: [],
    isGlobal: false,
    storeIds: []
  });

  const [countryOptions, setCountryOptions] = useState<{ label: string; value: string }[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!payload.url.trim()) {
    //   toast.error("Title is required");
    //   return;
    // }

    if (!isGlobal && payload.selectedCountry.length === 0) {
      toast.error("Please select at least one country or mark as Global");
      return;
    }

    if (!payload.image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      setCreating(true);

      const formData = new FormData();
      // formData.append("url", payload.url);
      formData.append("image", payload.image);
      formData.append("isGlobal", isGlobal ? "true" : "false");
      formData.append("linkType", linkType);

      if (linkType === "url") {
        formData.append("url", payload.url);
      } else if (linkType === "store") {
        formData.append("storeIds", payload.storeIds?.join(",") || "");
      }


      // Send selectedCountry as comma-separated string if not global
      if (!isGlobal) {
        formData.append("country", payload.selectedCountry.join(","));
      }

      const access_token = localStorage.getItem('access_token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/admin/add-banner`, {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${access_token}`
        }
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Banner added successfully!");
        navigate("/admin/banner-list");
      } else {
        toast.error(result.message || "Failed to add banner");
      }
    } catch (error: any) {
      console.error("Error submitting banner:", error);
      toast.error("Something went wrong");
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
  const checkGlobalBanner = async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/admin/check-global-banner`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${access_token}`
        }
      });

      const result = await res.json();

      if (res.ok && result.success && typeof result.data === 'object' && result.data.bannerID) {
        setHideGlobalOption(true); // Hide Global checkbox
        setIsGlobal(false); // Ensure global flag is false
      }
    } catch (error) {
      console.error("Error checking global banner:", error);
    }
  };

  checkGlobalBanner();
}, []);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setImageToCrop(reader.result as string);
  //     setShowCropper(true);
  //   };
  //   reader.readAsDataURL(file);

  //   e.target.value = "";
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPayload((prev) => ({ ...prev, image: file }));
    setPreviewImage(URL.createObjectURL(file));

    e.target.value = ""; // Clear the input
  };

  const handleChange = () => {

  }

  const handleRemoveImage = () => {
    setPayload((prev) => ({ ...prev, image: null }));
    setPreviewImage("");
  };

  const handleCropDone = (blob: Blob) => {
    const croppedFile = new File([blob], "cropped.jpg", { type: "image/jpeg" });
    setPayload((prev) => ({ ...prev, image: croppedFile }));
    setPreviewImage(URL.createObjectURL(croppedFile));
    setShowCropper(false);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/country/get-countries-for-banner`);
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

          {/* Link Type Selection */}
            <div className="flex gap-6 items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="url"
                  checked={linkType === "url"}
                  onChange={() => {
                    setLinkType("url");
                    setPayload(prev => ({ ...prev, url: "", storeIds: [] })); // reset
                  }}
                />
                URL
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="store"
                  checked={linkType === "store"}
                  onChange={() => {
                    setLinkType("store");
                    setPayload(prev => ({ ...prev, url: "", storeIds: [] })); // reset
                  }}
                />
                Store
              </label>
            </div>

            {/* Conditional Field */}
            {linkType === "url" && (
              <div className="flex flex-col gap-2 mt-3">
                <label htmlFor="url" className="font-medium">Banner URL</label>
                <input
                  id="url"
                  type="text"
                  value={payload.url}
                  onChange={(e) => setPayload(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://example.com"
                  className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {linkType === "store" && (
              <div className="flex flex-col gap-2 mt-3">
                <label className="font-medium">Select Stores</label>
                <Select
                  isMulti
                  isLoading={loadingStores}
                  options={storeOptions}
                  value={storeOptions.filter(opt => payload.storeIds?.includes(opt.value))}
                  onChange={(selected) => {
                    const selectedValues = selected.map((opt) => opt.value);
                    setPayload((prev) => ({ ...prev, storeIds: selectedValues }));
                  }}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
            )}

          {/* <div className="flex flex-col gap-2">
            <label htmlFor="url" className="font-medium">Banner URL</label>
            <input
              id="url"
              type="text"
              name="url"
              value={payload.url}
              onChange={(e) => setPayload((prev) => ({ ...prev, url: e.target.value }))}
              placeholder="https://example.com"
              className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
          
          {!hideGlobalOption && (
          <div className="flex flex-col gap-6">
            {/* Row 1: Code and Full Name */}
            <div className="flex flex-col md:flex-row gap-4">

              
              <div className="w-full md:w-1/2 flex items-center gap-2">
                <label htmlFor="isGlobal" className="font-medium">Global</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    id="isGlobal"
                    type="checkbox"
                    className="sr-only peer"
                    checked={isGlobal}
                    onChange={(e) => setIsGlobal(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-all duration-300"></div>
                  <span className="ml-3 text-sm text-gray-600">
                    {isGlobal ? "Country options is disabled" : "Country options is enabled"}
                  </span>
                </label>
              </div>


            </div>
          </div>
          )}

          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
              {/* <Select
                isMulti
                name="selectedCountry"
                options={countryOptions}
                value={countryOptions.filter(option =>
                  payload.selectedCountry.includes(option.value)
                )}
                onChange={(selected) => {
                  const selectedValues = selected.map((option) => option.value);
                  setPayload((prev) => ({ ...prev, selectedCountry: selectedValues }));
                }}
                isDisabled={isGlobal}
                className="basic-multi-select"
                classNamePrefix="select"
              /> */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="selectedCountry" className="font-medium">
                      Select Country
                    </label>
                    <Select
                      inputId="selectedCountry"
                      isMulti
                      name="selectedCountry"
                      options={countryOptions}
                      value={countryOptions.filter(option =>
                        payload.selectedCountry.includes(option.value)
                      )}
                      onChange={(selected) => {
                        const selectedValues = selected.map((option) => option.value);
                        setPayload((prev) => ({ ...prev, selectedCountry: selectedValues }));
                      }}
                      isDisabled={isGlobal}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </div>


                </div>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium">GIF</label>
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

export default AddBanner;
