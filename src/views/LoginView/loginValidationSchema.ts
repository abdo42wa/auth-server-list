import { object, string } from "yup";

export const loginValidationSchema = object({
  username: string().required("username is required").min(4),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
