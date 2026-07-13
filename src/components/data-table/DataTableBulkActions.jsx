import { Download, Trash2, X } from "lucide-react";

function DataTableBulkActions({
  count,
  onClear,
  onExport,
  onDelete,
  isDeleting,
}) {
  if (count === 0) return null;

  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-3
        border-b
        border-indigo-100
        bg-indigo-50
        px-4
        py-2.5
        dark:border-indigo-900
        dark:bg-indigo-950
      "
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onClear}
          className="
            rounded
            p-1
            text-indigo-600
            hover:bg-indigo-100
            dark:text-indigo-300
            dark:hover:bg-indigo-900
          "
          aria-label="Clear selection"
        >
          <X size={16} />
        </button>

        <span
          className="
            text-sm
            font-medium
            text-indigo-900
            dark:text-indigo-200
          "
        >
          {count} {count === 1 ? "row" : "rows"} selected
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onExport}
          className="
            inline-flex
            items-center
            gap-2
            rounded-md
            border
            border-gray-300
            bg-white
            px-3
            py-2
            text-sm
            font-medium
            text-gray-700
            hover:bg-gray-50
            dark:border-gray-700
            dark:bg-gray-900
            dark:text-gray-300
            dark:hover:bg-gray-800
          "
        >
          <Download size={14} />
          Export selected
        </button>

        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="
            inline-flex
            items-center
            gap-2
            rounded-md
            border
            border-red-300
            bg-white
            px-3
            py-2
            text-sm
            font-medium
            text-red-600
            hover:bg-red-50
            disabled:opacity-50
            dark:border-red-800
            dark:bg-gray-900
            dark:text-red-400
            dark:hover:bg-red-950
          "
        >
          <Trash2 size={14} />

          {isDeleting ? "Deleting..." : "Delete selected"}
        </button>
      </div>
    </div>
  );
}

export default DataTableBulkActions;
