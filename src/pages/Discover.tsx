
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, MapPin, Star, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { dishes, cooks } from "@/lib/data";
import BookingDialog from "@/components/BookingDialog";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const festiveSpecials = [
  {
    name: "Diwali Special Thali",
    cook: "Aunty Manjeet",
    price: 450,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=400",
    story: "Traditional Diwali feast with sweets and savory delights",
    orders: 234,
    isBestVoted: false,
    festival: "Diwali"
  },
  {
    name: "Christmas Plum Cake",
    cook: "Meena Amma",
    price: 350,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=400",
    story: "Homemade Christmas cake with traditional spices",
    orders: 189,
    isBestVoted: true,
    festival: "Christmas"
  }
];

const regionalCuisines = {
  "South Indian": [
    {
      name: "Coconut Rice",
      cook: "Meera Amma",
      price: 130,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=400",
      story: "Fragrant coconut rice with curry leaves",
      orders: 145,
      isBestVoted: false
    }
  ],
  "Bengali": [
    {
      name: "Fish Curry",
      cook: "Dida",
      price: 180,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=400",
      story: "Traditional Bengali fish curry with rice",
      orders: 167,
      isBestVoted: true
    }
  ],
  "Punjabi": [
    {
      name: "Butter Chicken",
      cook: "Aunty Kumar",
      price: 220,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=400",
      story: "Rich and creamy butter chicken",
      orders: 289,
      isBestVoted: true
    }
  ]
};

const Discover = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("Dishes");
  const [regionFilter, setRegionFilter] = useState(searchParams.get('region') || "");
  const { getTotalItems, getTotalPrice } = useCart();
  const { toast } = useToast();

  const getFilteredData = () => {
    switch (filterType) {
      case "Festive Specials":
        return festiveSpecials;
      case "Cooks":
        return cooks;
      case "Dishes":
      default:
        if (regionFilter && regionalCuisines[regionFilter as keyof typeof regionalCuisines]) {
          return regionalCuisines[regionFilter as keyof typeof regionalCuisines];
        }
        return dishes;
    }
  };

  const filteredData = getFilteredData().filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.cook && item.cook.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCartClick = () => {
    if (getTotalItems() > 0) {
      window.location.href = '/checkout';
    } else {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart first",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-secondary/30">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search dishes, cooks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {getTotalItems() > 0 && (
              <Button onClick={handleCartClick} className="relative">
                Cart ({getTotalItems()})
                <Badge className="ml-2">₹{getTotalPrice()}</Badge>
              </Button>
            )}
          </div>
          
          {/* Filters */}
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
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Regions</SelectItem>
                  <SelectItem value="South Indian">South Indian</SelectItem>
                  <SelectItem value="Bengali">Bengali</SelectItem>
                  <SelectItem value="Punjabi">Punjabi</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 gap-4">
          {filteredData.map((item) => (
            <Card key={item.name} className="overflow-hidden rounded-2xl border-secondary shadow-sm">
              <div className="flex">
                <div className="relative flex-shrink-0">
                  <img src={item.image} alt={item.name} className="h-24 w-24 object-cover" />
                  {item.isBestVoted && (
                    <Badge className="absolute top-1 left-1 bg-yellow-500 text-yellow-900 text-xs">
                      Top Rated
                    </Badge>
                  )}
                </div>
                <div className="flex-1 p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm font-serif truncate">{item.name}</h3>
                      {item.cook && (
                        <div className="flex items-center space-x-1 mb-1">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground truncate">{item.cook}</p>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs font-medium">{item.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{item.orders} orders</span>
                      </div>
                      <p className="text-sm font-bold text-primary">₹{item.price}</p>
                    </div>
                    <div className="flex flex-col space-y-1 ml-2">
                      {filterType === "Dishes" || filterType === "Festive Specials" ? (
                        <BookingDialog
                          dishName={item.name}
                          cookName={item.cook || "Chef"}
                          price={item.price}
                          image={item.image}
                          hasSubscription={true}
                        >
                          <Button size="sm" className="h-8 px-3 text-xs">
                            Book
                          </Button>
                        </BookingDialog>
                      ) : (
                        <Button size="sm" className="h-8 px-3 text-xs">
                          View
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
