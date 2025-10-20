import type { Post } from "@/pages/FeedPage";
import { createContext } from "react";

export const PostContext = createContext<PostContextType | undefined>(
  undefined
);

export type PostContextType = {
  posts: Post[] | undefined;
  setPosts: React.Dispatch<React.SetStateAction<Post[] | undefined>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  applyReload: () => Promise<void>;
  fetchData: () => Promise<Post[] | []>;
  page: number;
  totalPage: number;
  limit: number;
  isLoading: boolean;
};
