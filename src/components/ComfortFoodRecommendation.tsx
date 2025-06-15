
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, CloudRain, Calendar, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookingDialog from "@/components/BookingDialog";

const ComfortFoodRecommendation = () => {
  const navigate = useNavigate();

  // AI-predicted comfort food based on homesickness indicators
  const comfortDish = {
    name: "Maa Ke Haath Ka Rajma",
    cook: "Aunty Priya",
    price: 140,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=400",
    story: "Made exactly like your mother used to make - with extra love and care",
    isComfortFood: true,
    originalPrice: 180,
    discountPercent: 22
  };

  const handleDishClick = () => {
    const dishSlug = comfortDish.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/dish/${dishSlug}?overlay=true`);
  };

  const getEmotionalMessage = () => {
    // AI-predicted reasons for homesickness
    const triggers = [
      { icon: CloudRain, text: "Rainy weather detected" },
      { icon: Calendar, text: "Festival season approaching" },
      { icon: Phone, text: "Recent family calls" }
    ];

    return triggers;
  };

  return (
    <section className="mt-6">
      <div className="px-4">
        <Card className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 border-orange-200 shadow-md">
          <div className="flex items-center space-x-2 mb-3">
            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
            <h2 className="text-lg font-bold font-serif text-gray-800">Comfort Food Alert</h2>
          </div>
          
          {/* Emotional Message */}
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-2 leading-relaxed">
              <strong>Missing home a little extra today?</strong> Our AI noticed some patterns that suggest you could use some comfort food. 
            </p>
            
            {/* AI Detected Triggers */}
            <div className="flex flex-wrap gap-2 mb-3">
              {getEmotionalMessage().map((trigger, index) => (
                <div key={index} className="flex items-center space-x-1 bg-white/70 rounded-full px-2 py-1">
                  <trigger.icon className="h-3 w-3 text-orange-600" />
                  <span className="text-xs text-gray-600">{trigger.text}</span>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-gray-700 leading-relaxed">
              Let us wrap you in the warmth of home with dishes made with the same love your family would. 
              <strong className="text-orange-700"> Special 22% off today</strong> because everyone deserves comfort when they need it most. 💙
            </p>
          </div>

          {/* Comfort Dish Card */}
          <Card 
            className="overflow-hidden rounded-xl border-orange-200 shadow-sm cursor-pointer transition-all hover:shadow-md bg-white"
            onClick={handleDishClick}
          >
            <div className="flex">
              <div className="relative flex-shrink-0">
                <img src={comfortDish.image} alt={comfortDish.name} className="h-24 w-24 object-cover" />
                <Badge className="absolute top-1 left-1 bg-red-500 text-white text-xs">
                  22% OFF
                </Badge>
              </div>
              <div className="flex-1 p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm font-serif truncate text-gray-800">{comfortDish.name}</h3>
                    <p className="text-xs text-gray-600 mb-1">by {comfortDish.cook}</p>
                    <p className="text-xs text-orange-700 mb-2 italic">{comfortDish.story}</p>
                    
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
                      Order Now
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
