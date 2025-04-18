const user = [
  { name: "ProfilePictureURL", Header: "Profile Image", colName: "Image" },
  { name: "FullName", Header: "Name", colName: "Default", sortable:true },
  { name: "Email", Header: "Email", colName: "Default", sortable:true },
  { name: "Type", Header: "Type", colName: "Default" },
  { name: "Status", Header: "Status", colName: "Status" },
  { name: "Verified", Header: "Verification Status", colName: "Status" },
  { name: "CreatedAt", Header: "CreatedAt", colName: "Date" },
  { name: "UpdatedAt", Header: "UpdatedAt", colName: "Date" },
  {
    name: "action",
    Header: "Action",
    colName: "KebabMenu",
    options: [
      { label: "Activate", value: "active", type: "toggle" },
      { label: "Deactivate", value: "inactive", type: "toggle" },
      { label: "View Profile", value: "", type: "button" },
    ],
  },
];

const userDevices = [
  { name: "DeviceName", Header: "Device Name", colName: "Default" },
  { name: "IsLoggedIn", Header: "Is LoggedIn", colName: "Boolean" },
  { name: "LoggedInAt", Header: "Last Active", colName: "Date" },
];

export const columns = {
  user: user,
  userDevices: userDevices,
};
