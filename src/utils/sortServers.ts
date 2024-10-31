import type { TServer, TSortOption } from "../types";

export const sortServers = (
  servers: TServer[],
  sortOption: TSortOption
): TServer[] => {
  return [...servers].sort((a, b) => {
    if (sortOption === "distance") {
      return a.distance === b.distance
        ? a.name.localeCompare(b.name)
        : a.distance - b.distance;
    }
    return a.name.localeCompare(b.name);
  });
};
