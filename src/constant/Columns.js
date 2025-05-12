const user = [
    { name: "ProfilePictureURL", Header: "Profile Image", colName: "Image" },
    { name: "FullName", Header: "Name", colName: "Default", sortable: true },
    { name: "Email", Header: "Email", colName: "Default", sortable: true },
    { name: "Type", Header: "Type", colName: "Default" },
    { name: "Status", Header: "Status", colName: "Status" },
    { name: "Verified", Header: "Verification Status", colName: "Status" },
    {
        name: "CreatedAt",
        Header: "Created At",
        colName: "DateAndTime",
        sortable: true,
    },
    { name: "UpdatedAt", Header: "Updated At", colName: "DateAndTime" },
    {
        name: "action",
        Header: "Action",
        colName: "KebabMenu",
        // @ts-ignore
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
const orderColumn = [
    { name: "image", Header: "Image", colName: "Image", icon: "order" },
    {
        name: "ProductName",
        Header: "Product Name",
        colName: "Default",
        sortable: true,
    },
    { name: "Price", Header: "Price", colName: "Default", sortable: true },
    {
        name: "DeliveryReward",
        Header: "Delivery Reward",
        colName: "Default",
        sortable: true,
    },
    { name: "Quantity", Header: "Quantity", colName: "Default", sortable: true },
    { name: "IsWithBox", Header: "Is With Box", colName: "Boolean" },
    { name: "Status", Header: "Status", colName: "Status" },
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
const productColumn = [
    { name: "image", Header: "Image", colName: "Image", icon: "order" },
    {
        name: "ProductName",
        Header: "Product Name",
        colName: "Default",
        sortable: true,
    },
    {
        name: "IsTrending",
        Header: "Is Trending",
        colName: "Boolean",
        sortable: true,
    },
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
const paymentConfig = [
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
    {
        name: "createdAt",
        Header: "Created At",
        colName: "DateAndTime",
        sortable: true,
    },
    {
        name: "updatedAt",
        Header: "Updated At",
        colName: "DateAndTime",
        sortable: true,
    },
    {
        name: "action",
        Header: "Actions",
        colName: "Actions",
        Actions: ["UPDATE"],
    },
];
const city = [
    { name: "name", Header: "Name", colName: "Default", sortable: true },
    { name: "latitude", Header: "Latitude", colName: "Default", sortable: true },
    {
        name: "longitude",
        Header: "Longitude",
        colName: "Default",
        sortable: true,
    },
    { name: "countryName", Header: "Country", colName: "Default" },
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
        Actions: ["UPDATE"],
    },
];
export const columns = {
    user: user,
    userDevices: userDevices,
    paymentConfig: paymentConfig,
    city: city,
    orderColumn: orderColumn,
    productColumn: productColumn,
};
