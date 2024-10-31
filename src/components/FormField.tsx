import { Field } from "formik";
import { ErrorMessage } from "./";

interface IFormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  touched?: boolean;
}

export const FormField = ({
  name,
  label,
  type = "text",
  placeholder,
  error,
  touched,
}: IFormFieldProps) => (
  <div className="mb-4">
    <label
      aria-label={`${name}Label`}
      className="block text-gray-700 font-medium mb-2"
    >
      {label}
    </label>
    <Field
      aria-label={`${name}Field`}
      name={name}
      type={type}
      placeholder={placeholder}
      className="border border-gray-300 rounded-2xl px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#4763E4]"
    />
    {error && touched && (
      <ErrorMessage message={error} ariaLabel={`${name}ErrorMessage`} />
    )}
  </div>
);
