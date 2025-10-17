import useLoginStatus from "@/hooks/useLoginStatus";
import { Outlet } from "react-router";

export default function AuthLayout() {
  useLoginStatus("Auth");
  return (
    <div>
      <h1>Auth Layout</h1>
      <Outlet />
    </div>
  );
}
