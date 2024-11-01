type TErrorMessage = {
  message: string;
  ariaLabel: string;
};

export const ErrorMessage = ({ message, ariaLabel }: TErrorMessage) => (
  <div aria-label={ariaLabel} className="text-red-700">
    {message}
  </div>
);
