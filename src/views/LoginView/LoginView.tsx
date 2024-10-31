import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginHandler } from "../../hooks";
import { LoginContainer } from "../../components";

export const LoginView = () => {
  const { handleLogin, error, token, isLoading } = useLoginHandler();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <LoginContainer
      onSubmit={handleLogin}
      error={error}
      isLoading={isLoading}
    />
  );
};
