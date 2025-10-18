import { useContext } from "react";
import { UserContext } from "./contextStore";

export default function useLoginUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useLoginUserContext must be used within a UserContext.Provider"
    );
  }
  return context;
}
