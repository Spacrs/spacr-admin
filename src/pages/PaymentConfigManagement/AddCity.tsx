import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddPaymentConfigMutation } from "../../store/slices/paymentConfigSlice/apiSlice";
import { addPaymentConfigToList } from "../../store/slices/paymentConfigSlice/paymentConfigSlice";
import { useAddCityMutation } from "../../store/slices/paymentConfigSlice/apiSlice";
import SelectComponent from '../../components/Common/Inputes/SelectInput';
const AddCity = () => {
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState<string | number>("");
  const [cityName, setCityName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [countries, setCountries] = useState<{ value: number; label: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [addCity, { isLoading: isAdding }] = useAddCityMutation();

    const cities = [
      { value: "new_york", label: "New York" },
      { value: "los_angeles", label: "Los Angeles" },
      { value: "chicago", label: "Chicago" },
      { value: "houston", label: "Houston" },
      { value: "miami", label: "Miami" },
    ];

    useEffect(() => {
        fetch("http://localhost:8000/api/v2/payment-config")
            .then((response) => response.json())
            .then((data) => {
                
                const formattedCountries = data.data.map((country: { Id: number; name: string }) => ({
                    value: country.Id, 
                    label: country.name
                }));
                
                setCountries(formattedCountries);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching countries:", error);
                setLoading(false);
            });
    }, []);
  
    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCountry(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!selectedCountry || !cityName || !latitude || !longitude) {
          alert("Please fill in all fields.");
          return;
      }

      const formData = {
          name: cityName,
          latitude: latitude,
          longitude: longitude,
          countryId: Number(selectedCountry)
      };

      try {
          const response = await addCity(formData).unwrap();
          console.log("City Added Successfully:", response);

          setSuccessMessage("City added successfully!");

          setTimeout(() => {
              setSuccessMessage(null);
          }, 3000);

          setCityName("");
          setLatitude("");
          setLongitude("");
          setSelectedCountry("");
      } catch (error) {
          console.error("Failed to add city:", error);
      }
  };

  return (
    <div className="flex justify-center items-center p-20 bg-gray-50">
      <div className="w-full max-w-7xl bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          City Information
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Text Fields in One Line */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Country Name
              </label>
              <SelectComponent 
                name="city"
                options={countries}
                value={selectedCountry}
                onChange={handleCountryChange}
                // onChange={() => {}}
                className="border-gray-300"
                />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="providers">
                City Name
              </label>
              <input
                type="text"
                id="providers"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                required
              />
            </div>

            
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="providers">
                Latitude
              </label>
              <input
                type="text"
                id="providers"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                required
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="providers">
                Longitude
              </label>
              <input
                type="text"
                id="providers"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                required
              />
            </div>

            
          </div>

          {/* Payment Options */}
          
          
          
          {/* Buttons */}
          <div className="flex gap-4 mt-4 w-full">
            <button type="submit" className="w-1/5 px-4 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800">
              Add City
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCity;
