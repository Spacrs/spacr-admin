interface KpiCardProps {
  icon: string; // emoji icon
  label: string;
  value: string | number;
  loading?: boolean;
}

export default function KpiCard({
  icon,
  label,
  value,
  loading = false,
}: KpiCardProps) {
  if (loading) {
    return (
      <div className="flex-1 min-w-[140px] animate-pulse">
        <div className="h-3 bg-gray-200 rounded w-24 mb-3" />
        <div className="h-8 bg-gray-200 rounded w-20" />
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-[140px]">
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span>{label}</span>
      </div>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
