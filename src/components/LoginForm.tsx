import { Form, Formik } from "formik";
import type { TLoginValues, TLoginFormProps } from "../types";
import { loginValidationSchema } from "../utils/";
import { FormField, ErrorMessage } from "./";

export const LoginForm = ({ onSubmit, error }: TLoginFormProps) => {
  const initialValues: TLoginValues = {
    username: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <FormField
            name="username"
            label="Username"
            error={errors.username}
            touched={touched.username}
          />

          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            error={errors.password}
            touched={touched.password}
          />

          {error && (
            <ErrorMessage message={error} ariaLabel="formErrorMessage" />
          )}

          <div className="flex justify-between items-center">
            <button
              aria-label="submitButton"
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
            >
              Login
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
