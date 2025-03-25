import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { icons } from "../../Icons/constant";
import { logout } from "../../store/slices/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import menuItems from "../../constant/menuOption";
import {
  selectLayout,
  updateLayout,
} from "../../store/slices/adminLayoutSlice/adminLayoutSlice";

const { IoIosLogOut, IoIosArrowDown, IoIosArrowUp, RiExpandLeftLine } = icons;

function Sidebar() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [activeMenu, setActiveMenu] = useState<string | null>(null); // Track active menu
  const layout = useAppSelector(selectLayout);
  const { showLeftSidebar, sidebarWidth } = layout;

  const isActive = (path: string) => location.pathname === path;

  const handleMenuClick = (menu: string) => {
    // If clicking the same menu, toggle; otherwise, set a new active menu
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div
      style={{ width: showLeftSidebar ? sidebarWidth + "px" : "0px" }}
      className="h-full flex-col bg-white text-white hidden md:flex transition-all duration-300"
    >
      <div className="flex flex-col justify-between flex-grow p-4">
        <nav className="flex flex-col space-y-2">
          <div className=" w-full flex justify-end text-gray">
            <RiExpandLeftLine
              className="text-primary bg-lightBlue rounded-full cursor-pointer"
              style={{
                fontSize: "12px",
                padding: "5px",
                width: "25px",
                height: "25px",
              }}
              onClick={() =>
                dispatch(
                  updateLayout({ showLeftSidebar: !layout?.showLeftSidebar })
                )
              }
            />
          </div>
          {menuItems.map((item, index) =>
            item.isSubmenu ? (
              <div key={index} className="flex flex-col">
                <button
                  onClick={() => handleMenuClick(item.label)}
                  className={`flex items-center p-2 w-full font-medium rounded-md transition-all duration-300 ${
                    activeMenu === item.label
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-lightBlue hover:text-primary"
                  }`}
                >
                  {item.icon}
                  {item.label}
                  <span className="ml-auto">
                    {activeMenu === item.label ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </span>
                </button>
                <div
                  className={`ml-5 flex flex-col  transition-all duration-300 overflow-hidden ${
                    activeMenu === item.label
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {item.subItems?.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.path}
                      className={`flex items-center p-2 mt-2 font-medium rounded-md transition-all duration-300 ${
                        isActive(subItem.path)
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:bg-lightBlue hover:text-primary"
                      }`}
                    >
                      {subItem.icon}
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={index}
                to={item?.path!}
                onClick={() => setActiveMenu(null)} // Close submenu when clicking another menu item
                className={`flex items-center p-2 font-medium rounded-md transition-all duration-300 ${
                  item.path && isActive(item.path)
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-lightBlue hover:text-primary"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="mt-6">
          <button
            onClick={() => dispatch(logout())}
            className="flex items-center p-2 w-full text-primary hover:bg-primary hover:text-white font-medium rounded-md transition-all duration-300"
          >
            <IoIosLogOut style={{ fontSize: "20px", margin: "0 10px" }} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
