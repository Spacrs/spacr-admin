import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddPaymentConfigMutation } from "../../store/slices/paymentConfigSlice/apiSlice";
import { addPaymentConfigToList } from "../../store/slices/paymentConfigSlice/paymentConfigSlice";
import Inputes from "../../components/Common/Inputes";

const AddCountry = () => {
  const dispatch = useDispatch();
  const [addPaymentConfig] = useAddPaymentConfigMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    providers: "",
    shortName: "",
    wallet: false,
    cod: false,
    stripe: false,
    destination: false,
    departure: false,
  });
  
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await addPaymentConfig(formData).unwrap();
      dispatch(addPaymentConfigToList(response));
      setSuccessMessage("Country added successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);

      setFormData({
        name: "",
        providers: "",
        shortName: "",
        wallet: false,
        cod: false,
        stripe: false,
        destination: false,
        departure: false,
      });

      // navigate('/admin/payment-config');
    } catch (error) {
      console.error("Failed to add:", error);
    }
  };

  return (
    <div className="flex justify-center items-center p-20 bg-gray-50">
      <div className="w-full max-w-7xl bg-white p-6 shadow-lg rounded-lg">
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {successMessage}
          </div>
        )}

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-start">
          Country Information
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex gap-4">
            {['name', 'providers', 'shortName'].map((field) => (
              <div key={field} className="w-1/3">
                <Inputes
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  type="text"
                  name={field}
                  value={formData[field as keyof typeof formData] as string}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div>
            <strong className="block text-gray-700 font-medium mb-2">Payment Options</strong>
            <div className="grid grid-cols-3 gap-6">
              {["wallet", "cod", "stripe"].map(option => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    name={option}
                    checked={formData[option as keyof typeof formData] as boolean}
                    onChange={handleChange}
                    className="w-5 h-5 mr-2"
                  />
                  <span className="text-gray-700 font-medium">{option.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <strong className="block text-gray-700 font-medium mb-2">Travel Options</strong>
            <div className="grid grid-cols-3 gap-6">
              {["destination", "departure"].map(option => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    name={option}
                    checked={formData[option as keyof typeof formData] as boolean}
                    onChange={handleChange}
                    className="w-5 h-5 mr-2"
                  />
                  <span className="text-gray-700 font-medium">{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-4 w-full">
            <button
              type="submit"
              className="w-1/5 px-4 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800"
            >
              Add Country
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCountry;
