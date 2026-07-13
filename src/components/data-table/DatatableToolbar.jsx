import { useEffect, useState } from "react";
import {
  Download,
  RefreshCw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useDebounce } from "../../hooks/useDebounce";
import DataTableColumnVisibility from "./DataTableColumnVisibility";

// The search input owns its own React state so every keystroke is instant
// and never janky, but it only pushes to the URL (and therefore the network
// request) after the user pauses typing for 400ms. This is what makes
// "debounced search" actually debounced end-to-end, not just delayed.
function DataTableToolbar({
  search,
  onSearchChange,
  showFilters,
  onToggleFilters,
  activeFilterCount,
  table,
  onRefresh,
  isRefreshing,
  onExportAll,
}) {
  const [inputValue, setInputValue] = useState(search);
  const debouncedValue = useDebounce(inputValue, 400);

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  useEffect(() => {
    if (debouncedValue !== search) onSearchChange(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div
      className="
    flex
    flex-col
    gap-3
    border-b
    border-gray-200
    dark:border-gray-800
    p-4
    sm:flex-row
    sm:items-center
    sm:justify-between
  "
    >
      <div className="relative w-full sm:max-w-xs">
        <Search
          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />
        <input
          placeholder="Search users..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="
w-full
rounded-md
border
border-gray-300
bg-white
text-gray-900
dark:border-gray-700
dark:bg-gray-800
dark:text-white
py-2
pl-8
pr-8
text-sm
focus:outline-none
focus:ring-2
focus:ring-indigo-500
"
        />
        {inputValue && (
          <button
            onClick={() => setInputValue("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onToggleFilters}
          className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium ${
            showFilters
              ? "border-indigo-300 bg-indigo-50 text-indigo-700"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <SlidersHorizontal size={16} />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-xs font-semibold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>

        <DataTableColumnVisibility table={table} />

        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
          Refresh
        </button>

        <button
          onClick={onExportAll}
          className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>
    </div>
  );
}

export default DataTableToolbar;
