import React, { useEffect, useRef, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Common/Button";
import SelectComponent from "../../components/Common/Inputes/SelectInput";
import {
  useCreateProductMutation,
  useGetOrderDetailsQuery,
  useUpdateProductMutation,
  useDeleteOrderMediaMutation,
} from "../../store/slices/orderSlice/apiSlice";
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
import Loading from "../../components/Common/Loader";
import {
  selectIsEditProduct,
  setIsEdit,
  updateProductList,
} from "../../store/slices/orderSlice/orderSlice";
import { useSelector } from "react-redux";
import { Media } from "../../types/ProductData.types";
import ImageGallery from "../../components/Common/ImageGallery/Index";
import InputComponent from "../../components/Common/Inputes";
import ToggleSwitch from "../../components/Common/Inputes/ToggleSwitch";

type BodyPayload = {
  ProductName: string;
  Descriptions: string;
  ProductUrl: string;
  CreatedBy: string;
  From_CountryId: number;
  From_CityId: number;
  To_CountryId: number;
  To_CityId: number;
  // images: { mediaId: string; url: string }[];
  images: any[];
  IsTrending: boolean;
  Price: number | string;
};

const AddSuggestedProduct: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const isEditProduct = useSelector(selectIsEditProduct);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const { data: ccData, isLoading: ccLoading } = useGetCountryCityQuery();
  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { data: suggestedProduct, refetch: refetchGetOrder } =
    useGetOrderDetailsQuery(productId!);
  const [deleteOrderMedia] = useDeleteOrderMediaMutation();

  const countryOptions = useAppSelector(selectCountryOptions);
  const fromCityOptions = useAppSelector(selectFromCityOptions);
  const toCityOptions = useAppSelector(selectToCityOptions);

  useEffect(() => {
    if (ccData?.data && Array.isArray(ccData?.data)) {
      dispatch(setCountryCityData(ccData?.data));
    }
  }, [ccData]);

  useEffect(() => {
    if (productId) {
      dispatch(setIsEdit({ isEditProduct: true }));
    }
    return () => {
      dispatch(setIsEdit({ isEditProduct: false }));
    };
  }, [productId]);

  // Populate payload from fetched data
  useEffect(() => {
    if (suggestedProduct?.data) {
      setPayload((prev) => ({
        ...prev,
        ProductName: suggestedProduct?.data?.ProductName,
        Descriptions: suggestedProduct?.data?.Descriptions,
        ProductUrl: suggestedProduct?.data?.ProductUrl,
        From_CountryId: suggestedProduct?.data?.From_CountryId,
        From_CityId: suggestedProduct?.data?.From_CityId,
        To_CountryId: suggestedProduct?.data?.To_CountryId,
        To_CityId: suggestedProduct?.data?.To_CityId,
        IsTrending: suggestedProduct?.data?.IsTrending,
        images: [],
        Price: suggestedProduct?.data?.Price,
      }));

      if (suggestedProduct?.data?.medias?.length > 0) {
        // Set pre-filled image URLs
        const urls = suggestedProduct?.data?.medias.map(
          (img: Media) => img.url
        ); // or whatever the image field is
        setPreviewImages(urls);
      }

      dispatch(
        setSelectedCountry({
          selectedFromCountryId: suggestedProduct.data.From_CountryId,
          selectedToCountryId: suggestedProduct.data.To_CountryId,
        })
      );
    }
  }, [suggestedProduct]);

  useEffect(() => {
    if (productId) {
      refetchGetOrder(); // Refetch the order details
    }
    return () => {
      setPayload({
        ProductName: "",
        Descriptions: "",
        ProductUrl: "",
        CreatedBy: "admin",
        From_CountryId: 0,
        From_CityId: 0,
        To_CountryId: 0,
        To_CityId: 0,
        images: [],
        IsTrending: false,
        Price: 0.0,
      });
    };
  }, [productId]);

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
    IsTrending: false,
    Price: 0.0,
  });

  // uniform change handler for both selects and text inputs
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const numericValue = Number(value);

    if (name === "Price") {
      // Allow only valid numbers or an empty string
      if (/^\d*\.?\d*$/.test(value)) {
        setPayload((p) => ({
          ...p,
          Price: value === "" ? "" : parseFloat(value),
        }));
      }
      return;
    } else {
      setPayload((p) => ({
        ...p,
        [name]: name.endsWith("Id") ? numericValue : value,
      }));
    }

    if (name === "From_CountryId") {
      dispatch(setSelectedCountry({ selectedFromCountryId: numericValue }));
    }
    if (name === "To_CountryId") {
      dispatch(setSelectedCountry({ selectedToCountryId: numericValue }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (payload.Price === 0) {
      // Check if price is 0 and not empty
      alert("Price cannot be 0.");
      return;
    }

    if (
      payload.To_CityId === 0 ||
      payload.From_CityId === 0 ||
      payload.To_CountryId === 0 ||
      payload.From_CountryId === 0
    ) {
      // Check if any of the city or country IDs are 0
      alert("Please select valid countries and cities.");
      return;
    }

    if (!isEditProduct && payload.images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      if (key === "images") {
        (payload.images as File[]).forEach((file) => {
          formData.append("images", file);
        });
      } else {
        const value = payload[key as keyof typeof payload];
        if (key === "Price") {
          formData.append("Price", parseFloat(value as string).toFixed(2));
        } else {
          formData.append(key, value as string);
        }
      }
    });

    if (isEditProduct) {
      productId && formData.append("OrderID", productId);
      const updatedData = await updateProduct(formData);
      dispatch(updateProductList(updatedData.data.data));
      refetchGetOrder();
    } else {
      await createProduct(formData);
      refetchGetOrder();
    }

    navigate("/admin/suggested-product-list");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const totalImages = payload.images.length + previewImages.length;

    if (totalImages >= 3) {
      alert("You can only upload up to 3 images.");
      return;
    }

    setPayload((prev) => ({
      ...prev,
      images: [...prev.images, file], // directly storing File
    }));
    e.target.value = "";
  };

  const handleRemoveImage = (index: number, isPreview: boolean = false) => {
    if (isPreview) {
      const mediaId = suggestedProduct?.data?.medias[index]?.mediaId; // Assuming `mediaId` is part of the `medias` array
      const orderID = productId;
      if (mediaId && orderID) {
        // Call deleteOrderMedia mutation
        deleteOrderMedia({ orderID, mediaId })
          .unwrap()
          .then(() => {
            // Remove the image from the previewImages array
            setPreviewImages((prev) => prev.filter((_, i) => i !== index));
          })
          .catch((error:any) => {
            console.error("Failed to delete image:", error);
            alert("Failed to delete the image. Please try again.");
          });
      } else {
        alert("Unable to delete the image. Missing order ID or media ID.");
      }
    } else {
      setPayload((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-end items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        <div className="ml-4 flex justify-end items-center ">
          <Button
            text="Back"
            variant="lightBlue"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
      <div className="p-8 bg-gray-50 shadow-md rounded-lg">
        {ccLoading && <Loading />}
        {/* Form */}
        {!ccLoading && (
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-white p-6 shadow rounded-lg space-y-6"
          >
            {/* ProductName */}
            <InputComponent
              type="text"
              name="ProductName"
              label="Product Name"
              value={payload.ProductName}
              onChange={handleChange}
              required={true}
            />
            {/* Descriptions */}
            <div>
              <InputComponent
                label="Description"
                name="Descriptions"
                value={payload.Descriptions}
                onChange={handleChange}
                type="textarea"
                required={true}
              />
            </div>

            {/* ProductUrl  */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <InputComponent
                  type="text"
                  name="ProductUrl"
                  label="Product URL"
                  value={payload.ProductUrl}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              {/*  Price */}
              <div>
                <InputComponent
                  label="Price"
                  name="Price"
                  type="number"
                  value={payload.Price}
                  onChange={handleChange}
                  required={true}
                />
              </div>
            </div>

            {/* From Country & City */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">From Country</label>
                <SelectComponent
                  name="From_CountryId"
                  options={[
                    { label: "Select from country", value: 0 },
                    ...countryOptions,
                  ]}
                  value={payload.From_CountryId}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">From City</label>
                <SelectComponent
                  name="From_CityId"
                  options={[
                    { label: "Select from city", value: 0 },
                    ...fromCityOptions,
                  ]}
                  value={payload.From_CityId}
                  onChange={handleChange}
                  required={true}
                />
              </div>
            </div>

            {/* To Country & City */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">To Country</label>
                <SelectComponent
                  name="To_CountryId"
                  options={[
                    { label: "Select to country", value: 0 },
                    ...countryOptions,
                  ]}
                  value={payload.To_CountryId}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">To City</label>
                <SelectComponent
                  name="To_CityId"
                  options={[
                    { label: "Select to city", value: 0 },
                    ...toCityOptions,
                  ]}
                  value={payload.To_CityId}
                  onChange={handleChange}
                  required={true}
                />
              </div>
            </div>

            <div className="mb-4">
              <ToggleSwitch
                label="Is Suggested?"
                isChecked={payload.IsTrending}
                onToggle={() =>
                  setPayload((prev) => ({
                    ...prev,
                    IsTrending: !payload.IsTrending,
                  }))
                }
              />
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
                onChange={handleFileChange}
              />
            </div>

            <ImageGallery
              images={payload.images}
              previewImages={previewImages}
              onRemoveImage={handleRemoveImage}
            />

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
        )}
      </div>
    </div>
  );
};

export default AddSuggestedProduct;
