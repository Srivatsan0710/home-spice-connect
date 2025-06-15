
import { Star, Clock, Award, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Highlight {
  type: "featured" | "trending" | "new" | "award";
  title: string;
  subtitle: string;
  description: string;
  image: string;
  rating?: number;
  preparationTime?: string;
  price?: number;
  actionText: string;
  actionLink: string;
}

interface HighlightCardProps {
  highlight?: Highlight;
  dish?: {
    name: string;
    cook: string;
    price: number;
    rating: number;
    image: string;
    story: string;
    orders: number;
    isBestVoted: boolean;
  };
  label?: string;
  icon?: React.ReactNode;
}

const HighlightCard = ({ highlight, dish, label, icon }: HighlightCardProps) => {
  const navigate = useNavigate();

  // If dish prop is provided, create highlight from dish data
  const displayData = highlight || (dish ? {
    type: dish.isBestVoted ? "award" : "featured" as const,
    title: dish.name,
    subtitle: `by ${dish.cook}`,
    description: dish.story,
    image: dish.image,
    rating: dish.rating,
    price: dish.price,
    actionText: "View Details",
    actionLink: `/dish/${dish.name.toLowerCase().replace(/\s+/g, '-')}`
  } : null);

  if (!displayData) return null;

  const getIcon = () => {
    if (icon) return icon;
    
    switch (displayData.type) {
      case "featured":
        return <Star className="h-5 w-5 text-yellow-500" />;
      case "trending":
        return <TrendingUp className="h-5 w-5 text-red-500" />;
      case "award":
        return <Award className="h-5 w-5 text-purple-500" />;
      default:
        return <Star className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBadgeColor = () => {
    switch (displayData.type) {
      case "featured":
        return "bg-yellow-100 text-yellow-800";
      case "trending":
        return "bg-red-100 text-red-800";
      case "new":
        return "bg-green-100 text-green-800";
      case "award":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative">
        <img
          src={displayData.image}
          alt={displayData.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className={`${getBadgeColor()} flex items-center space-x-1`}>
            {getIcon()}
            <span className="capitalize">{label || displayData.type}</span>
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-bold text-lg text-amber-800 mb-1">{displayData.title}</h3>
          <p className="text-sm text-sage-600 mb-2">{displayData.subtitle}</p>
          <p className="text-sm text-sage-700">{displayData.description}</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {displayData.rating && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{displayData.rating}</span>
              </div>
            )}
            {displayData.preparationTime && (
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-sage-500" />
                <span className="text-sm text-sage-600">{displayData.preparationTime}</span>
              </div>
            )}
          </div>
          {displayData.price && (
            <span className="font-bold text-amber-700">₹{displayData.price}</span>
          )}
        </div>

        <Button
          className="w-full"
          onClick={() => navigate(displayData.actionLink)}
        >
          {displayData.actionText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default HighlightCard;
