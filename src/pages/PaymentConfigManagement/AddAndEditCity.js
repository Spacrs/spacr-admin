import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddCityMutation, useGetPaymentConfigsQuery, useGetCityByIdQuery, useUpdateCityMutation, } from "../../store/slices/paymentConfigSlice/apiSlice";
import Inputes from "../../components/Common/Inputes";
import { setCountryOptions, selectCounyOptions, selectIsEditCity, setIsEditCity, } from "../../store/slices/paymentConfigSlice/paymentConfigSlice";
import { useAppSelector } from "../../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Loader } from "../../components/Common";
import { toast, ToastContainer } from "react-toastify";
const AddAndUpdateCity = () => {
    const dispatch = useDispatch();
    const { cityId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        selectedCountry: "",
        cityName: "",
        // latitude: "",
        // longitude: "",
    });
    const isEditCity = useSelector(selectIsEditCity);
    const [countries, setCountries] = useState([]);
    const countryOptions = useAppSelector(selectCounyOptions);
    const [successMessage, setSuccessMessage] = useState(null);
    const [addCity, { isLoading: isAdding }] = useAddCityMutation();
    const { data, isLoading } = useGetPaymentConfigsQuery({
        isPagination: false,
    });
    const { data: cityData, isLoading: isLoadingCitydata, refetch: refetchCityData, } = useGetCityByIdQuery(cityId);
    const [updateCity] = useUpdateCityMutation();
    //To set the default value to the dropdown
    useEffect(() => {
        if (countryOptions.length > 0 &&
            !formData.selectedCountry &&
            !isEditCity) {
            setFormData((prev) => ({
                ...prev,
                selectedCountry: countryOptions[0].value,
            }));
        }
    }, [countryOptions, formData.selectedCountry, isEditCity]);
    //To set the default value to the dropdown
    useEffect(() => {
        if (cityData?.data) {
            console.log(cityData.data.Country.Id);
            setFormData((prev) => ({
                ...prev,
                selectedCountry: cityData.data.Country.Id,
                cityName: cityData.data.name,
                // latitude: cityData.data.latitude,
                // longitude: cityData.data.longitude,
            }));
        }
    }, [cityData]);
    useEffect(() => {
        if (cityId) {
            refetchCityData();
        }
        return () => {
            setFormData({
                selectedCountry: "",
                cityName: "",
                // latitude: "",
                // longitude: "",
            });
        };
    }, [cityId]);
    useEffect(() => {
        if (cityId) {
            dispatch(setIsEditCity({ isEditCity: true }));
        }
        return () => {
            dispatch(setIsEditCity({ isEditCity: false }));
        };
    }, [cityId]);
    useEffect(() => {
        if (data?.data) {
            dispatch(setCountryOptions(data.data));
        }
    }, [data, dispatch]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { selectedCountry, cityName,
        // latitude, 
        // longitude 
         } = formData;
        // if (!selectedCountry || !cityName || !latitude || !longitude) {
        if (!selectedCountry || !cityName) {
            // alert("Please fill in all fields.");
            toast.error("Please fill in all fields.");
            return;
        }
        try {
            if (isEditCity) {
                const val = {
                    cityId: cityId,
                    data: {
                        name: cityName,
                        // latitude,
                        // longitude,
                        countryId: Number(selectedCountry),
                    },
                };
                const response = await updateCity(val).unwrap();
                console.log("City Updated Successfully:", response);
                toast.success("City Updated Successfully:");
                setSuccessMessage("City updated successfully!");
                setTimeout(() => setSuccessMessage(null), 3000);
                setTimeout(() => {
                    navigate('/admin/city-list', { state: { triggerRefetch: true } });
                }, 3000);
            }
            else {
                const response = await addCity({
                    name: cityName,
                    // latitude,
                    // longitude,
                    countryId: Number(selectedCountry),
                }).unwrap();
                // console.log("City Added Successfully:", response);
                toast.success("City Added Successfully:");
                setSuccessMessage("City added successfully!");
                setTimeout(() => setSuccessMessage(null), 3000);
                setTimeout(() => {
                    navigate('/admin/city-list', { state: { triggerRefetch: true } });
                }, 3000);
            }
            setFormData({
                selectedCountry: "",
                cityName: "",
                // latitude: "",
                // longitude: "",
            });
        }
        catch (error) {
            // console.error("Failed to add city:", error);
            toast.error("Failed to add city:");
        }
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-end items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: [_jsx(ToastContainer, {}), _jsx("div", { className: "ml-4 flex justify-end items-center ", children: _jsx(Button, { text: "Back", variant: "lightBlue", onClick: () => navigate(-1) }) })] }), _jsxs("div", { className: "flex flex-col justify-center items-center p-20 bg-gray-100 rounded-lg", children: [isEditCity && isLoadingCitydata ? _jsx(Loader, {}) : null, !isLoadingCitydata && (_jsxs("div", { className: "w-full max-w-7xl bg-white p-6 shadow-lg rounded-lg", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-6 text-center", children: "City Information" }), _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-5", children: [_jsxs("div", { className: "flex gap-4", children: [_jsx("div", { className: "w-1/2", children: _jsx(Inputes, { label: "Country Name", options: countryOptions, type: "select", name: "selectedCountry", value: formData.selectedCountry, onChange: handleChange }) }), _jsx("div", { className: "w-1/2", children: _jsx(Inputes, { label: "City Name", type: "text", name: "cityName", value: formData.cityName, onChange: handleChange }) })] }), _jsx("div", { className: "flex gap-4" }), _jsx("div", { className: "flex gap-4 mt-4 w-full", children: _jsxs("button", { type: "submit", className: "w-1/5 px-4 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800", children: [!isEditCity ? "Add" : "Edit", " City"] }) })] })] }))] })] }));
};
export default AddAndUpdateCity;
