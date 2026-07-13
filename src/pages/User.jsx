import { useState } from "react";
import ConfirmModal from "../components/data-table/ConfirmModal";
import { useTableParams } from "../hooks/useTableParams";
import { useUsers } from "../hooks/useUsers";
import { useDeleteUsers } from "../hooks/useDeleteUsers";
import { getAllMatchingUsers } from "../services/userService";
import { downloadCsv } from "../utils/exportCsv";
import DataTable from "../components/data-table/DataTable";
import { userColumns } from "../components/data-table/columns";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useDeleteUser } from "../hooks/useDeleteUser";
import EditUserModal from "../components/users/EditUserModal";

const EXPORT_COLUMNS = [
  { label: "First Name", accessor: (u) => u.first_name },
  { label: "Last Name", accessor: (u) => u.last_name },
  { label: "Email", accessor: (u) => u.email },
  { label: "Role", accessor: (u) => u.role },
  { label: "Department", accessor: (u) => u.department },
  { label: "Salary", accessor: (u) => u.salary },
  { label: "Phone", accessor: (u) => u.phone },
  { label: "City", accessor: (u) => u.city },
  { label: "Status", accessor: (u) => (u.status ? "Active" : "Inactive") },
  { label: "Join Date", accessor: (u) => u.joinDate },
];

function Users() {
  const params = useTableParams();
  const updateUserMutation = useUpdateUser();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingDeleteIds, setPendingDeleteIds] = useState([]);
  const deleteUserMutation = useDeleteUser();
  const [editingUser, setEditingUser] = useState(null);

  const columns = userColumns({
    onDelete: (id) => {
      if (confirm("Delete this user?")) {
        deleteUserMutation.mutate(id);
      }
    },

    onEdit: (user) => {
      setEditingUser(user);
    },
  });
  const [showFilters, setShowFilters] = useState(false);

  const sorting = params.sort
    ? [{ id: params.sort, desc: params.order === "desc" }]
    : [];

  const queryParams = {
    page: params.page,
    pageSize: params.pageSize,
    sort: params.sort,
    order: params.order,
    ...params.filters,
  };

  const { data, isLoading, isFetching, error, refetch } = useUsers();
  console.log("API DATA:", data);
  console.log("QUERY PARAMS:", queryParams);
  console.log("DATA:", data);
  const deleteUsersMutation = useDeleteUsers();

  async function handleExportAll() {
    const rows = await getAllMatchingUsers(queryParams);
    downloadCsv(rows, EXPORT_COLUMNS, "users-export.csv");
  }

  function handleExportRows(rows) {
    downloadCsv(rows, EXPORT_COLUMNS, "users-export-selected.csv");
  }

  async function handleDeleteRows(ids) {
    await setPendingDeleteIds(ids);
    setShowDeleteModal(true);
  }
  function confirmDelete() {
    deleteUsersMutation.mutate(pendingDeleteIds, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setPendingDeleteIds([]);
      },
    });
  }

  return (
    <>
      <div
        className="
    min-h-screen
    bg-gray-50
    dark:bg-gray-950
    p-6
  "
      >
        <div className="mb-6">
          <h1
            className="
    text-2xl
    font-semibold
    text-gray-900
    dark:text-white
  "
          >
            Users
          </h1>

          <p
            className="
    text-sm
    text-gray-500
    dark:text-gray-400
  "
          >
            Manage and browse all employee records.
          </p>
        </div>

        <DataTable
          columns={columns}
          data={data?.users ?? []}
          total={data?.total ?? 0}
          isLoading={isLoading}
          isFetching={isFetching}
          error={error}
          onRefetch={refetch}
          getRowId={(row) => String(row.id)}
          search={params.search}
          onSearchChange={params.setSearch}
          page={params.page}
          pageSize={params.pageSize}
          onPageChange={params.setPage}
          onPageSizeChange={params.setPageSize}
          sorting={sorting}
          onSortingChange={params.setSorting}
          filters={params.filters}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters((v) => !v)}
          onFiltersChange={params.setFilters}
          activeFilterCount={params.activeFilterCount}
          onClearFilters={params.clearFilters}
          onExportAll={handleExportAll}
          onExportRows={handleExportRows}
          onDeleteRows={handleDeleteRows}
          isDeleting={deleteUsersMutation.isPending}
        />
      </div>

      <EditUserModal
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={(updatedUser) => {
          updateUserMutation.mutate(updatedUser, {
            onSuccess: () => {
              setEditingUser(null);
            },
          });
        }}
      />
      <ConfirmModal
        open={showDeleteModal}
        title="Delete users"
        message={`Are you sure you want to delete ${pendingDeleteIds.length} users?`}
        loading={deleteUsersMutation.isPending}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default Users;
