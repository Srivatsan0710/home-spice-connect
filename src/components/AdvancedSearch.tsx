
import { useState, useEffect } from "react";
import { Search, Clock, TrendingUp, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AdvancedSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const AdvancedSearch = ({ onSearch, placeholder = "Search dishes, cooks, cuisines..." }: AdvancedSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Biryani", "Masala Dosa", "Aunty Manjeet"
  ]);

  const trendingSearches = [
    "Punjabi Thali", "South Indian", "Bengali Fish", "Gujarati Snacks"
  ];

  const autocompleteSuggestions = [
    "Aloo Paratha Special",
    "Sarson da Saag",
    "Masala Dosa",
    "Hyderabadi Biryani",
    "Kosha Mangsho",
    "Aunty Manjeet",
    "Meena Amma",
    "Mala Di"
  ].filter(item => 
    searchQuery && item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Add to recent searches
      setRecentSearches(prev => {
        const updated = [query, ...prev.filter(item => item !== query)].slice(0, 5);
        return updated;
      });
      onSearch(query);
      setShowSuggestions(false);
      setSearchQuery("");
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
        />
      </div>

      {showSuggestions && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-80 overflow-y-auto">
          <CardContent className="p-4">
            {/* Autocomplete suggestions */}
            {autocompleteSuggestions.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Suggestions</h4>
                <div className="space-y-2">
                  {autocompleteSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                      onClick={() => handleSearch(suggestion)}
                    >
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent searches */}
            {recentSearches.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Recent</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearRecentSearches}
                    className="h-auto p-1 text-xs"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSearch(search)}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Trending searches */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Trending</h4>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((trend, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => handleSearch(trend)}
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {trend}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdvancedSearch;
