import { AlertTriangle, Inbox, RefreshCw } from "lucide-react";

// Shown while a query is in-flight and there's no cached data yet to show
// in its place (first load, or a brand-new filter combination).
export function TableSkeleton({ columnCount = 6, rowCount = 10 }) {
  return (
    <div className="animate-pulse">
      <table className="w-full">
        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-100">
              {Array.from({ length: columnCount }).map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-3">
                  <div
                    className="h-4 rounded bg-gray-200"
                    style={{
                      width: `${60 + ((rowIndex + colIndex) % 4) * 10}%`,
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TableErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <AlertTriangle className="text-red-500" size={32} />
      <p className="font-medium text-gray-800">Couldn't load users</p>
      <p className="max-w-sm text-sm text-gray-500">
        {message || "Something went wrong while fetching data from the server."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw size={14} />
          Try again
        </button>
      )}
    </div>
  );
}

export function TableEmptyState({ hasActiveFilters, onClearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <Inbox className="text-gray-400" size={32} />
      <p className="font-medium text-gray-800">No users found</p>
      <p className="max-w-sm text-sm text-gray-500">
        {hasActiveFilters
          ? "No results match your current search and filters."
          : "There are no users to display yet."}
      </p>
      {hasActiveFilters && onClearFilters && (
        <button
          onClick={onClearFilters}
          className="mt-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
