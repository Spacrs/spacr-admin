import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useAddCityMutation,
  useGetPaymentConfigsQuery,
} from "../../store/slices/paymentConfigSlice/apiSlice";
import Inputes from "../../components/Common/Inputes";
import {
  setCountryOptions,
  selectCounyOptions,
} from "../../store/slices/paymentConfigSlice/paymentConfigSlice";
import { useAppSelector } from "../../store/hooks";

const AddCity = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    selectedCountry: "",
    cityName: "",
    latitude: "",
    longitude: "",
  });
  const [countries, setCountries] = useState([]);
  const countryOptions = useAppSelector(selectCounyOptions);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [addCity, { isLoading: isAdding }] = useAddCityMutation();
  const { data, isLoading } = useGetPaymentConfigsQuery({
    isPagination: false,
  });

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

    const { selectedCountry, cityName, latitude, longitude } = formData;

    if (!selectedCountry || !cityName || !latitude || !longitude) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await addCity({
        name: cityName,
        latitude,
        longitude,
        countryId: Number(selectedCountry),
      }).unwrap();

      console.log("City Added Successfully:", response);
      setSuccessMessage("City added successfully!");

      setTimeout(() => setSuccessMessage(null), 3000);

      setFormData({
        selectedCountry: "",
        cityName: "",
        latitude: "",
        longitude: "",
      });
    } catch (error) {
      console.error("Failed to add city:", error);
    }
  };

  console.log(countryOptions);

  return (
    <div className="flex justify-center items-center p-20 bg-gray-50">
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
                value={formData.cityName}
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
            <div className="w-1/2">
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
            </div>
          </div>

          <div className="flex gap-4 mt-4 w-full">
            <button
              type="submit"
              className="w-1/5 px-4 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800"
            >
              Add City
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCity;
