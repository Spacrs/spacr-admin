import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Common/Button";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import ImageCropper from "../../components/Common/Cropper/ImageCropper"; //Added on 09-07-2025
import Select from "react-select";
const AddBanner = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState("");
    const [showCropper, setShowCropper] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null);
    const [creating, setCreating] = useState(false);
    const [isGlobal, setIsGlobal] = useState(false);
    const [hideGlobalOption, setHideGlobalOption] = useState(false);
    //Added on 11-08-2025
    const [linkType, setLinkType] = useState("url"); // default URL
    const [storeOptions, setStoreOptions] = useState([]);
    const [loadingStores, setLoadingStores] = useState(true);
    // Fetch Stores from API
    const fetchStores = async () => {
        setLoadingStores(true);
        try {
            const res = await fetch("https://api-v2.spa-cr.com/api/v2/order/get-scraping-icons", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            const result = await res.json();
            console.log("Raw API Result:", result);
            if (Array.isArray(result.data)) {
                const mapped = result.data.map((store) => ({
                    label: store.title,
                    value: store.Id,
                    imagepath: store.imagepath,
                    countryName: store.countryName,
                }));
                setStoreOptions(mapped);
            }
            else {
                console.warn("Unexpected API response structure", result);
                setStoreOptions([]);
            }
        }
        catch (err) {
            console.error("Error fetching stores:", err);
            setStoreOptions([]);
        }
        setLoadingStores(false);
    };
    useEffect(() => {
        fetchStores();
    }, []);
    //Added on 11-08-2025
    const [payload, setPayload] = useState({
        url: "",
        image: null,
        selectedCountry: [],
        isGlobal: false,
        storeIds: []
    });
    const [countryOptions, setCountryOptions] = useState([]);
    const handleSubmit = async (e) => {
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
            }
            else if (linkType === "store") {
                formData.append("storeIds", payload.storeIds?.join(",") || "");
            }
            // Send selectedCountry as comma-separated string if not global
            if (!isGlobal) {
                formData.append("country", payload.selectedCountry.join(","));
            }
            const access_token = localStorage.getItem('access_token');
            const res = await fetch("https://api-v2.spa-cr.com/api/v2/admin/add-banner", {
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
            }
            else {
                toast.error(result.message || "Failed to add banner");
            }
        }
        catch (error) {
            console.error("Error submitting banner:", error);
            toast.error("Something went wrong");
        }
        finally {
            setCreating(false);
        }
    };
    useEffect(() => {
        const checkGlobalBanner = async () => {
            try {
                const access_token = localStorage.getItem('access_token');
                const res = await fetch("https://api-v2.spa-cr.com/api/v2/admin/check-global-banner", {
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
            }
            catch (error) {
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
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        setPayload((prev) => ({ ...prev, image: file }));
        setPreviewImage(URL.createObjectURL(file));
        e.target.value = ""; // Clear the input
    };
    const handleChange = () => {
    };
    const handleRemoveImage = () => {
        setPayload((prev) => ({ ...prev, image: null }));
        setPreviewImage("");
    };
    const handleCropDone = (blob) => {
        const croppedFile = new File([blob], "cropped.jpg", { type: "image/jpeg" });
        setPayload((prev) => ({ ...prev, image: croppedFile }));
        setPreviewImage(URL.createObjectURL(croppedFile));
        setShowCropper(false);
    };
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch("https://api-v2.spa-cr.com/api/v2/country/get-countries-for-banner");
                const result = await res.json();
                console.log("Fetched countries:", result.data);
                if (res.ok && Array.isArray(result.data)) {
                    const validCountries = result.data.filter(c => c?.id != null && c?.name);
                    const countryOptions = validCountries.map((c) => ({
                        label: c.name,
                        value: c.id.toString(),
                    }));
                    // dispatch(setCountryOptions(countryOptions));
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
        fetchCountries();
    }, [dispatch]);
    return (_jsxs("div", { className: "min-h-screen", children: [_jsxs("div", { className: "flex justify-end items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: [_jsx(ToastContainer, {}), _jsx(Button, { text: "Back", variant: "lightBlue", onClick: () => navigate(-1) })] }), _jsx("div", { className: "p-8 bg-gray-50 shadow-md rounded-lg", children: _jsxs("form", { onSubmit: handleSubmit, className: "max-w-4xl mx-auto bg-white p-6 shadow rounded-lg space-y-6", children: [_jsxs("div", { className: "flex gap-6 items-center", children: [_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "radio", value: "url", checked: linkType === "url", onChange: () => {
                                                setLinkType("url");
                                                setPayload(prev => ({ ...prev, url: "", storeIds: [] })); // reset
                                            } }), "URL"] }), _jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "radio", value: "store", checked: linkType === "store", onChange: () => {
                                                setLinkType("store");
                                                setPayload(prev => ({ ...prev, url: "", storeIds: [] })); // reset
                                            } }), "Store"] })] }), linkType === "url" && (_jsxs("div", { className: "flex flex-col gap-2 mt-3", children: [_jsx("label", { htmlFor: "url", className: "font-medium", children: "Banner URL" }), _jsx("input", { id: "url", type: "text", value: payload.url, onChange: (e) => setPayload(prev => ({ ...prev, url: e.target.value })), placeholder: "https://example.com", className: "border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" })] })), linkType === "store" && (_jsxs("div", { className: "flex flex-col gap-2 mt-3", children: [_jsx("label", { className: "font-medium", children: "Select Stores" }), _jsx(Select, { isMulti: true, isLoading: loadingStores, options: storeOptions, value: storeOptions.filter(opt => payload.storeIds?.includes(opt.value)), onChange: (selected) => {
                                        const selectedValues = selected.map((opt) => opt.value);
                                        setPayload((prev) => ({ ...prev, storeIds: selectedValues }));
                                    }, className: "basic-multi-select", classNamePrefix: "select" })] })), !hideGlobalOption && (_jsx("div", { className: "flex flex-col gap-6", children: _jsx("div", { className: "flex flex-col md:flex-row gap-4", children: _jsxs("div", { className: "w-full md:w-1/2 flex items-center gap-2", children: [_jsx("label", { htmlFor: "isGlobal", className: "font-medium", children: "Global" }), _jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [_jsx("input", { id: "isGlobal", type: "checkbox", className: "sr-only peer", checked: isGlobal, onChange: (e) => setIsGlobal(e.target.checked) }), _jsx("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-all duration-300" }), _jsx("span", { className: "ml-3 text-sm text-gray-600", children: isGlobal ? "Country options is disabled" : "Country options is enabled" })] })] }) }) })), _jsx("div", { className: "flex flex-col gap-6", children: _jsx("div", { className: "flex flex-col md:flex-row gap-4", children: _jsx("div", { className: "w-full", children: _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { htmlFor: "selectedCountry", className: "font-medium", children: "Select Country" }), _jsx(Select, { inputId: "selectedCountry", isMulti: true, name: "selectedCountry", options: countryOptions, value: countryOptions.filter(option => payload.selectedCountry.includes(option.value)), onChange: (selected) => {
                                                    const selectedValues = selected.map((option) => option.value);
                                                    setPayload((prev) => ({ ...prev, selectedCountry: selectedValues }));
                                                }, isDisabled: isGlobal, className: "basic-multi-select", classNamePrefix: "select" })] }) }) }) }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: "GIF" }), _jsx("div", { onClick: () => fileInputRef.current?.click(), className: "h-40 border-dashed border-2 border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-blue-500", children: previewImage ? (_jsx("img", { src: previewImage, alt: "Preview", className: "h-full object-contain" })) : (_jsx(LuPlus, { size: 32, className: "text-gray-400" })) }), _jsx("input", { type: "file", ref: fileInputRef, className: "hidden", accept: "image/*", onChange: handleFileChange }), previewImage && (_jsx("div", { className: "mt-2 text-red-500 cursor-pointer", onClick: handleRemoveImage, children: "Remove Image" }))] }), _jsx("div", { className: "text-right", children: _jsx(Button, { text: creating ? "Submitting…" : "Submit", variant: "primary", type: "submit", disabled: creating }) })] }) }), showCropper && imageToCrop && (_jsx(ImageCropper, { imageSrc: imageToCrop, onCropDone: handleCropDone, onClose: () => setShowCropper(false) }))] }));
};
export default AddBanner;
