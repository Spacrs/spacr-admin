import { useState, useEffect } from 'react';
import API from "../constants/apiEndpoints"

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
    setLoading(true);
    setError(null);

    let url = `http://localhost:8000/api/v5/admin/dashboard/metrics`;

    const params = new URLSearchParams();

    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);

    if ([...params].length) {
      url += `?${params.toString()}`;
    }

    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch metrics");
        return res.json();
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