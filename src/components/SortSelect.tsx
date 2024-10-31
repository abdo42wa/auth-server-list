import { type TSortOption } from "../types";

interface ISortSelectProps {
  value: TSortOption;
  onChange: (value: TSortOption) => void;
}

export const SortSelect = ({ value, onChange }: ISortSelectProps) => (
  <div className="mb-4">
    <label className="mr-2 font-medium">Sort by:</label>
    <select
      aria-label="sortByList"
      value={value}
      onChange={(e) => onChange(e.target.value as TSortOption)}
      className="p-2 border rounded-md"
    >
      <option value="distance">Distance</option>
      <option value="name">Name</option>
    </select>
  </div>
);
