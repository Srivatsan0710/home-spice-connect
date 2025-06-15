
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, User } from "lucide-react";
import { useUserPreferences } from "@/contexts/UserPreferencesContext";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const PersonalizedRecommendations = () => {
  const { preferences } = useUserPreferences();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const recommendedDishes = [
    {
      name: "Ghar Jaisa Rajma",
      cook: "Aunty Priya",
      price: 140,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=400",
      story: "Just like home-made rajma chawal",
      orders: 234,
      isBestVoted: false,
      matchReason: "Matches your preference for North Indian cuisine",
      mealType: "lunch" as const,
      isHomeCook: true
    },
    {
      name: "South Indian Breakfast",
      cook: "Meera Amma",
      price: 110,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=400",
      story: "Traditional idli with sambar and chutney",
      orders: 189,
      isBestVoted: true,
      matchReason: "Popular breakfast choice in your area",
      mealType: "breakfast" as const,
      isHomeCook: true
    }
  ];

  const handleAddToCart = (dish: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      dishName: dish.name,
      cookName: dish.cook,
      price: dish.price,
      image: dish.image
    });
    toast({
      title: "Added to cart!",
      description: `${dish.name} added to your cart`,
    });
  };

  return (
    <section className="mt-6">
      <div className="px-4 mb-4">
        <h2 className="text-xl font-bold font-serif">Recommended for You</h2>
        <p className="text-sm text-muted-foreground">Based on your preferences and location</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4 px-4">
        {recommendedDishes.map((dish) => (
          <Card key={dish.name} className="overflow-hidden rounded-2xl border-secondary shadow-sm">
            <div className="flex">
              <div className="relative flex-shrink-0">
                <img src={dish.image} alt={dish.name} className="h-24 w-24 object-cover" />
                {dish.isBestVoted && (
                  <Badge className="absolute top-1 left-1 bg-yellow-500 text-yellow-900 text-xs">
                    Top Rated
                  </Badge>
                )}
              </div>
              <div className="flex-1 p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm font-serif truncate">{dish.name}</h3>
                    <div className="flex items-center space-x-1 mb-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground truncate">{dish.cook}</p>
                    </div>
                    <p className="text-xs text-blue-600 mb-1">{dish.matchReason}</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium">{dish.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{dish.orders} orders</span>
                    </div>
                    <p className="text-sm font-bold text-primary">₹{dish.price}</p>
                  </div>
                  <div className="flex flex-col space-y-1 ml-2">
                    <Button 
                      size="sm" 
                      className="h-8 px-3 text-xs"
                      onClick={(e) => handleAddToCart(dish, e)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PersonalizedRecommendations;
