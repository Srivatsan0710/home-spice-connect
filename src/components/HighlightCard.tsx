
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
  highlight: Highlight;
}

const HighlightCard = ({ highlight }: HighlightCardProps) => {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (highlight.type) {
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
    switch (highlight.type) {
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
          src={highlight.image}
          alt={highlight.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className={`${getBadgeColor()} flex items-center space-x-1`}>
            {getIcon()}
            <span className="capitalize">{highlight.type}</span>
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-bold text-lg text-amber-800 mb-1">{highlight.title}</h3>
          <p className="text-sm text-sage-600 mb-2">{highlight.subtitle}</p>
          <p className="text-sm text-sage-700">{highlight.description}</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {highlight.rating && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{highlight.rating}</span>
              </div>
            )}
            {highlight.preparationTime && (
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-sage-500" />
                <span className="text-sm text-sage-600">{highlight.preparationTime}</span>
              </div>
            )}
          </div>
          {highlight.price && (
            <span className="font-bold text-amber-700">₹{highlight.price}</span>
          )}
        </div>

        <Button
          className="w-full"
          onClick={() => navigate(highlight.actionLink)}
        >
          {highlight.actionText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default HighlightCard;
