import { useState, useMemo } from "react";
import { useServerData, useAuth } from "../../hooks";
import { type TSortOption } from "../../types";
import { sortServers } from "../../utils";
import { ServerCard, SortSelect } from "../../components";

export const ServerListView = () => {
  const { token, logout } = useAuth();
  const { data: servers, isLoading, error } = useServerData(token);
  const [sortOption, setSortOption] = useState<TSortOption>("distance");

  const sortedServers = useMemo(() => {
    if (!servers) return [];
    return sortServers(servers, sortOption);
  }, [servers, sortOption]);

  if (isLoading) {
    return (
      <div
        aria-label="serversLoader"
        className="flex justify-center items-center h-screen"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div aria-label="serversError" className="text-red-500 text-center p-4">
        Error loading servers: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Server List</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <SortSelect value={sortOption} onChange={setSortOption} />

          <div className="server-list grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto">
            {sortedServers.map((server, index) => (
              <ServerCard key={index} server={server} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
