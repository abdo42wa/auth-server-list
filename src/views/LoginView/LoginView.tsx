import { Field, Form, Formik } from "formik";
import { loginValidationSchema } from "./loginValidationSchema";
import { ErrorMessage } from "../../components/ErrorMessage";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../service/getAuthToken";
import { type TLoginValues } from "../../types/types";
import { LoginIcon } from "../../icons/LoginIcon";

export const LoginView = () => {
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

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <LoginIcon />
        </div>
        <h2 className="text-2xl font-bold mb-4">
          Please enter your login information
        </h2>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched, values }) => (
            <Form>
              <div className="mb-4">
                <label
                  aria-label="emailLabel"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Username:
                </label>
                <Field
                  aria-label="usernameField"
                  name="username"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
                {errors.username && touched.username && (
                  <ErrorMessage
                    message={errors.username}
                    ariaLabel="usernameErrorMessage"
                  />
                )}
              </div>
              <div className="mb-4">
                <label
                  aria-label="passwordLabel"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Password:
                </label>
                <Field
                  aria-label="passwordField"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
                {errors.password && touched.password && (
                  <ErrorMessage
                    message={errors.password}
                    ariaLabel="passwordErrorMessage"
                  />
                )}
              </div>
              {error && (
                <ErrorMessage message={error} ariaLabel="formErrorMessage" />
              )}
              <div className="flex justify-between items-center mb-4">
                <button
                  aria-label="submitButton"
                  type="submit"
                  onClick={() => handleLogin(values)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
