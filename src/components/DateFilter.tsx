import { format } from 'date-fns';

interface DateFilterProps {
  startDate: Date | null;
  endDate: Date | null;
  onRangeChange: (start: Date | null, end: Date | null) => void;
}

function formatDate(date: Date | null) {
  return date ? format(date, "yyyy-MM-dd") : "";
}

export default function DateFilter({ startDate, endDate, onRangeChange }: DateFilterProps) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200 text-sm">
      <input
        type="date"
        value={formatDate(startDate)}
        onChange={(e) => onRangeChange(new Date(e.target.value), endDate)}
        className="outline-none text-gray-700"
      />
      <span className="text-gray-400">→</span>
      <input
        type="date"
        value={formatDate(endDate)}
        onChange={(e) => onRangeChange(startDate, new Date(e.target.value))}
        className="outline-none text-gray-700"
      />
    </div>
  );
}