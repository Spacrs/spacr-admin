import { useState, useEffect } from 'react';
export function useGrowthTrends(fromDate, toDate) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!fromDate || !toDate)
            return;
        const controller = new AbortController();
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`http://localhost:9000/api/v5/admin/dashboard/growth-trends?fromDate=${fromDate}&toDate=${toDate}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                    signal: controller.signal,
                });
                if (!res.ok)
                    throw new Error("Failed to fetch growth trends");
                const json = await res.json();
                if (!json.success)
                    throw new Error("API error");
                setData({
                    growthTrends: json.data.growthTrends,
                    grouping: json.grouping,
                });
            }
            catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
        return () => controller.abort();
    }, [fromDate, toDate]);
    return { data, loading, error };
}
