
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, Heart } from "lucide-react";
import { Button } from "./ui/button";

interface DishCardProps {
  dish: {
    name: string;
    cook: string;
    price: number;
    rating: number;
    image: string;
  };
}

const DishCard = ({ dish }: DishCardProps) => {
  return (
    <Card className="overflow-hidden rounded-2xl border-secondary shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative">
        <img src={dish.image} alt={dish.name} className="h-40 w-full object-cover" />
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/70 rounded-full h-8 w-8">
            <Heart className="h-4 w-4 text-primary" />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg font-serif">{dish.name}</h3>
        <p className="text-sm text-muted-foreground">by {dish.cook}</p>
        <div className="flex items-center mt-2">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="ml-1 text-sm font-bold">{dish.rating}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <p className="text-lg font-bold text-primary">₹{dish.price}</p>
        <Button size="sm">Add to cart</Button>
      </CardFooter>
    </Card>
  );
};

export default DishCard;
