import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { icons } from "../../Icons/constant";
import { logout } from "../../store/slices/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import menuItems from "../../constant/menuOption";
import { selectLayout, updateLayout, } from "../../store/slices/adminLayoutSlice/adminLayoutSlice";
const { IoIosLogOut, IoIosArrowDown, IoIosArrowUp, RiExpandLeftLine } = icons;
function Sidebar() {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [activeMenu, setActiveMenu] = useState(null); // Track active menu
    const layout = useAppSelector(selectLayout);
    const { showLeftSidebar, sidebarWidth } = layout;
    const isActive = (path) => location.pathname === path;
    const handleMenuClick = (menu) => {
        // If clicking the same menu, toggle; otherwise, set a new active menu
        setActiveMenu(activeMenu === menu ? null : menu);
    };
    return (_jsx("div", { style: { width: showLeftSidebar ? sidebarWidth + "px" : "0px" }, className: "h-full flex-col bg-white text-white hidden md:flex transition-all duration-300", children: _jsxs("div", { className: "flex flex-col justify-between flex-grow p-4", children: [_jsxs("nav", { className: "flex flex-col space-y-2", children: [_jsx("div", { className: " w-full flex justify-end text-gray", children: _jsx(RiExpandLeftLine, { className: "text-primary bg-lightBlue rounded-full cursor-pointer", style: {
                                    fontSize: "12px",
                                    padding: "5px",
                                    width: "25px",
                                    height: "25px",
                                }, onClick: () => dispatch(updateLayout({ showLeftSidebar: !layout?.showLeftSidebar })) }) }), menuItems.map((item, index) => item.isSubmenu ? (_jsxs("div", { className: "flex flex-col", children: [_jsxs("button", { onClick: () => handleMenuClick(item.label), className: `flex items-center p-2 w-full font-medium rounded-md transition-all duration-300 ${activeMenu === item.label
                                        ? "bg-primary text-white"
                                        : "text-gray-600 hover:bg-lightBlue hover:text-primary"}`, children: [item.icon, item.label, _jsx("span", { className: "ml-auto", children: activeMenu === item.label ? (_jsx(IoIosArrowUp, {})) : (_jsx(IoIosArrowDown, {})) })] }), _jsx("div", { className: `ml-5 flex flex-col  transition-all duration-300 overflow-hidden ${activeMenu === item.label
                                        ? "max-h-40 opacity-100"
                                        : "max-h-0 opacity-0"}`, children: item.subItems?.map((subItem, subIndex) => (_jsxs(Link, { to: subItem.path, className: `flex items-center p-2 mt-2 font-medium rounded-md transition-all duration-300 ${isActive(subItem.path)
                                            ? "bg-primary text-white"
                                            : "text-gray-600 hover:bg-lightBlue hover:text-primary"}`, children: [subItem.icon, subItem.label] }, subIndex))) })] }, index)) : (_jsxs(Link, { to: item?.path, onClick: () => setActiveMenu(null), className: `flex items-center p-2 font-medium rounded-md transition-all duration-300 ${item.path && isActive(item.path)
                                ? "bg-primary text-white"
                                : "text-gray-600 hover:bg-lightBlue hover:text-primary"}`, children: [item.icon, item.label] }, index)))] }), _jsx("div", { className: "mt-6", children: _jsxs("button", { onClick: () => dispatch(logout()), className: "flex items-center p-2 w-full text-primary hover:bg-primary hover:text-white font-medium rounded-md transition-all duration-300", children: [_jsx(IoIosLogOut, { style: { fontSize: "20px", margin: "0 10px" } }), "Logout"] }) })] }) }));
}
export default Sidebar;
