
import { Heart, Clock, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUserPreferences } from "@/contexts/UserPreferencesContext";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const mockPersonalizedDishes = [
  {
    name: "Punjabi Dal Makhani",
    cook: "Aunty Manjeet",
    price: 220,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=400",
    story: "Rich and creamy black lentils slow-cooked for 8 hours",
    matchReason: "Matches your Punjabi cuisine preference",
    spiceLevel: "medium",
    dietaryTags: ["Vegetarian"],
  },
  {
    name: "Gluten-Free Quinoa Bowl",
    cook: "Health Chef Priya",
    price: 280,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400",
    story: "Nutritious quinoa bowl with fresh vegetables",
    matchReason: "Perfect for your gluten-free diet",
    spiceLevel: "mild",
    dietaryTags: ["Gluten-Free", "Vegan"],
  },
];

const PersonalizedRecommendations = () => {
  const { preferences } = useUserPreferences();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddToCart = (dish: typeof mockPersonalizedDishes[0], e: React.MouseEvent) => {
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

  const handleDishClick = (dish: typeof mockPersonalizedDishes[0]) => {
    const dishSlug = dish.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/dish/${dishSlug}`);
  };

  // Filter dishes based on user preferences
  const filteredDishes = mockPersonalizedDishes.filter(dish => {
    // Check dietary restrictions
    if (preferences.dietaryRestrictions.length > 0) {
      const hasMatchingDietary = preferences.dietaryRestrictions.some(restriction =>
        dish.dietaryTags.includes(restriction)
      );
      if (hasMatchingDietary) return true;
    }

    // Check spice level
    if (preferences.spiceLevel && dish.spiceLevel === preferences.spiceLevel) {
      return true;
    }

    // Default to showing all if no specific preferences
    return preferences.dietaryRestrictions.length === 0;
  });

  if (filteredDishes.length === 0) {
    return null;
  }

  return (
    <Card className="mx-4 mb-4">
      <CardHeader>
        <CardTitle className="text-lg text-amber-800 flex items-center">
          <Heart className="h-5 w-5 mr-2 text-rose-500" />
          Just For You
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {filteredDishes.map((dish, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-3 bg-sage-50 rounded-lg cursor-pointer hover:bg-sage-100 transition-colors"
            onClick={() => handleDishClick(dish)}
          >
            <img 
              src={dish.image} 
              alt={dish.name} 
              className="h-16 w-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm truncate">{dish.name}</h3>
              <p className="text-xs text-sage-600 truncate">by {dish.cook}</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-medium">{dish.rating}</span>
                </div>
                <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                  {dish.matchReason}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm font-bold text-amber-700">₹{dish.price}</p>
                <Button
                  size="sm"
                  onClick={(e) => handleAddToCart(dish, e)}
                  className="h-7 px-3 text-xs"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PersonalizedRecommendations;
