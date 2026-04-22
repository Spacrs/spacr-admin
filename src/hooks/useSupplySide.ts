import { useState, useEffect } from "react";
import API from "../constants/apiEndpoints"

export interface SupplyKPIs {
  totalTravelers: number;
  activeTravellers: number;
  newTravellers: number;
  ordersPerTraveller: number;
  avgEarningsPerTraveller: number;
  totalEarningsByTravellers: number;
}

export interface SupplyGrowthItem {
  month: string;
  travelers: number;
}

export interface OrdersTrendItem {
  month: string;
  ordersPerTraveler: number;
}

export interface SupplyCharts {
  supplyGrowth: SupplyGrowthItem[];
  ordersTrend: OrdersTrendItem[];
}

interface ApiResponse {
  success: boolean;
  data: { kpis: SupplyKPIs; charts: SupplyCharts };
}

export function useSupplySide(fromDate: string, toDate: string) {
  const [data, setData] = useState<{
    kpis: SupplyKPIs;
    charts: SupplyCharts;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fromDate || !toDate) return;
    setLoading(true);
    setError(null);

    // ${API.ADMIN.SUPPLY_METRICS}?fromDate=${fromDate}&toDate=${toDate}
    fetch(
      `http://localhost:9000/api/v5/admin/dashboard/supply-metrics?fromDate=${fromDate}&toDate=${toDate}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch supply side metrics");
        return res.json() as Promise<ApiResponse>;
      })
      .then((json) => {
        if (json.success) setData(json.data);
        else throw new Error("API error");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [fromDate, toDate]);

  return { data, loading, error };
}
