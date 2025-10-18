import { type Post } from "@/pages/FeedPage";
import { http } from "@/utils/axios";
import { useEffect, useState } from "react";

export default function useFetchPostPagination() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>();
  const [reload, setReload] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchData();
  }, [reload]);

  async function fetchData() {
    try {
      const response = await http.get(`feed?page=${page}&limit=${limit}`);
      console.log({ response: response.data.posts });
      setPosts(response.data.posts);
    } catch (error) {
      console.log({ error });
    }
  }

  async function applyReload() {
    setReload((r) => r + 1);
  }

  return { setPage, posts, applyReload };
}
