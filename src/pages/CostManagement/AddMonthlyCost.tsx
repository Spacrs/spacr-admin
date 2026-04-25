import React, { useState } from "react";
import Button from "../../components/Common/Button";
import InputComponent from "../../components/Common/Inputes";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../../constants/apiEndpoints";


type Payload = {
  month: string;
  cost: number | "";
//   notes?: string;
};

function AddMonthlyCost() {
  const navigate = useNavigate();
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

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const [payload, setPayload] = useState<Payload>({
    month: "",
    cost: "",
    // notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "cost") {
      if (/^\d*$/.test(value)) {
        setPayload((p) => ({
          ...p,
          cost: value === "" ? "" : Number(value),
        }));
      }
    } else {
      setPayload((p) => ({
        ...p,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalMonth = `${year}-${month}`;

    if (!year || !month) {
      toast.error("Please select month & year");
      return;
    }

    if (!payload.cost || payload.cost <= 0) {
      toast.error("Enter valid cost");
      return;
    }

    console.log('payload', payload)
    console.log('finalMonth', finalMonth);
    try {
      // `http://localhost:8000/api/v5/admin/costs/monthly-cost`
      await fetch(`${API.ADMIN.MONTHLY_COST}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          month: finalMonth,
        }),
      });

      toast.success("Cost saved successfully");
      // redirect after short delay
      setTimeout(() => {
        navigate("/admin/cost-list");
      }, 1000);
    } catch (err) {
      toast.error("Failed to save cost");
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
          <h2 className="text-lg font-semibold">Cost Management</h2>

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

          {/* Cost */}
          <InputComponent
            label="Monthly Cost"
            name="cost"
            type="number"
            value={payload.cost}
            onChange={handleChange}
            required={true}
          />

          {/* Notes */}
          {/* <InputComponent
            label="Notes (Optional)"
            name="notes"
            type="textarea"
            value={payload.notes}
            onChange={handleChange}
          /> */}

          {/* Submit */}
          <div className="text-right">
            <Button text="Save Cost" variant="primary" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMonthlyCost;