import { useState, useRef, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";

const KebabMenu = ({ row, actions }: { row: any; actions: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center" ref={menuRef}>
      <CiMenuKebab
        onClick={toggleMenu}
        className="text-lg font-bold text-gray-500 hover:text-[#3f9997] cursor-pointer"
      />
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-50">
          <ul className="py-2 text-sm text-gray-700">
            {row.Status === "active" ? (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  actions.handleToggleStatus?.(row);
                  setIsOpen(false);
                }}
              >
                Deactivate
              </li>
            ) : (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  actions.handleToggleStatus?.(row);
                  setIsOpen(false);
                }}
              >
                Activate
              </li>
            )}
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                actions.handleView?.(row);
                setIsOpen(false);
              }}
            >
              View Profile
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default KebabMenu;
