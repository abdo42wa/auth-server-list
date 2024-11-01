import { useState } from "react";
import { TSortOption } from "../../../types";
import { FilterIcon, SearchIcon } from "../../../assets/icons";
import { SortSelect } from "./SortSelect";

interface IFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortOption: TSortOption;
  onSortChange: (option: TSortOption) => void;
  distanceFilter: number | null;
  onDistanceFilterChange: (distance: number | null) => void;
}

export const Filters = ({
  searchTerm,
  onSearchChange,
  sortOption,
  onSortChange,
  distanceFilter,
  onDistanceFilterChange,
}: IFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="mb-4 space-y-4">
      <div className="flex items-center justify-between space-x-2">
        <h1 className="text-2xl font-bold ">Server List</h1>
        <div className="flex  items-center ">
          <SortSelect onChange={onSortChange} value={sortOption} />
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 ml-3 "
          >
            <FilterIcon />
          </button>
        </div>
      </div>

      {isFilterOpen && (
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-2">
          <div className="flex items-center space-x-2">
            <label className="font-medium text-[#4763E4] flex-none">
              Max Distance (km):
            </label>
            <input
              type="number"
              value={distanceFilter || ""}
              onChange={(e) => {
                const value = e.target.value
                  ? parseInt(e.target.value, 10)
                  : null;
                onDistanceFilterChange(value);
              }}
              placeholder="Enter max distance"
              className="p-2 border rounded-md grow focus:outline-none focus:ring-1 focus:ring-[#4763E4]"
            />
            {distanceFilter && (
              <button
                onClick={() => onDistanceFilterChange(null)}
                className="text-red-500 hover:text-red-700"
              >
                <div className="text-gray-400"> X</div>
              </button>
            )}
          </div>
        </div>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search for server"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-[#4763E4]"
        />
      </div>
    </div>
  );
};
