import ButtonComponent from "@/components/ButtonComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useLoginUserContext from "@/contexts/loginUserContext/useLoginUserContext";
import useSearchPagination from "@/hooks/useSearchPagination";
import { http } from "@/utils/axios";
import { AxiosError } from "axios";
import { Search } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/contexts/queryPostContext/queryClientProvider";
import Loading from "@/components/Loading";

export default function SearchPage() {
  const { results, setInputSearch, followeeId } = useSearchPagination();
  const { userId } = useLoginUserContext();
  const [followId, setFollowId] = useState<string | null>(null);
  const [unfollowId, setUnfollowId] = useState<string | null>(null);

  const mutationFollow = useMutation({
    mutationFn: (user: UserApi) => apiFollow(user),

    onSuccess: async () =>
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["users"] }),
        queryClient.invalidateQueries({ queryKey: ["posts"] }),
        queryClient.invalidateQueries({ queryKey: ["userLogin"] }),
      ]),
  });
  const mutationUnfollow = useMutation({
    mutationFn: (user: UserApi) => apiUnfollow(user),
    onSuccess: async () =>
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["users"] }),
        queryClient.invalidateQueries({ queryKey: ["posts"] }),
        queryClient.invalidateQueries({ queryKey: ["userLogin"] }),
      ]),
  });
  async function search(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    try {
      console.log({ event: event.target.value });

      setInputSearch(event.target.value);
    } catch (error) {
      console.log({ error });
    }
  }

  type UserApi = {
    id: string;
    username: string;
  };

  async function apiFollow(user: UserApi) {
    try {
      const response = await http.post(`/follow/${user.id}`);
      console.log({ response });
      if (response.status === 200) {
        toast.success(`You are now following ${user.username}`);
      }
      return response;
    } catch (error) {
      console.log({ errorFollow: error });
      if (error instanceof AxiosError) {
        if (error.status === 400) {
          toast.error(`You can't follow yourself`);
        }
      }
    }
  }
  async function apiUnfollow(user: UserApi) {
    try {
      const response = await http.delete(`/follow/${user.id}`);
      if (response.status === 200) {
        toast.success(`You are now unfollowing ${user.username}`);
      }
      console.log({ response });
    } catch (error) {
      console.log({ errorFollow: error });
    }
  }

  async function follow(user: UserApi) {
    setFollowId(user.id as string);
    mutationFollow.mutate(user, {
      onSettled: () => setFollowId(null),
    });
  }
  async function unfollow(user: UserApi) {
    setUnfollowId(user.id);
    mutationUnfollow.mutate(user, {
      onSettled: () => setUnfollowId(null),
    });
  }
  return (
    <div className="flex flex-col justify-center items-center pt-5 px-5">
      <Button className="max-w-lg flex flex-row h-13 justify-start gap-4 w-full bg-white sticky top-5 z-50 xl:top-20">
        <div>
          <Search />
        </div>
        <Input
          type="text"
          onChange={search}
          placeholder="Search username here..."
        />
      </Button>
      <div className="flex flex-col mt-10 gap-3 w-full max-w-lg">
        {results.map((result, id) => {
          return (
            <Card key={id}>
              <CardContent>
                <div className="flex flex-row justify-between items-center">
                  <p>{result.username}</p>

                  {userId === followeeId[id][0] ? (
                    <ButtonComponent
                      handleClick={() => unfollow(result)}
                      type="button"
                    >
                      {unfollowId === result.id ? <Loading /> : "Unfollow"}
                    </ButtonComponent>
                  ) : (
                    <ButtonComponent
                      handleClick={() => follow(result)}
                      type="button"
                    >
                      {followId === result.id ? <Loading /> : "Follow"}
                    </ButtonComponent>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
