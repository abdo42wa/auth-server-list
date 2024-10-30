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
