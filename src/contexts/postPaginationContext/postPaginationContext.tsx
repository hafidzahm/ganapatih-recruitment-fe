import { useEffect, useState, type ReactNode } from "react";
import { PostContext } from "./contextStore";
import type { Post } from "@/pages/FeedPage";
import { http } from "@/utils/axios";

export default function PostPaginationContext({
  children,
}: {
  children: ReactNode;
}) {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>();
  const [reload, setReload] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchData();
  }, [reload]);

  async function fetchData() {
    try {
      console.log("PaginationContext");

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

  const value = {
    posts,
    setPosts,
    setPage,
    applyReload,
  };

  return <PostContext.Provider value={value}> {children}</PostContext.Provider>;
}
