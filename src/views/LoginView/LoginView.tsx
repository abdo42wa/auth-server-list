import { Field, Form, Formik } from "formik";
import { loginValidationSchema } from "../../utils/loginValidationSchema";
import { ErrorMessage } from "../../components/ErrorMessage";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../utils/getAuthToken";
import { type TLoginValues } from "../../types/types";

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
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-md">
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          {({ errors, touched, values }) => (
            <Form>
              <label
                aria-label="emailLabel"
                className="block text-gray-700 text-md font-bold mb-3"
              >
                Username:
              </label>
              <Field
                aria-label="usernameField"
                name="username"
                className="rounded-lg w-full py-4 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              />
              {errors.username && touched.username && (
                <ErrorMessage
                  message={errors.username}
                  ariaLabel="usernameErrorMessage"
                />
              )}

              <label
                aria-label="passwordLabel"
                className="block text-gray-700 text-md font-bold mb-3 mt-4"
              >
                Password:
              </label>
              <Field
                aria-label="passwordField"
                name="password"
                type="password"
                className="rounded-lg w-full py-4 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              />
              {errors.password && touched.password && (
                <ErrorMessage
                  message={errors.password}
                  ariaLabel="passwordErrorMessage"
                />
              )}
              {error && (
                <ErrorMessage message={error} ariaLabel="formErrorMessage" />
              )}
              <button
                aria-label="submitButton"
                className="bg-blue-600 hover:bg-blue-700 disable:bg-red-500 text-white font-bold py-3 rounded-2xl w-full mt-6"
                type="submit"
                onClick={() => handleLogin(values)}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
