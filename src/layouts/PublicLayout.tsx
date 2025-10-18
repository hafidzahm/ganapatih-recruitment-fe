import useLoginStatus from "@/hooks/useLoginStatus";
import { Outlet } from "react-router";

export default function PublicLayout() {
  useLoginStatus("Public");
  return (
    <div className="min-w-screen min-h-screen">
      <h1>Public Layout</h1>
      <Outlet />
    </div>
  );
}
