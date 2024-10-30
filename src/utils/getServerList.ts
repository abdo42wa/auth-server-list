import axios from "axios";

export const getServerList = async (token: string) => {
  const response = await axios.get("https://playground.tesonet.lt/v1/servers", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
