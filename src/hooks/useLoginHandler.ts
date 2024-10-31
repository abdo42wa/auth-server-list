import { useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../service/getAuthToken";
import { TLoginValues } from "../types";

export const useLoginHandler = () => {
  const { login, token } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values: TLoginValues) => {
    try {
      setError(null);
      setIsLoading(true);

      const token = await getAuthToken(values);

      login(token);

      navigate("/");
    } catch (err) {
      setError("Wrong email and password combination!");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    error,
    token,
    isLoading,
  };
};
