import ButtonComponent from "@/components/ButtonComponent";
import { http } from "@/utils/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function FeedPage() {
  const navigate = useNavigate();
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
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log({ error });
    }
  }
  return <ButtonComponent type="button" handleClick={logout} text="Logout" />;
}
