import React, { useEffect, useState } from "react";
import Button from "../../components/Common/Button";
import {
  useGetConfigFeesQuery,
  useUpdateConfigFeesApiMutation,
} from "../../store/slices/spacrConfigSlice/apiSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateSpacrConfig } from "../../store/slices/spacrConfigSlice/spacrConfigSlice";
import Loading from "../../components/Common/Loader/index";

const SpacrConfig = () => {
  const dispatch = useAppDispatch();
  const spacrConfigSlice = useAppSelector((state) => state.spacrConfigSlice);
  const [fees, setFees] = useState<number | "">(""); // Added missing state

  const { data: config, isLoading } = useGetConfigFeesQuery();
  const [updateConfigFeesApi] = useUpdateConfigFeesApiMutation();

  useEffect(() => {
    if (config?.data?.CustomFees) {
      setFees(config.data.CustomFees);
    }
  }, [config]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fees === "") return; // Prevent submitting empty value

    try {
      await updateConfigFeesApi({ CustomFees: fees }).unwrap();
      dispatch(updateSpacrConfig({ CustomFees: fees })); // Dispatch correctly
    } catch (error) {
      console.error("Failed to update fees", error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col bg-gray-50 rounded-lg">
      {isLoading ? (
        <div className="text-center text-gray-500 mt-2">
          <Loading />
        </div>
      ) : (
        <div className="w-full max-w-7xl p-6">
          {/* Page Header */}
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Spacr Configuration
          </h2>

          {/* Section Header */}
          <div className="border-b pb-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-700">
              General Settings
            </h3>
            <p className="text-sm text-gray-500">
              Manage system configurations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Config Fees Input */}
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="fees"
              >
                Fees
              </label>
              <input
                type="number"
                id="fees"
                min={0}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder="Enter Fees"
                value={fees}
                onChange={(e) => {
                  const value = e.target.value;
                  setFees(value === "" ? "" : Number(value));
                }}
                required
              />
            </div>

            <Button
              className="lg:w-1/5 sm:w-1/2 xs:w-1/2 bg-primary text-white py-3 rounded-md hover:bg-primary transition"
              text="Update"
              variant="secondary"
              onClick={handleSubmit}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default SpacrConfig;
