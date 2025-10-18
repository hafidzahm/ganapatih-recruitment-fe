import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useSearchPagination from "@/hooks/useSearchPagination";
import { Search } from "lucide-react";
import type { ChangeEvent } from "react";

export default function SearchPage() {
  const { results, setInputSearch, setPage } = useSearchPagination();
  async function search(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    try {
      console.log({ event: event.target.value });

      setInputSearch(event.target.value);
    } catch (error) {
      console.log({ error });
    }
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
        {results.map((result) => {
          return (
            <Card key={result.id}>
              <CardContent>
                <div className="flex flex-row justify-between items-center">
                  <p>{result.username}</p>
                  <Button>Follow</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
