import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Button from "../../components/Common/Button";
import InputComponent from "../../components/Common/Inputes";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../../constants/apiEndpoints";
import { useParams } from "react-router-dom";
function AddMonthlyCost() {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    const { costId } = useParams();
    const isEdit = Boolean(costId);
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
    const [payload, setPayload] = useState({
        month: "",
        cost: "",
        // notes: "",
    });
    useEffect(() => {
        if (!costId)
            return;
        const fetchCostById = async () => {
            try {
                const res = await fetch(`${API.ADMIN.MONTHLY_COST}/${costId}`, {
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
                        cost: data.Cost,
                    });
                }
                else {
                    toast.error("Failed to load cost data");
                }
            }
            catch (err) {
                toast.error("Error fetching cost data");
            }
        };
        fetchCostById();
    }, [costId]);
    const handleSubmit = async (e) => {
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
        try {
            const url = isEdit
                ? `${API.ADMIN.MONTHLY_COST}/${costId}`
                : `${API.ADMIN.MONTHLY_COST}`;
            const method = isEdit ? "PATCH" : "POST";
            const res = await fetch(url, {
                method,
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
            toast.success(isEdit ? "Cost updated successfully" : "Cost saved successfully");
            setTimeout(() => {
                navigate("/admin/cost-list");
            }, 1000);
        }
        catch (err) {
            toast.error(err.message || "Failed to save cost");
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "cost") {
            if (/^\d*\.?\d*$/.test(value)) {
                setPayload((p) => ({
                    ...p,
                    cost: value === "" ? "" : Number(value),
                }));
            }
        }
        else {
            setPayload((p) => ({
                ...p,
                [name]: value,
            }));
        }
    };
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(ToastContainer, {}), _jsx("div", { className: "p-8 bg-gray-50", children: _jsxs("form", { onSubmit: handleSubmit, className: "max-w-xl mx-auto bg-white p-6 shadow rounded-lg space-y-6", children: [_jsx("h2", { className: "text-lg font-semibold", children: isEdit ? "Edit Cost" : "Cost Management" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: "Year" }), _jsxs("select", { value: year, onChange: (e) => setYear(e.target.value), className: "w-full border rounded px-3 py-2", children: [_jsx("option", { value: "", children: "Select Year" }), yearOptions.map((y) => (_jsx("option", { value: y, children: y }, y)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: "Month" }), _jsxs("select", { value: month, onChange: (e) => setMonth(e.target.value), className: "w-full border rounded px-3 py-2", children: [_jsx("option", { value: "", children: "Select Month" }), monthOptions.map((m) => (_jsx("option", { value: m.value, children: m.label }, m.value)))] })] })] }), _jsx(InputComponent, { label: "Monthly Cost", name: "cost", type: "number", value: payload.cost, onChange: handleChange, required: true }), _jsx("div", { className: "text-right", children: _jsx(Button, { text: isEdit ? "Update Cost" : "Save Cost", variant: "primary", type: "submit" }) })] }) })] }));
}
export default AddMonthlyCost;
