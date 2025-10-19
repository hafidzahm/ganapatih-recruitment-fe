import type { User } from "@/types/user.type";
import { http } from "@/utils/axios";
import { useEffect, useState } from "react";

type Follower = {
  followee_id?: string;
};

type UserSearchResult = {
  id: string;
  username: string;
  followers?: Follower[];
  // allow other fields returned by the API
  [key: string]: any;
};

type UseSearchPaginationReturn = {
  setInputSearch: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  results: UserSearchResult[];
  followeeId: (string | undefined)[][];
  fetchData: () => Promise<UserSearchResult[] | []>;
};

export default function useSearchPagination() {
  const [inputSearch, setInputSearch] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [followeeId, setFolloweeId] = useState<(string | undefined)[][]>([]);
  const [fetchPageSearch, setFetchPageSearch] = useState(1);
  useEffect(() => {
    fetchData();
  }, [inputSearch, fetchPageSearch]);

  async function fetchData() {
    try {
      const response = await http.get(
        `/users?&page=${page}&limit=10&search=${inputSearch}`
      );
      // normalize results
      const users = (response.data.users as UserSearchResult[]) || [];
      setResults(users);
      setFolloweeId(
        users.map((el) => {
          return (
            el.followers?.map((f) => {
              return f.followee_id || undefined;
            }) ?? []
          );
        })
      );
      return users;
    } catch (error) {
      console.log({ error });
      return [];
    }
  }

  async function refetchPageSearch() {
    setFetchPageSearch((r) => (r += 1));
  }
  const values = {
    setInputSearch,
    setPage,
    results,
    followeeId,
    fetchData,
  } as UseSearchPaginationReturn;

  return values;
}
