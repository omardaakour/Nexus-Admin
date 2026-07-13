import React from "react";
import { useMemo, useRef, useState } from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import DataTableToolbar from "./DataTableToolbar";
import DataTableFilters from "./DataTableFilters";
import DataTablePagination from "./DataTablePagination";
import DataTableBulkActions from "./DataTableBulkActions";
import {
  TableSkeleton,
  TableErrorState,
  TableEmptyState,
} from "./DataTableStates";
import { getFilteredRowModel } from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
const ROW_HEIGHT = 45;

// DataTable is intentionally "dumb": it owns table mechanics (rendering,
// selection, virtualization, column visibility) but not data-fetching or
// URL state. Sorting/filtering/pagination all happen on the server via the
// callbacks passed in - `manualSorting`/`manualFiltering`/`manualPagination`
// below tell TanStack Table "don't touch the rows I give you, they're
// already sorted/filtered/paged; just render them." That's what makes this
// safe for 1000+ (or 100,000+) total rows: React never holds more than one
// page's worth of rows in memory at once.
function DataTable({
  columns,
  data,
  total,
  isLoading,
  isFetching,
  error,
  onRefetch,

  search,
  onSearchChange,

  sorting,
  onSortingChange,

  filters,
  showFilters,
  onToggleFilters,
  onFiltersChange,
  activeFilterCount,
  onClearFilters,

  getRowId,
  onExportAll,
  onExportRows,
  onDeleteRows,
  isDeleting,
  editingUser,
  setEditingUser,
}) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [expanded, setExpanded] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const scrollRef = useRef(null);
  const fuzzyFilter = (row, columnId, value) => {
    return rankItem(String(row.getValue(columnId) ?? ""), value).passed;
  };
  const tableColumns = useMemo(
    () => [
      {
        id: "expand",
        header: "",
        enableHiding: false,
        enableSorting: false,
        cell: ({ row }) => (
          <button
            onClick={row.getToggleExpandedHandler()}
            className="text-gray-500 hover:text-gray-900"
          >
            {row.getIsExpanded() ? "▼" : "▶"}
          </button>
        ),
      },

      {
        id: "select",
        enableHiding: false,
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            ref={(el) => {
              if (el)
                el.indeterminate =
                  table.getIsSomeRowsSelected() &&
                  !table.getIsAllRowsSelected();
            }}
            onChange={table.getToggleAllRowsSelectedHandler()}
            className="rounded border-gray-300"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="rounded border-gray-300"
          />
        ),
      },

      ...columns,
    ],
    [columns],
  );
  const filteredData = useMemo(() => {
    return data.filter((user) => {
      if (filters.role && user.role !== filters.role) return false;

      if (filters.department && user.department !== filters.department)
        return false;

      if (
        filters.status !== "" &&
        String(user.status) !== String(filters.status)
      )
        return false;

      if (filters.salaryMin && Number(user.salary) < Number(filters.salaryMin))
        return false;

      if (filters.salaryMax && Number(user.salary) > Number(filters.salaryMax))
        return false;

      if (
        filters.dateFrom &&
        new Date(user.joinDate) < new Date(filters.dateFrom)
      )
        return false;

      if (filters.dateTo && new Date(user.joinDate) > new Date(filters.dateTo))
        return false;

      return true;
    });
  }, [data, filters]);
  const table = useReactTable({
    getRowCanExpand: () => true,
    columns: tableColumns,
    data: filteredData,

    state: {
      globalFilter: search,
      sorting,
      rowSelection,
      columnVisibility,
      pagination,
      expanded,
    },
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    getCoreRowModel: getCoreRowModel(),

    getRowId,

    onGlobalFilterChange: onSearchChange,

    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;

      onSortingChange(next);
    },

    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),

    // search
    globalFilterFn: "includesString",
    getFilteredRowModel: getFilteredRowModel(),

    // sorting
    getSortedRowModel: getSortedRowModel(),

    // pagination
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onPaginationChange: setPagination,
  });

  const { rows } = table.getRowModel();
  console.log(table.getVisibleLeafColumns());
  console.log("SEARCH:", search);
  console.log("DATA LENGTH:", data.length);
  console.log("ROWS LENGTH:", rows.length);
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10,
  });
  const virtualRows = rowVirtualizer.getVirtualItems();
  const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? rowVirtualizer.getTotalSize() - virtualRows[virtualRows.length - 1].end
      : 0;

  const selectedRowIds = Object.keys(rowSelection);
  const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original);

  function clearSelection() {
    setRowSelection({});
  }

  const hasActiveFilters = Boolean(search) || activeFilterCount > 0;

  return (
    <div
      className="
    overflow-hidden
    rounded-xl
    border
    border-gray-200
    bg-white
    shadow-sm
    dark:border-gray-800
    dark:bg-gray-900
  "
    >
      <DataTableToolbar
        search={search}
        onSearchChange={onSearchChange}
        showFilters={showFilters}
        onToggleFilters={onToggleFilters}
        activeFilterCount={activeFilterCount}
        table={table}
        onRefresh={onRefetch}
        isRefreshing={isFetching}
        onExportAll={onExportAll}
      />

      {showFilters && (
        <DataTableFilters
          filters={filters}
          onChange={onFiltersChange}
          onClear={onClearFilters}
        />
      )}

      <DataTableBulkActions
        count={selectedRowIds.length}
        onClear={clearSelection}
        onExport={() => onExportRows(selectedRows)}
        onDelete={() => onDeleteRows(selectedRowIds).then(clearSelection)}
        isDeleting={isDeleting}
      />

      {isLoading ? (
        <TableSkeleton columnCount={tableColumns.length} />
      ) : error ? (
        <TableErrorState message={error.message} onRetry={onRefetch} />
      ) : rows.length === 0 ? (
        <TableEmptyState
          hasActiveFilters={hasActiveFilters}
          onClearFilters={onClearFilters}
        />
      ) : (
        // Virtualization note: the server already limits us to one page's
        // worth of rows (pageSize, up to 500). Virtualizing on top of that
        // means the DOM only ever renders ~15-20 <tr> elements at a time no
        // matter how large the page size is, so scrolling stays smooth even
        // at 500 rows/page without ever holding 10,000+ rows in memory.
        <div ref={scrollRef} className="max-h-[600px] overflow-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead
              className="
    sticky
    top-0
    z-10
    bg-gray-50
    dark:bg-gray-800
  "
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={
                        header.column.getCanSort()
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      className={`whitespace-nowrap border-b border-gray-200 p-4 dark:border-gray-800 py-3 font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400 ${
                        header.column.getCanSort()
                          ? "cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getCanSort() &&
                          (header.column.getIsSorted() === "asc" ? (
                            <ArrowUp size={14} />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ArrowDown size={14} />
                          ) : (
                            <ArrowUpDown size={14} className="text-gray-300" />
                          ))}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {paddingTop > 0 && (
                <tr>
                  <td
                    style={{ height: paddingTop }}
                    colSpan={tableColumns.length}
                  />
                </tr>
              )}
              {virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index];

                return (
                  <React.Fragment key={row.id}>
                    {/* Main row */}
                    <tr
                      key={row.id}
                      className={`border-b border-gray-100 dark:border-gray-800 ${
                        row.getIsSelected()
                          ? "bg-indigo-50 dark:bg-indigo-950"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                      style={{ height: ROW_HEIGHT }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-2.5 text-gray-700 dark:text-gray-300"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Expanded row */}
                    {row.getIsExpanded() && (
                      <tr key={`${row.id}-expanded`}>
                        <td
                          colSpan={tableColumns.length}
                          className="
  bg-gray-50
  dark:bg-gray-950
  px-6
  py-4
"
                        >
                          <div
                            className="
    rounded-xl
    border
    bg-white
    dark:bg-gray-900
    dark:border-gray-800
    p-6
    shadow-sm
  "
                          >
                            <h3
                              className="
    mb-4
    font-semibold
    text-gray-800
    dark:text-white
  "
                            >
                              User Details
                            </h3>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                  Email
                                </p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {" "}
                                  {row.original.email}
                                </p>
                              </div>

                              <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                  Phone
                                </p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {" "}
                                  {row.original.phone}
                                </p>
                              </div>

                              <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                  Department
                                </p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {" "}
                                  {row.original.department}
                                </p>
                              </div>

                              <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                  Salary
                                </p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {" "}
                                  ${row.original.salary}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
              {paddingBottom > 0 && (
                <tr>
                  <td
                    style={{ height: paddingBottom }}
                    colSpan={tableColumns.length}
                  />
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <DataTablePagination table={table} />
    </div>
  );
}

export default DataTable;
