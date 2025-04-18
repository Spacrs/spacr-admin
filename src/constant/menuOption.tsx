import { icons } from "../Icons/constant";
import { MenuItemTypes } from "../types/sidebar.types";
const {
   HiOutlineUsers,
    BsCreditCard2Front,
    TbTruckDelivery,
    GrSend,
    MdOutlineScheduleSend,
    IoIosArrowDown,
    IoIosArrowUp,
    MdContactSupport,
    IoIosFlag,
    IoMdAddCircle,
    FaCity,
    CiSettings,
    MdProductionQuantityLimits
} = icons;

const menuItems: MenuItemTypes[] = [
  {
    label: "Users",
    path: "/admin/users",
    icon: <HiOutlineUsers style={{ fontSize: "20px", margin: "0 10px" }} />,
  },
  {
    label: "Product List",
    path: "/admin/product-list",
    icon: <TbTruckDelivery style={{ fontSize: "20px", margin: "0 10px" }} />,
  },
  {
    label: "Order List",
    path: "/admin/order-list",
    icon: <TbTruckDelivery style={{ fontSize: "20px", margin: "0 10px" }} />,
  },
  {
    label: "Suggested Product",
    path: "/admin/suggested-product-list",
    icon: <MdProductionQuantityLimits style={{ fontSize: "20px", margin: "0 10px" }} />,
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
  // {
  //   label: "Notifications",
  //   isSubmenu: true,
  //   icon: <GrSend style={{ fontSize: "20px", margin: "0 10px" }} />,
  //   subItems: [
  //     {
  //       label: "Notification List",
  //       path: "/admin/notification-list",
  //       icon: <GrSend style={{ fontSize: "18px", margin: "0 10px" }} />,
  //     },
  //     {
  //       label: "Send Notification",
  //       path: "/admin/send-notification",
  //       icon: <GrSend style={{ fontSize: "18px", margin: "0 10px" }} />,
  //     },
  //     {
  //       label: "Schedule Notification",
  //       path: "/admin/schedule-notification",
  //       icon: (
  //         <MdOutlineScheduleSend
  //           style={{ fontSize: "18px", margin: "0 10px" }}
  //         />
  //       ),
  //     },
  //   ],
  // },
  {
    label: "Notification List",
    path: "/admin/notification-list",
    icon: <GrSend style={{ fontSize: "18px", margin: "0 10px" }} />,
  },
  {
    label: "Contact Support List",
    path: "/admin/contact-support-list",
    icon: <MdContactSupport style={{ fontSize: "20px", margin: "0 10px" }} />,
  },
];

export default menuItems;
