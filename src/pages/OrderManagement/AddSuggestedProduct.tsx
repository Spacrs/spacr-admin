import React, { useEffect, useRef, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Common/Button";
import SelectComponent from "../../components/Common/Inputes/SelectInput";
import { useCreateProductMutation } from "../../store/slices/orderSlice/apiSlice";
import { useGetCountryCityQuery } from "../../store/slices/countries/apiSlice";
import { useAppDispatch } from "../../store/hooks";
import { setCountryCityData } from "../../store/slices/countries/locationSlice";
import {
  selectCountryOptions,
  selectFromCityOptions,
  selectToCityOptions,
  setSelectedCountry,
} from "../../store/slices/countries/locationSlice";
import { useAppSelector } from "../../store/hooks";

type BodyPayload = {
  ProductName: string;
  Descriptions: string;
  ProductUrl: string;
  CreatedBy: string;
  From_CountryId: number;
  From_CityId: number;
  To_CountryId: number;
  To_CityId: number;
  images: { mediaId: string; url: string }[];
  isSuggested: boolean;
  Price: number;
};

const AddSuggestedProduct: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { data: ccData, isLoading: ccLoading } = useGetCountryCityQuery();
  const [createProduct, { isLoading: creating }] = useCreateProductMutation();

  const countryOptions = useAppSelector(selectCountryOptions);
  const fromCityOptions = useAppSelector(selectFromCityOptions);
  const toCityOptions = useAppSelector(selectToCityOptions);

  useEffect(() => {
    if (ccData?.data && Array.isArray(ccData?.data)) {
      dispatch(setCountryCityData(ccData?.data));
    }
  }, [ccData]);

  // return !ccData;

  const [payload, setPayload] = useState<BodyPayload>({
    ProductName: "",
    Descriptions: "",
    ProductUrl: "",
    CreatedBy: "admin",
    From_CountryId: 0,
    From_CityId: 0,
    To_CountryId: 0,
    To_CityId: 0,
    images: [],
    isSuggested: false,
    Price: 0,
  });

  // uniform change handler for both selects and text inputs
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const numericValue = Number(value);

    setPayload((p) => ({
      ...p,
      [name]: name.endsWith("Id") ? numericValue : value,
    }));

    if (name === "From_CountryId") {
      dispatch(setSelectedCountry({ selectedFromCountryId: numericValue }));
    }
    if (name === "To_CountryId") {
      dispatch(setSelectedCountry({ selectedToCountryId: numericValue }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(payload,"payload>>>>")
    await createProduct(payload).unwrap();
    navigate("/admin/suggested-product-list");
  };

  if (ccLoading) return <p>Loading countries…</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add Suggested Product</h1>
        <Button text="Back" variant="lightBlue" onClick={() => navigate(-1)} />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white p-6 shadow rounded-lg space-y-6"
      >
        {/* ProductName */}
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            name="ProductName"
            type="text"
            value={payload.ProductName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
        </div>

        {/* Descriptions */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="Descriptions"
            value={payload.Descriptions}
            onChange={handleChange}
            rows={4}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
        </div>

        {/* ProductUrl  */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Product URL</label>
            <input
              name="ProductUrl"
              type="text"
              value={payload.ProductUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          {/*  Price */}
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              name="Price"
              type="text"
              value={payload.Price}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
        </div>

        {/* From Country & City */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">From Country</label>
            <SelectComponent
              name="From_CountryId"
              options={countryOptions}
              value={payload.From_CountryId}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">From City</label>
            <SelectComponent
              name="From_CityId"
              options={fromCityOptions}
              value={payload.From_CityId}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* To Country & City */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">To Country</label>
            <SelectComponent
              name="To_CountryId"
              options={countryOptions}
              value={payload.To_CountryId}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">To City</label>
            <SelectComponent
              name="To_CityId"
              options={toCityOptions}
              value={payload.To_CityId}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Is Suggested?
          </label>

          <div
            onClick={() =>
              setPayload((prev) => ({
                ...prev,
                isSuggested: !payload.isSuggested,
              }))
            }
            className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              payload.isSuggested ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                payload.isSuggested ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        </div>

        {/* Image upload */}
        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="h-40 border-dashed border-2 border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-blue-500"
          >
            <LuPlus size={32} className="text-gray-400" />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // here you’d upload the file and push { mediaId, url } into payload.images
                console.log("Selected file:", file);
              }
            }}
          />
        </div>

        {/* Submit */}
        <div className="text-right">
          <Button
            text={creating ? "Submitting…" : "Submit"}
            variant="primary"
            type="submit"
            onClick={()=>{}}
          />
        </div>
      </form>
    </div>
  );
};

export default AddSuggestedProduct;
