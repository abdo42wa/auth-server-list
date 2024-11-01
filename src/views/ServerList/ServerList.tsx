import { ErrorMessage } from "../../components";
import { Filters } from "./components/Filters";
import { useServerSearch } from "../../hooks/useServerSearch";
import { ServerRow } from "./components/ServerRow";
import { useAuth } from "../../contexts/AuthContext";
import { Loader } from "../../components/Loader";
import { useServerData } from "../../hooks/useServerData";
import { ROUTES } from "../../constants";
import { useNavigate } from "react-router-dom";

export const ServerList = () => {
  const { authToken, signOut } = useAuth();
  const { data: servers, isLoading, error } = useServerData(authToken);
  const navigate = useNavigate();

  const {
    searchTerm,
    sortOption,
    distanceFilter,
    handleSearchChange,
    handleSortChange,
    handleDistanceFilterChange,
    processedServers,
  } = useServerSearch(servers);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    if ((error as any).response?.status === 401) {
      signOut(() => {
        navigate(ROUTES.LOGIN);
      });
      return (
        <ErrorMessage
          ariaLabel="authError"
          message="Your session has expired. Please log in again."
        />
      );
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Filters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        sortOption={sortOption}
        onSortChange={handleSortChange}
        distanceFilter={distanceFilter}
        onDistanceFilterChange={handleDistanceFilterChange}
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
