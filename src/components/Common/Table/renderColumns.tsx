import React from "react";
import { IColumns, IAction } from "./index";
import { icons } from "../../../Icons/constant";
import KebabMenu from "./KebabMenu";
import KebabMenu2 from "./KebabMenu2";
import { TbBrandAppgallery } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import ToggleSwitch from "../../../components/Common/Inputes/ToggleSwitch";

const { MdOutlineEdit, AiOutlineDelete, BsCopy, BsEye, BsToggle2Off } = icons;

export const renderColumns = (
  column: IColumns,
  row: any,
  actions: IAction,
  listType?: string
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
          
          {actions.handleUpdateNotification && listType === 'notifications' &&
            row.notificationType === 'schedule_notification' && typeof actions.handleUpdateNotification === "function" && (
              console.log("SHOWING EDIT ICON", { listType, rowType: row.type }),
              <MdOutlineEdit
                onClick={() => actions.handleUpdateNotification?.(row)}
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
          {actions.handleToggleStatus && (
            <BsToggle2Off
              onClick={() => actions.handleToggleStatus?.(row)}
              className="text-lg font-bold text-gray-500 hover:text-blue-400"
            />
          )}
          
        </div>
      );
    case "Status":
      return (
        <div className="relative flex items-center">
          {column.name &&
            [
              "active",
              "verified",
              "ACCEPTED",
              "LIVE",
              "PURCHASED",
              "COMPLETED",
              "READY_TO_RECEIVE",
              "DELIVERED"
            ].includes(row[column.name]) && (
              <div className="bg-green-500 text-white text-xs font-medium rounded-full p-2 ">
                {row[column.name]?.charAt(0).toUpperCase() +
                  row[column.name]?.slice(1).toLowerCase()}
              </div>
            )}

          {column.name &&
            ["inactive", "Pending", "pending", "IN_TRANSIT"].includes(
              row[column.name]
            ) && (
              <div className=" bg-orange-400 text-white text-xs font-medium rounded-full p-2">
                {row[column.name]?.charAt(0).toUpperCase() +
                  row[column.name]?.slice(1).toLowerCase()}
              </div>
            )}
          {column.name &&
            ["Rejected", "rejected", "CANCELLED"].includes(
              row[column.name]
            ) && (
              <div className=" bg-red-700 text-white text-xs font-medium rounded-full p-2">
                {row[column.name]?.charAt(0).toUpperCase() +
                  row[column.name]?.slice(1).toLowerCase()}
              </div>
            )}
          {column.name && ["none"].includes(row[column.name]) && (
            <div className=" bg-orange-400 text-white text-xs font-medium rounded-full p-2">
              {row[column.name]?.charAt(0).toUpperCase() +
                row[column.name]?.slice(1).toLowerCase()}
            </div>
          )}
        </div>
      );
    case "Image": {
      return (
        // <div className="flex items-center justify-center">
        <div className="flex items-left">
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
      //Added on 24-05-2025
      case "Number":
        return (
          <p className="font-medium">
            {column.name ? (row[column.name] !== undefined && row[column.name] !== null ? row[column.name] : "-") : ""}
          </p>
        );
      case "KebabMenu2":
        return <KebabMenu2 row={row} actions={actions} />;
      //Added on 24-05-2025  

      case "DateNew": {
      const formattedDate = row[column.name!]
        ? new Date(row[column.name!] * 1000).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })
        : "N/A";

      return (
        <div className="text-gray-700 text-sm font-medium">{formattedDate}</div>
      );
    }
      

    default:
      return <></>;
  }
};
