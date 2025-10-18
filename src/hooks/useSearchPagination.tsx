import { http } from "@/utils/axios";
import { useEffect, useState } from "react";

export default function useSearchPagination() {
  const [inputSearch, setInputSearch] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [followeeId, setFolloweeId] = useState([]);
  useEffect(() => {
    fetchData();
  }, [inputSearch]);

  async function fetchData() {
    try {
      const response = await http.get(
        `http://localhost:3000/api/users?&page=${page}&limit=10&search=${inputSearch}`
      );
      console.log({
        response: response.data.users.map((el) => {
          return el.followers?.map((el) => {
            return el.followee_id;
          });
        }),
      });
      setResults(response.data.users);
      setFolloweeId(
        response.data.users.map((el) => {
          return el.followers?.map((el) => {
            return el.followee_id || undefined;
          });
        })
      );
    } catch (error) {
      console.log({ error });
    }
  }

  return { setInputSearch, setPage, results, followeeId };
}
