import { useState, useEffect } from 'react';
import API from '../constants/apiEndpoints';

export interface GrowthTrendPoint {
  date: string;
  label: string;
  GMV: number;
  revenue: number;
  totalUsers: number;
}

type GroupingType = "day" | "week" | "month" | "year";

interface ApiResponse {
  success: boolean;
  grouping: GroupingType;
  data: {
    growthTrends: GrowthTrendPoint[];
  };
}

interface GrowthTrendState {
  growthTrends: GrowthTrendPoint[];
  grouping: GroupingType;
}

export function useGrowthTrends(fromDate: string, toDate: string) {
  const [data, setData] = useState<GrowthTrendState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fromDate || !toDate) return;

    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // `http://localhost:8000/api/v5/admin/dashboard/growth-trends?fromDate=${fromDate}&toDate=${toDate}`
      try {
        const res = await fetch(
          `${API.ADMIN.GROWTH_TRENDS}?fromDate=${fromDate}&toDate=${toDate}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            signal: controller.signal,
          }
        );

        if (!res.ok) throw new Error("Failed to fetch growth trends");

        const json: ApiResponse = await res.json();

        if (!json.success) throw new Error("API error");

        setData({
          growthTrends: json.data.growthTrends,
          grouping: json.grouping,
        });

      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [fromDate, toDate]);

  return { data, loading, error };
}