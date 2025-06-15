import { Filter, MapPin, Clock, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DishCard from "@/components/DishCard";
import CookCard from "@/components/CookCard";
import AdvancedSearch from "@/components/AdvancedSearch";

const cuisineTypes = ["Punjabi", "Bengali", "South Indian", "Gujarati", "Rajasthani", "North Indian"];
const dietaryFilters = ["Vegetarian", "Vegan", "Gluten-Free", "Healthy", "Traditional"];
const priceRanges = ["Under ₹150", "₹150 - ₹300", "₹300 - ₹500", "Above ₹500"];

const mockSearchResults = {
  dishes: [
    {
      name: "Sarson da Saag",
      cook: "Aunty Manjeet",
      price: 180,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1626520245059-54a2a1061b4d?q=80&w=400",
      story: "Traditional Punjabi winter delicacy",
      orders: 145,
      isBestVoted: true,
    },
    {
      name: "Masala Dosa",
      cook: "Meena Amma",
      price: 180,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1668665780325-b06253455de3?q=80&w=400",
      story: "Crispy dosa with spiced potato filling",
      orders: 150,
      isBestVoted: true,
    },
  ],
  cooks: [
    {
      id: "aunty-manjeet",
      name: "Aunty Manjeet",
      region: "Punjab",
      specialty: "Aloo Paratha",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=300",
    },
  ]
};

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"dishes" | "cooks">("dishes");

  const toggleFilter = (filterType: "cuisine" | "dietary", value: string) => {
    if (filterType === "cuisine") {
      setSelectedCuisines(prev => 
        prev.includes(value) 
          ? prev.filter(item => item !== value)
          : [...prev, value]
      );
    } else {
      setSelectedDietary(prev => 
        prev.includes(value) 
          ? prev.filter(item => item !== value)
          : [...prev, value]
      );
    }
  };

  const clearAllFilters = () => {
    setSelectedCuisines([]);
    setSelectedDietary([]);
    setSelectedPriceRange("");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Perform search logic here
  };

  const activeFiltersCount = selectedCuisines.length + selectedDietary.length + (selectedPriceRange ? 1 : 0);

  return (
    <div className="pb-16">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm p-4 border-b">
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex-1">
            <AdvancedSearch 
              onSearch={handleSearch}
              placeholder="Search dishes, cooks, cuisines..."
            />
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
          >
            <Filter className="h-5 w-5" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>Koramangala, Bangalore</span>
          <Badge variant="outline" className="text-xs">Change</Badge>
        </div>
      </header>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-background p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-amber-800">Filters</h3>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          {/* Cuisine Types */}
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-sage-700">Cuisine</h4>
            <div className="flex flex-wrap gap-2">
              {cuisineTypes.map((cuisine) => (
                <Badge
                  key={cuisine}
                  variant={selectedCuisines.includes(cuisine) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedCuisines.includes(cuisine) 
                      ? "bg-amber-600 text-white" 
                      : "text-sage-700 hover:bg-sage-100"
                  }`}
                  onClick={() => toggleFilter("cuisine", cuisine)}
                >
                  {cuisine}
                </Badge>
              ))}
            </div>
          </div>

          {/* Dietary Preferences */}
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-sage-700">Dietary</h4>
            <div className="flex flex-wrap gap-2">
              {dietaryFilters.map((dietary) => (
                <Badge
                  key={dietary}
                  variant={selectedDietary.includes(dietary) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedDietary.includes(dietary) 
                      ? "bg-amber-600 text-white" 
                      : "text-sage-700 hover:bg-sage-100"
                  }`}
                  onClick={() => toggleFilter("dietary", dietary)}
                >
                  {dietary}
                </Badge>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-sage-700">Price Range</h4>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range) => (
                <Badge
                  key={range}
                  variant={selectedPriceRange === range ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedPriceRange === range 
                      ? "bg-amber-600 text-white" 
                      : "text-sage-700 hover:bg-sage-100"
                  }`}
                  onClick={() => setSelectedPriceRange(selectedPriceRange === range ? "" : range)}
                >
                  {range}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Results Tabs */}
      <div className="p-4">
        <div className="flex space-x-1 bg-sage-50 rounded-lg p-1 mb-4">
          {["dishes", "cooks"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-background text-amber-800 shadow-sm"
                  : "text-sage-600 hover:text-amber-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="space-y-3">
          {activeTab === "dishes" && (
            <>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-amber-800">Dishes ({mockSearchResults.dishes.length})</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>30-45 mins</span>
                </div>
              </div>
              {mockSearchResults.dishes.map((dish, index) => (
                <DishCard key={index} dish={dish} />
              ))}
            </>
          )}

          {activeTab === "cooks" && (
            <>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-amber-800">Cooks ({mockSearchResults.cooks.length})</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4" />
                  <span>Highly Rated</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {mockSearchResults.cooks.map((cook, index) => (
                  <CookCard key={index} cook={cook} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* No Results State */}
        {searchQuery && (
          <Card className="mt-6">
            <CardContent className="p-6 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-amber-800 mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                Try searching for different dishes, cooks, or cuisines
              </p>
              <Button variant="outline" onClick={clearAllFilters}>
                Clear filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
