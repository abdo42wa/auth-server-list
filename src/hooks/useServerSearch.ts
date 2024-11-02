import { useCallback,useMemo, useState } from "react";

import type { TServer, TSortOption } from "../types";
import { sortServers } from "../utils/sortServers";

interface IServerSearchControls {
  searchTerm: string;
  sortOption: TSortOption;
  distanceFilter: number | null;
  handleSearchChange: (value: string) => void;
  handleSortChange: (option: TSortOption) => void;
  handleDistanceFilterChange: (value: number | null) => void;
  processedServers: TServer[];
}

export const useServerSearch = (servers?: TServer[]): IServerSearchControls => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<TSortOption>("default");
  const [distanceFilter, setDistanceFilter] = useState<number | null>(null);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSortChange = useCallback(() => (option: TSortOption) => {
    setSortOption(option);
  }, []);

  const handleDistanceFilterChange = useCallback(() => (value: number | null) => {
    setDistanceFilter(value);
  }, []);

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
    sortOption,
    distanceFilter,
    handleSearchChange,
    handleSortChange,
    handleDistanceFilterChange,
    processedServers,
  };
};