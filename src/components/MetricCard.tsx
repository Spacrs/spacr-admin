interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  loading?: boolean;
}

export default function MetricCard({
  label,
  value,
  change,
  positive = true,
  loading = false,
}: MetricCardProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse">
        <div className="h-3 bg-gray-200 rounded w-16 mb-3" />
        <div className="h-7 bg-gray-200 rounded w-24 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-12" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      {/* {change && (
        <span className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-red-500'}`}>
          {positive ? '▲' : '▼'} {change}
        </span>
      )} */}
    </div>
  );
}
