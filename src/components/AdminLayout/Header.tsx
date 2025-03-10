import { useEffect, useState } from "react";
import ProfileModal from "./ProfileModal";
import {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
} from "../../store/slices/userSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import logo from "../../assets/images/logo.png";
import { icons } from "../../Icons/constant";
import menuItems from "../../constant/menuOption";
import { Link } from "react-router-dom";

const { ImMenu3, RxCross1, IoIosLogOut, IoIosArrowDown, IoIosArrowUp } = icons;

interface IUserInfo {
  address: string;
  phone: string;
  website: string;
  gender: string;
  description: string;
  title: string;
}

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userPersist = JSON.parse(localStorage.getItem("user") || "{}");
  const [userData, setUserData] = useState<IUserInfo>({
    address: "",
    phone: "",
    website: "",
    gender: "",
    description: "",
    title: "",
  });
  const { data } = useGetUserInfoQuery(userPersist?.user?._id, {
    skip: !userPersist?.user?._id,
  });
  const [updateUserInfo] = useUpdateUserInfoMutation();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // New state for mobile menu

  const [activeMenu, setActiveMenu] = useState<string | null>(null); // Track active menu

  const isActive = (path: string) => location.pathname === path;

  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    if (data) {
      // dispatch(getUserInfo(data.userInfo));
      setUserData(data.userInfo);
    }
  }, [data, dispatch]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(updateUserInfo({ ...userInfo, ...userData }));
    toggleModal();
  };

  const handleMenuClick = (menu: string) => {
    // If clicking the same menu, toggle; otherwise, set a new active menu
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <header
      className="border border-b h-[70px] text-black relative"
      style={{ backgroundColor: "#131f5c" }}
    >
      <div className="w-full mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="ml-2 flex items-center">
            <img src={logo} className="h-10" alt="Logo" />
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="bg-black p-1 rounded-full text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white">
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.618V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.618c0 .386-.152.735-.405 1.012L4 17h5m2 1a2 2 0 11-4 0h4z"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* <div className="-mr-2 flex md:hidden"> */}
          <div className="mr-4 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>

              {isMenuOpen ? (
                <RxCross1 style={{ fontSize: "24px" }} />
              ) : (
                <ImMenu3 style={{ fontSize: "24px" }} />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
  <div className="md:hidden bg-white transition-all duration-300 ease-in-out absolute top-[70px] left-0 w-full z-50">
    <div className="p-4">
      {menuItems.map((item, index) =>
        item.isSubmenu ? (
          <div key={index} className="flex flex-col p-2">
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
                {activeMenu === item.label ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </button>

            <div
              className={`ml-5 flex flex-col transition-all duration-300 overflow-hidden ${
                activeMenu === item.label ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {item.subItems?.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  to={subItem.path || "#"}
                  className={`flex items-center p-2 mt-2 font-medium rounded-md transition-all duration-300 ${
                    isActive(subItem.path)
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-lightBlue hover:text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
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
            to={item.path || "#"}
            className={`flex items-center p-2 font-medium rounded-md transition-all duration-300 ${
              isActive(item.path!)
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-lightBlue hover:text-primary"
            }`}
            onClick={() => {
              setIsMenuOpen(false);
              setActiveMenu(null);
            }}
          >
            {item.icon}
            {item.label}
          </Link>
        )
      )}
    </div>
  </div>
)}


      <ProfileModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        userData={userData}
        isModalOpen={isModalOpen}
      />
    </header>
  );
}

export default Header;
