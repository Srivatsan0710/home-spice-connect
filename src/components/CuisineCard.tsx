
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
    navigate(`/discover?region=${encodeURIComponent(cuisine.name)}`);
  };

  return (
    <div 
      className="flex-shrink-0 w-24 text-center cursor-pointer"
      onClick={handleCuisineClick}
    >
      <Card className="overflow-hidden rounded-full w-24 h-24 border-2 border-secondary hover:border-primary transition-all duration-300 relative">
        <img src={cuisine.image} alt={cuisine.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <p className="text-white text-xs font-semibold text-center leading-tight px-1">
            {cuisine.name}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CuisineCard;
