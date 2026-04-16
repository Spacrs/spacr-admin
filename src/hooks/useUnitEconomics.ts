import { useState, useEffect } from 'react';

export interface UnitEconomic {
  AOV: number;
  revenuePerOrder: number;
  takeRate: number;
  costPerOrder: number;
}

export interface CustomerEconomic {
  CAC: number;
  LTV: number;
  ltvToCac: number;
  totalUsers: number;
}

interface ApiResponse {
  success: boolean;
  data: {
    unitEconomic: UnitEconomic;
    customerEconomic: CustomerEconomic;
  };
}

export function useUnitEconomics(fromDate: string, toDate: string) {
  const [data, setData]       = useState<{ unitEconomic: UnitEconomic; customerEconomic: CustomerEconomic } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    if (!fromDate || !toDate) return;
    setLoading(true);
    setError(null);

    fetch(`http://localhost:8000/api/v5/admin/dashboard/unit-economics?fromDate=${fromDate}&toDate=${toDate}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch unit economics');
        return res.json() as Promise<ApiResponse>;
      })
      .then(json => {
        if (json.success) setData(json.data);
        else throw new Error('API error');
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [fromDate, toDate]);

  return { data, loading, error };
}