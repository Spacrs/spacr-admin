import { useState, useEffect } from 'react';
import API from "../constants/apiEndpoints"

export interface GrowthTrendPoint {
  date: string;
  GMV: number;
  revenue: number;
  activeUsers: number;
}

interface ApiResponse {
  success: boolean;
  data: { growthTrends: GrowthTrendPoint[] };
}

export function useGrowthTrends(fromDate: string, toDate: string) {
  const [data, setData] = useState<GrowthTrendPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fromDate || !toDate) return;
    setLoading(true);
    setError(null);

    // ${API.ADMIN.GROWTH_TRENDS}?fromDate=${fromDate}&toDate=${toDate}
    fetch(`http://localhost:8000/api/v5/admin/dashboard/growth-trends?fromDate=${fromDate}&toDate=${toDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
    )
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch growth trends');
        return res.json() as Promise<ApiResponse>;
      })
      .then(json => {
        if (json.success) setData(json.data.growthTrends);
        else throw new Error('API error');
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [fromDate, toDate]);

  return { data, loading, error };
}