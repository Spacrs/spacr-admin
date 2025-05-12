import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
function ProfileMenu({ userData }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const toggleMenu = () => setIsOpen(!isOpen);
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        // Clean up event listener when component unmounts
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);
    return (_jsxs("div", { className: "relative ml-3", ref: menuRef, children: [_jsx("div", { children: _jsxs("button", { onClick: toggleMenu, className: "flex items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800", children: [_jsx("span", { className: "sr-only", children: "Open user menu" }), _jsx("img", { className: "h-8 w-8 rounded-full", src: "https://tecdn.b-cdn.net/img/new/avatars/2.webp", alt: "User avatar" })] }) }), isOpen && (_jsxs("div", { className: "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 transition-all duration-200 ease-out", children: [_jsx(Link, { to: "/admin/profile", className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition", children: "Your Profile" }), _jsx(Link, { to: "/admin/setting", className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition", children: "Settings" }), _jsx(Link, { to: "/admin/logout", className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition", children: "Sign out" })] }))] }));
}
export default ProfileMenu;
