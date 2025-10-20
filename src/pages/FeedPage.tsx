import ButtonComponent from "@/components/ButtonComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useLoginUserContext from "@/contexts/loginUserContext/useLoginUserContext";
import usePostPaginationContext from "@/contexts/postPaginationContext/usePostPaginationContext";
import { http } from "@/utils/axios";
import { Link } from "react-router";
import TimeAgo from "react-timeago";
import { toast } from "sonner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/contexts/queryPostContext/queryClientProvider";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeedPage() {
  const { posts, setPage, page, totalPage, isLoading } =
    usePostPaginationContext();
  const { userId, following } = useLoginUserContext();

  function nextPage() {
    setPage((prev) => {
      return (prev += 1);
    });
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center pt-5">
        <div className="max-w-lg w-full px-5 flex flex-col gap-3 pb-25">
          <div className="sticky top-5 z-50 xl:top-20">
            {(following?.length as number) < 1 && (
              <>
                {!isLoading && (
                  <>
                    <AlertNoFollowing />
                  </>
                )}
              </>
            )}
          </div>

          <InfiniteScroll
            dataLength={posts?.length ?? 0} //This is important field to render the next data
            next={nextPage}
            hasMore={page < totalPage}
            loader={<h4>{""}</h4>}
            endMessage={
              !isLoading &&
              (following?.length as number) > 1 && (
                <p className="text-center pt-5">
                  <b>Whehehe you reached the limit :)</b>
                </p>
              )
            }
          >
            <div className="flex flex-col gap-6">
              {posts?.map((post, id) => {
                return <CardStatusComponent key={id} post={post} id={id} />;
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}

export function CardStatusComponent({ post, id }) {
  const { userId } = useLoginUserContext();
  const { isLoading } = usePostPaginationContext();

  const mutation = useMutation({
    mutationFn: unfollowApi,
    onSuccess: async () =>
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["users"] }),
        queryClient.invalidateQueries({ queryKey: ["posts"] }),
        queryClient.invalidateQueries({ queryKey: ["userLogin"] }),
      ]),
  });

  async function unfollowApi(user) {
    const response = await http.delete(`/follow/${user.userid}`);

    if (response.status === 200) {
      toast.success(`You are now unfollowing ${user.username}`);
    }
    console.log({ response });
    return response;
  }
  async function unfollow(user) {
    mutation.mutate(user);
  }
  return (
    <Card key={id} className="">
      <CardHeader className="">
        <CardTitle className="text-sm font-medium">
          <div className="flex flex-row justify-between items-center">
            <div>
              {isLoading ? (
                <>
                  {" "}
                  <Skeleton className="h-4 min-w-20" />
                </>
              ) : (
                <>
                  {" "}
                  <Link to={`/`} className="hover:underline">
                    @{post?.username}
                  </Link>
                </>
              )}

              <div>
                {isLoading ? (
                  <>
                    <Skeleton className="h-4 min-w-10" />
                  </>
                ) : (
                  <>
                    {" "}
                    <TimeAgo
                      live={true}
                      date={new Date(post?.createdat as string).toISOString()}
                    />
                  </>
                )}
              </div>
            </div>

            {post?.userid !== userId ? (
              <>
                {isLoading ? (
                  <>
                    <Skeleton className="h-10 bg-green-400 sm:w-[200px] w-[100px]" />
                  </>
                ) : (
                  <>
                    <ButtonComponent
                      handleClick={() => unfollow(post)}
                      text="Unfollow"
                    />
                  </>
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 text-xl text-bold w-full">
        {isLoading ? (
          <>
            {" "}
            <Skeleton className="h-5 w-60" />
            <Skeleton className="h-5 w-60" />
            <Skeleton className="h-5 w-60" />
            <Skeleton className="h-5 w-60" />
            <Skeleton className="h-5 w-60" />
          </>
        ) : (
          <>
            {" "}
            <p className="text-justify whitespace-normal break-words">
              {post?.content}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export type Post =
  | {
      id: string;
      content: string;
      createdat: string;
      userid: string;
      username: string;
    }
  | undefined;

export function AlertNoFollowing() {
  return (
    <Alert>
      <CheckCircle2Icon />

      <AlertDescription>
        You is not following anyone yet. Seek a friend on Discover Tab to see
        their status.
      </AlertDescription>
    </Alert>
  );
}
