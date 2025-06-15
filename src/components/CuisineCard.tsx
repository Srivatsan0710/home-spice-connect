
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface CuisineCardProps {
  cuisine: {
    name: string;
    image: string;
  };
}

const CuisineCard = ({ cuisine }: CuisineCardProps) => {
  const navigate = useNavigate();

  const handleCuisineClick = () => {
    navigate(`/discover?cuisine=${encodeURIComponent(cuisine.name)}`);
  };

  return (
    <div 
      className="flex-shrink-0 w-24 text-center cursor-pointer"
      onClick={handleCuisineClick}
    >
      <Card className="overflow-hidden rounded-full w-24 h-24 border-2 border-secondary hover:border-primary transition-all duration-300">
        <img src={cuisine.image} alt={cuisine.name} className="w-full h-full object-cover" />
      </Card>
      <p className="mt-2 text-sm font-semibold text-center break-words leading-tight px-1">
        {cuisine.name}
      </p>
    </div>
  );
};

export default CuisineCard;
