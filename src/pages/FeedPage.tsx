import ButtonComponent from "@/components/ButtonComponent";
import { http } from "@/utils/axios";
import { useNavigate } from "react-router";

export default function FeedPage() {
  const navigate = useNavigate();

  async function logout() {
    try {
      const response = await http.get("/logout");
      console.log({ response });
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log({ error });
    }
  }
  return <ButtonComponent type="button" handleClick={logout} text="Logout" />;
}
