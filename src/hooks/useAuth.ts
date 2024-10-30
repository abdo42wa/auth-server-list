import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { TAuthContextType } from "../types/types";

export const useAuth = (): TAuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
