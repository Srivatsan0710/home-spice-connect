
import { Star, Clock, Heart, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUserPreferences } from "@/contexts/UserPreferencesContext";
import { useNavigate } from "react-router-dom";

interface Dish {
  name: string;
  cook: string;
  price: number;
  rating: number;
  image: string;
  cuisine: string;
  preparationTime: string;
  isVegetarian?: boolean;
  spiceLevel: string;
}

const mockRecommendations: Dish[] = [
  {
    name: "Butter Chicken",
    cook: "Chef Priya",
    price: 280,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=400",
    cuisine: "North Indian",
    preparationTime: "35 mins",
    spiceLevel: "medium",
  },
  {
    name: "Paneer Tikka Masala",
    cook: "Aunty Sunita",
    price: 220,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=400",
    cuisine: "Punjabi",
    preparationTime: "30 mins",
    isVegetarian: true,
    spiceLevel: "mild",
  },
  {
    name: "Masala Dosa",
    cook: "Meena Amma",
    price: 180,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1668665780325-b06253455de3?q=80&w=400",
    cuisine: "South Indian",
    preparationTime: "25 mins",
    isVegetarian: true,
    spiceLevel: "medium",
  },
];

const PersonalizedRecommendations = () => {
  const { preferences } = useUserPreferences();
  const navigate = useNavigate();

  // Filter recommendations based on user preferences
  const filteredRecommendations = mockRecommendations.filter(dish => {
    // Filter by dietary restrictions
    if (preferences.dietaryRestrictions.includes("Vegetarian") && !dish.isVegetarian) {
      return false;
    }
    
    // Filter by favorite cuisines (if any selected)
    if (preferences.favoriteCuisines.length > 0 && 
        !preferences.favoriteCuisines.includes(dish.cuisine)) {
      return false;
    }
    
    // Filter by spice level preference
    const spiceLevels = ["mild", "medium", "hot", "very-hot"];
    const userSpiceIndex = spiceLevels.indexOf(preferences.spiceLevel);
    const dishSpiceIndex = spiceLevels.indexOf(dish.spiceLevel);
    
    // Only show dishes at or below user's spice tolerance
    if (dishSpiceIndex > userSpiceIndex) {
      return false;
    }
    
    return true;
  });

  const handleDishClick = (dishName: string) => {
    navigate(`/dish/${encodeURIComponent(dishName)}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-amber-600" />
          <span>Recommended for You</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredRecommendations.slice(0, 3).map((dish, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-sage-50 cursor-pointer transition-colors"
              onClick={() => handleDishClick(dish.name)}
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-amber-800">{dish.name}</h4>
                <p className="text-sm text-sage-600">by {dish.cook}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-sage-600">{dish.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-sage-500" />
                    <span className="text-xs text-sage-600">{dish.preparationTime}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {dish.cuisine}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-amber-700">₹{dish.price}</p>
                <Button size="sm" variant="outline" className="mt-1">
                  <Heart className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredRecommendations.length === 0 && (
          <div className="text-center py-4">
            <p className="text-sage-600">No recommendations match your preferences yet.</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => navigate('/settings')}>
              Update Preferences
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalizedRecommendations;
