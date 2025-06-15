
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DiscoverFiltersProps {
  filterType: string;
  setFilterType: (type: string) => void;
  regionFilter: string;
  setRegionFilter: (region: string) => void;
}

const DiscoverFilters = ({ filterType, setFilterType, regionFilter, setRegionFilter }: DiscoverFiltersProps) => {
  return (
    <div className="px-4 pb-4">
      <div className="flex space-x-2 overflow-x-auto pb-2">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Dishes">Dishes</SelectItem>
            <SelectItem value="Festive Specials">Festive Specials</SelectItem>
            <SelectItem value="Cooks">Cooks</SelectItem>
          </SelectContent>
        </Select>
        
        {filterType === "Dishes" && (
          <Select value={regionFilter || "all"} onValueChange={(value) => setRegionFilter(value === "all" ? "" : value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="South Indian">South Indian</SelectItem>
              <SelectItem value="Bengali">Bengali</SelectItem>
              <SelectItem value="Punjabi">Punjabi</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

export default DiscoverFilters;
