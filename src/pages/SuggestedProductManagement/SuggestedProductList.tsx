import Table from "../../components/Common/Table";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Common/Button";
import SelectComponent from "../../components/Common/Inputes/SelectInput";

const columns = [
  { name: "ProductName", Header: "Name", colName: "Default" },
  { name: "Description", Header: "Description", colName: "Default" },
  { name: "Product URL", Header: "Product URL", colName: "Default" },
  { name: "Price", Header: "Price", colName: "Default" },
  { name: "From City", Header: "From City", colName: "Default" },
  { name: "To City", Header: "To City", colName: "Default" },
  {
    name: "action",
    Header: "Actions",
    colName: "Actions",
    Actions: ["UPDATE", "VIEW"],
  },
];

const options = [
  { value: "", label: "Select Notification Type" },
  { value: "upcoming", label: "Upcoming Notifications" },
  { value: "all", label: "All Notifications" },
];

function SuggestedProductList() {
  const notificationData: any = [];
  const isLoading = false;
  const pages = 1;
  const navigate = useNavigate();

  const onPageChange = () => {};

  const handleUpdate = () => {};
  const handleView = () => {};

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        {/* Search Bar */}

        <div className="flex flex-1 max-w-lg">
          {/* <SelectComponent
            options={options} // Now it's a valid array
            className="mr-2"
            value="one" // Provide a default value
            onChange={(e) => console.log(e.target.value)}
            name=""
          /> */}
        </div>

        {/* Verification Status Filter */}
        <div className="ml-4">
          <Button
            text="Add Product"
            className="mr-2"
            type="dark"
            onClick={() => navigate("/admin/add-suggested-product")}
          />
        </div>
      </div>
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto">
        <Table
          data={notificationData}
          columns={columns}
          loading={isLoading}
          totalPages={pages}
          currentPage={1}
          onPageChange={onPageChange}
          handleUpdate={handleUpdate}
          handleView={handleView}
          itemsPerPage={1}
        />
      </div>
    </div>
  );
}

export default SuggestedProductList;
