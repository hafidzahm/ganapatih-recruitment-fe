import NavigationBar from "@/components/NavigationBar";
import LoginUserContext from "@/contexts/loginUserContext/loginUserContext";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <LoginUserContext layout="Auth">
      <div>
        <NavigationBar />
        <Outlet />
      </div>
    </LoginUserContext>
  );
}
