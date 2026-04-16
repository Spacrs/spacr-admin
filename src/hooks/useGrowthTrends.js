import { useState, useEffect } from 'react';
export function useGrowthTrends(fromDate, toDate) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!fromDate || !toDate)
            return;
        setLoading(true);
        setError(null);
        fetch(`http://localhost:8000/api/v5/admin/dashboard/growth-trends?fromDate=${fromDate}&toDate=${toDate}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
            .then(res => {
            if (!res.ok)
                throw new Error('Failed to fetch growth trends');
            return res.json();
        })
            .then(json => {
            if (json.success)
                setData(json.data.growthTrends);
            else
                throw new Error('API error');
        })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [fromDate, toDate]);
    return { data, loading, error };
}
