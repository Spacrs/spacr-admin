import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

type IProfileMenuProps = {
  userData: any;
};

function ProfileMenu({ userData }: IProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up event listener when component unmounts
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative ml-3" ref={menuRef}>
      {/* Profile Button */}
      <div>
        <button
          onClick={toggleMenu}
          className="flex items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
            alt="User avatar"
          />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 transition-all duration-200 ease-out">
          <Link
            to="/admin/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Your Profile
          </Link>
          <Link
            to="/admin/setting"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Settings
          </Link>
          <Link
            to="/admin/logout"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Sign out
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
