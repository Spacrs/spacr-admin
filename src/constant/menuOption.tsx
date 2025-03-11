import { icons } from "../Icons/constant";
import { MenuItemTypes } from "../types/sidebar.types";
const {
    HiOutlineUsers,
    IoIosLogOut,
    BsCreditCard2Front,
    TbTruckDelivery,
    GrSend,
    MdOutlineScheduleSend,
    IoIosArrowDown,
    IoIosArrowUp,
    MdContactSupport,
    IoIosFlag,
    IoMdAddCircle,
    FaCity
  } = icons;

const menuItems: MenuItemTypes[] = [
    {
      label: "Users",
      path: "/admin/users",
      icon: <HiOutlineUsers style={{ fontSize: "20px", margin: "0 10px" }} />,
    },
    {
      label: "Payment Config",
      path: "/admin/payment-config",
      icon: (
        <BsCreditCard2Front style={{ fontSize: "20px", margin: "0 10px" }} />
      ),
    },
    {
      label: "Order List",
      path: "/admin/order-list",
      icon: <TbTruckDelivery style={{ fontSize: "20px", margin: "0 10px" }} />,
    },
    {
      label: "Notifications",
      isSubmenu: true,
      icon: <GrSend style={{ fontSize: "20px", margin: "0 10px" }} />,
      subItems: [
        {
          label: "Send Notification",
          path: "/admin/send-notification",
          icon: <GrSend style={{ fontSize: "18px", margin: "0 10px" }} />,
        },
        {
          label: "Schedule Notification",
          path: "/admin/schedule-notification",
          icon: (
            <MdOutlineScheduleSend
              style={{ fontSize: "18px", margin: "0 10px" }}
            />
          ),
        },
      ],
    },
    {
      label: "Contact Support List",
      path: "/admin/contact-support-list",
      icon: <MdContactSupport style={{ fontSize: "20px", margin: "0 10px" }} />,
    },
    {
      label: "Country List",
      path: "/admin/country-list",
      icon: <IoIosFlag style={{ fontSize: "20px", margin: "0 10px" }} />,
    },
    {
      label: "Add Country",
      path: "/admin/add-country",
      icon: <IoMdAddCircle style={{ fontSize: "20px", margin: "0 10px" }} />,
    },
    {
      label: "City List",
      path: "/admin/city-list",
      icon: <FaCity style={{ fontSize: "20px", margin: "0 10px" }} />,
    },
    {
      label: "Add City",
      path: "/admin/add-city",
      icon: <IoMdAddCircle style={{ fontSize: "20px", margin: "0 10px" }} />,
    }
    
  ];

  export default menuItems;