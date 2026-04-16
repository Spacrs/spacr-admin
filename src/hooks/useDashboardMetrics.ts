import { useState, useEffect } from 'react';

interface DashboardMetrics {
  GMV: number;
  revenue: number;
  netProfit: number;
  totalActiveOrders: number;
  totalCompletedOrders: number;
  totalActiveUsers: number;
  calculatedTakeRate: number;
  matchRate: number;
  orderSuccessRate: number;
  totalUsers: number;
  totalOrders: number;
  takeRate: number;
  matchedOrders: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: DashboardMetrics;
}

export function useDashboardMetrics(fromDate: string, toDate: string) {
  const [data, setData] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fromDate || !toDate) return;

    setLoading(true);
    setError(null);

    fetch(`http://localhost:8000/api/v5/admin/dashboard/metrics?fromDate=${fromDate}&toDate=${toDate}`, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
    )
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch metrics');
        return res.json() as Promise<ApiResponse>;
      })
      .then((json) => {
        if (json.success) setData(json.data);
        else throw new Error(json.message);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [fromDate, toDate]);

  return { data, loading, error };
}