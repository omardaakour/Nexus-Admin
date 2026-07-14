import { API_URL } from "./api";

function buildQueryString(params) {
  const searchParams = new URLSearchParams();

  if (params.role) searchParams.set("role", params.role);
  if (params.department) searchParams.set("department", params.department);
  if (
    params.status !== "" &&
    params.status !== undefined &&
    params.status !== null
  )
    searchParams.set("status", params.status);
  if (params.salaryMin) searchParams.set("salary_gte", params.salaryMin);
  if (params.salaryMax) searchParams.set("salary_lte", params.salaryMax);
  if (params.dateFrom)
    searchParams.set("joinDate_gte", new Date(params.dateFrom).toISOString());
  if (params.dateTo)
    searchParams.set("joinDate_lte", new Date(params.dateTo).toISOString());
  if (params.sort) {
    const sortValue = params.order === "desc" ? `-${params.sort}` : params.sort;

    searchParams.set("_sort", sortValue);
  }
  searchParams.set("_page", params.page || 1);
  searchParams.set("_per_page", params.pageSize || 20);
  return searchParams.toString();
}

export async function getUsers(params = {}) {
  const query = buildQueryString(params);

  const response = await fetch(`${API_URL}/users?${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}
export async function getAllMatchingUsers(params = {}) {
  const query = "";
  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}
export async function getUserById(id) {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
}
export async function deleteUsers(ids) {
  const requests = ids.map((id) =>
    fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    }),
  );

  await Promise.all(requests);
}
export async function getFilterOptions() {
  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch filter options");
  }

  const users = await response.json();

  return {
    roles: [...new Set(users.map((user) => user.role))],
    departments: [...new Set(users.map((user) => user.department))],
    statuses: [...new Set(users.map((user) => user.status))],
  };
}
