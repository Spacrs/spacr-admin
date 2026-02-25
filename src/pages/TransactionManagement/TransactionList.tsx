import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { columns } from "../../constant/Columns";
import { Search, ErrorMsg, Table, Button } from "../../components/Common";
import {
  useGetTransactionListQuery,
} from "../../store/slices/orderSlice/apiSlice";

export default function TransactionList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, refetch } = useGetTransactionListQuery({
    page,
    limit,
  });

  
  useEffect(() => {
    refetch();
  }, []);

  const handleView = (row: any) => {
    const transactionId = row.TransactionID;
    const url = `/admin/transaction-details/${transactionId}`;
    navigate(url);
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        <ToastContainer />
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-1 max-w-lg"></div>
          <div className="ml-4">
            
          </div>
        </div>
      </div>

      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto">
        <Table
          data={data?.data || []}
          columns={columns.transaction}
          loading={isLoading || isFetching}
          totalPages={data?.pagination?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          handleView={handleView}
          itemsPerPage={10}
        />
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
            <p className="mb-4 font-semibold text-lg">
              Are you sure you want to delete this fee?
            </p>
            <div className="flex justify-center gap-4">
              <Button
                text="Cancel"
                variant="lightBlue"
                onClick={() => {
                  setShowConfirm(false);
                  setDeleteId(null);
                }}
              />
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
