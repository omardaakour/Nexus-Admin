import { useSearchParams } from "react-router-dom";

export function useTableSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  function setSearch(value) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  }

  return {
    search,
    setSearch,
  };
}
