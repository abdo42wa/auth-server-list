import { Field, Form, Formik } from "formik";
import { object, string } from "yup";

export const Login = () => {
  const validationSchema = object({
    username: string().required("username is required").min(4),
    password: string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-md">
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={() => {
            console.log("submit");
          }}
        >
          {({ errors, touched }) => (
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
                <div
                  aria-label="usernameErrorMessage"
                  className="text-gray-700"
                >
                  {errors.username}
                </div>
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
                <div
                  aria-label="passwordErrorMessage"
                  className="text-gray-700"
                >
                  {errors.password}
                </div>
              )}

              <button
                aria-label="submitButton"
                className="bg-blue-600 hover:bg-blue-700 disable:bg-red-500 text-white font-bold py-3 rounded-2xl w-full mt-6"
                type="submit"
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
