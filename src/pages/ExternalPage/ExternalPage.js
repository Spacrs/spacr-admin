import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const ExternalPage = () => {
    const [countries, setCountries] = useState([]);
    // Form state
    const [FullName, setFullName] = useState("");
    const [Email, setEmail] = useState("");
    const [phoneCode, setPhoneCode] = useState("+1");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [type, setType] = useState("");
    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [travellingDate, setTripDate] = useState("");
    const [message, setMessage] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const referralCode = queryParams.get("referralCode");
    useEffect(() => {
        fetch("https://api-v2.spa-cr.com/api/v2/country-city")
            .then((res) => res.json())
            .then((res) => setCountries(res.data));
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const tripDateUnix = travellingDate ? Math.floor(new Date(travellingDate).getTime() / 1000) : null;
        const data = {
            FullName,
            Email,
            Phone: phoneCode + "" + phoneNumber,
            Type: type,
            From_CityId: parseInt(departure),
            To_CityId: parseInt(destination),
            travellingDate: tripDateUnix,
            referralCode: referralCode,
        };
        try {
            const response = await fetch("https://api-v2.spa-cr.com/api/v2/user/add-external-user-with-referral-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                showMessage(result.message || "Submitted successfully.");
            }
            else {
                showMessage(result.message || "Submission failed.");
            }
        }
        catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong!");
        }
    };
    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 4000); // clear message after 4 seconds
    };
    return (_jsx("div", { className: "min-h-screen bg-white flex items-center justify-center px-4", children: _jsxs("div", { className: "bg-[#f3f5f9] shadow-2xl rounded-2xl p-10 w-full max-w-3xl", children: [message && (_jsx("div", { style: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        display: "flex",
                        justifyContent: "center",
                        padding: "10px 0",
                        backgroundColor: "transparent",
                    }, children: _jsx("div", { style: {
                            backgroundColor: "#def",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            maxWidth: "768px",
                            margin: "0 auto",
                            textAlign: "center",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        }, children: message }) })), _jsx("h2", { className: "text-3xl font-bold text-center text-gray-800 mb-8", children: "Register" }), _jsxs("form", { className: "space-y-10", onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold text-gray-700 mb-4 border-b pb-2", children: "User Details" }), _jsxs("div", { className: "flex flex-col md:flex-row gap-6", children: [_jsxs("div", { className: "w-full md:w-1/2", children: [_jsx("label", { className: "block mb-1 font-medium text-gray-700", children: "Full Name" }), _jsx("input", { type: "text", value: FullName, onChange: (e) => setFullName(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none", placeholder: "Your name" })] }), _jsxs("div", { className: "w-full md:w-1/2", children: [_jsx("label", { className: "block mb-1 font-medium text-gray-700", children: "Email" }), _jsx("input", { type: "email", value: Email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none", placeholder: "you@example.com" })] })] }), _jsxs("div", { className: "mt-6", children: [_jsx("label", { className: "block mb-1 font-medium text-gray-700", children: "Phone Number" }), _jsxs("div", { className: "flex gap-4", children: [_jsxs("select", { className: "w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none", value: phoneCode, onChange: (e) => setPhoneCode(e.target.value), children: [_jsx("option", { value: "+1", children: "\uD83C\uDDFA\uD83C\uDDF8 US (+1)" }), _jsx("option", { value: "+91", children: "\uD83C\uDDEE\uD83C\uDDF3 India (+91)" }), _jsx("option", { value: "+44", children: "\uD83C\uDDEC\uD83C\uDDE7 UK (+44)" }), _jsx("option", { value: "+61", children: "\uD83C\uDDE6\uD83C\uDDFA Australia (+61)" }), _jsx("option", { value: "+81", children: "\uD83C\uDDEF\uD83C\uDDF5 Japan (+81)" }), _jsx("option", { value: "+971", children: "\uD83C\uDDE6\uD83C\uDDEA UAE (+971)" }), _jsx("option", { value: "+49", children: "\uD83C\uDDE9\uD83C\uDDEA Germany (+49)" }), _jsx("option", { value: "+33", children: "\uD83C\uDDEB\uD83C\uDDF7 France (+33)" }), _jsx("option", { value: "+39", children: "\uD83C\uDDEE\uD83C\uDDF9 Italy (+39)" }), _jsx("option", { value: "+86", children: "\uD83C\uDDE8\uD83C\uDDF3 China (+86)" }), _jsx("option", { value: "+7", children: "\uD83C\uDDF7\uD83C\uDDFA Russia (+7)" }), _jsx("option", { value: "+82", children: "\uD83C\uDDF0\uD83C\uDDF7 South Korea (+82)" }), _jsx("option", { value: "+34", children: "\uD83C\uDDEA\uD83C\uDDF8 Spain (+34)" }), _jsx("option", { value: "+90", children: "\uD83C\uDDF9\uD83C\uDDF7 Turkey (+90)" }), _jsx("option", { value: "+55", children: "\uD83C\uDDE7\uD83C\uDDF7 Brazil (+55)" }), _jsx("option", { value: "+27", children: "\uD83C\uDDFF\uD83C\uDDE6 South Africa (+27)" }), _jsx("option", { value: "+47", children: "\uD83C\uDDF3\uD83C\uDDF4 Norway (+47)" }), _jsx("option", { value: "+46", children: "\uD83C\uDDF8\uD83C\uDDEA Sweden (+46)" }), _jsx("option", { value: "+41", children: "\uD83C\uDDE8\uD83C\uDDED Switzerland (+41)" }), _jsx("option", { value: "+31", children: "\uD83C\uDDF3\uD83C\uDDF1 Netherlands (+31)" }), _jsx("option", { value: "+64", children: "\uD83C\uDDF3\uD83C\uDDFF New Zealand (+64)" }), _jsx("option", { value: "+351", children: "\uD83C\uDDF5\uD83C\uDDF9 Portugal (+351)" }), _jsx("option", { value: "+65", children: "\uD83C\uDDF8\uD83C\uDDEC Singapore (+65)" }), _jsx("option", { value: "+62", children: "\uD83C\uDDEE\uD83C\uDDE9 Indonesia (+62)" }), _jsx("option", { value: "+234", children: "\uD83C\uDDF3\uD83C\uDDEC Nigeria (+234)" }), _jsx("option", { value: "+92", children: "\uD83C\uDDF5\uD83C\uDDF0 Pakistan (+92)" }), _jsx("option", { value: "+880", children: "\uD83C\uDDE7\uD83C\uDDE9 Bangladesh (+880)" }), _jsx("option", { value: "+66", children: "\uD83C\uDDF9\uD83C\uDDED Thailand (+66)" }), _jsx("option", { value: "+98", children: "\uD83C\uDDEE\uD83C\uDDF7 Iran (+98)" }), _jsx("option", { value: "+20", children: "\uD83C\uDDEA\uD83C\uDDEC Egypt (+20)" }), _jsx("option", { value: "+94", children: "\uD83C\uDDF1\uD83C\uDDF0 Sri Lanka (+94)" }), _jsx("option", { value: "+212", children: "\uD83C\uDDF2\uD83C\uDDE6 Morocco (+212)" }), _jsx("option", { value: "+84", children: "\uD83C\uDDFB\uD83C\uDDF3 Vietnam (+84)" }), _jsx("option", { value: "+263", children: "\uD83C\uDDFF\uD83C\uDDFC Zimbabwe (+263)" }), _jsx("option", { value: "+48", children: "\uD83C\uDDF5\uD83C\uDDF1 Poland (+48)" }), _jsx("option", { value: "+43", children: "\uD83C\uDDE6\uD83C\uDDF9 Austria (+43)" }), _jsx("option", { value: "+380", children: "\uD83C\uDDFA\uD83C\uDDE6 Ukraine (+380)" }), _jsx("option", { value: "+370", children: "\uD83C\uDDF1\uD83C\uDDF9 Lithuania (+370)" }), _jsx("option", { value: "+994", children: "\uD83C\uDDE6\uD83C\uDDFF Azerbaijan (+994)" }), _jsx("option", { value: "+373", children: "\uD83C\uDDF2\uD83C\uDDE9 Moldova (+373)" }), _jsx("option", { value: "+230", children: "\uD83C\uDDF2\uD83C\uDDFA Mauritius (+230)" }), _jsx("option", { value: "+977", children: "\uD83C\uDDF3\uD83C\uDDF5 Nepal (+977)" }), _jsx("option", { value: "+256", children: "\uD83C\uDDFA\uD83C\uDDEC Uganda (+256)" }), _jsx("option", { value: "+503", children: "\uD83C\uDDF8\uD83C\uDDFB El Salvador (+503)" }), _jsx("option", { value: "+593", children: "\uD83C\uDDEA\uD83C\uDDE8 Ecuador (+593)" }), _jsx("option", { value: "+57", children: "\uD83C\uDDE8\uD83C\uDDF4 Colombia (+57)" }), _jsx("option", { value: "+507", children: "\uD83C\uDDF5\uD83C\uDDE6 Panama (+507)" }), _jsx("option", { value: "+595", children: "\uD83C\uDDF5\uD83C\uDDFE Paraguay (+595)" }), _jsx("option", { value: "+54", children: "\uD83C\uDDE6\uD83C\uDDF7 Argentina (+54)" }), _jsx("option", { value: "+52", children: "\uD83C\uDDF2\uD83C\uDDFD Mexico (+52)" }), _jsx("option", { value: "+1-268", children: "\uD83C\uDDE6\uD83C\uDDEC Antigua & Barbuda (+1-268)" }), _jsx("option", { value: "+1-876", children: "\uD83C\uDDEF\uD83C\uDDF2 Jamaica (+1-876)" }), _jsx("option", { value: "+976", children: "\uD83C\uDDF2\uD83C\uDDF3 Mongolia (+976)" })] }), _jsx("input", { type: "text", value: phoneNumber, onChange: (e) => setPhoneNumber(e.target.value), className: "w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none", placeholder: "234 567 890" })] })] }), _jsxs("div", { className: "mt-6", children: [_jsx("label", { className: "block mb-1 font-medium text-gray-700", children: "Type" }), _jsxs("select", { value: type, onChange: (e) => setType(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none", children: [_jsx("option", { value: "", children: "-- Choose Type --" }), _jsx("option", { value: "google", children: "Google" }), _jsx("option", { value: "apple", children: "Apple" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold text-gray-700 mb-4 border-b pb-2", children: "Trip Details" }), _jsxs("div", { className: "flex flex-col md:flex-row gap-6", children: [_jsxs("div", { className: "w-full md:w-1/2", children: [_jsx("label", { className: "block mb-1 font-medium text-gray-700", children: "Departure" }), _jsxs("select", { value: departure, onChange: (e) => setDeparture(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none", children: [_jsx("option", { value: "", children: "-- Choose Departure --" }), countries.map((country) => country.cities.map((city) => (_jsxs("option", { value: city.Id, children: [city.name, " (", country.shortName, ")"] }, city.Id))))] })] }), _jsxs("div", { className: "w-full md:w-1/2", children: [_jsx("label", { className: "block mb-1 font-medium text-gray-700", children: "Destination" }), _jsxs("select", { value: destination, onChange: (e) => setDestination(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none", children: [_jsx("option", { value: "", children: "-- Choose Destination --" }), countries.map((country) => country.cities.map((city) => (_jsxs("option", { value: city.Id, children: [city.name, " (", country.shortName, ")"] }, city.Id))))] })] })] }), _jsxs("div", { className: "mt-6", children: [_jsx("label", { className: "block mb-1 font-medium text-gray-700", children: "Trip Date" }), _jsx("input", { type: "date", value: travellingDate, onChange: (e) => setTripDate(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" })] })] }), _jsx("button", { type: "submit", className: "w-full bg-blue-500 text-white py-3 text-lg rounded-lg hover:bg-blue-600 transition duration-300", children: "Submit" })] })] }) }));
};
export default ExternalPage;
