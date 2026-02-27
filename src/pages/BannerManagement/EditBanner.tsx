import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import Button from "../../components/Common/Button";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import { useDispatch } from "react-redux";

const EditBanner = () => {
  const { bannerID } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [payload, setPayload] = useState({
    url: "",
    storeIds: [] as string[],
    image: null as File | null,
    selectedCountry: [] as string[],
    isGlobal: false,
    isActive: true,
  });

  const [linkType, setLinkType] = useState<"store" | "url">("url");
  const [storeOptions, setStoreOptions] = useState<{ label: string; value: string }[]>([]);
  const [loadingStores, setLoadingStores] = useState(true);

  const [creating, setCreating] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [countryOptions, setCountryOptions] = useState<{ label: string; value: string }[]>([]);
  const [hideGlobalOption, setHideGlobalOption] = useState(false);
  const dispatch = useDispatch();

  // Fetch stores
  // const fetchStores = async () => {
  //   setLoadingStores(true);
  //   try {
  //     const res = await fetch("${import.meta.env.VITE_API_BASE_URL}/api/v2/order/get-scraping-icons", {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
  //     });
  //     const result = await res.json();
  //     if (Array.isArray(result.data)) {
        
  //       const options = result.data.map((store: any) => ({
  //         label: store.title,
  //         value: store.Id.toString(), // 🔹 toString() for consistency
  //       }));
  //       setStoreOptions(options);

  //       // ✅ Default store selection if empty
  //       setPayload(prev => ({
  //         ...prev,
  //         storeIds: prev.storeIds.length > 0 ? prev.storeIds : [options[0]?.value]
  //       }));
  //     } else {
  //       setStoreOptions([]);
  //     }
  //   } catch {
  //     setStoreOptions([]);
  //   }
  //   setLoadingStores(false);
  // };

  const fetchStores = async () => {
  setLoadingStores(true);
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/order/get-scraping-icons`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
    });
    const result = await res.json();
    if (Array.isArray(result.data)) {
      const options = result.data.map((store: any) => ({
        label: store.title,
        value: store.Id.toString(),
      }));
      setStoreOptions(options);

      // ❌ remove auto-select in edit mode
      // ✅ keep only existing storeIds if they exist
      setPayload(prev => ({
        ...prev,
        storeIds: prev.storeIds, // respect banner data
      }));
    } else {
      setStoreOptions([]);
    }
  } catch {
    setStoreOptions([]);
  }
  setLoadingStores(false);
};

    const handleToggleActive = async (checked: boolean) => {
    try {
        setPayload((prev) => ({ ...prev, isActive: checked }));
        const access_token = localStorage.getItem("access_token");
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/admin/toggle-banner-status/${bannerID}`,
        {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify({ isActive: checked }),
        }
        );

        const data = await res.json();
        if (data.success) {
          toast.success(checked ? "Banner Activated" : "Banner Deactivated");
          setTimeout(() => {
            navigate('/admin/banner-list');
          }, 2000);
        } else {
          toast.error("Failed to update");
          setTimeout(() => {
            navigate('/admin/banner-list');
          }, 2000);
        }
    } catch (err) {
        toast.error("Error occurred");
    }
    };

  // Fetch banner details
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/admin/get-banner/${bannerID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();

        if (res.ok && result.data) {
          const b = result.data;

          if (b.RedirectType === "store") {
            setLinkType("store");
          } else {
            setLinkType("url");
          }

          setPayload((prev) => ({
            ...prev,
            url: b.url || "",
            storeIds: Array.isArray(b.storeIDs) 
            ? b.storeIDs.map((id: any) => id.toString()) 
            : [],
            image: b.image || null,
            selectedCountry: Array.isArray(b.countries)
              ? b.countries.map((c: any) => String(c.id))
              : [],
            isGlobal: b.IsGlobal || false,
            isActive: b.IsActive === true,
          }));

          setPreviewImage(b.imagepath || "");
        } else {
          toast.error(result.message || "Failed to load banner");
        }
      } catch {
        toast.error("Error loading banner");
      }
    };

    if (bannerID) fetchBanner();
    fetchStores();
  }, [bannerID]);

 
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v2/country/get-countries-for-banner-in-edit`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({ bannerID: bannerID }),
          }
        );

        const result = await res.json();
        if (res.ok && Array.isArray(result.data)) {
          const validCountries = result.data.filter((c) => c?.id != null && c?.name);

          // API already filtered, so just map
          const countryOptions = validCountries.map((c: any) => ({
            label: c.name,
            value: c.id.toString(),
          }));

          setCountryOptions(countryOptions);
        } else {
          toast.error(result.message || "Failed to load countries.");
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to load countries.");
      }
    };

    if (bannerID) fetchCountries();
  }, [bannerID]);

  // Check global banner
  useEffect(() => {
    const checkGlobalBanner = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/admin/check-global-banner`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        if (res.ok && result.success && result.data?.bannerID && result.data?.bannerID !== bannerID) {
          setHideGlobalOption(true);
        }
      } catch {}
    };

    checkGlobalBanner();
  }, [bannerID]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPayload((prev) => ({ ...prev, image: file }));
    setPreviewImage(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleRemoveImage = () => {
    setPayload((prev) => ({ ...prev, image: null }));
    setPreviewImage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (linkType === "url" && !payload.url.trim()) {
      toast.error("URL is required");
      return;
    }

    if (linkType === "store" && payload.storeIds.length === 0) {
      toast.error("Please select at least one store");
      return;
    }

    if (!payload.isGlobal && payload.selectedCountry.length === 0) {
      toast.error("Please select at least one country or mark as Global");
      return;
    }

    setCreating(true);
    try {
      const formData = new FormData();
      formData.append("linkType", linkType);
      if (linkType === "url") {
        formData.append("url", payload.url);
      } else {
        formData.append("storeIds", payload.storeIds.join(","));
      }
      formData.append("isGlobal", payload.isGlobal.toString());
      if (!payload.isGlobal) {
        formData.append("country", payload.selectedCountry.join(","));
      }
      if (payload.image) {
        formData.append("image", payload.image);
      }

      const token = localStorage.getItem("access_token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/admin/update-banner/${bannerID}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Banner updated successfully!");
        navigate("/admin/banner-list");
      } else {
        toast.error(result.message || "Failed to update banner");
      }
    } catch {
      toast.error("Error updating banner");
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    console.log("Payload selectedCountry:", payload.selectedCountry);
    console.log("Country options:", countryOptions);
  }, [payload.selectedCountry, countryOptions]);

  return (
    <div className="min-h-screen">
      <div className="flex justify-end items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        <ToastContainer />
        <Button text="Back" variant="lightBlue" onClick={() => navigate(-1)} />
      </div>

      <div className="p-8 bg-gray-50 shadow-md rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white p-6 shadow rounded-lg space-y-6"
        >
          {/* Radio buttons for Link Type */}
          <div className="flex gap-6 items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="url"
                checked={linkType === "url"}
                onChange={() => setLinkType("url")}
              />
              URL
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="store"
                checked={linkType === "store"}
                onChange={() => setLinkType("store")}
              />
              Store
            </label>
          </div>

          {/* Conditional field */}
          {linkType === "url" && (
            <div className="flex flex-col gap-2 mt-3">
              <label className="font-medium">Banner URL</label>
              <input
                type="text"
                value={payload.url}
                onChange={(e) => setPayload((prev) => ({ ...prev, url: e.target.value }))}
                placeholder="https://example.com"
                className="border border-gray-300 px-4 py-2 rounded"
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
                value={storeOptions.filter((opt) => payload.storeIds.includes(opt.value))}
                onChange={(selected) =>
                  setPayload((prev) => ({ ...prev, storeIds: selected.map((opt) => opt.value) }))
                }
              />
            </div>
          )}

          {!hideGlobalOption && (
            <div className="flex items-center gap-2">
              <label className="font-medium">Global</label>
              <input
                type="checkbox"
                checked={payload.isGlobal}
                onChange={(e) => setPayload((prev) => ({ ...prev, isGlobal: e.target.checked }))}
              />
            </div>
          )}

          {!payload.isGlobal && (
            <div>
              <label className="font-medium">Select Country</label>
              <Select
                isMulti
                options={countryOptions}
                value={countryOptions.filter((opt) =>
                  payload.selectedCountry.includes(opt.value)
                )}
                onChange={(selected) =>
                  setPayload((prev) => ({
                    ...prev,
                    selectedCountry: selected.map((opt) => String(opt.value)),
                  }))
                }
              />
            </div>
          )}

          {!payload.isGlobal && (
              <div className="flex items-center gap-2 mt-4">
                  <label className="font-medium">Activate/Deactivate Banner</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                  <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={payload.isActive}
                      onChange={(e) => handleToggleActive(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-green-500 transition-all duration-300"></div>
                  <span className="ml-3 text-sm text-gray-600">
                      {payload.isActive ? "Currently Active" : "Currently Inactive"}
                  </span>
                  </label>
              </div>
          )}

          <div>
            <label className="font-medium">GIF</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="h-40 border-dashed border-2 flex items-center justify-center cursor-pointer"
            >
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="h-full object-contain" />
              ) : (
                <LuPlus size={32} />
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
                Remove GIF
              </div>
            )}
          </div>

          <div className="text-right">
            <Button text={creating ? "Submitting…" : "Update"} variant="primary" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBanner;
