import { useState, useRef } from "react";
import type { User } from "@/pages/CallDetails/CallDetails";
import { api } from "@/shared/api/client";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const debounceRef = useRef<number | null>(null);

  const fetchUsers = async (query = "", nextPage = 1, append = false
  ) => {
    append ? setLoadingMore(true) : setInitialLoading(true);

    try {
      const response = query
        ? await api.get("users/search", { params: { q: query, limit: 5, page: nextPage } })
        : await api.get("users", { params: { limit: 5, page: nextPage } });

      const newUsers: User[] = response.data;

      setUsers(prev => (append ? [...prev, ...newUsers] : newUsers));
      setHasMore(newUsers.length === 5);
      setPage(nextPage);
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
    }
  };

  const searchUsers = (value: string) => {
    setSearch(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      fetchUsers(value, 1, false);
    }, 400);
  };

  const reset = () => {
    setUsers([]);
    setSearch("");
    setPage(1);
    setHasMore(true);
  };

  return {
    users,
    search,
    page,
    hasMore,
    initialLoading,
    loadingMore,
    fetchUsers,
    searchUsers,
    reset,
  };
};