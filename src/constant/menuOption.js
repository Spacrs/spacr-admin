import { jsx as _jsx } from "react/jsx-runtime";
import { icons } from "../Icons/constant";
const { HiOutlineUsers, BsCreditCard2Front, TbTruckDelivery, GrSend, MdContactSupport, IoIosFlag, FaCity, CiSettings, MdProductionQuantityLimits, } = icons;
const menuItems = [
    {
        label: "Users",
        path: "/admin/users",
        icon: _jsx(HiOutlineUsers, { style: { fontSize: "20px", margin: "0 10px" } }),
    },
    {
        label: "Order List",
        path: "/admin/order-list",
        icon: _jsx(TbTruckDelivery, { style: { fontSize: "20px", margin: "0 10px" } }),
    },
    {
        label: "Suggested Product",
        path: "/admin/suggested-product-list",
        icon: (_jsx(MdProductionQuantityLimits, { style: { fontSize: "20px", margin: "0 10px" } })),
    },
    {
        label: "Payment Config",
        path: "/admin/payment-config",
        icon: _jsx(BsCreditCard2Front, { style: { fontSize: "20px", margin: "0 10px" } }),
        isSubmenu: true,
        subItems: [
            {
                label: "Country List",
                path: "/admin/payment-config",
                icon: _jsx(IoIosFlag, { style: { fontSize: "18px", margin: "0 10px" } }),
            },
            {
                label: "City List",
                path: "/admin/city-list",
                icon: _jsx(FaCity, { style: { fontSize: "20px", margin: "0 10px" } }),
            },
        ],
    },
    {
        label: "Spacr Config",
        path: "/admin/spacr-config",
        icon: _jsx(CiSettings, { style: { fontSize: "20px", margin: "0 10px" } }),
    },
    {
        label: "Notification List",
        path: "/admin/notification-list",
        icon: _jsx(GrSend, { style: { fontSize: "18px", margin: "0 10px" } }),
    },
    {
        label: "Contact Support List",
        path: "/admin/contact-support-list",
        icon: _jsx(MdContactSupport, { style: { fontSize: "20px", margin: "0 10px" } }),
    },
];
export default menuItems;
