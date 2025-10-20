import LoginUserContext from "@/contexts/loginUserContext/loginUserContext";
import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <LoginUserContext layout="Public">
      <div className="min-w-screen min-h-screen">
        <Outlet />
      </div>
    </LoginUserContext>
  );
}
