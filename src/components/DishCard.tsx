
import { Star, Clock, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BookingDialog from "./BookingDialog";

interface Dish {
  name: string;
  cook: string;
  price: number;
  rating: number;
  image: string;
  story: string;
  orders: number;
  isBestVoted: boolean;
  mealType?: 'breakfast' | 'lunch' | 'dinner';
  isHomeCook?: boolean;
}

interface DishCardProps {
  dish: Dish;
}

const DishCard = ({ dish }: DishCardProps) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
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

  const handleCardClick = () => {
    const dishSlug = dish.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/dish/${dishSlug}`);
  };

  return (
    <Card 
      className="overflow-hidden rounded-2xl border-secondary shadow-sm cursor-pointer hover:shadow-md transition-shadow"
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
          {dish.isHomeCook && (
            <Badge className="absolute bottom-1 left-1 bg-green-500 text-white text-xs">
              Home Cook
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
              {dish.isHomeCook ? (
                <BookingDialog
                  dishName={dish.name}
                  cookName={dish.cook}
                  price={dish.price}
                  image={dish.image}
                  mealType={dish.mealType}
                >
                  <Button size="sm" className="h-8 px-3 text-xs">
                    Book
                  </Button>
                </BookingDialog>
              ) : (
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  className="h-8 px-3 text-xs"
                >
                  Add
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DishCard;
