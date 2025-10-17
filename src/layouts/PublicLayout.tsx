import useLoginStatus from "@/hooks/useLoginStatus";
import { Outlet } from "react-router";

export default function PublicLayout() {
  useLoginStatus("Public");
  return (
    <div>
      <h1>Public Layout</h1>
      <Outlet />
    </div>
  );
}
