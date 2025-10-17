import { http } from "@/utils/axios";
import { useEffect, useState } from "react";

export default function useFetchPostPagination() {
  const [page, setPage] = useState(1);
  const [post, setPost] = useState([
    {
      id: "",
      userid: "",
      createdat: "",
      content: "",
    },
  ]);
  const limit = 10;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await http.get(`feed?page=${page}&limit=${limit}`);
      console.log({ response: response.data.posts });
      setPost(response.data.posts);
    } catch (error) {
      console.log({ error });
    }
  }

  return { setPage, post };
}
