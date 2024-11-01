import { LoginIcon } from "../../assets/icons";

import { LoginForm } from "./components/LoginForm";

export const Login = () => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="w-full max-w-lg p-8">
        <div className="flex justify-center mb-6">
          <LoginIcon />
        </div>
        <h2 className="text-xl mb-6 text-center text-gray-800">
          Please enter your login information
        </h2>
        <LoginForm />
      </div>
    </div>
  );
};
