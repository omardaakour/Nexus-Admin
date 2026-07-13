import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useFilterOptions } from "../../hooks/useFilterOptions";
import { useDebounce } from "../../hooks/useDebounce";
import { STATUS_OPTIONS } from "./columns";

// Salary and date inputs are typed character-by-character, so they're kept
// as local draft state and debounced before writing to the URL - otherwise
// every keystroke would trigger a new server request and a new history
// entry. Role/department/status are discrete <select> choices, so those
// write straight through with no debounce needed.
function DataTableFilters({ filters, onChange, onClear }) {
  const { data: options, isLoading: optionsLoading } = useFilterOptions();

  const [salaryMin, setSalaryMin] = useState(filters.salaryMin);
  const [salaryMax, setSalaryMax] = useState(filters.salaryMax);
  const debouncedSalaryMin = useDebounce(salaryMin, 500);
  const debouncedSalaryMax = useDebounce(salaryMax, 500);

  useEffect(() => {
    setSalaryMin(filters.salaryMin);
    setSalaryMax(filters.salaryMax);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.salaryMin, filters.salaryMax]);

  useEffect(() => {
    if (
      debouncedSalaryMin !== filters.salaryMin ||
      debouncedSalaryMax !== filters.salaryMax
    ) {
      onChange({
        salaryMin: debouncedSalaryMin,
        salaryMax: debouncedSalaryMax,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSalaryMin, debouncedSalaryMax]);

  return (
    <div className="border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Role
          </label>
          <select
            value={filters.role}
            onChange={(e) => onChange({ role: e.target.value })}
            disabled={optionsLoading}
            className="w-full rounded-md border border-gray-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All roles</option>
            {options?.roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Department
          </label>
          <select
            value={filters.department}
            onChange={(e) => onChange({ department: e.target.value })}
            disabled={optionsLoading}
            className="w-full rounded-md border border-gray-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All departments</option>
            {options?.departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onChange({ status: e.target.value })}
            className="w-full rounded-md border border-gray-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All statuses</option>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Salary range
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={salaryMin}
              onChange={(e) => setSalaryMin(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max"
              value={salaryMax}
              onChange={(e) => setSalaryMax(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Joined after
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onChange({ dateFrom: e.target.value })}
            className="w-full rounded-md border border-gray-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Joined before
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onChange({ dateTo: e.target.value })}
            className="w-full rounded-md border border-gray-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          onClick={onClear}
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <X size={14} />
          Clear all filters
        </button>
      </div>
    </div>
  );
}

export default DataTableFilters;
