import { useRef, useState } from "react";
import { Columns3 } from "lucide-react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

// Column visibility is deliberately NOT synced to the URL. It's a per-user
// display preference (like which columns fit your screen), not part of the
// "query" that defines which rows you're looking at - putting it in the URL
// would make every shared link longer without changing what data is shown.
function DataTableColumnVisibility({ table }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));

  const columns = table.getAllLeafColumns().filter((col) => col.getCanHide());

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="
inline-flex
items-center
gap-2
rounded-md
border
border-gray-300
dark:border-gray-700
bg-white
dark:bg-gray-900
px-3
py-2
text-sm
font-medium
text-gray-700
dark:text-gray-300
hover:bg-gray-50
dark:hover:bg-gray-800
"
      >
        <Columns3 size={16} />
        Columns
      </button>

      {open && (
        <div
          className="
    absolute
    right-0
    mt-2
    w-56
    rounded-lg
    border
    bg-white
    dark:bg-gray-900
    dark:border-gray-800
    shadow-lg
  "
        >
          {columns.map((column) => (
            <label
              key={column.id}
              className="
    flex
    cursor-pointer
    items-center
    gap-2
    rounded
    px-2
    py-1.5
    text-sm
    text-gray-700
    dark:text-gray-300
    hover:bg-gray-50
    dark:hover:bg-gray-800
  "
            >
              <input
                type="checkbox"
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
                className="rounded border-gray-300 dark:border-gray-700"
              />

              {typeof column.columnDef.header === "string"
                ? column.columnDef.header
                : column.id}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default DataTableColumnVisibility;
