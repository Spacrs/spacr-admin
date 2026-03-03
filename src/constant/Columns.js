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
        Actions: ["UPDATE", "VIEW", "DELETE"],
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
        name: "MarketPlace.title",
        Header: "Store Name",
        colName: "Default",
        sortable: false,
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
        Actions: ["UPDATE", "DELETE"],
    },
];
const city = [
    { name: "name", Header: "Name", colName: "Default", sortable: true },
    // { name: "latitude", Header: "Latitude", colName: "Default", sortable: true },
    // {
    //   name: "longitude",
    //   Header: "Longitude",
    //   colName: "Default",
    //   sortable: true,
    // },
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
        Actions: ["UPDATE", "DELETE"],
    },
];
const scrapingIcons = [
    { name: "title", Header: "Title", colName: "Default" },
    { name: "imagepath", Header: "Image", colName: "Image" },
    { name: "url", Header: "URL", colName: "Default" },
    { name: "countryName", Header: "Country", colName: "Default" },
    {
        name: "CreatedAt",
        Header: "Created At",
        colName: "DateAndTime",
        sortable: false,
    },
    {
        name: "action",
        Header: "Actions",
        colName: "Actions",
        Actions: ["UPDATE", "DELETE"],
    },
    // {
    //   name: "action",
    //   Header: "Actions",
    //   colName: "Actions",
    //   Actions: ["UPDATE"],
    // },
];
const referralCode = [
    { name: "code", Header: "Code", colName: "Default", sortable: true },
    { name: "FullName", Header: "Full Name", colName: "Default", sortable: true },
    { name: "contactNumber", Header: "Phone", colName: "Default" },
    { name: "redeemCount", Header: "Redeem Count", colName: "Number" },
    { name: "Status", Header: "Status", colName: "Status" },
    {
        name: "CreatedAt",
        Header: "Created At",
        colName: "DateAndTime",
        sortable: true,
    },
    {
        name: "action",
        Header: "Actions",
        colName: "Actions",
        Actions: ["UPDATE", "COPY"],
    },
];
const referralCodeDetails = [
    { name: "FullName", Header: "Full Name", colName: "Default" },
    { name: "Email", Header: "Email", colName: "Default",
        //  sortable: true 
    },
    { name: "Phone", Header: "Phone", colName: "Default",
        //  sortable: true 
    },
    {
        name: "RedeemedAt",
        Header: "Redeemed At",
        colName: "Date",
        // sortable: true,
    },
];
// travelListingColumn
const travelListingColumn = [
    { name: "FromCity", Header: "From City", colName: "Default" },
    { name: "ToCity", Header: "To City", colName: "Default",
        //  sortable: true 
    },
    { name: "FromCountry", Header: "From Country", colName: "Default",
        //  sortable: true 
    },
    { name: "ToCountry", Header: "To Country", colName: "Default",
        //  sortable: true 
    },
    { name: "UserName", Header: "Created By", colName: "Default",
        //  sortable: true 
    },
    { name: "AvailableOrderCount", Header: "Order Count", colName: "Number",
        //  sortable: true 
    },
    { name: "DateTimeOfTravel", Header: "Travel Date", colName: "DateNew",
        //  sortable: true 
    },
    { name: "Status", Header: "Status", colName: "Default",
        //  sortable: true 
    },
    { name: "IsCancelled", Header: "Cancelled?", colName: "Boolean",
        //  sortable: true 
    },
    { name: "CreatedAt", Header: "Created Date", colName: "Date",
        //  sortable: true 
    },
];
const notificationListColumn = [
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
const bannerListColumn = [
    { name: "url", Header: "URL", colName: "Default" },
    { name: "imagepath", Header: "Banner", colName: "Image" },
    {
        name: "countries",
        Header: "Countries",
        colName: "Array",
    },
    { name: "IsActive", Header: "Is Active?", colName: "Boolean" },
    { name: "IsGlobal", Header: "Is Global?", colName: "Boolean" },
    {
        name: "CreatedAt",
        Header: "Created At",
        colName: "DateAndTime",
    },
    {
        name: "UpdatedAt",
        Header: "Updated At",
        colName: "DateAndTime",
    },
    {
        name: "action",
        Header: "Actions",
        colName: "Actions",
        Actions: ["VIEW", "UPDATE"],
    },
];
const systemFeesColumn = [
    { name: "BuyerProtectionFees", Header: "Buyer Protection Fees", colName: "Default" },
    // { name: "PaymentFees", Header: "Payment Fees", colName: "Default"},
    { name: "PlatformFees", Header: "Platform Fees", colName: "Default" },
    // { name: "PayoutFees", Header: "Payout Fees", colName: "Default"},
    {
        name: "CreatedAt",
        Header: "Created At",
        colName: "DateAndTime",
    },
    {
        name: "UpdatedAt",
        Header: "Updated At",
        colName: "DateAndTime",
    },
    {
        name: "action",
        Header: "Actions",
        colName: "Actions",
        Actions: ["VIEW", "UPDATE"],
    },
];
const TranssactionListColumn = [
    { name: "TransactionType", Header: "Transaction Type", colName: "Default" },
    // { name: "PaymentFees", Header: "Payment Fees", colName: "Default"},
    { name: "TransactionStatus", Header: "Transaction Status", colName: "Default" },
    // { name: "PayoutFees", Header: "Payout Fees", colName: "Default"},
    {
        name: "CreatedAt",
        Header: "Created At",
        colName: "DateAndTime",
    },
    {
        name: "UpdatedAt",
        Header: "Updated At",
        colName: "DateAndTime",
    },
    {
        name: "action",
        Header: "Actions",
        colName: "Actions",
        Actions: ["VIEW", "UPDATE"],
    },
];
const WithdrawalListColumn = [
    { name: "User.FullName", Header: "User", colName: "Default" },
    { name: "User.Phone", Header: "Phone", colName: "Default" },
    { name: "User.Email", Header: "Email", colName: "Default" },
    // { name: "PaymentFees", Header: "Payment Fees", colName: "Default"},
    { name: "Amount", Header: "Amount", colName: "Default" },
    { name: "Status", Header: "Status", colName: "PaymentStatus" },
    {
        name: "CreatedAt",
        Header: "Created At",
        colName: "DateAndTime",
    },
    {
        name: "action",
        Header: "Actions",
        colName: "Actions",
        Actions: ["VIEW", "UPDATE"],
    },
];
export const columns = {
    user: user,
    userDevices: userDevices,
    paymentConfig: paymentConfig,
    city: city,
    orderColumn: orderColumn,
    productColumn: productColumn,
    scrapingIconsColumn: scrapingIcons,
    referralCodeColumn: referralCode,
    referralCodeDetails: referralCodeDetails,
    travelListingColumn: travelListingColumn,
    notificationListColumn: notificationListColumn,
    bannerListColumn: bannerListColumn,
    systemFees: systemFeesColumn,
    transaction: TranssactionListColumn,
    withdrawal: WithdrawalListColumn
};
