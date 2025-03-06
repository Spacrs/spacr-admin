import React from "react";
import { IColumns, IAction } from "./index";
import { icons } from "../../../Icons/constant";
import KebabMenu from "./KebabMenu";

const {
  MdOutlineEdit,
  AiOutlineDelete,
  BsCopy,
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
        <p className="font-medium">{column.name ? row[column.name] : ""}</p>
      );
    case "Actions":
      return (
        <div className="flex space-x-2 items-center">
          {actions.handleUpdate && (
            <MdOutlineEdit
              onClick={() => actions.handleUpdate?.(row)}
              className="cursor-pointer text-lg font-bold text-gray-500 hover:text-[#3f9997]"
            />
          )}
          {actions.handleView && (
            <BsEye
              onClick={() => actions.handleView?.(row)}
              className="cursor-pointer text-lg font-bold text-gray-500 hover:text-[#3f9997]"
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
            <div className="bg-green-500 text-white text-xs font-medium rounded-full p-2">
              {row[column.name]?.charAt(0).toUpperCase() + row[column.name]?.slice(1)}
            </div>
          )}

          {column.name &&
            ["inactive", "Pending","pending"].includes(row[column.name]) && (
              <div className=" bg-orange-400 text-white text-xs font-medium rounded-full p-2">
                {row[column.name]?.charAt(0).toUpperCase() + row[column.name]?.slice(1)}
              </div>
            )}
            {column.name &&
            ["Rejected","rejected"].includes(row[column.name]) && (
              <div className=" bg-red-700 text-white text-xs font-medium rounded-full p-2">
                {row[column.name]?.charAt(0).toUpperCase() + row[column.name]?.slice(1)}
              </div>
            )}
          {column.name && ["none"].includes(row[column.name]) && (
            <div className=" bg-orange-400 text-white text-xs font-medium rounded-full p-2">
              {row[column.name]?.charAt(0).toUpperCase() + row[column.name]?.slice(1)}
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
    case "KebabMenu":
      return <KebabMenu row={row} actions={actions} />;
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
