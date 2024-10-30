import { TErrorMessage } from "./type";

export const ErrorMessage = ({
  message,
  ariaLabel,
}: TErrorMessage): JSX.Element => {
  return (
    <div aria-label={ariaLabel} className="text-red-700">
      {message}
    </div>
  );
};
