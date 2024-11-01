import { useState, useMemo } from "react";
import { TServer, TSortOption } from "../types";
import { sortServers } from "../utils";

export const useServerSearch = (servers: TServer[] | undefined) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<TSortOption>("Sort-by");
  const [distanceFilter, setDistanceFilter] = useState<number | null>(null);

  const processedServers = useMemo(() => {
    if (!servers) return [];

    const filteredServers = servers.filter(
      (server) =>
        server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        server.distance.toString().includes(searchTerm)
    );

    const distanceFilteredServers = distanceFilter
      ? filteredServers.filter((server) => server.distance <= distanceFilter)
      : filteredServers;

    return sortServers(distanceFilteredServers, sortOption);
  }, [servers, searchTerm, sortOption, distanceFilter]);

  return {
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    distanceFilter,
    setDistanceFilter,
    processedServers,
  };
};
