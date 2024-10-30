import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "react-query";
import { getServerList } from "../../utils/getServerList";
import { TServer } from "../../types/types";

export const ServersList = () => {
  const { token, logout } = useAuth();
  const [sortOption, setSortOption] = useState<"name" | "distance">("distance");

  const {
    data: servers,
    isLoading,
    error,
  } = useQuery<TServer[]>("servers", () => getServerList(token!), {
    enabled: !!token,
    staleTime: 60000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading servers</div>;

  const sortedServers = [...(servers ?? [])].sort((a, b) => {
    if (sortOption === "distance") {
      return a.distance === b.distance
        ? a.name.localeCompare(b.name)
        : a.distance - b.distance;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  const handleLogout = () => {
    logout();
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as "name" | "distance");
  };

  return (
    <div className="display">
      <h1>Hello</h1>
      <button onClick={handleLogout}>Logout</button>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-md p-4 max-h-[650px] overflow-y-auto w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Server List</h2>

          <div className="mb-4">
            <label className="mr-2 font-medium">Sort by:</label>
            <select
              aria-label="sortByList"
              value={sortOption}
              onChange={handleSortChange}
              className="p-2 border rounded-md"
            >
              <option value="distance">Distance</option>
              <option value="name">Name</option>
            </select>
          </div>

          <div className="server-list grid grid-cols-1 gap-4">
            {sortedServers.map((server, index) => (
              <div
                aria-label="server"
                key={index}
                className="server bg-gray-100 rounded-md p-2 flex items-center"
              >
                <div className="server-info flex items-center">
                  <h3 className="text-lg font-medium mr-2">{server.name}</h3>
                  <span className="text-gray-500 text-sm">
                    {server.distance} km
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
