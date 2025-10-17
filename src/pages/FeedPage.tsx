import ButtonComponent from "@/components/ButtonComponent";
import { http } from "@/utils/axios";
import { useEffect } from "react";

export default function FeedPage() {
  useEffect(() => {
    fetchPost();
  }, []);
  async function fetchPost() {
    try {
      const response = await http.get("/feed?page=1&limit=2");
      console.log({ response });
    } catch (error) {
      console.log({ error });
    }
  }
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
