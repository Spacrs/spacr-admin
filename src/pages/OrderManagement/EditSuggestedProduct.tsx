import React, { useEffect, useRef, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Common/Button";
import SelectComponent from "../../components/Common/Inputes/SelectInput";
import { useCreateProductMutation, useGetOrderDetailsQuery } from "../../store/slices/orderSlice/apiSlice";
import { useGetCountryCityQuery } from "../../store/slices/countries/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCountryCityData, selectCountryOptions, selectFromCityOptions, selectToCityOptions, setSelectedCountry } from "../../store/slices/countries/locationSlice";

type BodyPayload = {
  ProductName: string;
  Descriptions: string;
  ProductUrl: string;
  CreatedBy: string;
  From_CountryId: number;
  From_CityId: number;
  To_CountryId: number;
  To_CityId: number;
  images: any[];
  isSuggested: boolean;
  Price: number;
};

const EditSuggestedProduct: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { data: ccData, isLoading: ccLoading } = useGetCountryCityQuery();
  const { data: suggestedProduct, isLoading } = useGetOrderDetailsQuery(productId!);
  const [createProduct, { isLoading: creating }] = useCreateProductMutation();

  const countryOptions = useAppSelector(selectCountryOptions);
  const fromCityOptions = useAppSelector(selectFromCityOptions);
  const toCityOptions = useAppSelector(selectToCityOptions);

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

  // Populate cities/countries
  useEffect(() => {
    if (ccData?.data && Array.isArray(ccData?.data)) {
      dispatch(setCountryCityData(ccData?.data));
    }
  }, [ccData]);

  // Populate payload from fetched data
  useEffect(() => {
    if (suggestedProduct?.data) {
      setPayload((prev) => ({
        ...prev,
        ...suggestedProduct.data,
      }));

      dispatch(
        setSelectedCountry({
          selectedFromCountryId: suggestedProduct.data.From_CountryId,
          selectedToCountryId: suggestedProduct.data.To_CountryId,
        })
      );
    }
  }, [suggestedProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const numericValue = Number(value);

    setPayload((p) => ({
      ...p,
      [name]: name.endsWith("Id") || name === "Price" ? numericValue : value,
    }));

    if (name === "From_CountryId") {
      dispatch(setSelectedCountry({ selectedFromCountryId: numericValue }));
    } else if (name === "To_CountryId") {
      dispatch(setSelectedCountry({ selectedToCountryId: numericValue }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (payload.images.length >= 3) {
      alert("You can only upload up to 3 images.");
      return;
    }

    setPayload((prev) => ({
      ...prev,
      images: [...prev.images, file],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (key === "images") {
        (value as File[]).forEach((file) => formData.append("images", file));
      } else {
        formData.append(key, String(value));
      }
    });

    await createProduct(formData);
    navigate("/admin/suggested-product-list");
  };

  if (ccLoading || isLoading) return <p>Loading…</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Suggested Product</h1>
        <Button text="Back" variant="lightBlue" onClick={() => navigate(-1)} />
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 shadow rounded-lg space-y-6">
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

        {/* ProductUrl & Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Product URL</label>
            <input
              name="ProductUrl"
              type="text"
              value={payload.ProductUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              name="Price"
              type="number"
              value={payload.Price}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* From Country/City */}
        <div className="grid grid-cols-2 gap-4">
          <SelectComponent name="From_CountryId" label="From Country" options={countryOptions} value={payload.From_CountryId} onChange={handleChange} />
          <SelectComponent name="From_CityId" label="From City" options={fromCityOptions} value={payload.From_CityId} onChange={handleChange} />
        </div>

        {/* To Country/City */}
        <div className="grid grid-cols-2 gap-4">
          <SelectComponent name="To_CountryId" label="To Country" options={countryOptions} value={payload.To_CountryId} onChange={handleChange} />
          <SelectComponent name="To_CityId" label="To City" options={toCityOptions} value={payload.To_CityId} onChange={handleChange} />
        </div>

        {/* Toggle isSuggested */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Is Suggested?</label>
          <div
            onClick={() => setPayload((prev) => ({ ...prev, isSuggested: !prev.isSuggested }))}
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

        {/* Upload Images */}
        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="h-40 border-dashed border-2 border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-blue-500"
          >
            <LuPlus size={32} className="text-gray-400" />
          </div>
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
        </div>

        {payload.images.length > 0 && (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {payload.images.map((file, index) => (
              <div key={index} className="relative group">
                <img src={URL.createObjectURL(file)} alt={`preview-${index}`} className="w-24 h-24 object-cover rounded" />
                <button
                  type="button"
                  onClick={() =>
                    setPayload((prev) => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== index),
                    }))
                  }
                  className="absolute top-0 right-0 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit */}
        <div className="text-right">
          <Button
            text={creating ? "Submitting…" : "Submit"}
            variant="primary"
            type="submit"
            onClick={() => {}}
          />
        </div>
      </form>
    </div>
  );
};

export default EditSuggestedProduct;
