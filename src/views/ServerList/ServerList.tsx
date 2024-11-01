import { ErrorMessage } from "../../components";
import { Filters } from "./components/Filters";
import { useServerSearch } from "../../hooks/useServerSearch";
import { ServerRow } from "./components/ServerRow";
import { useAuth } from "../../contexts/AuthContext";
import { Loader } from "../../components/Loader";
import { useServerData } from "../../hooks/useServerData";

export const ServerList = () => {
  const { authToken } = useAuth();
  const { data: servers, isLoading, error } = useServerData(authToken);

  const {
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    distanceFilter,
    setDistanceFilter,
    processedServers,
  } = useServerSearch(servers);

  if (isLoading) {
    return <Loader />;
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <Filters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOption={sortOption}
        onSortChange={setSortOption}
        distanceFilter={distanceFilter}
        onDistanceFilterChange={setDistanceFilter}
      />
      {processedServers.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No servers found. Try adjusting your search or filter.
        </div>
      ) : (
        <div className="server-list grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto">
          {processedServers.map((server, index) => (
            <ServerRow key={index + server.name} server={server} />
          ))}
        </div>
      )}
    </div>
  );
};
