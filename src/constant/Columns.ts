const user = [
  { name: "ProfilePictureURL", Header: "Profile Image", colName: "Image" },
  { name: "FullName", Header: "Name", colName: "Default" },
  { name: "Email", Header: "Email", colName: "Default" },
  { name: "Type", Header: "Type", colName: "Default" },
  { name: "Status", Header: "Status", colName: "Status" },
  { name: "Verified", Header: "Verification Status", colName: "Status" },
  { name: "CreatedAt", Header: "CreatedAt", colName: "Date" },
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

export const columns = {
  user: user,
};
