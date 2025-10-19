import ButtonComponent from "@/components/ButtonComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useLoginUserContext from "@/contexts/loginUserContext/useLoginUserContext";
import usePostPaginationContext from "@/contexts/postPaginationContext/usePostPaginationContext";
import { http } from "@/utils/axios";
import { useEffect } from "react";
import { Link } from "react-router";
import TimeAgo from "react-timeago";
import { toast } from "sonner";

export default function FeedPage() {
  const { posts, setPage, applyReload } = usePostPaginationContext();
  const { userId } = useLoginUserContext();

  useEffect(() => {
    applyReload();
  }, []);

  async function unfollow(user) {
    try {
      const response = await http.delete(`/follow/${user.userid}`);

      if (response.status === 200) {
        toast.success(`You are now unfollowing ${user.username}`);
        applyReload();
      }
      console.log({ response });
    } catch (error) {
      console.log({ errorFollow: error });
    }
  }

  return (
    <>
      <div className="flex justify-center items-center pt-5">
        <div className="max-w-lg w-full px-5 flex flex-col gap-3 pb-25">
          {posts?.map((post, id) => {
            return (
              <Card key={id} className="">
                <CardHeader className="">
                  <CardTitle className="text-sm font-medium">
                    <div className="flex flex-row justify-between items-center">
                      <div>
                        <Link to={`/`} className="hover:underline">
                          @{post?.username}
                        </Link>
                        <div>
                          <TimeAgo
                            live={true}
                            date={new Date(
                              post?.createdat as string
                            ).toISOString()}
                          />
                        </div>
                      </div>
                      {post?.userid !== userId ? (
                        <>
                          <ButtonComponent
                            handleClick={() => unfollow(post)}
                            text="Unfollow"
                          />
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-xl text-bold w-full">
                  <p className="text-justify whitespace-normal break-words">
                    {post?.content}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
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
