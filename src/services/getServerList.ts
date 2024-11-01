import axios from "axios";

export const getServerList = async (token: string) => {

  const response = await axios.get(process.env.API_SERVICE_URL!, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
