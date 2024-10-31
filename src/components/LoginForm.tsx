import { Form, Formik } from "formik";
import type { TLoginValues, TLoginFormProps } from "../types";
import { loginValidationSchema } from "../utils/";
import { FormField, ErrorMessage } from "./";
import { LoginButtonArrowIcon } from "../icons/LoginButtonArrowIcon";

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
        <Form className="space-y-6">
          <FormField
            name="username"
            label="Username"
            placeholder="Your username"
            error={errors.username}
            touched={touched.username}
          />

          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="******************"
            error={errors.password}
            touched={touched.password}
          />

          {error && (
            <ErrorMessage message={error} ariaLabel="formErrorMessage" />
          )}

          <button
            aria-label="submitButton"
            type="submit"
            className="w-full flex justify-center items-center py-2 px-4 rounded-2xl font-medium text-white bg-[#4763E4] hover:bg-indigo-600"
          >
            Login
            <LoginButtonArrowIcon />
          </button>
        </Form>
      )}
    </Formik>
  );
};
