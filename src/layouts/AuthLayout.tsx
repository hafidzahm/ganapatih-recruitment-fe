import NavigationBar from "@/components/NavigationBar";
import useLoginStatus from "@/hooks/useLoginStatus";
import { Outlet } from "react-router";

export default function AuthLayout() {
  useLoginStatus("Auth");
  return (
    <div>
      <NavigationBar />

      <Outlet />
    </div>
  );
}
