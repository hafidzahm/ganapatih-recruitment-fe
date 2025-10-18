import { http } from "@/utils/axios";
import { AxiosError } from "axios";
import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { UserContext } from "./contextStore";

type Props = {
  children: ReactNode;
  layout?: "Public" | "Auth";
};

export default function LoginUserContext({
  children,
  layout = "Public",
}: Props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    let mounted = true;
    (async function checkLogin() {
      try {
        // publik
        const response = await http.get("/login");
        const getMyProfile = await http.get("/me");
        const username = getMyProfile.data.user.username;
        const id = getMyProfile.data.user.id;
        if (!mounted) return;
        setUsername(username);
        setUserId(id);
        if (layout === "Public" && response.status === 200) {
          console.info({ layout, status: response.status });
          navigate("/feed"); // ada token
          toast.info(`Welcome back, ${username}`);
        }
      } catch (error) {
        //   console.log({ error });
        if (error instanceof AxiosError) {
          // layout auth
          if (layout === "Auth" && error.status === 401) {
            console.warn({ layout, status: error.status });
            navigate("/login"); // ga ada token
            toast.error("You must login first");
          }
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [layout, navigate]);

  const value = {
    username,
    userId,
  };
  // always return the provider (consumers will read username/userId)
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
