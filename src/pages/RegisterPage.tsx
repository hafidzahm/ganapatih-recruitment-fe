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
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router";

export default function RegisterPage() {
  const navigate = useNavigate();
  const form = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function submitRegister(values: AuthSchemaType) {
    console.log(values);
    try {
      const response = await http.post("/register", {
        username: values.username,
        password: values.password,
      });
      console.log({ response });

      if (response.status === 201) {
        navigate("/login");
        return toast.success(
          `Account with username ${response.data.username} created successfully. Lets login with registered account`
        );
      }
    } catch (error) {
      console.log({ error });
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  }
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center">
      <Form {...form}>
        <Card className="w-full max-w-sm">
          <form onSubmit={form.handleSubmit(submitRegister)}>
            <CardHeader>
              <CardTitle>Register your account</CardTitle>
              <CardDescription>
                Enter your username and password below to register to your
                account
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
              <ButtonComponent
                type="submit"
                text="Register"
                className="w-full"
              />

              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to={"/login"} className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </Form>
    </div>
  );
}
