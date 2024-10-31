export type TServer = {
  name: string;
  distance: number;
};

export type TAuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export type TLoginValues = {
  username: string;
  password: string;
};

export type TLoginFormProps = {
  onSubmit: (values: TLoginValues) => Promise<void>;
  error: string | null;
};

export type TErrorMessage = {
  message: string;
  ariaLabel: string;
};

export type TSortOption = "name" | "distance";
