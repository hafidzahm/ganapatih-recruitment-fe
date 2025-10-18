import type { Post } from "@/pages/FeedPage";
import { http } from "@/utils/axios";
import { createContext, useEffect, useState, type ReactNode } from "react";

const PostContext = createContext<PostContextType | undefined>(undefined);

type PostContextType = {
  posts: Post[] | undefined;
  setPosts: React.Dispatch<React.SetStateAction<Post[] | undefined>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  applyReload: () => Promise<void>;
};

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
