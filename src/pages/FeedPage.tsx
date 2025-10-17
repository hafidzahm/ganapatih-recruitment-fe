import ButtonComponent from "@/components/ButtonComponent";
import useFetchPostPagination from "@/hooks/useDataPagination";
import { http } from "@/utils/axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function FeedPage() {
  const navigate = useNavigate();
  const { post, setPage } = useFetchPostPagination();

  async function logout() {
    try {
      const response = await http.get("/logout");
      console.log({ response });
      if (response.status === 200) {
        navigate("/login");
        toast.success("Bye bye, come back later!");
      }
    } catch (error) {
      console.log({ error });
    }
  }
  return <ButtonComponent type="button" handleClick={logout} text="Logout" />;
}
