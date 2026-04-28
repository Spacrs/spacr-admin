import React, { useEffect, useState } from "react";
import Button from "../../components/Common/Button";
import InputComponent from "../../components/Common/Inputes";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../../constants/apiEndpoints";
import { useParams } from "react-router-dom";

type Payload = {
  month: string;
  cacType: string;
  adSpent: number | "";
};

function AddCAC() {
  const navigate = useNavigate();
const { cacId } = useParams();
const isEdit = Boolean(cacId);
  

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const monthOptions = [
    { label: "Jan", value: "01" },
    { label: "Feb", value: "02" },
    { label: "Mar", value: "03" },
    { label: "Apr", value: "04" },
    { label: "May", value: "05" },
    { label: "Jun", value: "06" },
    { label: "Jul", value: "07" },
    { label: "Aug", value: "08" },
    { label: "Sep", value: "09" },
    { label: "Oct", value: "10" },
    { label: "Nov", value: "11" },
    { label: "Dec", value: "12" },
  ];

  const cacTypeOptions = [
    { label: "Shopper", value: "SHOPPER" },
    { label: "Traveler", value: "TRAVELER" },
  ];

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const [payload, setPayload] = useState<Payload>({
    month: "",
    cacType: "",
    adSpent: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "adSpent") {
      if (/^\d*\.?\d*$/.test(value)) {
        setPayload((p) => ({
          ...p,
          adSpent: value === "" ? "" : Number(value),
        }));
      }
    } else {
      setPayload((p) => ({
        ...p,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (!cacId) return;

    const fetchAdSpentById = async () => {
      try {
        const res = await fetch(`${API.ADMIN.Ad_SPEND}/${cacId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        const result = await res.json();

        if (result.success) {
          const data = result.data;

          const [yearVal, monthVal] = data.Month.split("-");

          setYear(yearVal);
          setMonth(monthVal);

          setPayload({
            month: data.Month,
            adSpent: data.AdSpent,
            cacType: data.CACType,
          });
        } else {
          toast.error("Failed to load ad spent data");
        }
      } catch (err) {
        toast.error("Error fetching ad spent data");
      }
    };

    fetchAdSpentById();
  }, [cacId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalMonth = `${year}-${month}`;

    if (!year || !month) {
      toast.error("Please select month & year");
      return;
    }

    if (!payload.cacType) {
      toast.error("Please select CAC Type");
      return;
    }

    if (!payload.adSpent || payload.adSpent <= 0) {
      toast.error("Enter valid Ad Spent");
      return;
    }
    
    // "http://localhost:8000/api/v5/admin/cac"
    try {

      const url = isEdit ? `${API.ADMIN.Ad_SPEND}/${cacId}` : API.ADMIN.Ad_SPEND;
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          month: finalMonth,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Something went wrong");
      }

      toast.success(isEdit ? "Ad Spent updated successfully" : "Ad Spent added successfully");

      // redirect after short delay
      setTimeout(() => {
        navigate("/admin/ad-spent");
      }, 1000);

    } catch (err: any) {
      toast.error(err.message || "Failed to save Ad Spent");
    }
  };

  return (
    <div className="min-h-screen">
      <ToastContainer />

      <div className="p-8 bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white p-6 shadow rounded-lg space-y-6"
        >
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Ad Spent" : "Add Ad Spent"}  
          </h2>

          {/* Year + Month */}
          <div className="grid grid-cols-2 gap-4">
            {/* Year */}
            <div>
              <label className="block mb-1 font-medium">Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Year</option>
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Month */}
            <div>
              <label className="block mb-1 font-medium">Month</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Month</option>
                {monthOptions.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* CAC Type */}
          <div>
            <label className="block mb-1 font-medium">CAC Type</label>
            <select
              name="cacType"
              value={payload.cacType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Type</option>
              {cacTypeOptions.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Ad Spent */}
          <InputComponent
            label="Ad Spent"
            name="adSpent"
            type="number"
            value={payload.adSpent}
            onChange={handleChange}
            required={true}
          />

          {/* Submit */}
          <div className="text-right">
            <Button text={isEdit ? "Update" : "Save"} variant="primary" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCAC;