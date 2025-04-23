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
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@material-tailwind/react";

const columns = [
  { name: "name", Header: "Name", colName: "Default", sortable: true },
  {
    name: "shortName",
    Header: "Short Name",
    colName: "Default",
    sortable: true,
  },
  { name: "wallet", Header: "Wallet", colName: "Boolean" },
  { name: "COD", Header: "COD", colName: "Boolean" },
  { name: "stripe", Header: "Stripe", colName: "Boolean" },
  { name: "createdAt", Header: "Created At", colName: "Date", sortable: true },
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
  const itemsPerPage = 5;
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const { data, isLoading, isFetching, isError } = useGetPaymentConfigsQuery({
    page: currentPage,
    limit: itemsPerPage,
    sort: sortDirection,
    sortBy: sortBy,
  });

  const [selectedConfig, setSelectedConfig] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [updatePaymentConfig] = useUpdatePaymentConfigMutation(); // ✅ Call the hook at the top level
  const navigate = useNavigate();

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

  const addPaymentConfig = () => {
    navigate("/admin/add-payment-config-country");
  };

  const AddCountry = () => {
    navigate("/admin/add-payment-config-country");
  };

  const onSort = (colName: string, direction: "asc" | "desc") => {
    setSortBy(colName);
    setSortDirection(direction);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        {/* Search Bar */}
        <div className="flex flex-1 max-w-lg"></div>

        {/* Verification Status Filter */}
        <div className="ml-4">
          <Tooltip content="Material Tailwind">
            <Button
              text="Add Country"
              className=""
              variant="lightBlue"
              onClick={AddCountry}
            />
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto">
        <Table
          data={paymentConfigs}
          columns={columns}
          loading={isLoading || isFetching}
          totalPages={data?.pagination?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          handleUpdate={handleUpdate}
          itemsPerPage={itemsPerPage}
          onSort={onSort}
        />
      </div>

      {/* Custom Modal */}
      {isOpen && selectedConfig && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {/* Centered Title */}
            <h2 className="text-xl font-bold text-center mb-4">
              {selectedConfig.shortName}
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
              <Button onClick={closeModal} text="Cancel" variant="lightBlue" />
              <Button
                onClick={handleUpdateConfig}
                text="Update"
                variant="primary"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentConfig;
