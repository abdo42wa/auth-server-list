import { LoginIcon } from "../icons/LoginIcon";
import { type TLoginValues } from "../types";
import { LoginForm } from "./";

interface ILoginContainerProps {
  onSubmit: (values: TLoginValues) => Promise<void>;
  error: string | null;
}

export const LoginContainer = ({ onSubmit, error }: ILoginContainerProps) => (
  <div className="flex justify-center items-center h-screen bg-gray-50">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-center mb-6">
        <LoginIcon />
      </div>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Please enter your login information
      </h2>
      <LoginForm onSubmit={onSubmit} error={error} />
    </div>
  </div>
);
