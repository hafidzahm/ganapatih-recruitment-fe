"use server";
import { http } from "@/utils/axios";

import { type NavigateFunction } from "react-router";
import { toast } from "sonner";

export async function logout(navigate: NavigateFunction) {
  try {
    const response = await http.get("/logout");
    console.log({ response });
    if (response.status === 200) {
      navigate("/login");
      toast.success("Bye bye, come back later!");
    }
  } catch (error) {
    console.log({ error });
  }
}
