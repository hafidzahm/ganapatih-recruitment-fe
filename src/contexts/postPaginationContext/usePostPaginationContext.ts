import { useContext } from "react";
import { PostContext } from "./contextStore";

export default function usePostPaginationContext() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error(
      "usePostPaginationContext must be used within a PostPaginationContext.Provider"
    );
  }
  return context;
}
