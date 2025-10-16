import ButtonComponent from "@/components/ButtonComponent";
import { http } from "@/utils/axios";

export default function FeedPage() {
  async function logout() {
    try {
      const response = await http.post("/logout");
      console.log({ response });
    } catch (error) {
      console.log({ error });
    }
  }
  return <ButtonComponent type="button" handleClick={logout} text="Logout" />;
}
