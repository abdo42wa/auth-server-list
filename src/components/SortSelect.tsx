import { type TSortOption } from "../types";

interface ISortSelectProps {
  value: TSortOption;
  onChange: (value: TSortOption) => void;
}

export const SortSelect = ({ value, onChange }: ISortSelectProps) => (
  <div>
    <label className="mr-2 font-medium text-[#4763E4]">Sort by:</label>
    <select
      aria-label="sortByList"
      value={value}
      onChange={(e) => onChange(e.target.value as TSortOption)}
      className="p-2 border rounded-md text-[#4763E4]"
    >
      <option value="distance">Distance</option>
      <option value="name">Name</option>
    </select>
  </div>
);
