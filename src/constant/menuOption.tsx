import { icons } from "../Icons/constant";
import { MenuItemTypes } from "../types/sidebar.types";
const {
  HiOutlineUsers,
  BsCreditCard2Front,
  TbTruckDelivery,
  GrSend,
  MdContactSupport,
  IoIosFlag,
  FaCity,
  CiSettings,
  MdProductionQuantityLimits,
  FaBarcode,
  FaPlane,
  GiKnightBanner,
  GiTakeMyMoney,
  AiOutlineTransaction,
  BsCurrencyExchange

} = icons;

const menuItems: MenuItemTypes[] = [
  {
    label: "Users",
    path: "/admin/users",
    icon: <HiOutlineUsers style={{ fontSize: "20px", margin: "0 10px" }} />,
  },
  {
    label: "Order List",
    path: "/admin/order-list",
    icon: <TbTruckDelivery style={{ fontSize: "20px", margin: "0 10px" }} />,
  },
  {
    label: "Suggested Product",
    path: "/admin/suggested-product-list",
    icon: (
      <MdProductionQuantityLimits
        style={{ fontSize: "20px", margin: "0 10px" }}
      />
    ),
  },
  {
    label: "Payment Config",
    path: "/admin/payment-config",
    icon: <BsCreditCard2Front style={{ fontSize: "20px", margin: "0 10px" }} />,
    isSubmenu: true,
    subItems: [
      {
        label: "Country List",
        path: "/admin/payment-config",
        icon: <IoIosFlag style={{ fontSize: "18px", margin: "0 10px" }} />,
      },
      {
        label: "City List",
        path: "/admin/city-list",
        icon: <FaCity style={{ fontSize: "20px", margin: "0 10px" }} />,
      },
    ],
  },
  {
    label: "Spacr Config",
    path: "/admin/spacr-config",
    icon: <CiSettings style={{ fontSize: "20px", margin: "0 10px" }} />,
  },
  {
    label: "Notification List",
    path: "/admin/notification-list",
    icon: <GrSend style={{ fontSize: "18px", margin: "0 10px" }} />,
  },
  {
    label: "Marketplace List",
    path: "/admin/scrap-logo-list",
    icon: <MdContactSupport style={{ fontSize: "20px", margin: "0 10px" }} />,
  },
  {
    label: "Referral Code List",
    path: "/admin/referral-code-list",
    icon: <FaBarcode style={{ fontSize: "20px", margin: "0 10px" }} />,
  },
  {
    label: "Travel Listing",
    path: "/admin/travel-listing",
    icon: <FaPlane style={{ fontSize: "20px", margin: "0 10px" }} />,
  },
  {
    label: "Banner List",
    path: "/admin/banner-list",
    icon: <GiKnightBanner style={{ fontSize: "20px", margin: "0 10px" }} />,
  },
  {
    label: "System Fees List",
    path: "/admin/get-system-fees",
    icon: <GiTakeMyMoney style={{ fontSize: "20px", margin: "0 10px" }} />,
  },
  {
    label: "Transactions",
    path: "/admin/transaction-list",
    icon: <AiOutlineTransaction style={{ fontSize: "20px", margin: "0 10px" }} />,
  },

  {
    label: "Withdrawals",
    path: "/admin/withdrawal-list",
    icon: <BsCurrencyExchange style={{ fontSize: "20px", margin: "0 10px" }} />,
  },

  {
    label: "Contact Support List",
    path: "/admin/contact-support-list",
    icon: <MdContactSupport style={{ fontSize: "20px", margin: "0 10px" }} />,
  },
  
];

export default menuItems;
