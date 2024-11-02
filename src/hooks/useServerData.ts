import { useQuery } from "react-query";

import { getServerList } from "../services/getServerList";
import { type TServer } from "../types";

export const useServerData = (token: string | null) => {
  return useQuery<TServer[], Error>({
    queryKey: ["servers"],
    queryFn: () => {
      if (!token) throw new Error("No authentication token provided");
      return getServerList(token);
    },
    enabled: !!token,
    staleTime: 60000,
  });
};
