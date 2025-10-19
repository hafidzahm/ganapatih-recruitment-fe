import ButtonComponent from "@/components/ButtonComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useLoginUserContext from "@/contexts/loginUserContext/useLoginUserContext";
import usePostPaginationContext from "@/contexts/postPaginationContext/usePostPaginationContext";
import { http } from "@/utils/axios";
import { Link } from "react-router";
import TimeAgo from "react-timeago";
import { toast } from "sonner";
import InfiniteScroll from "react-infinite-scroll-component";

export default function FeedPage() {
  const { posts, setPage, page, totalPage } = usePostPaginationContext();

  return (
    <>
      <div className="flex justify-center items-center pt-5">
        <div className="max-w-lg w-full px-5 flex flex-col gap-3 pb-25">
          <InfiniteScroll
            dataLength={10} //This is important field to render the next data
            next={() => setPage(page + 1)}
            hasMore={true}
            loader={<h4>{""}</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Udah paling bawah nih</b>
              </p>
            }
          >
            {posts?.map((post, id) => {
              return <CardStatusComponent key={id} post={post} id={id} />;
            })}
            <p>{page}</p>
            <p>{totalPage}</p>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}

export function CardStatusComponent({ post, id }) {
  const { userId } = useLoginUserContext();
  const { applyReload } = usePostPaginationContext();
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
                  date={new Date(post?.createdat as string).toISOString()}
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
