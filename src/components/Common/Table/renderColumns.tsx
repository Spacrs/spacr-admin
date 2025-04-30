import React from "react";
import { IColumns, IAction } from "./index";
import { icons } from "../../../Icons/constant";
import KebabMenu from "./KebabMenu";
import { TbBrandAppgallery } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";

const { MdOutlineEdit, AiOutlineDelete, BsCopy, BsEye } = icons;

export const renderColumns = (
  column: IColumns,
  row: any,
  actions: IAction
): React.ReactNode => {
  const icon = {
    user: <FaRegUser className="text-gray-400 w-10 h-10" />,
    order: <TbBrandAppgallery className="text-gray-400 w-10 h-10" />,
    default: <CiImageOn className="text-gray-400 w-10 h-10" />,
  };

  switch (column.colName) {
    case "Default":
      return (
        <p className="font-medium">
          {column.name ? (row[column.name] ? row[column.name] : "-") : ""}
        </p>
      );
    case "Emogi": {
      console.log("ayaya");
      const convertEmojiCode = (emojiU: string): string => {
        if (!emojiU) return "-";
        try {
          return emojiU
            .split(" ")
            .map((code) => `&#x${code.replace("U+", "").toLowerCase()};`)
            .join(" ");
        } catch (error) {
          console.error("Error converting emoji:", error);
          return "-";
        }
      };

      const emojiU: string =
        (row[column.name as keyof typeof row] as string) || ""; // Get the emoji code from the row data
      const emoji: string = convertEmojiCode(emojiU); // Convert it to the actual emoji

      return <p className="font-medium">{emoji}</p>;
    }

    case "Actions":
      return (
        <div className="flex space-x-2 items-center">
          {actions.handleUpdate && (
            <MdOutlineEdit
              onClick={() => actions.handleUpdate?.(row)}
              className="cursor-pointer text-lg font-bold text-gray-500 hover:text-primary"
            />
          )}
          {actions.handleView && (
            <BsEye
              onClick={() => actions.handleView?.(row)}
              className="cursor-pointer text-lg font-bold text-gray-500 hover:text-primary"
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
              {row[column.name]?.charAt(0).toUpperCase() +
                row[column.name]?.slice(1)}
            </div>
          )}

          {column.name &&
            ["inactive", "Pending", "pending"].includes(row[column.name]) && (
              <div className=" bg-orange-400 text-white text-xs font-medium rounded-full p-2">
                {row[column.name]?.charAt(0).toUpperCase() +
                  row[column.name]?.slice(1)}
              </div>
            )}
          {column.name &&
            ["Rejected", "rejected"].includes(row[column.name]) && (
              <div className=" bg-red-700 text-white text-xs font-medium rounded-full p-2">
                {row[column.name]?.charAt(0).toUpperCase() +
                  row[column.name]?.slice(1)}
              </div>
            )}
          {column.name && ["none"].includes(row[column.name]) && (
            <div className=" bg-orange-400 text-white text-xs font-medium rounded-full p-2">
              {row[column.name]?.charAt(0).toUpperCase() +
                row[column.name]?.slice(1)}
            </div>
          )}
        </div>
      );
    case "Image": {
      return (
        <div className="flex items-center justify-center">
          {row[column.name!] === "" || row[column.name!] === null ? (
            icon[column.icon ? column.icon : "default"]
          ) : (
            <img
              src={row[column.name!]}
              alt={column.name}
              className="w-10 h-10 object-cover rounded-md"
            />
          )}
        </div>
      );
    }
    case "Date": {
      const formattedDate = row[column.name!]
        ? new Date(row[column.name!]).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })
        : "N/A";

      return (
        <div className="text-gray-700 text-sm font-medium">{formattedDate}</div>
      );
    }
    case "DateAndTime": {
      const formattedDate = row[column.name!]
        ? new Date(row[column.name!]).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })
        : "N/A";

      const formattedTime = row[column.name!]
        ? new Date(row[column.name!]).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : "N/A";

      return (
        <div className="text-gray-700 text-sm font-medium">
          {formattedDate} {formattedTime !== "N/A" && `at ${formattedTime}`}
        </div>
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
