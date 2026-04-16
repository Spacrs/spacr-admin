import { format } from 'date-fns';

interface DateFilterProps {
  startDate: Date;
  endDate: Date;
  onRangeChange: (start: Date, end: Date) => void;
}

export default function DateFilter({ startDate, endDate, onRangeChange }: DateFilterProps) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200 text-sm">
      <input
        type="date"
        value={format(startDate, 'yyyy-MM-dd')}
        onChange={(e) => onRangeChange(new Date(e.target.value), endDate)}
        className="outline-none text-gray-700"
      />
      <span className="text-gray-400">→</span>
      <input
        type="date"
        value={format(endDate, 'yyyy-MM-dd')}
        onChange={(e) => onRangeChange(startDate, new Date(e.target.value))}
        className="outline-none text-gray-700"
      />
    </div>
  );
}