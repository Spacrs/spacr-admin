import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBannerWithCountriesQuery } from "../../store/slices/bannerSlice/apiSlice";

type Country = { id: number; name: string; iso2: string };
const BannerDetails = () => {
  const { bannerID } = useParams<{ bannerID: string }>();
  const navigate = useNavigate();

  const {
    data: bannerResponse,
    isLoading,
    error,
  } = useGetBannerWithCountriesQuery(bannerID!);

  if (isLoading) {
    return <p className="text-center mt-10">Loading banner details...</p>;
  }

  if (error) {
    console.error("Banner Details API Error:", error);
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load banner details. Error: {(error as any)?.status || "Unknown"}
      </p>
    );
  }

  const banner = bannerResponse?.data || bannerResponse;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Banner Details</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Banner Info */}
        <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
          <img
            src={banner?.imagepath || "/assets/no-image.png"}
            alt="Banner"
            className="w-full h-auto rounded-md mb-4 object-contain"
          />
          <div className="mb-2">
            <strong>URL:</strong>{" "}
            {banner?.url ? (
              <a
                href={banner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-words"
              >
                {banner.url}
              </a>
            ) : (
              <span className="text-gray-500">N/A</span>
            )}
          </div>
          <div>
            <strong>Is Global:</strong>{" "}
            {banner?.IsGlobal ? "Yes" : "No"}
          </div>
        </div>

        {/* Countries */}
        <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Associated Countries</h3>
          {banner?.countries && banner.countries.length > 0 ? (
            <ul className="list-disc pl-6">
              {banner.countries.map((country: Country, index: number) => (
                <li key={index} className="text-gray-700">
                    {country.name}
                </li>
              ))}

            </ul>
          ) : (
            <p className="text-gray-500">No countries associated.</p>
          )}
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BannerDetails;
