import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddPaymentConfigMutation } from "../../store/slices/paymentConfigSlice/apiSlice";
import { addPaymentConfigToList } from "../../store/slices/paymentConfigSlice/paymentConfigSlice";

const AddCountry = () => {
  const dispatch = useDispatch();
  const [addPaymentConfig] = useAddPaymentConfigMutation();

  const [name, setName] = useState("");
  const [providers, setProviders] = useState("");
  const [shortName, setShortName] = useState("");
  const [wallet, setWallet] = useState(false);
  const [cod, setCod] = useState(false);
  const [stripe, setStripe] = useState(false);
  const [destination, setDestination] = useState(false);
  const [departure, setDeparture] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = { 
      name, 
      providers, 
      shortName, 
      wallet: wallet,  
      cod: cod,
      stripe: stripe,
      destination: destination,
      departure: departure
    };
    
    console.log("Adding New Payment Config:", formData);

    try {
      const response = await addPaymentConfig(formData).unwrap();
      console.log("Added Successfully:", response);

      dispatch(addPaymentConfigToList(response));

      setName("");
      setProviders("");
      setShortName("");
      setWallet(false);
      setCod(false);
      setStripe(false);
      setDestination(false);
      setDeparture(false);

      navigate('/admin/payment-config');

    } catch (error) {
      console.error("Failed to add:", error);
    }
  };

//   return (

//     <div className="flex justify-center items-center p-20 bg-gray-50">
//       <div className="w-full max-w-7xl bg-white p-6 shadow-lg rounded-lg">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
//           Country Information
//         </h2>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//           {/* Text Fields in One Line */}
//           <div className="flex gap-4">
//             <div className="w-1/3">
//               <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="w-1/3">
//               <label className="block text-gray-700 font-medium mb-2" htmlFor="providers">
//                 Providers
//               </label>
//               <input
//                 type="text"
//                 id="providers"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
//                 value={providers}
//                 onChange={(e) => setProviders(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="w-1/3">
//               <label className="block text-gray-700 font-medium mb-2" htmlFor="shortName">
//                 Short Name
//               </label>
//               <input
//                 type="text"
//                 id="shortName"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
//                 value={shortName}
//                 onChange={(e) => setShortName(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           {/* Payment Options */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Payment Options</label>
//             <div className="flex gap-x-20">
//               {[
//                 { label: "Wallet", state: wallet, setter: setWallet },
//                 { label: "COD", state: cod, setter: setCod },
//                 { label: "Stripe", state: stripe, setter: setStripe }
//               ].map(({ label, state, setter }) => (
//                 <div key={label} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={label.toLowerCase()}
//                     checked={state} 
//                     onChange={(e) => setter(e.target.checked)}
//                     className="w-5 h-5 mr-2"
//                   />
//                   <label htmlFor={label.toLowerCase()} className="text-gray-700 font-medium">
//                     {label}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>

          
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Travel Options</label>
//             <div className="flex gap-10">
//               {[
//                 { label: "Destination", state: destination, setter: setDestination },
//                 { label: "Departure", state: departure, setter: setDeparture }
//               ].map(({ label, state, setter }) => (
//                 <div key={label} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={label.toLowerCase()}
//                     checked={state}
//                     onChange={(e) => setter(e.target.checked)}
//                     className="w-5 h-5 mr-2"
//                   />
//                   <label htmlFor={label.toLowerCase()} className="text-gray-700 font-medium">
//                     {label}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-4 mt-4 w-full">
//             <button type="submit" className="w-1/5 px-4 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800">
//               Add Payment Config
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );

return (
    <div className="flex justify-center items-center p-20 bg-gray-50">
      <div className="w-full max-w-7xl bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Country Information
        </h2>
  
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Text Fields in One Line */}
          <div className="flex gap-4">
            <div className="w-1/3">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
  
            <div className="w-1/3">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="providers">
                <strong>Providers</strong>
              </label>
              <input
                type="text"
                id="providers"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={providers}
                onChange={(e) => setProviders(e.target.value)}
                required
              />
            </div>
  
            <div className="w-1/3">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="shortName">
                <strong>Short Name</strong>
              </label>
              <input
                type="text"
                id="shortName"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
                required
              />
            </div>
          </div>
  
          {/* Payment Options */}
          <div>
            <label className="block text-gray-700 font-medium mb-2"><strong>Payment Options</strong></label>
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: "Wallet", state: wallet, setter: setWallet },
                { label: "COD", state: cod, setter: setCod },
                { label: "Stripe", state: stripe, setter: setStripe }
              ].map(({ label, state, setter }) => (
                <div key={label} className="flex items-center">
                  <input
                    type="checkbox"
                    id={label.toLowerCase()}
                    checked={state}
                    onChange={(e) => setter(e.target.checked)}
                    className="w-5 h-5 mr-2"
                  />
                  <label htmlFor={label.toLowerCase()} className="text-gray-700 font-medium">
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
  
          {/* Travel Options */}
          <div>
            <label className="block text-gray-700 font-medium mb-2"><strong>Travel Options</strong></label>
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: "Destination", state: destination, setter: setDestination },
                { label: "Departure", state: departure, setter: setDeparture }
              ].map(({ label, state, setter }) => (
                <div key={label} className="flex items-center">
                  <input
                    type="checkbox"
                    id={label.toLowerCase()}
                    checked={state}
                    onChange={(e) => setter(e.target.checked)}
                    className="w-5 h-5 mr-2"
                  />
                  <label htmlFor={label.toLowerCase()} className="text-gray-700 font-medium">
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
  
          {/* Buttons */}
          <div className="flex gap-4 mt-4 w-full">
            <button type="submit" className="w-1/5 px-4 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800">
              Add Country
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  

};


export default AddCountry;
