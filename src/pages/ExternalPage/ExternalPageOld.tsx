// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// interface City {
//   Id: number;
//   name: string;
//   latitude: string;
//   longitude: string;
//   CountryId: number;
//   StateId: number | null;
//   CreatedAt: string;
//   UpdatedAt: string;
// }

// interface Country {
//   Id: number;
//   name: string;
//   shortName: string;
//   cities: City[];
// }

// const ExternalPage = () => {
//   const [countries, setCountries] = useState<Country[]>([]);

//   // Form state
//   const [FullName, setFullName] = useState("");
//   const [Email, setEmail] = useState("");
//   const [phoneCode, setPhoneCode] = useState("+1");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [departure, setDeparture] = useState("");
//   const [destination, setDestination] = useState("");
//   const [travellingDate, setTripDate] = useState("");
//   const [referralStatus, setReferralStatus] = useState<"active" | "inactive" | "loading" | null>("loading");

//   const [message, setMessage] = useState("");

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const referralCode = queryParams.get("referralCode");

//   useEffect(() => {
//     fetch("${import.meta.env.VITE_API_BASE_URL}/api/v2/country-city")
//       .then((res) => res.json())
//       .then((res) => setCountries(res.data));
//   }, []);

//   const checkCodeStatus = async (referralCode: any) => {
//     const access_token = localStorage.getItem('access_token');
//     console.log(access_token, "acacacac");
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/admin/get-referral-code-details/${referralCode}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
  
//       const result = await res.json();
  
//       if (res.ok && result.data.Status === "active") {
//         setReferralStatus("active");
//       } else {
//         setReferralStatus("inactive");
//         showMessage(result.data.message || "This referral code is inactive.");
//       }
//     } catch (err) {
//       console.error("Failed to check referral code:", err);
//       setReferralStatus("inactive");
//       showMessage("Error checking referral code.");
//     }
//   };

//   useEffect(() => {
//     if (referralCode) {
//       checkCodeStatus(referralCode);
//     } else {
//       setReferralStatus("inactive");
//       showMessage("Referral code missing.");
//     }
//   }, [referralCode]);


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const tripDateUnix = travellingDate ? Math.floor(new Date(travellingDate).getTime() / 1000) : null;

//     const data = {
//       FullName,
//       Email,
//       Phone: phoneCode + "" + phoneNumber,
//       Type: 'email',
//       From_CityId: parseInt(departure),
//       To_CityId: parseInt(destination),
//       travellingDate: tripDateUnix,
//       referralCode: referralCode,
//     };

//     try {
//       const response = await fetch("${import.meta.env.VITE_API_BASE_URL}/api/v2/user/add-external-user-with-referral-code", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         showMessage(result.message || "Submitted successfully.");
//       } else {
//         showMessage(result.message || "Submission failed.");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Something went wrong!");
//     }
//   };

//   const showMessage = (msg) => {
//     setMessage(msg);
//     setTimeout(() => setMessage(""), 4000); // clear message after 4 seconds
//   };

//   const getTodayDateString = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = (today.getMonth() + 1).toString().padStart(2, "0");
//     const day = today.getDate().toString().padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const minDate = getTodayDateString();

//   if (referralStatus === "inactive") {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white px-4">
//         <div className="bg-[#fef2f2] text-red-700 shadow-md p-6 rounded-xl max-w-lg w-full text-center">
//           {message || "This referral code is inactive."}
//         </div>
//       </div>
//     );
//   }

//   if (referralStatus === "active") {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center px-4">
//         <div className="bg-[#f3f5f9] shadow-2xl rounded-2xl p-10 w-full max-w-3xl">
//           {/* Message box at the top */}
//           {message && (
//               <div
//                   style={{
//                   position: "fixed",
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   zIndex: 1000,
//                   display: "flex",
//                   justifyContent: "center",
//                   padding: "10px 0",
//                   backgroundColor: "transparent",
//                   }}
//               >
//                   <div
//                   style={{
//                       backgroundColor: "#def",
//                       padding: "10px 20px",
//                       borderRadius: "8px",
//                       maxWidth: "768px",
//                       margin: "0 auto",
//                       textAlign: "center",
//                       boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
//                   }}
//                   >
//                   {message}
//                   </div>
//               </div>
//               )}
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Register</h2>

//           <form className="space-y-10" onSubmit={handleSubmit}>
//             {/* User Details Section */}
//             <div>
//               <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">User Details</h3>

//               <div className="flex flex-col md:flex-row gap-6">
//                 <div className="w-full md:w-1/2">
//                   <label className="block mb-1 font-medium text-gray-700">Full Name</label>
//                   <input
//                     type="text"
//                     value={FullName}
//                     onChange={(e) => setFullName(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                     placeholder="Your name"
//                     required
//                   />
//                 </div>

//                 <div className="w-full md:w-1/2">
//                   <label className="block mb-1 font-medium text-gray-700">Email</label>
//                   <input
//                     type="email"
//                     value={Email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                     placeholder="you@example.com"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
//                 <div className="flex gap-4">
//                   <select
//                     className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                     value={phoneCode}
//                     onChange={(e) => setPhoneCode(e.target.value)}
//                     required
//                   >
//                     <option value="+1">🇺🇸 US (+1)</option>
//                       <option value="+91">🇮🇳 India (+91)</option>
//                       <option value="+44">🇬🇧 UK (+44)</option>
//                       <option value="+61">🇦🇺 Australia (+61)</option>
//                       <option value="+81">🇯🇵 Japan (+81)</option>
//                       <option value="+971">🇦🇪 UAE (+971)</option>
//                       <option value="+49">🇩🇪 Germany (+49)</option>
//                       <option value="+33">🇫🇷 France (+33)</option>
//                       <option value="+39">🇮🇹 Italy (+39)</option>
//                       <option value="+86">🇨🇳 China (+86)</option>
//                       <option value="+7">🇷🇺 Russia (+7)</option>
//                       <option value="+82">🇰🇷 South Korea (+82)</option>
//                       <option value="+34">🇪🇸 Spain (+34)</option>
//                       <option value="+90">🇹🇷 Turkey (+90)</option>
//                       <option value="+55">🇧🇷 Brazil (+55)</option>
//                       <option value="+27">🇿🇦 South Africa (+27)</option>
//                       <option value="+47">🇳🇴 Norway (+47)</option>
//                       <option value="+46">🇸🇪 Sweden (+46)</option>
//                       <option value="+41">🇨🇭 Switzerland (+41)</option>
//                       <option value="+31">🇳🇱 Netherlands (+31)</option>
//                       <option value="+64">🇳🇿 New Zealand (+64)</option>
//                       <option value="+351">🇵🇹 Portugal (+351)</option>
//                       <option value="+65">🇸🇬 Singapore (+65)</option>
//                       <option value="+62">🇮🇩 Indonesia (+62)</option>
//                       <option value="+234">🇳🇬 Nigeria (+234)</option>
//                       <option value="+92">🇵🇰 Pakistan (+92)</option>
//                       <option value="+880">🇧🇩 Bangladesh (+880)</option>
//                       <option value="+66">🇹🇭 Thailand (+66)</option>
//                       <option value="+98">🇮🇷 Iran (+98)</option>
//                       <option value="+20">🇪🇬 Egypt (+20)</option>
//                       <option value="+94">🇱🇰 Sri Lanka (+94)</option>
//                       <option value="+212">🇲🇦 Morocco (+212)</option>
//                       <option value="+84">🇻🇳 Vietnam (+84)</option>
//                       <option value="+263">🇿🇼 Zimbabwe (+263)</option>
//                       <option value="+48">🇵🇱 Poland (+48)</option>
//                       <option value="+43">🇦🇹 Austria (+43)</option>
//                       <option value="+380">🇺🇦 Ukraine (+380)</option>
//                       <option value="+370">🇱🇹 Lithuania (+370)</option>
//                       <option value="+994">🇦🇿 Azerbaijan (+994)</option>
//                       <option value="+373">🇲🇩 Moldova (+373)</option>
//                       <option value="+230">🇲🇺 Mauritius (+230)</option>
//                       <option value="+977">🇳🇵 Nepal (+977)</option>
//                       <option value="+256">🇺🇬 Uganda (+256)</option>
//                       <option value="+503">🇸🇻 El Salvador (+503)</option>
//                       <option value="+593">🇪🇨 Ecuador (+593)</option>
//                       <option value="+57">🇨🇴 Colombia (+57)</option>
//                       <option value="+507">🇵🇦 Panama (+507)</option>
//                       <option value="+595">🇵🇾 Paraguay (+595)</option>
//                       <option value="+54">🇦🇷 Argentina (+54)</option>
//                       <option value="+52">🇲🇽 Mexico (+52)</option>
//                       <option value="+1-268">🇦🇬 Antigua & Barbuda (+1-268)</option>
//                       <option value="+1-876">🇯🇲 Jamaica (+1-876)</option>
//                       <option value="+976">🇲🇳 Mongolia (+976)</option>

//                     {/* You can keep adding more */}
//                   </select>
//                   <input
//                     type="text"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                     placeholder="234 567 890"
//                     maxLength={10}
//                     required
//                   />
//                 </div>
//               </div>
              
//             </div>

//             {/* Trip Details Section */}
//             <div>
//               <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Trip Details</h3>

//               <div className="flex flex-col md:flex-row gap-6">
//                 <div className="w-full md:w-1/2">
//                   <label className="block mb-1 font-medium text-gray-700">Departure</label>
//                   <select
//                     value={departure}
//                     onChange={(e) => setDeparture(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                     required
//                   >
//                     <option value="">-- Choose Departure --</option>
//                     {countries.map((country) =>
//                       country.cities.map((city) => (
//                         <option key={city.Id} value={city.Id}>
//                           {city.name} ({country.shortName})
//                         </option>
//                       ))
//                     )}
//                   </select>
//                 </div>

//                 <div className="w-full md:w-1/2">
//                   <label className="block mb-1 font-medium text-gray-700">Destination</label>
//                   <select
//                     value={destination}
//                     onChange={(e) => setDestination(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                     required
//                   >
//                     <option value="">-- Choose Destination --</option>
//                     {countries.map((country) =>
//                       country.cities.map((city) => (
//                         <option key={city.Id} value={city.Id}>
//                           {city.name} ({country.shortName})
//                         </option>
//                       ))
//                     )}
//                   </select>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <label className="block mb-1 font-medium text-gray-700">Trip Date</label>
//                 <input
//                   type="date"
//                   value={travellingDate}
//                   onChange={(e) => setTripDate(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                   min={minDate}
//                   required
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-3 text-lg rounded-lg hover:bg-blue-600 transition duration-300"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }
// };

// export default ExternalPage;


import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import API from "../.././constants/apiEndpoints";

interface City {
  Id: number;
  name: string;
  latitude: string;
  longitude: string;
  CountryId: number;
  StateId: number | null;
  CreatedAt: string;
  UpdatedAt: string;
}

interface Country {
  Id: number;
  name: string;
  shortName: string;
  departure?: boolean;
  destination?: boolean;
  cities: City[];
}

const ExternalPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [countriesError, setCountriesError] = useState<string | null>(null);

  // Form state
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("+971");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [travellingDate, setTripDate] = useState("");
  const [referralStatus, setReferralStatus] = useState<"active" | "inactive" | "loading" | null>("loading");
  const [message, setMessage] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const referralCode = queryParams.get("referralCode");

  // Fetch countries and cities with loading and error handling
  useEffect(() => {
    setLoadingCountries(true);
    setCountriesError(null);
    fetch(API.CITY.GET_COUNTRY_CITY)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load countries");
        return res.json();
      })
      .then((res) => {
        setCountries(res.data);
        setLoadingCountries(false);
      })
      .catch((err) => {
        setCountriesError(err.message || "Error fetching countries");
        setLoadingCountries(false);
      });
  }, []);

  // Using useRef to hold the current fetch controller for referral code
  const referralAbortController = useRef<AbortController | null>(null);

  const checkCodeStatus = async (code: string) => {
    if (referralAbortController.current) {
      referralAbortController.current.abort(); // abort previous request if any
    }
    referralAbortController.current = new AbortController();

    try {
      const res = await fetch(`${API.ADMIN.GET_REFERRAL_CODE_DETAILS}/${code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: referralAbortController.current.signal,
      });

      const result = await res.json();

      if (res.ok && result.data.Status === "active") {
        setReferralStatus("active");
        setMessage("");
      } else {
        setReferralStatus("inactive");
        showMessage(result.data.message || "This referral code is inactive.");
      }
    } catch (err: any) {
      if (err.name === "AbortError") return; // ignore abort errors
      console.error("Failed to check referral code:", err);
      setReferralStatus("inactive");
      showMessage("Error checking referral code.");
    }
  };

  useEffect(() => {
    if (referralCode) {
      setReferralStatus("loading");
      checkCodeStatus(referralCode);
    } else {
      setReferralStatus("inactive");
      showMessage("Referral code missing.");
    }
    // Cleanup abort on unmount
    return () => {
      if (referralAbortController.current) {
        referralAbortController.current.abort();
      }
    };
  }, [referralCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (departure === destination) {
      showMessage("Departure and destination cannot be the same.");
      return;
    }

    const tripDateUnix = travellingDate ? Math.floor(new Date(travellingDate).getTime() / 1000) : null;

    const data = {
      FullName,
      Email,
      Phone: phoneCode + phoneNumber,
      Type: "email",
      From_CityId: parseInt(departure),
      To_CityId: parseInt(destination),
      travellingDate: tripDateUnix,
      referralCode: referralCode,
    };

    try {
      const response = await fetch(
        API.USER.ADD_EXTERNAL_USER_WITH_REFERRAL_CODE,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        showMessage(result.message || "Submitted successfully.");
        setFullName("");
        setEmail("");
        setPhoneCode("+971");
        setPhoneNumber("");
        setDeparture("");
        setDestination("");
        setTripDate("");
        
        // Optionally clear form here
      } else {
        showMessage(result.message || "Submission failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showMessage("Something went wrong!");
    }
  };

  // Add type for message parameter
  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000); // clear message after 4 seconds
  };

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const minDate = getTodayDateString();

  // Simple phone number validation (digits only)
  const onPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setPhoneNumber(val);
    }
  };

  const getDepartureCountryId = () => {
  const depCityId = parseInt(departure); // Ensure both are same type (number)
  for (const country of countries) {
    if (country.cities.some(city => city.Id === depCityId)) {
      return country.Id;
    }
  }
  return null;
};



const departureCountryId = getDepartureCountryId();

const filteredCities = countries
  .filter(
    country =>
      country.destination !== false &&
      country.Id !== departureCountryId
  )
  .flatMap(country =>
    country.cities.map(city => ({
      ...city,
      countryShortName: country.shortName,
    }))
  );

// Sort alphabetically by city name (case-insensitive)
filteredCities.sort((a, b) =>
  a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
);

  if (referralStatus === "inactive") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="bg-[#fef2f2] text-red-700 shadow-md p-6 rounded-xl max-w-lg w-full text-center">
          {message || "This referral code is inactive."}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="bg-[#f3f5f9] shadow-2xl rounded-2xl p-10 w-full max-w-3xl relative">
        {/* Message box at the top */}
        {message && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              display: "flex",
              justifyContent: "center",
              padding: "10px 0",
              backgroundColor: "transparent",
            }}
          >
            <div
              style={{
                backgroundColor: "#def",
                padding: "10px 20px",
                borderRadius: "8px",
                maxWidth: "768px",
                margin: "0 auto",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            >
              {message}
            </div>
          </div>
        )}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Register</h2>

        {loadingCountries ? (
          <div className="text-center text-gray-600">Loading countries...</div>
        ) : countriesError ? (
          <div className="text-center text-red-600">{countriesError}</div>
        ) : (
          <form className="space-y-10" onSubmit={handleSubmit}>
            {/* User Details Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">User Details</h3>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <label htmlFor="fullName" className="block mb-1 font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={FullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="w-full md:w-1/2">
                  <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
                <div className="flex gap-4">
                  <select
                    className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={phoneCode}
                    onChange={(e) => setPhoneCode(e.target.value)}
                    required
                  >
                    <option value="+1">🇺🇸 US (+1)</option>
                      <option value="+91">🇮🇳 India (+91)</option>
                      <option value="+44">🇬🇧 UK (+44)</option>
                      <option value="+966">🇸🇦 Saudi Arabia (+966)</option>
                      <option value="+61">🇦🇺 Australia (+61)</option>
                      <option value="+81">🇯🇵 Japan (+81)</option>
                      <option value="+971">🇦🇪 UAE (+971)</option>
                      <option value="+49">🇩🇪 Germany (+49)</option>
                      <option value="+33">🇫🇷 France (+33)</option>
                      <option value="+39">🇮🇹 Italy (+39)</option>
                      <option value="+86">🇨🇳 China (+86)</option>
                      <option value="+7">🇷🇺 Russia (+7)</option>
                      <option value="+82">🇰🇷 South Korea (+82)</option>
                      <option value="+34">🇪🇸 Spain (+34)</option>
                      <option value="+90">🇹🇷 Turkey (+90)</option>
                      <option value="+55">🇧🇷 Brazil (+55)</option>
                      <option value="+27">🇿🇦 South Africa (+27)</option>
                      <option value="+47">🇳🇴 Norway (+47)</option>
                      <option value="+46">🇸🇪 Sweden (+46)</option>
                      <option value="+41">🇨🇭 Switzerland (+41)</option>
                      <option value="+31">🇳🇱 Netherlands (+31)</option>
                      <option value="+64">🇳🇿 New Zealand (+64)</option>
                      <option value="+351">🇵🇹 Portugal (+351)</option>
                      <option value="+65">🇸🇬 Singapore (+65)</option>
                      <option value="+62">🇮🇩 Indonesia (+62)</option>
                      <option value="+234">🇳🇬 Nigeria (+234)</option>
                      <option value="+92">🇵🇰 Pakistan (+92)</option>
                      <option value="+880">🇧🇩 Bangladesh (+880)</option>
                      <option value="+66">🇹🇭 Thailand (+66)</option>
                      <option value="+98">🇮🇷 Iran (+98)</option>
                      <option value="+20">🇪🇬 Egypt (+20)</option>
                      <option value="+94">🇱🇰 Sri Lanka (+94)</option>
                      <option value="+212">🇲🇦 Morocco (+212)</option>
                      <option value="+84">🇻🇳 Vietnam (+84)</option>
                      <option value="+263">🇿🇼 Zimbabwe (+263)</option>
                      <option value="+48">🇵🇱 Poland (+48)</option>
                      <option value="+43">🇦🇹 Austria (+43)</option>
                      <option value="+380">🇺🇦 Ukraine (+380)</option>
                      <option value="+370">🇱🇹 Lithuania (+370)</option>
                      <option value="+994">🇦🇿 Azerbaijan (+994)</option>
                      <option value="+373">🇲🇩 Moldova (+373)</option>
                      <option value="+230">🇲🇺 Mauritius (+230)</option>
                      <option value="+977">🇳🇵 Nepal (+977)</option>
                      <option value="+256">🇺🇬 Uganda (+256)</option>
                      <option value="+503">🇸🇻 El Salvador (+503)</option>
                      <option value="+593">🇪🇨 Ecuador (+593)</option>
                      <option value="+57">🇨🇴 Colombia (+57)</option>
                      <option value="+507">🇵🇦 Panama (+507)</option>
                      <option value="+595">🇵🇾 Paraguay (+595)</option>
                      <option value="+54">🇦🇷 Argentina (+54)</option>
                      <option value="+52">🇲🇽 Mexico (+52)</option>
                      <option value="+1-268">🇦🇬 Antigua & Barbuda (+1-268)</option>
                      <option value="+1-876">🇯🇲 Jamaica (+1-876)</option>
                      <option value="+976">🇲🇳 Mongolia (+976)</option>

                    {/* You can keep adding more */}
                  </select>
                  <input
                    type="text"
                    value={phoneNumber}
                    // onChange={(e) => setPhoneNumber(e.target.value)}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/\D/g, "");
                      setPhoneNumber(cleaned);
                    }}
                    className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Enter your number"
                    maxLength={10}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Travel Details Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Travel Details</h3>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <label htmlFor="departure" className="block mb-1 font-medium text-gray-700">
                    Departure City
                  </label>
                  <select
                    id="departure"
                    value={departure}
                    onChange={(e) => {
                      alert(e.target.value)
                      setDeparture(e.target.value)
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select Departure</option>
                    {filteredCities.map(city => (
                      <option key={city.Id} value={city.Id}>
                        {city.name} - {city.countryShortName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full md:w-1/2">
                  <label htmlFor="destination" className="block mb-1 font-medium text-gray-700">
                    Destination City
                  </label>
                  <select
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select Destination</option>
                    {filteredCities.map(city => (
                      <option key={city.Id} value={city.Id}>
                        {city.name} - {city.countryShortName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="travellingDate" className="block mb-1 font-medium text-gray-700">
                  Travelling Date
                </label>
                <input
                  id="travellingDate"
                  type="date"
                  value={travellingDate}
                  min={minDate}
                  onChange={(e) => setTripDate(e.target.value)}
                  className="w-full md:w-1/1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="mt-8 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
                disabled={referralStatus !== "active"}
              >
                {referralStatus === "loading" ? "Checking referral..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ExternalPage;
