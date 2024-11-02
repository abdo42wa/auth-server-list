export const Loader = () => {
  return (
    <div
      aria-label="loader"
      className="flex justify-center items-center"
    >
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>
  );
};
