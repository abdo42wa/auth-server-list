import { type TErrorMessage } from "../types";

export const ErrorMessage = ({
  message,
  ariaLabel,
}: TErrorMessage): JSX.Element => (
  <div aria-label={ariaLabel} className="text-red-700">
    {message}
  </div>
);
