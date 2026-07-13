import { format } from "date-fns";

import { Trash2, Pencil } from "lucide-react";
function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return format(new Date(dateStr), "MMM dd, yyyy");
}

function StatusBadge({ active }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
        active
          ? "bg-green-100 text-green-800 border border-green-300"
          : "bg-red-100 text-red-800 border border-red-300"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}

export function userColumns({ onEdit, onDelete }) {
  return [
    {
      accessorKey: "first_name",
      header: "First Name",
      enableSorting: true,
    },
    {
      accessorKey: "last_name",
      header: "Last Name",
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ getValue }) => (
        <a
          href={`mailto:${getValue()}`}
          className="text-blue-600 hover:underline text-sm"
        >
          {getValue()}
        </a>
      ),
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "role",
      header: "Role",
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "department",
      header: "Department",
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "salary",
      header: "Salary",
      cell: ({ getValue }) => formatCurrency(getValue()),
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "city",
      header: "City",
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => <StatusBadge active={getValue()} />,
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "joinDate",
      header: "Join Date",
      cell: ({ getValue }) => formatDate(getValue()),
      enableSorting: true,
      enableGlobalFilter: true,
    },

    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(row.original)}
            className="rounded bg-blue-50 px-2 py-1 text-blue-600 hover:bg-blue-100"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(row.original.id)}
            className="rounded bg-red-50 px-2 py-1 text-red-600 hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
}

export const FILTERABLE_COLUMNS = {
  role: "role",
  department: "department",
  status: "status",
};

export const STATUS_OPTIONS = [
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
];
