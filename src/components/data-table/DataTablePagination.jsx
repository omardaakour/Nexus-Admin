import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const PAGE_SIZE_OPTIONS = [20, 50, 100, 200, 500];

function DataTablePagination({ table }) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;

  const pageCount = table.getPageCount();

  const rowCount = table.getFilteredRowModel().rows.length;

  const startRow = rowCount === 0 ? 0 : pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, rowCount);

  return (
    <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-3 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-gray-500">
        {rowCount > 0 ? (
          <>
            Showing{" "}
            <span className="font-medium text-gray-700">{startRow}</span>
            {"–"}
            <span className="font-medium text-gray-700">{endRow}</span> of{" "}
            <span className="font-medium text-gray-700">{rowCount}</span>
          </>
        ) : (
          "No results"
        )}
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-gray-500">
          Rows per page
          <select
            value={pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="rounded-md border border-gray-300 px-2 py-1 text-sm"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-1">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="rounded p-1.5 disabled:opacity-30"
          >
            <ChevronsLeft size={16} />
          </button>

          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded p-1.5 disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="px-2 text-sm">
            Page {pageIndex + 1} of {pageCount}
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded p-1.5 disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>

          <button
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
            className="rounded p-1.5 disabled:opacity-30"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataTablePagination;
