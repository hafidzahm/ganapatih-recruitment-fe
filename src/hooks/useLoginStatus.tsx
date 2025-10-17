import { http } from "@/utils/axios";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function useLoginStatus(layout: "Public" | "Auth") {
  const navigate = useNavigate();
  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    try {
      //publik
      const response = await http.get("/login");
      const getMyProfile = await http.get("/me");
      const username = getMyProfile.data.user.username;
      //   console.log({ username });
      //   console.log({ response }, "<-----Axios");
      if (layout === "Public" && response.status === 200) {
        console.info({ layout, status: response.status });
        navigate("/feed"); //ada token
        toast.info(`Welcome back, ${username}`);
      }
    } catch (error) {
      //   console.log({ error });
      if (error instanceof AxiosError) {
        //layout auth
        if (layout === "Auth" && error.status === 401) {
          console.warn({ layout, status: error.status });
          navigate("/login"); //ga ada token
          toast.error("You must login first");
        }
      }
    }
  }
  return;
}
