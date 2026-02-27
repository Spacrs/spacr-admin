import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Common/Button";
import InputComponent from "../../components/Common/Inputes";
import { toast, ToastContainer } from "react-toastify";
import Inputes from "../../components/Common/Inputes";
import { useDispatch } from "react-redux";
import { useGetPaymentConfigsQuery, } from "../../store/slices/paymentConfigSlice/apiSlice";
import ImageCropper from "../../components/Common/Cropper/ImageCropper"; //Added on 09-07-2025
const EditScrapingIcon = () => {
    const { Id } = useParams(); // get ID from URL param
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();
    // const countryOptions = useAppSelector(selectCounyOptions);
    const [countryOptions, setCountryOptions] = useState([]);
    const [payload, setPayload] = useState({
        title: "",
        url: "",
        image: null,
        selectedCountry: ""
    });
    const [previewImage, setPreviewImage] = useState("");
    const { data, isLoading } = useGetPaymentConfigsQuery({
        isPagination: false,
    });
    const [showCropper, setShowCropper] = useState(false); //Added on 09-07-2025
    const [imageToCrop, setImageToCrop] = useState(null); //Added on 09-07-2025
    // Fetch existing icon data by ID on mount
    useEffect(() => {
        if (!Id)
            return;
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
                if (icon.imagepath)
                    setPreviewImage(icon.imagepath);
            }
            else {
                toast.error("Failed to load icon data.");
            }
        })
            .catch((error) => {
            toast.error("Failed to load icon data.");
            alert("Failed to load icon data." + error.message);
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
    const handleChange = (e) => {
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
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageToCrop(reader.result);
            setShowCropper(true);
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };
    const handleRemoveImage = () => {
        setPreviewImage("");
        setPayload((prev) => ({ ...prev, image: null }));
    };
    const handleSubmit = async (e) => {
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
        }
        catch (error) {
            toast.error(error.message || "Something went wrong.");
        }
        finally {
            setCreating(false);
        }
    };
    const [creating, setCreating] = useState(false);
    const handleCropDone = (blob) => {
        const croppedFile = new File([blob], "cropped.jpg", { type: "image/jpeg" });
        setPayload((prev) => ({ ...prev, image: croppedFile }));
        setPreviewImage(URL.createObjectURL(croppedFile));
        setShowCropper(false);
    };
    return (_jsxs("div", { className: "min-h-screen", children: [_jsxs("div", { className: "flex justify-end items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: [_jsx(ToastContainer, {}), _jsx(Button, { text: "Back", variant: "lightBlue", onClick: () => navigate(-1) })] }), _jsx("div", { className: "p-8 bg-gray-50 shadow-md rounded-lg", children: _jsxs("form", { onSubmit: handleSubmit, className: "max-w-4xl mx-auto bg-white p-6 shadow rounded-lg space-y-6", children: [_jsx("div", { className: "flex flex-col gap-6", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [_jsx("div", { className: "w-full md:w-1/2", children: _jsx(InputComponent, { type: "text", name: "title", label: "Title", value: payload.title, onChange: handleChange, required: true }) }), _jsx("div", { className: "w-full md:w-1/2", children: _jsx(InputComponent, { type: "text", name: "url", label: "URL", value: payload.url, onChange: handleChange, required: true }) })] }) }), _jsx("div", { className: "flex flex-col gap-6", children: _jsx("div", { className: "flex flex-col md:flex-row gap-4", children: _jsx("div", { className: "w-full", children: _jsx(Inputes, { label: "Country Name", options: countryOptions, type: "select", name: "selectedCountry", value: payload.selectedCountry, onChange: handleChange, required: true }) }) }) }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: "Image" }), _jsx("div", { onClick: () => fileInputRef.current?.click(), className: "h-40 border-dashed border-2 border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-blue-500", children: previewImage ? (_jsx("img", { src: previewImage, alt: "Preview", className: "h-full object-contain" })) : (_jsx(LuPlus, { size: 32, className: "text-gray-400" })) }), _jsx("input", { type: "file", ref: fileInputRef, className: "hidden", accept: "image/*", onChange: handleFileChange }), previewImage && (_jsx("div", { className: "mt-2 text-red-500 cursor-pointer", onClick: handleRemoveImage, children: "Remove Image" }))] }), _jsx("div", { className: "text-right", children: _jsx(Button, { text: creating ? "Updating…" : "Update", variant: "primary", type: "submit", disabled: creating }) })] }) }), showCropper && imageToCrop && (_jsx(ImageCropper, { imageSrc: imageToCrop, onCropDone: handleCropDone, onClose: () => setShowCropper(false) }))] }));
};
export default EditScrapingIcon;
