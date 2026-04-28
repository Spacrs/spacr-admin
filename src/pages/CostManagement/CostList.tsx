import { useEffect, useState } from "react";
import { columns } from "../../constant/Columns";
import { useNavigate } from "react-router-dom";
import API from "../../constants/apiEndpoints";
import { toast, ToastContainer } from "react-toastify";
import { Search, ErrorMsg, Table, Button } from "../../components/Common";

function CostList() {
  console.log("CostList component rendered");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [costData, setCostData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Fetch API
  const fetchCostList = async () => {
    try {
      setLoading(true);
      setIsError(false);


      // `http://localhost:8000/api/v5/admin/costs/monthly-cost?page=${currentPage}&limit=${itemsPerPage}&search=${filter}` 
      const res = await fetch(
        `${API.ADMIN.MONTHLY_COST}?page=${currentPage}&limit=${itemsPerPage}&search=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      const result = await res.json();

      if (res.ok && result.success) {
        const formattedData = (result.data || []).map((item: any) => {
          if (!item.Month) return item;

          const [year, month] = item.Month.split("-");
          const date = new Date(Number(year), Number(month) - 1);

          return {
            ...item,
            Month: date.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            }), // March 2026
          };
        });
        setCostData(formattedData);
        setTotalPages(result.pagination?.totalPages || 1);
      } else {
        setIsError(true);
        console.error(result.message || "Failed to fetch cost data");
      }
    } catch (error: any) {
      setIsError(true);
      console.error(error.message || "Error fetching cost data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCostList();
  }, [currentPage, filter]);

  if (isError) {
    return <ErrorMsg errorMsg="Error loading cost data" />;
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleUpdate = (data: any) => {
    navigate(`/admin/edit-monthly-cost/${data?.Id}`);
  };

  const handleDelete = (data: any) => {
    setDeleteId(data?.Id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      const access_token = localStorage.getItem("access_token");

      const res = await fetch(
        `${API.ADMIN.MONTHLY_COST}/${deleteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to delete cost");
      }

      toast.success("Cost deleted successfully");

      // Option 1 (current - safe)
      await fetchCostList();

      // Option 2 (better UX - no API call)
      // setCostData(prev => prev.filter(item => item.Id !== deleteId));

    } catch (err: any) {
      toast.error(err.message || "Error while deleting");
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        {/* <ToastContainer /> */}
        <div className="flex flex-1 max-w-lg">
          <Search
            search={filter}
            onChange={onSearch}
            placeholder="Search by month..."
            onReset={() => setFilter("")}
          />
        </div>

        <button
          className="ml-4 bg-black text-white px-4 py-2 rounded"
          onClick={() => navigate("/admin/add-monthly-cost")}
        >
          Add Cost
        </button>
      </div>

      {/* Table */}
      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        <Table
          data={costData || []}
          columns={columns.costColumn}
          loading={loading}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          itemsPerPage={itemsPerPage}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
            <p className="mb-4 font-semibold text-lg">
              Are you sure you want to delete this Cost entry?
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
              <Button
                text="Yes, Delete"
                variant="danger"
                onClick={handleConfirmDelete}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CostList;
