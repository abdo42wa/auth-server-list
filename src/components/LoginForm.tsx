import { Form, Formik } from "formik";
import type { TLoginValues, TLoginFormProps } from "../types";
import { loginValidationSchema } from "../utils";
import { ErrorMessage, SpinnerLoader, FormField } from "./";
import { LoginButtonArrowIcon } from "../icons";

export const LoginForm = ({ onSubmit, error, isLoading }: TLoginFormProps) => {
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
            disabled={isLoading}
          />

          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="******************"
            error={errors.password}
            touched={touched.password}
            disabled={isLoading}
          />

          {error && (
            <ErrorMessage message={error} ariaLabel="formErrorMessage" />
          )}

          <button
            aria-label="submitButton"
            type="submit"
            disabled={isLoading}
            className={`
                w-full flex justify-center items-center py-2 px-4 rounded-2xl font-medium text-white bg-[#4763E4] hover:bg-indigo-600
                ${isLoading && "opacity-50 cursor-not-allowed"}
              `}
          >
            {isLoading ? (
              <>
                <SpinnerLoader />
              </>
            ) : (
              <>
                Login
                <LoginButtonArrowIcon />
              </>
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};
