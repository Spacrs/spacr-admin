import { useNavigate } from "react-router-dom";
import SelectComponent from "../../components/Common/Inputes/SelectInput";
import { useGetNotificationsQuery } from "../../store/slices/notificationSlice/apiSlice";
import { useEffect, useState } from "react";
import {
  Search,
  Table,
  Button,
} from "../../components/Common";

const columns = [
  { name: "title", Header: "Title", colName: "Default", sortable: true },
  { name: "message", Header: "Message", colName: "Default", sortable: true },
  {
    name: "scheduleDate",
    Header: "Schedule Date",
    colName: "Date",
    sortable: true,
  },
  {
    name: "scheduleTime",
    Header: "Schedule Time",
    colName: "Default",
    sortable: true,
  },
  {
    name: "notificationType",
    Header: "Type",
    colName: "Default",
    sortable: true,
  },
  { name: "status", Header: "Status", colName: "Default", sortable: true },
  {
    name: "CreatedAt",
    Header: "Created At",
    colName: "DateAndTime",
    sortable: true,
  },
  {
    name: "UpdatedAt",
    Header: "Updated At",
    colName: "DateAndTime",
    sortable: true,
  },
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

function NotificationList() {
  const navigate = useNavigate();

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationData, setNotificationData] = useState([]);
  const [filter, setFilter] = useState(""); // Search term
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const {
    data,
    isLoading: isNotificationLoading,
    isFetching,
    isError,
    refetch,
  } = useGetNotificationsQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: filter !== "" ? filter : undefined,
    sort: sortDirection,
    sortBy: sortBy,
  });

  useEffect(() => {
    refetch();
  }, [isNotificationLoading, refetch]);

  useEffect(() => {
    if (data?.data) {
      setNotificationData(data.data);
    }
  }, [data]);

  const handleUpdate = () => {};
  const handleView = () => {};

  const onSort = (colName: string, direction: "asc" | "desc") => {
    setSortBy(colName);
    setSortDirection(direction);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="">
      <div className="flex flex-col mb-4 p-4 space-y-2 bg-gray-100 shadow-md rounded-lg">
        {/* Search Bar */}
        <div className="flex flex-1 max-w-lg">
          <Search
            search={filter}
            onChange={onSearch}
            onReset={() => setFilter("")}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-1 max-w-lg">
            <SelectComponent
              options={options} // Now it's a valid array
              className="mr-2"
              value="one" // Provide a default value
              onChange={(e) => console.log(e.target.value)}
              name=""
            />
          </div>
          {/* Verification Status Filter */}
          <div className="ml-4">
            <Button
              text="Send Notification"
              className="mr-2"
              variant="primary"
              onClick={() => navigate("/admin/send-notification")}
            />

            <Button
              text="Schedule Notification"
              className="mr-2"
              variant="dark"
              onClick={() => navigate("/admin/schedule-notification")}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto">
        <Table
          data={notificationData}
          columns={columns}
          loading={isNotificationLoading || isFetching}
          totalPages={data?.pagination?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          handleUpdate={handleUpdate}
          handleView={handleView}
          itemsPerPage={1}
          onSort={onSort}
        />
      </div>
    </div>
  );
}

export default NotificationList;
