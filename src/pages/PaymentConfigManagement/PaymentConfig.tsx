import { useEffect, useState } from "react";
import Table from "../../components/Common/Table";
import {
  useGetPaymentConfigsQuery,
  useUpdatePaymentConfigMutation,
} from "../../store/slices/paymentConfigSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setPaymentConfigs,
  updatePaymentConfigInList,
} from "../../store/slices/paymentConfigSlice/paymentConfigSlice";
import Button from "../../components/Common/Button";
const columns = [
  { name: "shortName", Header: "Name", colName: "Default" },
  { name: "providers", Header: "Providers", colName: "Default" },
  { name: "wallet", Header: "Wallet", colName: "Boolean" },
  { name: "COD", Header: "COD", colName: "Boolean" },
  { name: "stripe", Header: "Stripe", colName: "Boolean" },
  { name: "createdAt", Header: "Created At", colName: "Date" },
  {
    name: "action",
    Header: "Actions",
    colName: "Actions",
    Actions: ["UPDATE"],
  },
];

function PaymentConfig() {
  const dispatch = useAppDispatch();
  const { paymentConfigs } = useAppSelector(
    (state) => state.paymentConfigSlice
  );
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError,refetch } = useGetPaymentConfigsQuery({
    page: currentPage,
    limit:5
  });

  const [selectedConfig, setSelectedConfig] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [updatePaymentConfig] = useUpdatePaymentConfigMutation(); // ✅ Call the hook at the top level

  useEffect(() => {
    if (data?.data) {
      dispatch(setPaymentConfigs(data.data));
    }
  }, [data, dispatch]);

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-4">
        Error loading payment config data
      </div>
    );
  }

  // Open modal and set selected row data
  const handleUpdate = (config: any) => {
    setSelectedConfig(config);
    setIsOpen(true);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSelectedConfig((prevConfig: any) => ({
      ...prevConfig,
      [name]: checked,
    }));
  };

  const handleUpdateConfig = async () => {
    try {
      const updatedConfig = await updatePaymentConfig(selectedConfig).unwrap();
      dispatch(updatePaymentConfigInList(updatedConfig.data)); // ✅ Update Redux store
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating payment config:", error);
    }
  };

  // Close modal
  const closeModal = () => {
    setIsOpen(false);
    setSelectedConfig(null);
  };

  return (
    <div className="">
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md">
        <Table
          data={paymentConfigs}
          columns={columns}
          loading={isLoading}
          totalPages={data?.pagination?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          handleUpdate={handleUpdate}
        />
      </div>

      {/* Custom Modal */}
      {isOpen && selectedConfig && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {/* Centered Title */}
            <h2 className="text-xl font-bold text-center mb-4">
              {selectedConfig.sortName}
            </h2>

            {/* Inline Labels and Checkboxes */}
            <div className="flex justify-between">
              <div className="flex flex-col items-center">
                <label className="font-medium">Wallet</label>
                <input
                  type="checkbox"
                  checked={selectedConfig.wallet}
                  onChange={handleCheckboxChange}
                  name="wallet"
                  className="h-4 w-4"
                />
              </div>
              <div className="flex flex-col items-center">
                <label className="font-medium">COD</label>
                <input
                  type="checkbox"
                  checked={selectedConfig.COD}
                  onChange={handleCheckboxChange}
                  name="COD"
                  className="h-4 w-4"
                />
              </div>
              <div className="flex flex-col items-center">
                <label className="font-medium">Stripe</label>
                <input
                  type="checkbox"
                  checked={selectedConfig.stripe}
                  onChange={handleCheckboxChange}
                  name="stripe"
                  className="h-4 w-4"
                />
              </div>
            </div>

            {/* Centered Buttons */}
            <div className="flex justify-center gap-4 mt-5">
              <Button onClick={closeModal} text="Cancel" type="lightBlue" />
              <Button
                onClick={() => handleUpdateConfig(selectedConfig)}
                text="Update"
                type="primary"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentConfig;
