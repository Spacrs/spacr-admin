import { useState } from "react";
import Loading from "../Loader/index";
import Pagination from "./Pagination";
import { renderColumns } from "./renderColumns"; // Adjust the path as necessary

export interface IAction {
  handleDelete?: (row: any) => void;
  handleUpdate?: (row: any) => void;
  handleClone?: (row: any) => void;
  handleToggleStatus?: (row: any) => void;
  handleView?: (row: any) => void;
  handleUpdateNotification?: (row: any) => void
}

export interface IColumns {
  name?: string;
  Header: string;
  Actions?: string[];
  colName: string;
  sortable?: boolean;
  icon?: "user" | "order" | "default";
}

interface ITableProps {
  data: any[];
  columns: IColumns[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  handleDelete?: (row: any) => void;
  handleUpdate?: (row: any) => void;
  handleClone?: (row: any) => void;
  handleToggleStatus?: (row: any) => void;
  handleView?: (row: any) => void;
  onSort?: (colName: string, direction: "asc" | "desc") => void;
  listType?: string;
  handleUpdateNotification?: (row: any) => void;
}

function Table({
  data,
  columns,
  loading,
  totalPages,
  currentPage,
  itemsPerPage = 10,
  onPageChange,
  handleClone,
  handleDelete,
  handleUpdate,
  handleUpdateNotification,
  handleToggleStatus,
  handleView,
  onSort,
  listType
}: ITableProps) {
  const actions: IAction = {
    handleDelete,
    handleUpdate,
    handleUpdateNotification,
    handleClone,
    handleToggleStatus,
    handleView,
  };
  const [sortConfig, setSortConfig] = useState<{
    colName: string;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSortClick = (colName: string) => {
    let direction: "asc" | "desc" = "asc";

    if (sortConfig?.colName === colName && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ colName, direction });
    onSort?.(colName, direction);
  };

  return (
    <>
      <div className="flex flex-col overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-scroll border border-gray-200 rounded-lg">
            <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
              <thead className="bg-primary text-white text-xs font-semibold tracking-wider">
                <tr>
                  {/* Add SNo column */}
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    SNo
                  </th>

                  {columns.map((column: IColumns, key: number) => (
                    <th
                      key={key}
                      scope="col"
                      className="px-6 py-4 whitespace-nowrap cursor-pointer select-none"
                      onClick={() =>
                        column.sortable &&
                        column.name &&
                        handleSortClick(column.name)
                      }
                    >
                      <div className="flex items-center gap-1">
                        {column.Header}
                        {column.sortable && (
                          <span className="text-white">
                            {sortConfig?.colName === column.name
                              ? sortConfig?.direction === "asc"
                                ? "▲"
                                : "▼"
                              : "↕"}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {loading && (
                  <tr>
                    <td colSpan={columns.length + 1} className="px-6 py-4">
                      <Loading />
                    </td>
                  </tr>
                )}
                {!loading && data.length > 0
                  // ? data.map((row: any, key: number) => (
                    
                  //     <tr
                  //       key={key}
                  //       className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-200"
                  //     >
                  //       {/* Calculate and display SNo */}
                  //       <td className="px-6 py-4 whitespace-nowrap">
                  //         {(currentPage - 1) * itemsPerPage + key + 1}
                  //       </td>

                  //       {columns.map((column: IColumns, colKey: number) => (
                  //         <td
                  //           key={colKey}
                  //           className="px-6 py-4 whitespace-nowrap"
                  //         >
                  //           {renderColumns(column, row, actions)}
                  //         </td>
                  //       ))}
                  //     </tr>
                  //   ))

                  ? data.map((row: any, key: number) => {
                        console.log("Debug row:", {
                          listType,
                          rowType: row.notificationType,
                          hasUpdate: typeof actions.handleUpdateNotification === "function",
                        });

                        return (
                          <tr
                            key={key}
                            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-200"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              {(currentPage - 1) * itemsPerPage + key + 1}
                            </td>
                            {columns.map((column: IColumns, colKey: number) => (
                              <td key={colKey} className="px-6 py-4 whitespace-nowrap">
                                {renderColumns(column, row, actions, listType)}
                              </td>
                            ))}
                          </tr>
                        );
                    })

                  : !loading && (
                      <tr>
                        <td
                          colSpan={columns.length + 1}
                          className="px-6 py-4 text-center"
                        >
                          No data available
                        </td>
                      </tr>
                    )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      /> */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}

export default Table;

// import { useEffect, useState } from "react";
// import Loading from "../Loader/index";
// import Pagination from "./Pagination";
// import { renderColumns } from "./renderColumns";

// export interface IAction {
//   handleDelete?: (row: any) => void;
//   handleUpdate?: (row: any) => void;
//   handleClone?: (row: any) => void;
//   handleToggleStatus?: (row: any) => void;
//   handleView?: (row: any) => void;
// }

// export interface IColumns {
//   name?: string;
//   Header: string;
//   Actions?: string[];
//   colName: string;
//   sortable?: boolean;
//   icon?: "user" | "order" | "default";
// }

// interface ITableProps {
//   data: any[];
//   columns: IColumns[];
//   loading: boolean;
//   totalPages: number;
//   currentPage: number;
//   itemsPerPage?: number;
//   onPageChange: (page: number) => void;
//   handleDelete?: (row: any) => void;
//   handleUpdate?: (row: any) => void;
//   handleClone?: (row: any) => void;
//   handleToggleStatus?: (row: any) => void;
//   handleView?: (row: any) => void;
//   onSort?: (colName: string, direction: "asc" | "desc") => void;
//   onDragEnd?: (items: any[]) => void;
// }

// function Table({
//   data,
//   columns,
//   loading,
//   totalPages,
//   currentPage,
//   itemsPerPage = 10,
//   onPageChange,
//   handleClone,
//   handleDelete,
//   handleUpdate,
//   handleToggleStatus,
//   handleView,
//   onSort,
//   onDragEnd,
// }: ITableProps) {
//   const [items, setItems] = useState(data);
//   const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
//   const [sortConfig, setSortConfig] = useState<{
//     colName: string;
//     direction: "asc" | "desc";
//   } | null>(null);

//   const actions: IAction = {
//     handleDelete,
//     handleUpdate,
//     handleClone,
//     handleToggleStatus,
//     handleView,
//   };

//   useEffect(() => {
//     setItems(data);
//   }, [data]);

//   const handleSortClick = (colName: string) => {
//     let direction: "asc" | "desc" = "asc";
//     if (sortConfig?.colName === colName && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ colName, direction });
//     onSort?.(colName, direction);
//   };

//   const handleDragStart = (index: number) => {
//     setDraggedIndex(index);
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
//     e.preventDefault();
//   };

//   const handleDrop = (index: number) => {
//     if (draggedIndex === null || draggedIndex === index) return;
//     const updatedItems = [...items];
//     const draggedItem = updatedItems[draggedIndex];
//     updatedItems.splice(draggedIndex, 1);
//     updatedItems.splice(index, 0, draggedItem);
//     setItems(updatedItems);
//     onDragEnd?.(updatedItems);
//     setDraggedIndex(null);
//   };

//   return (
//     <>
//       <div className="flex flex-col overflow-x-auto sm:-mx-6 lg:-mx-8">
//         <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
//           <div className="overflow-x-scroll border border-gray-200 rounded-lg">
//             <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
//               <thead className="bg-primary text-white text-xs font-semibold tracking-wider">
//                 <tr>
//                   <th className="px-6 py-4 whitespace-nowrap">SNo</th>
//                   {columns.map((column, key) => (
//                     <th
//                       key={key}
//                       className="px-6 py-4 whitespace-nowrap cursor-pointer select-none"
//                       onClick={() =>
//                         column.sortable &&
//                         column.name &&
//                         handleSortClick(column.name)
//                       }
//                     >
//                       <div className="flex items-center gap-1">
//                         {column.Header}
//                         {column.sortable && (
//                           <span className="text-white">
//                             {sortConfig?.colName === column.name
//                               ? sortConfig?.direction === "asc"
//                                 ? "▲"
//                                 : "▼"
//                               : "↕"}
//                           </span>
//                         )}
//                       </div>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="text-gray-700">
//                 {loading && (
//                   <tr>
//                     <td colSpan={columns.length + 1} className="px-6 py-4">
//                       <Loading />
//                     </td>
//                   </tr>
//                 )}

//                 {!loading && items.length > 0 ? (
//                   items.map((row, index) => (
//                     <tr
//                       key={row.id || index}
//                       draggable
//                       onDragStart={() => handleDragStart(index)}
//                       onDragOver={handleDragOver}
//                       onDrop={() => handleDrop(index)}
//                       className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-200 cursor-move"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {(currentPage - 1) * itemsPerPage + index + 1}
//                       </td>
//                       {columns.map((column, colKey) => (
//                         <td
//                           key={colKey}
//                           className="px-6 py-4 whitespace-nowrap"
//                         >
//                           {renderColumns(column, row, actions)}
//                         </td>
//                       ))}
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan={columns.length + 1}
//                       className="px-6 py-4 text-center"
//                     >
//                       No data available
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={onPageChange}
//       />
//     </>
//   );
// }

// export default Table;
