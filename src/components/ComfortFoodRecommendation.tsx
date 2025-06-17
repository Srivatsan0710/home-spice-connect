
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookingDialog from "@/components/BookingDialog";

const ComfortFoodRecommendation = () => {
  const navigate = useNavigate();

  // AI-predicted comfort food based on homesickness indicators - using existing dish name
  const comfortDish = {
    name: "Homestyle Rajma",
    cook: "Aunty Kumar", 
    price: 140,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=400",
    story: "Made exactly like your mother used to make - with extra love and care",
    isComfortFood: true,
    originalPrice: 180,
    discountPercent: 22
  };

  // Selected reasons for comfort food suggestion
  const selectedReasons = [
    "Rainy weather detected 🌧️",
    "Diwali approaching in hometown 🪔"
  ];

  const handleDishClick = () => {
    const dishSlug = comfortDish.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/dish/${dishSlug}?overlay=true`);
  };

  return (
    <section className="mt-6">
      <div className="px-4">
        <Card className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 border-orange-200">
          <div className="flex items-center space-x-2 mb-2">
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <h2 className="text-md font-bold font-serif text-gray-800">Comfort Food Alert</h2>
          </div>
          
          <p className="text-sm text-gray-700 mb-2">
            {selectedReasons.join(" • ")}
          </p>
          
          <p className="text-sm text-orange-800 font-medium mb-3">
            <strong>When your heart yearns for home, let our trusted chefs bridge the distance with authentic flavors that tell stories of love.</strong> Every bite carries the warmth of generations-old recipes. <strong className="text-orange-700">22% off today!</strong> 💙
          </p>

          {/* Comfort Dish Card */}
          <Card 
            className="overflow-hidden rounded-xl border-orange-200 shadow-sm cursor-pointer transition-all hover:shadow-md bg-white"
            onClick={handleDishClick}
          >
            <div className="flex">
              <div className="relative flex-shrink-0">
                <img src={comfortDish.image} alt={comfortDish.name} className="h-20 w-20 object-cover" />
                <Badge className="absolute top-1 left-1 bg-red-500 text-white text-xs">
                  22% OFF
                </Badge>
              </div>
              <div className="flex-1 p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm font-serif truncate text-gray-800">{comfortDish.name}</h3>
                    <p className="text-xs text-gray-600 mb-1">by {comfortDish.cook}</p>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium">{comfortDish.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">Comfort Food</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-primary">₹{comfortDish.price}</span>
                      <span className="text-xs text-gray-500 line-through">₹{comfortDish.originalPrice}</span>
                    </div>
                  </div>
                  
                  <BookingDialog
                    dishName={comfortDish.name}
                    cookName={comfortDish.cook}
                    price={comfortDish.price}
                    image={comfortDish.image}
                    mealType="lunch"
                    hasSubscription={true}
                  >
                    <Button 
                      size="sm" 
                      onClick={(e) => e.stopPropagation()}
                      className="h-8 px-3 bg-orange-600 hover:bg-orange-700"
                    >
                      Add
                    </Button>
                  </BookingDialog>
                </div>
              </div>
            </div>
          </Card>
        </Card>
      </div>
    </section>
  );
};

export default ComfortFoodRecommendation;
