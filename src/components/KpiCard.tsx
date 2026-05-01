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
    <div className="flex-1 min-w-[140px] flex flex-col" style={{ minHeight: 64 }}>
      
      {/* Part 1 — Label (flex-1 se baaki jagah le lega) */}
      <div className="flex items-start gap-2 text-gray-500 text-sm flex-1">
        <span style={{ fontSize: 16, lineHeight: '20px', flexShrink: 0 }}>
          {icon}
        </span>
        <span className="leading-tight">{label}</span>
      </div>

      {/* Part 2 — Value (hamesha bottom pe, apni jagah lega) */}
      <p className="text-xl font-bold text-gray-900 mt-1 break-words">
        {value}
      </p>
    </div>
  );
}
