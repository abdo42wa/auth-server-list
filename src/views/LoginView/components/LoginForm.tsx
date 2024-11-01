import { Form, Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { FormField, Loader } from '../../../components';
import { LoginButtonArrowIcon } from '../../../assets/icons';
import { ROUTES } from '../../../constants';
import { useAuth } from '../../../contexts/AuthContext';
import { useEffect } from 'react';
import { TLoginValues } from '../../../types';
import { validationSchema } from './validationSchema';

const initialValues: TLoginValues = {
  username: "",
  password: "",
};

export const LoginForm = () => {
  const { signIn, authToken } = useAuth();
  const navigate = useNavigate();

  const handelSubmit: (values: TLoginValues, formikHelpers: FormikHelpers<TLoginValues>) => void = ({ username, password }, { setSubmitting }) => {
    signIn({
      username,
      password,
      onSuccess: () => {
        setSubmitting(false);
        navigate(ROUTES.SERVER);
      },
      onError: () => {
        setSubmitting(false);
      },
    });
  }

  useEffect(() => {
    navigate(!!authToken ? ROUTES.SERVER : ROUTES.LOGIN);
  }, [authToken]);

  return (
    <Formik initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handelSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-6">
          <FormField
            name="username"
            label="Username"
            placeholder="Your username"
            error={errors.username}
            touched={touched.username}
            disabled={isSubmitting}
          />

          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="******************"
            error={errors.password}
            touched={touched.password}
            disabled={isSubmitting}
          />

          <button
            aria-label="submitButton"
            type="submit"
            disabled={isSubmitting}
            className={`
          w-full flex justify-center items-center py-2 px-4 rounded-2xl font-medium text-white bg-[#4763E4] hover:bg-indigo-600
          ${isSubmitting && "opacity-50 cursor-not-allowed"}
        `}
          >
            {isSubmitting ? (
              <>
                <Loader />
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