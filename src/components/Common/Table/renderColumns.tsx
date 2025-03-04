import React from "react";
import { useState, useRef, useEffect } from "react";
import { IColumns, IAction } from "./index";
import { icons } from "../../../Icons/constant";

const {
  MdOutlineEdit,
  AiOutlineDelete,
  BsCopy,

  CiMenuKebab,
  BsEye
} = icons;

export const renderColumns = (
  column: IColumns,
  row: any,
  actions: IAction
): React.ReactNode => {
  switch (column.colName) {
    case "Default":
      return (
        <p className="font-medium">
          {typeof row[column.name] === "boolean"
            ? row[column.name]
              ? "Yes"
              : "No"
            : row[column.name] || ""}
        </p>
      );

    case "Default":
      return (
        <p className="font-medium">{column.name ? row[column.name] : ""}</p>
      );
    case "Actions":
      return (
        <div className="flex space-x-2 items-center">
          {actions.handleUpdate && (
            <MdOutlineEdit
              onClick={() => actions.handleUpdate?.(row)}
              className="text-lg font-bold text-gray-500 hover:text-[#3f9997]"
            />
          )}
          {actions.handleView && (
            <BsEye
              onClick={() => actions.handleView?.(row)}
              className="text-lg font-bold text-gray-500 hover:text-[#3f9997]"
            />
          )}
          {actions.handleDelete && (
            <AiOutlineDelete
              onClick={() => actions.handleDelete?.(row)}
              className="text-lg font-bold text-gray-500 hover:text-red-400"
            />
          )}
          {actions.handleClone && (
            <BsCopy
              onClick={() => actions.handleClone?.(row)}
              className="text-lg font-bold text-gray-500 hover:text-blue-400"
            />
          )}
        </div>
      );
    case "Status":
      return (
        <div className="relative flex items-center">
          {column.name && ["active", "verified"].includes(row[column.name]) && (
            <div className=" bg-green-500 text-white text-xs font-medium rounded-full p-2">
              {row[column.name]}
            </div>
          )}
          {column.name &&
            ["inactive", "Pending","pending"].includes(row[column.name]) && (
              <div className=" bg-orange-400 text-white text-xs font-medium rounded-full p-2">
                {row[column.name]}
              </div>
            )}
          {column.name && ["none"].includes(row[column.name]) && (
            <div className=" bg-orange-400 text-white text-xs font-medium rounded-full p-2">
              {row[column.name]}
            </div>
          )}
        </div>
      );
    case "Image":
      return (
        <div>
          <img src={row[column.name]} alt={column.name} className="w-10 h" />
        </div>
      );
    case "Date": {
      const formattedDate = row[column.name]
        ? new Date(row[column.name]).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })
        : "N/A";

      return (
        <div className="text-gray-700 text-sm font-medium">{formattedDate}</div>
      );
    }
    case "KebabMenu": {
      const [isOpen, setIsOpen] = useState(false);
      const menuRef = useRef(null);

      const toggleMenu = () => setIsOpen(!isOpen);

      // Close menu when clicking outside
      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }, []);

      // Determine the correct toggle option based on user status
      const statusOption =
        row.Status === "active"
          ? { label: "Deactivate", value: "inactive", type: "toggle" }
          : { label: "Activate", value: "active", type: "toggle" };

      return (
        <div className="relative flex items-center" ref={menuRef}>
          <CiMenuKebab
            onClick={toggleMenu}
            className="text-lg font-bold text-gray-500 hover:text-[#3f9997] cursor-pointer"
          />
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-50">
              <ul className="py-2 text-sm text-gray-700">
                {/* Activate / Deactivate */}
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    actions.handleToggleStatus?.(row, statusOption.value);
                    setIsOpen(false);
                  }}
                >
                  {statusOption.label}
                </li>
                {/* View Profile */}
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
    }
    case "Boolean":
      return (
        <div className="relative flex items-center">
          {column.name && row[column.name] === true && (
            <div className="bg-green-500 text-white text-xs font-medium rounded-full px-3 py-1">
              Yes
            </div>
          )}
          {column.name && row[column.name] === false && (
            <div className="bg-red-500 text-white text-xs font-medium rounded-full px-3 py-1">
              No
            </div>
          )}
        </div>
      );

    default:
      return <></>;
  }
};
