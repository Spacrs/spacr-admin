import { useState, useEffect } from 'react';
import API from "../constants/apiEndpoints"


export interface Corridor {
  corridor: string;
  totalOrders: number;
  totalGMV: number;
  totalRevenue: number;
  AOV: number;
  avgEarningsPerTraveller: number;
}

interface ApiResponse {
  success: boolean;
  data: Corridor[];
}

export function useTopCorridors(fromDate: string, toDate: string) {
  const [data, setData]       = useState<Corridor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    // if (!fromDate || !toDate) return;
    const params = fromDate && toDate
      ? `?fromDate=${fromDate}&toDate=${toDate}`
      : '';
    setLoading(true);
    setError(null);

    // fetch(`http://localhost:8000/api/v5/admin/dashboard/top-corridors?fromDate=${fromDate}&toDate=${toDate}`,{
    //     headers: {
    //         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    //     },
    // })

    // ${API.ADMIN.TOP_CORRIDORS}?fromDate=${fromDate}&toDate=${toDate}
    
    fetch(`http://localhost:8000/api/v5/admin/dashboard/top-corridors${params}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch corridors');
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