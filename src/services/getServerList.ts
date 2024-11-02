import axios from "axios";

import { type TServer } from "../types";

export const getServerList = async (token: string) => {

  const response = await axios.get<TServer[]>(process.env.API_SERVICE_URL!, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
