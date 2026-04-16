import { useState, useEffect } from "react";
export function useSupplySide(fromDate, toDate) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!fromDate || !toDate)
            return;
        setLoading(true);
        setError(null);
        fetch(`http://localhost:8000/api/v5/admin/dashboard/supply-metrics?fromDate=${fromDate}&toDate=${toDate}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
            .then((res) => {
            if (!res.ok)
                throw new Error("Failed to fetch supply side metrics");
            return res.json();
        })
            .then((json) => {
            if (json.success)
                setData(json.data);
            else
                throw new Error("API error");
        })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [fromDate, toDate]);
    return { data, loading, error };
}
