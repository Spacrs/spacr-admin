import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
const KebabMenu2 = ({ row, actions }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const toggleMenu = () => setIsOpen(!isOpen);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (_jsxs("div", { className: "relative flex items-center", ref: menuRef, children: [_jsx(CiMenuKebab, { onClick: toggleMenu, className: "text-lg font-bold text-gray-500 hover:text-primary cursor-pointer" }), isOpen && (_jsx("div", { className: "absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-50", children: _jsxs("ul", { className: "py-2 text-sm text-gray-700", children: [row.Status === "active" ? (_jsx("li", { className: "px-4 py-2 hover:bg-gray-100 cursor-pointer", onClick: () => {
                                actions.handleToggleStatus?.(row);
                                setIsOpen(false);
                            }, children: "Deactivate" })) : (_jsx("li", { className: "px-4 py-2 hover:bg-gray-100 cursor-pointer", onClick: () => {
                                actions.handleToggleStatus?.(row);
                                setIsOpen(false);
                            }, children: "Activate" })), _jsx("li", { className: "px-4 py-2 hover:bg-gray-100 cursor-pointer", onClick: () => {
                                actions.handleView?.(row);
                                setIsOpen(false);
                            }, children: "View" })] }) }))] }));
};
export default KebabMenu2;
