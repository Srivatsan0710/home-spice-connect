
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, MapPin, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cuisines, cooks, dishes } from "@/lib/data";
import CookCard from "@/components/CookCard";
import DishCard from "@/components/DishCard";

const Discover = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<"dishes" | "cooks">("dishes");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  // Set initial cuisine filter from URL params
  useEffect(() => {
    const cuisineParam = searchParams.get('cuisine');
    if (cuisineParam) {
      setSelectedCuisine(cuisineParam);
    }
  }, [searchParams]);

  const filteredDishes = dishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = !selectedCuisine || dish.cook.toLowerCase().includes(selectedCuisine.toLowerCase());
    return matchesSearch && matchesCuisine;
  });

  const filteredCooks = cooks.filter(cook => {
    const matchesSearch = cook.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         cook.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = !selectedCuisine || cook.region.toLowerCase().includes(selectedCuisine.toLowerCase());
    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="pb-16">
      <header className="sticky top-0 z-10 bg-background/80 p-4 backdrop-blur-sm">
        <h1 className="text-2xl font-bold font-serif text-primary mb-4">Discover</h1>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search dishes, cooks, or regions..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex space-x-2 mb-4 overflow-x-auto">
          <Button
            variant={selectedCuisine === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCuisine("")}
          >
            All
          </Button>
          {cuisines.map((cuisine) => (
            <Button
              key={cuisine.name}
              variant={selectedCuisine === cuisine.name ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCuisine(cuisine.name)}
              className="whitespace-nowrap"
            >
              {cuisine.name}
            </Button>
          ))}
        </div>

        <div className="flex space-x-2">
          <Button
            variant={activeTab === "dishes" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("dishes")}
            className="flex-1"
          >
            Dishes
          </Button>
          <Button
            variant={activeTab === "cooks" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("cooks")}
            className="flex-1"
          >
            Cooks
          </Button>
        </div>
      </header>

      <main className="p-4">
        {activeTab === "dishes" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {filteredDishes.length} dishes found
              </h2>
            </div>
            {filteredDishes.map((dish) => (
              <DishCard key={dish.name} dish={dish} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {filteredCooks.length} cooks found
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {filteredCooks.map((cook) => (
                <div key={cook.id} className="w-full">
                  <CookCard cook={cook} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Discover;
