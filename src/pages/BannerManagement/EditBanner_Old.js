import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { LuPlus } from "react-icons/lu";
// import Button from "../../components/Common/Button";
// import { toast, ToastContainer } from "react-toastify";
// import Select from "react-select";
// const EditBanner = () => {
//   const { bannerID } = useParams();
//   const navigate = useNavigate();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [payload, setPayload] = useState({
//     url: "",
//     image: null as File | null,
//     selectedCountry: [] as string[],
//     isGlobal: false,
//     isActive: true,
//   });
//   const [creating, setCreating] = useState(false);
//   const [previewImage, setPreviewImage] = useState<string>("");
//   const [countryOptions, setCountryOptions] = useState<{ label: string; value: string }[]>([]);
//   const [hideGlobalOption, setHideGlobalOption] = useState(false);
//   // Load banner details
//   useEffect(() => {
//   const fetchBanner = async () => {
//     try {
//       const token = localStorage.getItem("access_token");
//       const res = await fetch(`https://api-v2.spa-cr.com/api/v2/admin/get-banner/${bannerID}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const result = await res.json();
//       console.log("ressss",result);
//       if (res.ok && result.data) {
//         const b = result.data;
//         // setPayload({
//         //   url: b.url ?? "",
//         //   isGlobal: b.IsGlobal ?? false,
//         //   selectedCountry: Array.isArray(b.countries)
//         //     ? b.countries.map((c: any) => String(c.id))
//         //     : [],
//         //   image: null, // image is only for uploading
//         // });
//         // setPayload({
//         //     url: b.url ?? "",
//         //     isGlobal: b.IsGlobal ?? false,
//         //     selectedCountry: b.countries?.map((c: any) => String(c.CountryID)) || [],
//         //     image: null,
//         // });
//         setPayload((prev) => ({
//             ...prev,
//             url: b.url || "",
//             image: b.image || null,
//             selectedCountry: Array.isArray(b.countries)
//                 ? b.countries.map((c: any) => String(c.id))
//                 : [],
//             isGlobal: b.IsGlobal || false,
//             isActive: b.IsActive === true,
//         }));
//         console.log("payload check", result.data);
//         console.log("Selected country IDs:", b.countries.map(c => String(c.id)));
//         console.log("Payload after set:", payload);
//         setPreviewImage(b.imagepath || "");
//       } else {
//         toast.error(result.message || "Failed to load banner");
//       }
//     } catch (err) {
//       toast.error("Error loading banner");
//     }
//   };
//   if (bannerID) fetchBanner();
// }, [bannerID]);
//   // Load countries
//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const res = await fetch("https://api-v2.spa-cr.com/api/v2/country");
//         const result = await res.json();
//         if (res.ok && Array.isArray(result.data)) {
//           const validCountries = result.data
//             .filter((c) => c?.id && c?.name)
//             .map((c: any) => ({
//               label: c.name,
//               value: c.id.toString(),
//             }));
//           setCountryOptions(validCountries);
//         } else {
//           toast.error(result.message || "Failed to load countries.");
//         }
//       } catch (error) {
//         toast.error("Error fetching countries");
//       }
//     };
//     fetchCountries();
//   }, []);
//   // Check if global banner exists
//   useEffect(() => {
//     const checkGlobalBanner = async () => {
//       try {
//         const token = localStorage.getItem("access_token");
//         const res = await fetch("https://api-v2.spa-cr.com/api/v2/admin/check-global-banner", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const result = await res.json();
//         if (res.ok && result.success && result.data?.bannerID && result.data?.bannerID !== bannerID) {
//           setHideGlobalOption(true);
//         }
//       } catch (err) {
//         console.error("Error checking global banner:", err);
//       }
//     };
//     checkGlobalBanner();
//   }, [bannerID]);
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setPayload((prev) => ({ ...prev, image: file }));
//     setPreviewImage(URL.createObjectURL(file));
//     e.target.value = "";
//   };
//   const handleRemoveImage = () => {
//     setPayload((prev) => ({ ...prev, image: null }));
//     setPreviewImage("");
//   };
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // if (!payload.url.trim()) {
//     //   toast.error("URL is required");
//     //   return;
//     // }
//     if (!payload.isGlobal && payload.selectedCountry.length === 0) {
//       toast.error("Please select at least one country or mark as Global");
//       return;
//     }
//     setCreating(true);
//     try {
//       const formData = new FormData();
//       formData.append("url", payload.url);
//       formData.append("isGlobal", payload.isGlobal.toString());
//       if (!payload.isGlobal) {
//         formData.append("country", payload.selectedCountry.join(","));
//       }
//       if (payload.image) {
//         formData.append("image", payload.image);
//       }
//       const token = localStorage.getItem("access_token");
//       const res = await fetch(`https://api-v2.spa-cr.com/api/v2/admin/update-banner/${bannerID}`, {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });
//       const result = await res.json();
//       if (res.ok) {
//         toast.success("Banner updated successfully!");
//         navigate("/admin/banner-list");
//       } else {
//         toast.error(result.message || "Failed to update banner");
//       }
//     } catch (err) {
//       toast.error("Error updating banner");
//     } finally {
//       setCreating(false);
//     }
//   };
//   const selectedValues = countryOptions.filter((option) => {
//     const match = payload.selectedCountry.includes(String(option.value));
//     // console.log(`Checking: ${option.value} => match: ${match}`);
//     return match;
//   });
//   console.log("Selected Country Payload:", payload.selectedCountry);
//   console.log("Country Options Values:", countryOptions.map(opt => opt.value));
//   const handleToggleActive = async (checked: boolean) => {
//     try {
//         setPayload((prev) => ({ ...prev, isActive: checked }));
//         const access_token = localStorage.getItem("access_token");
//         const res = await fetch(`https://api-v2.spa-cr.com/api/v2/admin/toggle-banner-status/${bannerID}`,
//         {
//             method: "PUT",
//             headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${access_token}`,
//             },
//             body: JSON.stringify({ isActive: checked }),
//         }
//         );
//         const data = await res.json();
//         if (data.success) {
//           toast.success(checked ? "Banner Activated" : "Banner Deactivated");
//           setTimeout(() => {
//             navigate('/admin/banner-list');
//           }, 2000);
//         } else {
//           toast.error("Failed to update");
//           setTimeout(() => {
//             navigate('/admin/banner-list');
//           }, 2000);
//         }
//     } catch (err) {
//         toast.error("Error occurred");
//     }
//     };
//   return (
//     <div className="min-h-screen">
//       <div className="flex justify-end items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
//         <ToastContainer />
//         <Button text="Back" variant="lightBlue" onClick={() => navigate(-1)} />
//       </div>
//       <div className="p-8 bg-gray-50 shadow-md rounded-lg">
//         <form
//           onSubmit={handleSubmit}
//           className="max-w-4xl mx-auto bg-white p-6 shadow rounded-lg space-y-6"
//         >
//           <div className="flex flex-col gap-2">
//             <label className="font-medium">Banner URL</label>
//             <input
//               type="text"
//               value={payload.url}
//               onChange={(e) => setPayload((prev) => ({ ...prev, url: e.target.value }))}
//               placeholder="https://example.com"
//               className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           {!hideGlobalOption && !payload.isGlobal && (
//             <div className="flex items-center gap-2">
//               <label className="font-medium">Global</label>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="sr-only peer"
//                   checked={payload.isGlobal}
//                   onChange={(e) =>
//                     setPayload((prev) => ({ ...prev, isGlobal: e.target.checked }))
//                   }
//                 />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-all duration-300"></div>
//                 <span className="ml-3 text-sm text-gray-600">
//                   {payload.isGlobal
//                     ? "Country options are disabled"
//                     : "Country options enabled"}
//                 </span>
//               </label>
//             </div>
//           )}
//           {!payload.isGlobal && (
//           <div>
//             <div className="flex flex-col gap-1">
//                 <label htmlFor="selectedCountry" className="font-medium">
//                     Select Country
//                 </label>
//             <Select
//               isMulti
//               name="selectedCountry"
//               options={countryOptions}
//               value={countryOptions.filter((option) =>
//                 payload.selectedCountry.includes(option.value)
//               )}
//               onChange={selected =>
//                 setPayload(prev => ({
//                     ...prev,
//                     selectedCountry: selected.map(option => String(option.value)),
//                 }))
//               }
//               isDisabled={payload.isGlobal}
//             />
//             </div>
//           </div>
//           )}
//           <div>
//             <label className="block mb-1 font-medium">GIF</label>
//             <div
//               onClick={() => fileInputRef.current?.click()}
//               className="h-40 border-dashed border-2 border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-blue-500"
//             >
//               {previewImage ? (
//                 <img src={previewImage} alt="Preview" className="h-full object-contain" />
//               ) : (
//                 <LuPlus size={32} className="text-gray-400" />
//               )}
//             </div>
//             <input
//               type="file"
//               ref={fileInputRef}
//               className="hidden"
//               accept="image/*"
//               onChange={handleFileChange}
//             />
//             {previewImage && (
//               <div className="mt-2 text-red-500 cursor-pointer" onClick={handleRemoveImage}>
//                 Remove GIF
//               </div>
//             )}
//           </div>
//         {!payload.isGlobal && (
//             <div className="flex items-center gap-2 mt-4">
//                 <label className="font-medium">Activate/Deactivate Banner</label>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                     type="checkbox"
//                     className="sr-only peer"
//                     checked={payload.isActive}
//                     onChange={(e) => handleToggleActive(e.target.checked)}
//                 />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-green-500 transition-all duration-300"></div>
//                 <span className="ml-3 text-sm text-gray-600">
//                     {payload.isActive ? "Currently Active" : "Currently Inactive"}
//                 </span>
//                 </label>
//             </div>
//         )}
//           <div className="text-right">
//             <Button
//               text={creating ? "Submitting…" : "Update"}
//               variant="primary"
//               type="submit"
//               disabled={creating}
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default EditBanner;
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import Button from "../../components/Common/Button";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import { useDispatch } from "react-redux";
const EditBanner = () => {
    const { bannerID } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [payload, setPayload] = useState({
        url: "",
        storeIds: [],
        image: null,
        selectedCountry: [],
        isGlobal: false,
        isActive: true,
    });
    const [linkType, setLinkType] = useState("url");
    const [storeOptions, setStoreOptions] = useState([]);
    const [loadingStores, setLoadingStores] = useState(true);
    const [creating, setCreating] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [countryOptions, setCountryOptions] = useState([]);
    const [hideGlobalOption, setHideGlobalOption] = useState(false);
    const dispatch = useDispatch();
    // Fetch stores
    const fetchStores = async () => {
        setLoadingStores(true);
        try {
            const res = await fetch("https://api-v2.spa-cr.com/api/v2/order/get-scraping-icons", {
                headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
            });
            const result = await res.json();
            if (Array.isArray(result.data)) {
                // setStoreOptions(
                //   result.data.map((store: any) => ({
                //     label: store.title,
                //     value: store.Id,
                //   }))
                // );
                const options = result.data.map((store) => ({
                    label: store.title,
                    value: store.Id.toString(), // 🔹 toString() for consistency
                }));
                setStoreOptions(options);
                // ✅ Default store selection if empty
                setPayload(prev => ({
                    ...prev,
                    storeIds: prev.storeIds.length > 0 ? prev.storeIds : [options[0]?.value]
                }));
            }
            else {
                setStoreOptions([]);
            }
        }
        catch {
            setStoreOptions([]);
        }
        setLoadingStores(false);
    };
    // Fetch banner details
    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const res = await fetch(`https://api-v2.spa-cr.com/api/v2/admin/get-banner/${bannerID}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const result = await res.json();
                if (res.ok && result.data) {
                    const b = result.data;
                    // Detect linkType from API data
                    // if (b.storeIds && b.storeIds.length > 0) {
                    //   setLinkType("store");
                    // } else {
                    //   setLinkType("url");
                    // }
                    if (b.RedirectType === "store") {
                        setLinkType("store");
                    }
                    else {
                        setLinkType("url");
                    }
                    setPayload((prev) => ({
                        ...prev,
                        url: b.url || "",
                        // storeIds: b.storeIds || [],
                        // storeIds: b.storeIds?.map((id: any) => id.toString()) || [],
                        storeIds: Array.isArray(b.storeIDs)
                            ? b.storeIDs.map((id) => id.toString())
                            : [],
                        image: b.image || null,
                        selectedCountry: Array.isArray(b.countries)
                            ? b.countries.map((c) => String(c.id))
                            : [],
                        isGlobal: b.IsGlobal || false,
                        isActive: b.IsActive === true,
                    }));
                    setPreviewImage(b.imagepath || "");
                }
                else {
                    toast.error(result.message || "Failed to load banner");
                }
            }
            catch {
                toast.error("Error loading banner");
            }
        };
        if (bannerID)
            fetchBanner();
        fetchStores();
    }, [bannerID]);
    // Fetch countries
    // useEffect(() => {
    //   const fetchCountries = async () => {
    //     try {
    //       const res = await fetch("https://api-v2.spa-cr.com/api/v2/country");
    //       const result = await res.json();
    //       if (res.ok && Array.isArray(result.data)) {
    //         setCountryOptions(
    //           result.data
    //             .filter((c) => c?.id && c?.name)
    //             .map((c: any) => ({ label: c.name, value: c.id.toString() }))
    //         );
    //       }
    //     } catch {
    //       toast.error("Error fetching countries");
    //     }
    //   };
    //   fetchCountries();
    // }, []);
    // useEffect(() => {
    //     const fetchCountries = async () => {
    //       try {
    //         const res = await fetch("https://api-v2.spa-cr.com/api/v2/country/get-countries-for-banner-in-edit",
    //           {
    //             method: "POST", // or GET with query param if API requires
    //             headers: {
    //               "Content-Type": "application/json",
    //               Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    //             },
    //             body: JSON.stringify({
    //               bannerId: bannerID,
    //             }),
    //           }
    //         );
    //         const result = await res.json();
    //         console.log("Fetched countries:", result.data);
    //         if (res.ok && Array.isArray(result.data)) {
    //           const validCountries = result.data.filter(c => c?.id != null && c?.name);
    //           const countryOptions = validCountries
    //           .map((c: any) => ({
    //             label: c.name,
    //             value: c.id.toString(),
    //             disabled: c.isAssigned
    //           }));
    //           // dispatch(setCountryOptions(countryOptions));
    //           setCountryOptions(countryOptions);
    //         } else {
    //           toast.error(result.message || "Failed to load countries.");
    //         }
    //       } catch (error: any) {
    //         toast.error(error.message || "Failed to load countries.");
    //       }
    //     };
    //     // fetchCountries();
    //     if (bannerID) fetchCountries();
    //   }, 
    //   // [dispatch]
    //   [bannerID]
    // );
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch("https://api-v2.spa-cr.com/api/v2/country/get-countries-for-banner-in-edit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                    body: JSON.stringify({ bannerId: bannerID }),
                });
                const result = await res.json();
                if (res.ok && Array.isArray(result.data)) {
                    const validCountries = result.data.filter((c) => c?.id != null && c?.name);
                    // API already filtered, so just map
                    const countryOptions = validCountries.map((c) => ({
                        label: c.name,
                        value: c.id.toString(),
                    }));
                    setCountryOptions(countryOptions);
                }
                else {
                    toast.error(result.message || "Failed to load countries.");
                }
            }
            catch (error) {
                toast.error(error.message || "Failed to load countries.");
            }
        };
        if (bannerID)
            fetchCountries();
    }, [bannerID]);
    // Check global banner
    useEffect(() => {
        const checkGlobalBanner = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const res = await fetch("https://api-v2.spa-cr.com/api/v2/admin/check-global-banner", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const result = await res.json();
                if (res.ok && result.success && result.data?.bannerID && result.data?.bannerID !== bannerID) {
                    setHideGlobalOption(true);
                }
            }
            catch { }
        };
        checkGlobalBanner();
    }, [bannerID]);
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        setPayload((prev) => ({ ...prev, image: file }));
        setPreviewImage(URL.createObjectURL(file));
        e.target.value = "";
    };
    const handleRemoveImage = () => {
        setPayload((prev) => ({ ...prev, image: null }));
        setPreviewImage("");
    };
    const handleSubmit = async (e) => {
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
            }
            else {
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
            const res = await fetch(`https://api-v2.spa-cr.com/api/v2/admin/update-banner/${bannerID}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const result = await res.json();
            if (res.ok) {
                toast.success("Banner updated successfully!");
                navigate("/admin/banner-list");
            }
            else {
                toast.error(result.message || "Failed to update banner");
            }
        }
        catch {
            toast.error("Error updating banner");
        }
        finally {
            setCreating(false);
        }
    };
    useEffect(() => {
        console.log("Payload selectedCountry:", payload.selectedCountry);
        console.log("Country options:", countryOptions);
    }, [payload.selectedCountry, countryOptions]);
    return (_jsxs("div", { className: "min-h-screen", children: [_jsxs("div", { className: "flex justify-end items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: [_jsx(ToastContainer, {}), _jsx(Button, { text: "Back", variant: "lightBlue", onClick: () => navigate(-1) })] }), _jsx("div", { className: "p-8 bg-gray-50 shadow-md rounded-lg", children: _jsxs("form", { onSubmit: handleSubmit, className: "max-w-4xl mx-auto bg-white p-6 shadow rounded-lg space-y-6", children: [_jsxs("div", { className: "flex gap-6 items-center", children: [_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "radio", value: "url", checked: linkType === "url", onChange: () => setLinkType("url") }), "URL"] }), _jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "radio", value: "store", checked: linkType === "store", onChange: () => setLinkType("store") }), "Store"] })] }), linkType === "url" && (_jsxs("div", { className: "flex flex-col gap-2 mt-3", children: [_jsx("label", { className: "font-medium", children: "Banner URL" }), _jsx("input", { type: "text", value: payload.url, onChange: (e) => setPayload((prev) => ({ ...prev, url: e.target.value })), placeholder: "https://example.com", className: "border border-gray-300 px-4 py-2 rounded" })] })), linkType === "store" && (_jsxs("div", { className: "flex flex-col gap-2 mt-3", children: [_jsx("label", { className: "font-medium", children: "Select Stores" }), _jsx(Select, { isMulti: true, isLoading: loadingStores, options: storeOptions, value: storeOptions.filter((opt) => payload.storeIds.includes(opt.value)), onChange: (selected) => setPayload((prev) => ({ ...prev, storeIds: selected.map((opt) => opt.value) })) })] })), !hideGlobalOption && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("label", { className: "font-medium", children: "Global" }), _jsx("input", { type: "checkbox", checked: payload.isGlobal, onChange: (e) => setPayload((prev) => ({ ...prev, isGlobal: e.target.checked })) })] })), !payload.isGlobal && (_jsxs("div", { children: [_jsx("label", { className: "font-medium", children: "Select Country" }), _jsx(Select, { isMulti: true, options: countryOptions, value: countryOptions.filter((opt) => payload.selectedCountry.includes(opt.value)), onChange: (selected) => setPayload((prev) => ({
                                        ...prev,
                                        selectedCountry: selected.map((opt) => String(opt.value)),
                                    })) })] })), _jsxs("div", { children: [_jsx("label", { className: "font-medium", children: "GIF" }), _jsx("div", { onClick: () => fileInputRef.current?.click(), className: "h-40 border-dashed border-2 flex items-center justify-center cursor-pointer", children: previewImage ? (_jsx("img", { src: previewImage, alt: "Preview", className: "h-full object-contain" })) : (_jsx(LuPlus, { size: 32 })) }), _jsx("input", { type: "file", ref: fileInputRef, className: "hidden", accept: "image/*", onChange: handleFileChange }), previewImage && (_jsx("div", { className: "mt-2 text-red-500 cursor-pointer", onClick: handleRemoveImage, children: "Remove GIF" }))] }), _jsx("div", { className: "text-right", children: _jsx(Button, { text: creating ? "Submitting…" : "Update", variant: "primary", type: "submit" }) })] }) })] }));
};
export default EditBanner;
