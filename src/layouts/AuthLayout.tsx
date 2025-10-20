import NavigationBar from "@/components/NavigationBar";
import LoginUserContext from "@/contexts/loginUserContext/loginUserContext";
import PostPaginationContext from "@/contexts/postPaginationContext/postPaginationContext";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <LoginUserContext layout="Auth">
      <PostPaginationContext>
        <div>
          <NavigationBar />
          <Outlet />
        </div>
      </PostPaginationContext>
    </LoginUserContext>
  );
}
