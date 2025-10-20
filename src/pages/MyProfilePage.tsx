import ButtonComponent from "@/components/ButtonComponent";
import Loading from "@/components/Loading";
import { Card, CardContent } from "@/components/ui/card";
import useLoginUserContext from "@/contexts/loginUserContext/useLoginUserContext";
import { http } from "@/utils/axios";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function MyProfilePage() {
  const [loading, setLoading] = useState(false);
  const { username } = useLoginUserContext();
  const navigate = useNavigate();

  async function logout() {
    try {
      setLoading(true);
      const response = await http.get("/logout");
      console.log({ response });
      if (response.status === 200) {
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center pt-5 px-5 ">
      <div className=" flex flex-col gap-6 w-full max-w-lg">
        <Card className="w-full max-w-lg">
          <CardContent>Welcome {username} !</CardContent>
        </Card>
        <ButtonComponent type="button" handleClick={logout} variant={"neutral"}>
          {loading ? (
            <>
              <Loading />
            </>
          ) : (
            <>
              <LogOut /> Logout
            </>
          )}
        </ButtonComponent>
      </div>
    </div>
  );
}
