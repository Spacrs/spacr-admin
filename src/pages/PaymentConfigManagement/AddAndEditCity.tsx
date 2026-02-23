import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddCityMutation,
  useGetPaymentConfigsQuery,
  useGetCityByIdQuery,
  useUpdateCityMutation,
} from "../../store/slices/paymentConfigSlice/apiSlice";
import Inputes from "../../components/Common/Inputes";
import {
  setCountryOptions,
  selectCounyOptions,
  selectIsEditCity,
  setIsEditCity,
} from "../../store/slices/paymentConfigSlice/paymentConfigSlice";
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

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [addCity, { isLoading: isAdding }] = useAddCityMutation();
  const { data, isLoading } = useGetPaymentConfigsQuery({
    isPagination: false,
  });

  const {
    data: cityData,
    isLoading: isLoadingCitydata,
    refetch: refetchCityData,
  } = useGetCityByIdQuery(cityId!);
  const [updateCity] = useUpdateCityMutation();

  //To set the default value to the dropdown
  useEffect(() => {
    if (
      countryOptions.length > 0 &&
      !formData.selectedCountry &&
      !isEditCity
    ) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { 
      selectedCountry, 
      cityName, 
      // latitude, 
      // longitude 
    } = formData;

    // if (!selectedCountry || !cityName || !latitude || !longitude) {
    if (!selectedCountry || !cityName ) {
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

      } else {
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
    } catch (error) {
      // console.error("Failed to add city:", error);
      toast.error("Failed to add city:");
    }
  };
  return (
    <div>
      <div className="flex justify-end items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        <ToastContainer />
        <div className="ml-4 flex justify-end items-center ">
          <Button
            text="Back"
            variant="lightBlue"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-20 bg-gray-100 rounded-lg">
        {isEditCity && isLoadingCitydata ? <Loader /> : null}

        {!isLoadingCitydata && (
          <div className="w-full max-w-7xl bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              City Information
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <Inputes
                    label="Country Name"
                    options={countryOptions}
                    type="select"
                    name="selectedCountry"
                    value={formData.selectedCountry}
                    onChange={handleChange}
                  />
                </div>

                <div className="w-1/2">
                  <Inputes
                    label="City Name"
                    type="text"
                    name="cityName"
                    value={formData.cityName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                {/* <div className="w-1/2">
                  <Inputes
                    label="Latitude"
                    name="latitude"
                    type="text"
                    value={formData.latitude}
                    onChange={handleChange}
                  />
                </div>

                <div className="w-1/2">
                  <Inputes
                    label="Longitude"
                    name="longitude"
                    type="text"
                    value={formData.longitude}
                    onChange={handleChange}
                  />
                </div> */}
              </div>

              <div className="flex gap-4 mt-4 w-full">
                <button
                  type="submit"
                  className="w-1/5 px-4 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800"
                >
                  {!isEditCity ? "Add" : "Edit"} City
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAndUpdateCity;
