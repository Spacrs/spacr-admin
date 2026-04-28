import { useEffect, useState } from "react";
import { columns } from "../../constant/Columns";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Search, ErrorMsg, Table, Button } from "../../components/Common";
import API from "../../constants/apiEndpoints";

const CACList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [cacData, setCacData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Fetch CAC API
  const fetchCACList = async () => {
    try {
      setLoading(true);
      setIsError(false);

      // "http://localhost:8000/api/v5/admin/cac"
      const res = await fetch(API.ADMIN.Ad_SPEND, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const result = await res.json();
      console.log("CAC API Response:", result);

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

        setCacData(formattedData);
        setTotalPages(result.pagination?.totalPages || 1);
      } else {
        setIsError(true);
        console.error(result.message || "Failed to fetch CAC data");
      }
    } catch (error: any) {
      setIsError(true);
      console.error(error.message || "Error fetching CAC data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCACList();
  }, [currentPage, filter]);

  if (isError) {
    return <ErrorMsg errorMsg="Error loading CAC data" />;
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleUpdate = (data: any) => {
    const cacId = data?.CACID;
    navigate(`/admin/edit-ad-spent/${cacId}`);
  };

  const handleDelete = (data: any) => {
    setDeleteId(data?.CACID);
    setShowConfirm(true);
  };

  // Optional delete API
  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      const res = await fetch(
        // `http://localhost:8000/api/v5/admin/cac/${deleteId}`,
        `${API.ADMIN.Ad_SPEND}/${deleteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to delete CAC");
      }

      toast.success("Ad Spent deleted successfully");
      fetchCACList();
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
        <div className="flex flex-1 max-w-lg">
          <Search
            search={filter}
            onChange={onSearch}
            placeholder="Search by month or type..."
            onReset={() => setFilter("")}
          />
        </div>

        <button
          className="ml-4 bg-black text-white px-4 py-2 rounded"
          onClick={() => navigate("/admin/add-ad-spent")}
        >
          Add Ad Spent
        </button>
      </div>

      {/* Table */}
      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        <Table
          data={cacData || []}
          columns={columns.cacColumn}
          loading={loading}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          itemsPerPage={itemsPerPage}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </div>

      {/* Delete Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
            <p className="mb-4 font-semibold text-lg">
              Are you sure you want to delete this Ad Spent entry?
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
};

export default CACList;
