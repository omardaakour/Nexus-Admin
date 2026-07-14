import { useSearchParams } from "react-router-dom";

export function useTableParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);
  const sort = searchParams.get("sort") || "";
  const order = searchParams.get("order") || "";
  const role = searchParams.get("role") || "";
  const department = searchParams.get("department") || "";
  const status = searchParams.get("status") || "";
  const salaryMin = searchParams.get("salaryMin") || "";
  const salaryMax = searchParams.get("salaryMax") || "";
  const dateFrom = searchParams.get("dateFrom") || "";

  const dateTo = searchParams.get("dateTo") || "";
  const columns = searchParams.get("columns") || "";
  function setColumns(value) {
    setParams({
      columns: value || undefined,
    });
  }
  function setColumnVisibility(columns) {
    setParams({
      columns: columns || undefined,
    });
  }
  function setParams(updates) {
    const params = new URLSearchParams(searchParams);
    let shouldResetPage = false;
    for (const [key, value] of Object.entries(updates)) {
      if (key !== "page") shouldResetPage = true;
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    if (shouldResetPage && !("page" in updates)) {
      params.set("page", "1");
    }
    setSearchParams(params);
  }

  function clearFilters() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (pageSize !== 20) params.set("pageSize", String(pageSize));
    setSearchParams(params);
  }

  // Thin, purpose-named wrappers around setParams. These exist so call
  // sites read as intent ("setPage(3)") instead of raw object literals,
  // without splitting pagination/sorting/filters into separate hooks that
  // would each own a slice of the same URL and risk drifting out of sync.
  function setSearch(value) {
    setParams({ search: value || undefined });
  }

  function setPage(page) {
    setParams({ page: page > 1 ? String(page) : undefined });
  }

  function setPageSize(pageSize) {
    setParams({ pageSize: String(pageSize), page: undefined });
  }

  function setSorting(sortState) {
    const next = sortState[0];

    setParams({
      sort: next?.id || "",
      order: next ? (next.desc ? "desc" : "asc") : "",
      page: 1,
    });
  }
  function setFilters(filters) {
    setParams(filters);
  }

  const filters = {
    role,
    department,
    status,
    salaryMin,
    salaryMax,
    dateFrom,
    dateTo,
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return {
    search,
    page,
    pageSize,
    sort,
    order,
    role,
    department,
    status,
    salaryMin,
    salaryMax,
    dateFrom,
    dateTo,
    filters,
    activeFilterCount,
    setParams,
    setSearch,
    setPage,
    setPageSize,
    setSorting,
    setFilters,
    clearFilters,
    columns,
    setColumnVisibility,
    setColumns,
  };
}
