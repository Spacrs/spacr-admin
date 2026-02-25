import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBannerWithCountriesQuery } from "../../store/slices/bannerSlice/apiSlice";
const BannerDetails = () => {
    const { bannerID } = useParams();
    const navigate = useNavigate();
    const { data: bannerResponse, isLoading, error, } = useGetBannerWithCountriesQuery(bannerID);
    if (isLoading) {
        return _jsx("p", { className: "text-center mt-10", children: "Loading banner details..." });
    }
    if (error) {
        console.error("Banner Details API Error:", error);
        return (_jsxs("p", { className: "text-center text-red-500 mt-10", children: ["Failed to load banner details. Error: ", error?.status || "Unknown"] }));
    }
    const banner = bannerResponse?.data || bannerResponse;
    return (_jsxs("div", { className: "p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-lg", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Banner Details" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "flex flex-col bg-gray-50 p-6 rounded-lg shadow-md", children: [_jsx("img", { src: banner?.imagepath || "/assets/no-image.png", alt: "Banner", className: "w-full h-auto rounded-md mb-4 object-contain" }), _jsxs("div", { className: "mb-2", children: [_jsx("strong", { children: "URL:" }), " ", banner?.url ? (_jsx("a", { href: banner.url, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 hover:underline break-words", children: banner.url })) : (_jsx("span", { className: "text-gray-500", children: "N/A" }))] }), _jsxs("div", { children: [_jsx("strong", { children: "Is Global:" }), " ", banner?.IsGlobal ? "Yes" : "No"] })] }), _jsxs("div", { className: "flex flex-col bg-gray-50 p-6 rounded-lg shadow-md", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Associated Countries" }), banner?.countries && banner.countries.length > 0 ? (_jsx("ul", { className: "list-disc pl-6", children: banner.countries.map((country, index) => (_jsx("li", { className: "text-gray-700", children: country.name }, index))) })) : (_jsx("p", { className: "text-gray-500", children: "No countries associated." }))] })] }), _jsx("div", { className: "mt-6 flex justify-end", children: _jsx("button", { onClick: () => navigate(-1), className: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition", children: "Back" }) })] }));
};
export default BannerDetails;
