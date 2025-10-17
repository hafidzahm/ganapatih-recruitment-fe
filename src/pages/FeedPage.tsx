import ButtonComponent from "@/components/ButtonComponent";
import useFetchPostPagination from "@/hooks/useDataPagination";
import { logout } from "@/services/AuthService";
import { useNavigate } from "react-router";

export default function FeedPage() {
  const navigate = useNavigate();
  const { post, setPage } = useFetchPostPagination();

  return (
    <ButtonComponent
      type="button"
      handleClick={() => logout(navigate)}
      text="Logout"
    />
  );
}
