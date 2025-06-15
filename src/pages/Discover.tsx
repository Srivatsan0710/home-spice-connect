
import Header from "@/components/Header";
import DishCard from "@/components/DishCard";
import CookCard from "@/components/CookCard";
import AdvancedSearch from "@/components/AdvancedSearch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, MapPin } from "lucide-react";
import { useState } from "react";
import { cuisines, cooks } from "@/lib/data";
import BookingDialog from "@/components/BookingDialog";
import { getFestiveBookingInfo, formatBookingDeadline } from "@/utils/bookingUtils";

// Extended dishes data with booking information
const discoverDishes = [
  {
    name: "Butter Chicken",
    cook: "Chef Rajesh",
    price: 280,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=400",
    story: "Rich and creamy North Indian classic",
    orders: 245,
    isBestVoted: true,
    isHomeCook: false
  },
  {
    name: "Homestyle Rajma",
    cook: "Aunty Kumar",
    price: 150,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=400",
    story: "Traditional kidney beans curry",
    orders: 189,
    isBestVoted: false,
    mealType: "lunch" as const,
    isHomeCook: true
  },
  {
    name: "Fresh Idli Sambar",
    cook: "Meera Amma",
    price: 120,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=400",
    story: "Soft idlis with aromatic sambar",
    orders: 156,
    isBestVoted: false,
    mealType: "breakfast" as const,
    isHomeCook: true
  },
  {
    name: "Festive Biryani Special",
    cook: "Chef Amina",
    price: 380,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1563379091339-03246963d913?q=80&w=400",
    story: "Special occasion biryani with premium ingredients",
    orders: 78,
    isBestVoted: true,
    isHomeCook: true,
    isFestive: true,
    bookByDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
  }
];

const Discover = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
    // Handle search functionality
  };

  const filteredDishes = discoverDishes.filter(dish => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "home-cook") return dish.isHomeCook;
    if (selectedFilter === "restaurant") return !dish.isHomeCook;
    if (selectedFilter === "festive") return dish.isFestive;
    return true;
  });

  return (
    <div className="flex flex-col min-h-full bg-secondary/30">
      <Header />
      <main className="flex-1 pb-4">
        {/* Location Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-medium">Bangalore, Karnataka</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Advanced Search */}
        {showFilters && <AdvancedSearch onSearch={handleSearch} />}

        {/* Filter Tabs */}
        <div className="flex space-x-2 p-4 overflow-x-auto">
          {[
            { key: "all", label: "All Dishes" },
            { key: "home-cook", label: "Home Cooked" },
            { key: "restaurant", label: "Restaurant" },
            { key: "festive", label: "Festive Special" }
          ].map(filter => (
            <Button
              key={filter.key}
              variant={selectedFilter === filter.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.key)}
              className="whitespace-nowrap"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Festive Specials Section */}
        {selectedFilter === "all" || selectedFilter === "festive" ? (
          <section className="mb-6">
            <h2 className="text-xl font-bold font-serif px-4 mb-4">🎉 Festive Specials</h2>
            <div className="grid grid-cols-1 gap-4 px-4">
              {discoverDishes
                .filter(dish => dish.isFestive)
                .map(dish => {
                  const festiveBooking = getFestiveBookingInfo(dish.bookByDate!);
                  return (
                    <Card key={dish.name} className="overflow-hidden rounded-2xl border-secondary shadow-sm">
                      <div className="flex">
                        <div className="relative flex-shrink-0">
                          <img src={dish.image} alt={dish.name} className="h-24 w-24 object-cover" />
                          <Badge className="absolute top-1 left-1 bg-red-500 text-white text-xs">
                            Festive
                          </Badge>
                          <Badge className="absolute bottom-1 left-1 bg-amber-600 text-white text-xs">
                            Book by: {formatBookingDeadline(dish.bookByDate!)}
                          </Badge>
                        </div>
                        <div className="flex-1 p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-sm font-serif truncate">{dish.name}</h3>
                              <p className="text-xs text-muted-foreground truncate">by {dish.cook}</p>
                              <p className="text-sm font-bold text-primary mt-2">₹{dish.price}</p>
                            </div>
                            <div className="ml-2">
                              <BookingDialog
                                dishName={dish.name}
                                cookName={dish.cook}
                                price={dish.price}
                                image={dish.image}
                                festiveBooking={festiveBooking}
                              >
                                <Button size="sm" disabled={!festiveBooking.isBookable}>
                                  {festiveBooking.isBookable ? 'Book Now' : 'Booking Closed'}
                                </Button>
                              </BookingDialog>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </section>
        ) : null}

        {/* Dishes Grid */}
        <section>
          <h2 className="text-xl font-bold font-serif px-4 mb-4">Discover Dishes</h2>
          <div className="grid grid-cols-1 gap-4 px-4">
            {filteredDishes
              .filter(dish => !dish.isFestive)
              .map((dish) => (
                <DishCard key={dish.name} dish={dish} />
              ))}
          </div>
        </section>

        {/* Featured Cooks */}
        <section className="mt-8">
          <h2 className="text-xl font-bold font-serif px-4 mb-4">Featured Cooks</h2>
          <div className="flex space-x-4 overflow-x-auto px-4">
            {cooks.slice(0, 5).map((cook) => (
              <CookCard key={cook.name} cook={cook} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Discover;
