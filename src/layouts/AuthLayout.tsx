import NavigationBar from "@/components/NavigationBar";
import LoginUserContext from "@/contexts/loginUserContext/loginUserContext";
import PostPaginationContext from "@/contexts/postPaginationContext/postPaginationContext";
import { queryClient } from "@/contexts/queryPostContext/queryClientProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function AuthLayout() {
  return (
    <LoginUserContext layout="Auth">
      <PostPaginationContext>
        <div>
          <NavigationBar />
          <Outlet />
        </div>
      </PostPaginationContext>
      <ReactQueryDevtools initialIsOpen={false} />
    </LoginUserContext>
  );
}
