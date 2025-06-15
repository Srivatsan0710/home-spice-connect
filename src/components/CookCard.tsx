
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CookCardProps {
  cook: {
    id: string;
    name: string;
    region: string;
    specialty: string;
    rating: number;
    image: string;
  };
}

const CookCard = ({ cook }: CookCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/cook/${cook.id}`);
  };

  return (
    <Card 
      className="w-48 flex-shrink-0 overflow-hidden rounded-xl border-secondary transition-shadow hover:shadow-lg cursor-pointer"
      onClick={handleClick}
    >
      <img src={cook.image} alt={cook.name} className="h-32 w-full object-cover" />
      <CardContent className="p-3">
        <h3 className="font-bold text-md">{cook.name}</h3>
        <p className="text-sm text-muted-foreground">
          {cook.region} | {cook.specialty}
        </p>
        <div className="flex items-center mt-1">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="ml-1 text-sm font-bold">{cook.rating}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CookCard;
