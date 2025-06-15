
import { Star, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface DiscoverItem {
  name: string;
  cook?: string;
  specialty?: string;
  price?: number;
  rating: number;
  image: string;
  story?: string;
  orders?: number;
  isBestVoted?: boolean;
  festival?: string;
}

interface DiscoverContentProps {
  filteredData: DiscoverItem[];
  filterType: string;
}

const DiscoverContent = ({ filteredData, filterType }: DiscoverContentProps) => {
  const navigate = useNavigate();

  const handleItemClick = (item: DiscoverItem) => {
    if (filterType === "Dishes" || filterType === "Festive Specials") {
      const dishSlug = item.name.toLowerCase().replace(/\s+/g, '-');
      navigate(`/dish/${dishSlug}`);
    }
  };

  return (
    <div className="flex-1 p-4">
      <div className="grid grid-cols-1 gap-4">
        {filteredData.map((item) => (
          <Card 
            key={item.name} 
            className={`overflow-hidden rounded-2xl border-secondary shadow-sm ${
              (filterType === "Dishes" || filterType === "Festive Specials") ? 'cursor-pointer transition-shadow hover:shadow-lg' : ''
            }`}
            onClick={() => handleItemClick(item)}
          >
            <div className="flex">
              <div className="relative flex-shrink-0">
                <img src={item.image} alt={item.name} className="h-24 w-24 object-cover" />
                {'isBestVoted' in item && item.isBestVoted && (
                  <Badge className="absolute top-1 left-1 bg-yellow-500 text-yellow-900 text-xs">
                    Top Rated
                  </Badge>
                )}
              </div>
              <div className="flex-1 p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm font-serif truncate">{item.name}</h3>
                    {filterType !== "Cooks" && 'cook' in item && item.cook && (
                      <div className="flex items-center space-x-1 mb-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground truncate">{item.cook}</p>
                      </div>
                    )}
                    {filterType === "Cooks" && 'specialty' in item && item.specialty && (
                      <div className="flex items-center space-x-1 mb-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground truncate">{item.specialty}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium">{item.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {'orders' in item && item.orders ? `${item.orders} orders` : 'Cook Profile'}
                      </span>
                    </div>
                    {'price' in item && item.price && (
                      <p className="text-sm font-bold text-primary">₹{item.price}</p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1 ml-2">
                    {filterType === "Cooks" && (
                      <Button 
                        size="sm" 
                        className="h-8 px-3 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle view cook profile
                        }}
                      >
                        View
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DiscoverContent;
