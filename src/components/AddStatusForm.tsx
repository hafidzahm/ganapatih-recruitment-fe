// ------
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Plus } from "lucide-react";
import {
  statusSchema,
  type StatusSchemaType,
} from "@/utils/schemas/statusSchema";
import { Textarea } from "./ui/textarea";
import { http } from "@/utils/axios";
import { toast } from "sonner";
import { useDialogState } from "@/hooks/useDialogState";
import usePostPaginationContext from "@/contexts/postPaginationContext/usePostPaginationContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import getPosts from "@/services/getPosts";
import type { Post } from "@/pages/FeedPage";
import { queryClient } from "@/contexts/queryPostContext/queryClientProvider";

export default function AddStatusForm() {
  const mutation = useMutation({
    mutationFn: postStatus,
    onSuccess: async () =>
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["users"] }),
        queryClient.invalidateQueries({ queryKey: ["posts"] }),
        queryClient.invalidateQueries({ queryKey: ["userLogin"] }),
      ]),
  });
  const { open, setIsOpen } = useDialogState(false);
  const form = useForm<StatusSchemaType>({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      content: "",
    },
  });
  const inputtedCharacter = form.watch("content").length;
  const remainingChar = 200 - inputtedCharacter;

  const positiveWord =
    inputtedCharacter > 0 && inputtedCharacter <= 200
      ? `${remainingChar} character remaining`
      : inputtedCharacter > 0 && "Maximum character has reached";

  async function postStatus(values: StatusSchemaType) {
    try {
      const response = await http.post("/posts", {
        content: values.content,
      });
      if (response?.status === 201) {
        toast.success("Tweet created!");
      }
      setIsOpen(false);
      form.reset();
      return response;
    } catch (error) {
      console.log({ error });
      setIsOpen(true);
    }
  }
  async function submit(values: StatusSchemaType) {
    mutation.mutate({ content: values.content });
  }
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"neutral"}>
          <Plus />
        </Button>
      </DialogTrigger>
      <Form {...form}>
        <form id="add-status-form" onSubmit={form.handleSubmit(submit)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create tweet</DialogTitle>
              <DialogDescription>Any chits chats today?</DialogDescription>
              <div className="">
                <p className="text-sm">{positiveWord}</p>
              </div>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="h-40 resize-none "
                          placeholder="Any special today?"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="neutral">Cancel</Button>
              </DialogClose>
              <Button type="submit" form="add-status-form">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}
