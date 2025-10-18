import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import usePostPaginationContext from "@/contexts/postPaginationContext/usePostPaginationContext";
import { useEffect } from "react";
import { Link } from "react-router";

export default function FeedPage() {
  const { posts, setPage, applyReload } = usePostPaginationContext();

  useEffect(() => {
    applyReload();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center pt-5">
        <div className="max-w-lg w-full px-5 flex flex-col gap-3 pb-25">
          {posts?.map((post, id) => {
            return (
              <Card key={id} className="">
                <CardHeader className="">
                  <CardTitle className="text-sm font-medium">
                    <Link to={`/`} className="hover:underline">
                      @{post?.username}
                    </Link>
                    <span className="text-muted-foreground text-xs ml-2">
                      {new Date(post?.createdat as string).toLocaleString()}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 w-full">
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
