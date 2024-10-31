import { useState, useMemo } from "react";
import { useServerData, useAuth } from "../../hooks";
import { type TSortOption } from "../../types";
import { sortServers } from "../../utils";
import {
  ErrorMessage,
  ServerCard,
  ServersLoader,
  SortSelect,
} from "../../components";

export const ServerListView = () => {
  const { token, logout } = useAuth();
  const { data: servers, isLoading, error } = useServerData(token);
  const [sortOption, setSortOption] = useState<TSortOption>("distance");

  const sortedServers = useMemo(() => {
    if (!servers) return [];
    return sortServers(servers, sortOption);
  }, [servers, sortOption]);

  if (isLoading) {
    return <ServersLoader />;
  }

  if (error) {
    return (
      <ErrorMessage
        ariaLabel="serversError"
        message="Failed to load Services please try again later"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#4763E4]">Server List</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Server List</h1>
            <SortSelect value={sortOption} onChange={setSortOption} />
          </div>
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
