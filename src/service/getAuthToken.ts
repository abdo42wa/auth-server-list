import axios from "axios";
import { type TLoginValues } from "../types";

export const getAuthToken = async (values: TLoginValues): Promise<string> => {
  const response = await axios.post<{ token: string }>(
    process.env.API_AUTH_URL!,
    values,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data.token;
};
