import { useEffect, useState, type ReactNode } from "react";
import { PostContext } from "./contextStore";
import type { Post } from "@/pages/FeedPage";
import { http } from "@/utils/axios";

// ---
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function PostPaginationContext({
  children,
}: {
  children: ReactNode;
}) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>();
  const [posts, setPosts] = useState<Post[]>();
  const [reload, setReload] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchData();
  }, [reload, page]);

  async function fetchData() {
    try {
      console.log("PaginationContext");

      const response = await http.get(`feed?page=${page}&limit=${limit}`);

      console.log({ response: response.data });

      console.log({ response: response.data.posts });
      const posts = response?.data?.posts;

      setPosts((previous) => {
        if (page === 1) return posts;
        return [...(previous || []), ...(posts || [])];
      });
      setTotalPage(response?.data?.totalPage);
      return posts;
    } catch (error) {
      console.log({ error });
    }
  }

  function applyReload() {
    setReload((r) => r + 1);
    return;
  }

  const value = {
    posts,
    setPosts,
    setPage,
    applyReload,
    page,
    totalPage,
    fetchData,
  };

  return <PostContext.Provider value={value}> {children}</PostContext.Provider>;
}
