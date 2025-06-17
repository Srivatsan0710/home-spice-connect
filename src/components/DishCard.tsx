
import { Star, Clock, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface DishCardProps {
  dish: {
    name: string;
    cook: string;
    price: number;
    rating: number;
    image: string;
    story: string;
    orders: number;
    isBestVoted: boolean;
    isHomeCook?: boolean;
    mealType?: 'breakfast' | 'lunch' | 'dinner';
    hasSubscription?: boolean;
    availableMeals?: string[];
  };
}

const DishCard = ({ dish }: DishCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Create a safe dish slug and navigate to dish detail with overlay
    const dishSlug = dish.name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single
    
    // Always open as overlay for dish cards
    navigate(`/dish/${dishSlug}?overlay=true`, { 
      state: { 
        dish: dish,
        dishName: dish.name,
        cookName: dish.cook,
        price: dish.price,
        rating: dish.rating,
        image: dish.image,
        story: dish.story
      }
    });
  };

  return (
    <Card 
      className="overflow-hidden rounded-2xl border-secondary shadow-sm cursor-pointer transition-shadow hover:shadow-lg"
      onClick={handleCardClick}
    >
      <div className="flex">
        <div className="relative flex-shrink-0">
          <img src={dish.image} alt={dish.name} className="h-24 w-24 object-cover" />
          {dish.isBestVoted && (
            <Badge className="absolute top-1 left-1 bg-yellow-500 text-yellow-900 text-xs">
              Top Rated
            </Badge>
          )}
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm font-serif truncate">{dish.name}</h3>
              <div className="flex items-center space-x-1 mb-1">
                <User className="h-3 w-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground truncate">{dish.cook}</p>
              </div>
              
              {/* Available Meals */}
              {dish.availableMeals && dish.availableMeals.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-1">
                  {dish.availableMeals.map((meal) => (
                    <Badge key={meal} variant="outline" className="text-xs px-1 py-0">
                      {meal}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-medium">{dish.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{dish.orders} orders</span>
              </div>
              <p className="text-lg font-bold text-primary">₹{dish.price}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DishCard;
