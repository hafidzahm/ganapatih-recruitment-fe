import ButtonComponent from "@/components/ButtonComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useLoginUserContext from "@/contexts/loginUserContext/useLoginUserContext";
import useSearchPagination from "@/hooks/useSearchPagination";
import { http } from "@/utils/axios";
import { AxiosError } from "axios";
import { Search } from "lucide-react";
import { useEffect, type ChangeEvent } from "react";
import { toast } from "sonner";
import type { Post } from "./FeedPage";
import { useMutation, useQuery } from "@tanstack/react-query";
import usePostPaginationContext from "@/contexts/postPaginationContext/usePostPaginationContext";
import { queryClient } from "@/contexts/queryPostContext/queryClientProvider";
import type { User } from "@/types/user.type";

export default function SearchPage() {
  const { results, setInputSearch, setPage, followeeId } =
    useSearchPagination();
  const { userId } = useLoginUserContext();

  const mutationFollow = useMutation({
    mutationFn: (user) => apiFollow(user),

    onSuccess: async () =>
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["users"] }),
        queryClient.invalidateQueries({ queryKey: ["posts"] }),
      ]),
  });
  const mutationUnfollow = useMutation({
    mutationFn: (user) => apiUnfollow(user),
    onSuccess: async () =>
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["users"] }),
        queryClient.invalidateQueries({ queryKey: ["posts"] }),
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

  async function apiFollow(user) {
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
  async function apiUnfollow(user) {
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

  async function follow(user) {
    mutationFollow.mutate(user);
  }
  async function unfollow(user) {
    mutationUnfollow.mutate(user);
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
                      text="Unfollow"
                      type="button"
                    />
                  ) : (
                    <ButtonComponent
                      handleClick={() => follow(result)}
                      text="Follow"
                      type="button"
                    />
                  )}
                </div>
                {/* <p>{userId}</p>
                <p>{followeeId[id]}</p> */}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
