import { useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../service/getAuthToken";
import { type TLoginValues } from "../types";

export const useLoginHandler = () => {
  const { login, token } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (values: TLoginValues) => {
    try {
      setError(null);
      const token = await getAuthToken(values);

      login(token);

      navigate("/");
    } catch (err) {
      setError("Wrong email and password combination!");
    }
  };

  return {
    handleLogin,
    error,
    token,
  };
};
