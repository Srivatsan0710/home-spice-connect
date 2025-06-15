
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DiscoverHeader from "@/components/DiscoverHeader";
import DiscoverFilters from "@/components/DiscoverFilters";
import DiscoverContent from "@/components/DiscoverContent";
import { useDiscoverData } from "@/hooks/useDiscoverData";

const Discover = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("Dishes");
  const [regionFilter, setRegionFilter] = useState(searchParams.get('region') || "all");
  
  const { getFilteredData } = useDiscoverData(filterType, regionFilter === "all" ? "" : regionFilter);

  const filteredData = getFilteredData().filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (filterType !== "Cooks" && 'cook' in item && item.cook && item.cook.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (filterType === "Cooks" && 'specialty' in item && item.specialty && item.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-full bg-secondary/30">
      <DiscoverHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <DiscoverFilters
        filterType={filterType}
        setFilterType={setFilterType}
        regionFilter={regionFilter}
        setRegionFilter={setRegionFilter}
      />
      <DiscoverContent 
        filteredData={filteredData}
        filterType={filterType}
      />
    </div>
  );
};

export default Discover;
