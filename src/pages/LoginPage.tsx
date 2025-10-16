import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ButtonComponent from "@/components/ButtonComponent";
import { authSchema, type AuthSchemaType } from "@/utils/schemas/loginSchema";
import { http } from "@/utils/axios";

export default function LoginPage() {
  const form = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function submitLogin(values: AuthSchemaType) {
    console.log(values);
    try {
      const response = await http.post("/login", {
        username: values.username,
        password: values.password,
      });
      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center">
      <Form {...form}>
        <Card className="w-full max-w-sm">
          <form onSubmit={form.handleSubmit(submitLogin)}>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2 pt-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Input your username here..."
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Input your password here..."
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 pt-6">
              <ButtonComponent type="submit" text="Login" className="w-full" />
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </CardFooter>
          </form>
        </Card>
      </Form>
    </div>
  );
}
